"use strict";
// Stop: runs consolidation at most once a day, then blocks with the learn rules so the agent takes a follow-up turn.
// With `--keep <tier>/<topic>`, records today as a used date for that memory instead.
const fs = require("fs");
const lib = require("./lib");

function keep(memory) {
  const [tier, topic] = memory.split("/");
  if (!lib.TIERS.includes(tier) || !topic || !fs.existsSync(lib.memoryFile(tier, topic))) {
    console.error(`No memory named ${memory}. Use <tier>/<topic>, for example long-term/rust.`);
    process.exit(1);
  }
  lib.recordUse(tier, topic, lib.todayUtc());
  console.log(`Kept ${memory}: it counts as used today.`);
}

function promote(topic) {
  if (fs.existsSync(lib.memoryFile("long-term", topic))) return { merge: topic };
  fs.renameSync(lib.memoryFile("short-term", topic), lib.memoryFile("long-term", topic));
  lib.writeUsedDates("long-term", topic, lib.readUsedDates("short-term", topic));
  fs.unlinkSync(lib.statFile("short-term", topic));
  return { promoted: topic };
}

function removeShortTerm(topic) {
  fs.unlinkSync(lib.memoryFile("short-term", topic));
  fs.unlinkSync(lib.statFile("short-term", topic));
  return { removed: topic };
}

function consolidate(activeDates) {
  const results = lib.listMemories().flatMap(({ tier, topic }) => {
    const action = lib.consolidationAction(tier, activeDates, lib.readUsedDates(tier, topic));
    if (action === "promote") return [promote(topic)];
    if (action === "remove") return [removeShortTerm(topic)];
    if (action === "ask-remove") return [{ askRemove: topic }];
    return [];
  });
  const pick = (key) => results.filter((result) => key in result).map((result) => result[key]);
  return { promoted: pick("promoted"), removed: pick("removed"), merges: pick("merge"), askRemove: pick("askRemove") };
}

function renderReport(report) {
  const list = (items, format) => (items.length > 0 ? items.map((item) => `- ${format(item)}`).join("\n") : "- (none)");
  return [
    "# ai-memory: consolidation report",
    `Promoted to long-term by the script:\n${list(report.promoted, (topic) => topic)}`,
    `Removed from short-term by the script:\n${list(report.removed, (topic) => topic)}`,
    `Merge tasks:\n${list(report.merges, (topic) => `${lib.memoryFile("short-term", topic)} into ${lib.memoryFile("long-term", topic)}`)}`,
    `Long-term memories unused for ${lib.REMOVE_LONG_TERM_AFTER_ACTIVE_DATES} or more active dates:\n${list(report.askRemove, (topic) => lib.memoryFile("long-term", topic))}`,
  ].join("\n\n");
}

function runStopHook() {
  const input = lib.readStdinJson();
  lib.debugLog("Stop", input);
  const date = lib.todayUtc();
  const activity = lib.withActiveDate(lib.readActivity(), date);
  lib.syncStats(date);
  const sections = [lib.renderCore("learn")];
  if (activity.last_consolidated !== date) {
    const report = consolidate(activity.active_dates);
    sections.push(renderReport(report), lib.renderCore("consolidate"));
    lib.writeActivity({ ...activity, last_consolidated: date, reviewing_session: input.session_id || null });
  } else {
    lib.writeActivity(activity);
  }
  console.log(JSON.stringify({ decision: "block", reason: sections.join("\n\n") }));
}

const keepIndex = process.argv.indexOf("--keep");
if (keepIndex !== -1) {
  keep(process.argv[keepIndex + 1] || "");
} else {
  runStopHook();
}
