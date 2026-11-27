"use strict";
// Stop: once a day, promotes and removes memories by their used dates, then blocks with the learn rules
// (and the consolidation report and rules) so the agent takes a follow-up turn.
const fs = require("fs");
const lib = require("./lib");

const label = ({ tier, topic, name }) => `${tier}/${topic}/${name}`;

function promote(memory) {
  const target = { ...memory, tier: "long-term" };
  if (fs.existsSync(lib.memoryFile(target))) return { collision: `${label(memory)} and ${label(target)}` };
  fs.mkdirSync(lib.topicDir(target.tier, target.topic), { recursive: true });
  fs.renameSync(lib.memoryFile(memory), lib.memoryFile(target));
  lib.writeUsedDates(target, lib.readUsedDates(memory));
  fs.rmSync(lib.statFile(memory), { force: true });
  return { promoted: `${label(memory)}: used on each of the last ${lib.PROMOTE_AFTER_ACTIVE_DATES} active dates` };
}

function remove(memory, activeDates) {
  const idle = lib.idleDates(activeDates, lib.readUsedDates(memory));
  fs.rmSync(lib.memoryFile(memory));
  fs.rmSync(lib.statFile(memory), { force: true });
  return { removed: `${label(memory)}: ${idle} idle dates` };
}

function consolidate(activeDates) {
  const results = lib.listMemories().flatMap((memory) => {
    const action = lib.consolidationAction(memory.tier, activeDates, lib.readUsedDates(memory));
    if (action === "promote") return [promote(memory)];
    if (action === "remove") return [remove(memory, activeDates)];
    return [];
  });
  const pick = (key) => results.filter((result) => key in result).map((result) => result[key]);
  return { promoted: pick("promoted"), removed: pick("removed"), collisions: pick("collision") };
}

function renderReport(report) {
  const list = (items) => (items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : "- (none)");
  const undescribed = lib.TIERS.flatMap((tier) =>
    lib.readTierIndex(tier).filter((entry) => !entry.description).map((entry) => `${tier}/${entry.topic}`),
  );
  return [
    "# ai-memory: consolidation report",
    `Promoted to long-term:\n${list(report.promoted)}`,
    `Removed:\n${list(report.removed)}`,
    `Not promoted, because long-term already has a memory with the same name:\n${list(report.collisions)}`,
    `Topics without a description:\n${list(undescribed)}`,
  ].join("\n\n");
}

const input = lib.readStdinJson();
lib.debugLog("Stop", input);
const date = lib.todayUtc();
const activity = lib.withActiveDate(lib.readActivity(), date);
lib.sync(date);
const sections = [lib.renderPaths(), lib.renderCore("learn")];
if (activity.last_consolidated !== date) {
  const report = consolidate(activity.active_dates);
  lib.sync(date);
  sections.push(renderReport(report), lib.renderCore("consolidate"));
  lib.writeActivity({ ...activity, last_consolidated: date, reviewing_session: input.session_id || null });
} else {
  lib.writeActivity(activity);
}
console.log(JSON.stringify({ decision: "block", reason: sections.join("\n\n") }));
