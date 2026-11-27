"use strict";
// Stop: once a day, promotes and removes memories by their used dates, then blocks with the learn rules
// (and the consolidation report and rules) so the agent takes a follow-up turn.
const fs = require("fs");
const lib = require("./lib");

const label = ({ tier, topic, name }) => `${tier}/${topic}/${name}`;

function promote(memory) {
  const target = { ...memory, tier: "long-term" };
  if (fs.existsSync(lib.memoryFile(target))) return { collision: `${label(memory)} and ${label(target)}` };
  const file = `${memory.name}.md`;
  const memoryEntry = lib.readTopicIndex(memory.tier, memory.topic).find((entry) => entry.file === file) || {
    file,
    memory: lib.memoryLine(lib.memoryFile(memory)) || "",
  };
  const topicEntry = lib.readTierIndex(memory.tier).find((entry) => entry.topic === memory.topic) || {
    topic: memory.topic,
    description: "",
  };
  fs.mkdirSync(lib.topicDir(target.tier, target.topic), { recursive: true });
  fs.renameSync(lib.memoryFile(memory), lib.memoryFile(target));
  lib.writeUsedDates(target, lib.readUsedDates(memory));
  fs.rmSync(lib.statFile(memory), { force: true });
  lib.removeIndexEntry(memory);
  lib.addIndexEntry(target, memoryEntry, topicEntry);
  return { promoted: `${label(memory)}: used on each of the last ${lib.PROMOTE_AFTER_ACTIVE_DATES} active dates` };
}

function remove(memory, activeDates) {
  const idle = lib.idleDates(activeDates, lib.readUsedDates(memory));
  fs.rmSync(lib.memoryFile(memory));
  fs.rmSync(lib.statFile(memory), { force: true });
  lib.removeIndexEntry(memory);
  return { removed: `${label(memory)}: ${idle} idle dates` };
}

function consolidate(activeDates) {
  const results = lib.listMemories().flatMap((memory) => {
    const action = lib.consolidationAction(memory.tier, activeDates, lib.readUsedDates(memory));
    if (action === null) return [];
    if (!lib.canUpdateIndexes(memory)) return [{ skipped: `${label(memory)}: would ${action}, but an index it needs can't be parsed` }];
    return action === "promote" ? [promote(memory)] : [remove(memory, activeDates)];
  });
  const pick = (key) => results.filter((result) => key in result).map((result) => result[key]);
  return { promoted: pick("promoted"), removed: pick("removed"), collisions: pick("collision"), skipped: pick("skipped") };
}

function renderReport(report) {
  const list = (items) => (items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : "- (none)");
  return [
    "# ai-memory: consolidation report",
    `Promoted to long-term:\n${list(report.promoted)}`,
    `Removed:\n${list(report.removed)}`,
    `Not promoted, because long-term already has a memory with the same name:\n${list(report.collisions)}`,
    `Skipped, because an index can't be parsed:\n${list(report.skipped)}`,
    `Index problems, left unrepaired:\n${list(lib.indexProblems())}`,
  ].join("\n\n");
}

const input = lib.readStdinJson();
lib.debugLog("Stop", input);
const date = lib.todayUtc();
const activity = lib.withActiveDate(lib.readActivity(), date);
lib.syncStats(date);
// Kiro truncates long hook output, so the hook only points at the files to read.
const steps = ["Read `<CORE>/learn.md` with the read tool, and follow it."];
if (activity.last_consolidated !== date) {
  const report = consolidate(activity.active_dates);
  fs.writeFileSync(lib.REPORT_FILE, `${renderReport(report)}\n`);
  steps.push("Then read `<STATS>/consolidation-report.md` and `<CORE>/consolidate.md`, and follow them.");
  lib.writeActivity({ ...activity, last_consolidated: date, reviewing_session: input.session_id || null });
} else {
  lib.writeActivity(activity);
}
console.log(JSON.stringify({ decision: "block", reason: lib.renderInjection("learn", steps.join(" ")) }));
