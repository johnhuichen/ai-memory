"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");

// setup-kiro.sh links ~/.kiro/ai-memory to this repo, so every path the hooks print stays the same wherever the repo is cloned.
const ROOT = path.join(os.homedir(), ".kiro", "ai-memory");
const MEMORY_DIR = path.join(ROOT, "memory");
const STATS_DIR = path.join(ROOT, "stats");
const ACTIVITY_FILE = path.join(STATS_DIR, "activity.json");
const TIERS = ["long-term", "short-term"];
const DEBUG_FLAG = "/tmp/ai-memory-debug";
const DEBUG_LOG = "/tmp/ai-memory-debug.log";

const PROMOTE_AFTER_ACTIVE_DATES = 5;
const REMOVE_SHORT_TERM_AFTER_ACTIVE_DATES = 14;
const REMOVE_LONG_TERM_AFTER_ACTIVE_DATES = 30;
const MAX_ACTIVE_DATES = Math.max(
  PROMOTE_AFTER_ACTIVE_DATES,
  REMOVE_SHORT_TERM_AFTER_ACTIVE_DATES,
  REMOVE_LONG_TERM_AFTER_ACTIVE_DATES,
);
const MAX_USED_DATES = PROMOTE_AFTER_ACTIVE_DATES;

// Every stored date is a UTC date in YYYY-MM-DD format. Anything else is dropped, so sorting and comparing dates as strings stays correct.
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

function readStdinJson() {
  try {
    return JSON.parse(fs.readFileSync(0, "utf8"));
  } catch {
    return {};
  }
}

function debugLog(hookName, input) {
  if (fs.existsSync(DEBUG_FLAG)) {
    fs.appendFileSync(DEBUG_LOG, `${new Date().toISOString()} ${hookName} ${JSON.stringify(input)}\n`);
  }
}

function keepLatest(dates, max) {
  return [...new Set(dates)].filter((date) => DATE_FORMAT.test(date)).sort().slice(-max);
}

function readActivity() {
  const activity = readJson(ACTIVITY_FILE, {});
  return {
    active_dates: keepLatest(activity.active_dates || [], MAX_ACTIVE_DATES),
    last_consolidated: DATE_FORMAT.test(activity.last_consolidated || "") ? activity.last_consolidated : null,
    reviewing_session: activity.reviewing_session || null,
  };
}

function writeActivity(activity) {
  writeJson(ACTIVITY_FILE, activity);
}

function withActiveDate(activity, date) {
  return { ...activity, active_dates: keepLatest([...activity.active_dates, date], MAX_ACTIVE_DATES) };
}

function memoryFile(tier, topic) {
  return path.join(MEMORY_DIR, tier, `${topic}.md`);
}

function statFile(tier, topic) {
  return path.join(STATS_DIR, tier, `${topic}.stat.json`);
}

function listTopics(dir, suffix) {
  try {
    return fs.readdirSync(dir).filter((name) => name.endsWith(suffix)).map((name) => name.slice(0, -suffix.length));
  } catch {
    return [];
  }
}

function topicLine(file) {
  const firstLine = fs.readFileSync(file, "utf8").split("\n", 1)[0];
  const match = firstLine.match(/^>\s*Topic:\s*(.+)$/);
  return match ? match[1].trim() : "(no topic line)";
}

function listMemories() {
  return TIERS.flatMap((tier) =>
    listTopics(path.join(MEMORY_DIR, tier), ".md").map((topic) => ({
      tier,
      topic,
      file: memoryFile(tier, topic),
    })),
  );
}

function readUsedDates(tier, topic) {
  return keepLatest(readJson(statFile(tier, topic), { used_dates: [] }).used_dates || [], MAX_USED_DATES);
}

function writeUsedDates(tier, topic, usedDates) {
  writeJson(statFile(tier, topic), { used_dates: keepLatest(usedDates, MAX_USED_DATES) });
}

function recordUse(tier, topic, date) {
  writeUsedDates(tier, topic, [...readUsedDates(tier, topic), date]);
}

// A new memory starts as used today, which gives it the full grace period before removal.
function syncStats(date) {
  listMemories()
    .filter(({ tier, topic }) => !fs.existsSync(statFile(tier, topic)))
    .forEach(({ tier, topic }) => writeUsedDates(tier, topic, [date]));
  TIERS.forEach((tier) =>
    listTopics(path.join(STATS_DIR, tier), ".stat.json")
      .filter((topic) => !fs.existsSync(memoryFile(tier, topic)))
      .forEach((topic) => fs.unlinkSync(statFile(tier, topic))),
  );
}

function activeDatesAfter(activeDates, date) {
  return activeDates.filter((activeDate) => activeDate > date).length;
}

// Returns "promote", "remove", "ask-remove" or null.
function consolidationAction(tier, activeDates, usedDates) {
  if (usedDates.length === 0) return null;
  const lastUsed = usedDates[usedDates.length - 1];
  const unusedFor = activeDatesAfter(activeDates, lastUsed);
  if (tier === "long-term") {
    return unusedFor >= REMOVE_LONG_TERM_AFTER_ACTIVE_DATES ? "ask-remove" : null;
  }
  if (unusedFor >= REMOVE_SHORT_TERM_AFTER_ACTIVE_DATES) return "remove";
  const recentActiveDates = activeDates.slice(-PROMOTE_AFTER_ACTIVE_DATES);
  const usedOnEveryRecentDate =
    recentActiveDates.length === PROMOTE_AFTER_ACTIVE_DATES &&
    recentActiveDates.every((activeDate) => usedDates.includes(activeDate));
  return usedOnEveryRecentDate ? "promote" : null;
}

function renderCore(name) {
  return fs.readFileSync(path.join(ROOT, "core", `${name}.md`), "utf8").replaceAll("{{ROOT}}", ROOT).trimEnd();
}

module.exports = {
  ROOT,
  TIERS,
  REMOVE_LONG_TERM_AFTER_ACTIVE_DATES,
  todayUtc,
  readStdinJson,
  debugLog,
  readActivity,
  writeActivity,
  withActiveDate,
  memoryFile,
  statFile,
  topicLine,
  listMemories,
  readUsedDates,
  writeUsedDates,
  recordUse,
  syncStats,
  consolidationAction,
  renderCore,
};
