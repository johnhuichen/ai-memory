"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");

// setup-kiro.sh links ~/.kiro/ai-memory to the repo, so every path the hooks use and print is under ~/.kiro.
// Layout: memory/<tier>/<topic>/<name>.md is one memory holding one lesson. Topic and memory names say what they
// hold, so the AI picks memories by name without an index. Stats mirror the memory files.
const ROOT = path.join(os.homedir(), ".kiro", "ai-memory");
const MEMORY_DIR = path.join(ROOT, "memory");
const STATS_DIR = path.join(ROOT, "stats");
const ACTIVITY_FILE = path.join(STATS_DIR, "activity.json");
const REPORT_FILE = path.join(STATS_DIR, "consolidation-report.md");
const TIERS = ["long-term", "short-term"];
const STAT_SUFFIX = ".stat.json";
// Hyphenated lowercase words, such as `edit-one-at-a-time`. Words may hold digits.
const NAME_FORMAT = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MEMORY_LINE = /^>\s*Memory:\s*(.+)$/;
const DEBUG_FLAG = "/tmp/ai-memory-debug";
const DEBUG_LOG = "/tmp/ai-memory-debug.log";

const PROMOTE_AFTER_ACTIVE_DATES = 5;
const REMOVE_SHORT_TERM_AFTER_IDLE_DATES = 14;
const REMOVE_LONG_TERM_AFTER_IDLE_DATES = 30;
const MAX_ACTIVE_DATES = Math.max(PROMOTE_AFTER_ACTIVE_DATES, REMOVE_SHORT_TERM_AFTER_IDLE_DATES, REMOVE_LONG_TERM_AFTER_IDLE_DATES);
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
  const activity = readJson(ACTIVITY_FILE, {}) || {};
  const activeDates = Array.isArray(activity.active_dates) ? activity.active_dates : [];
  return {
    active_dates: keepLatest(activeDates, MAX_ACTIVE_DATES),
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

function tierDir(tier) {
  return path.join(MEMORY_DIR, tier);
}

function topicDir(tier, topic) {
  return path.join(tierDir(tier), topic);
}

// A memory is identified by { tier, topic, name }.
function memoryFile({ tier, topic, name }) {
  return path.join(topicDir(tier, topic), `${name}.md`);
}

function statFile({ tier, topic, name }) {
  return path.join(STATS_DIR, tier, topic, `${name}${STAT_SUFFIX}`);
}

function entries(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function listDirs(dir) {
  return entries(dir)
    .filter((entry) => entry.isDirectory() && NAME_FORMAT.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function listNames(dir, suffix) {
  return entries(dir)
    .filter((entry) => entry.isFile() && entry.name.endsWith(suffix))
    .map((entry) => entry.name.slice(0, -suffix.length))
    .filter((name) => NAME_FORMAT.test(name))
    .sort();
}

function listMemories() {
  return TIERS.flatMap((tier) =>
    listDirs(tierDir(tier)).flatMap((topic) =>
      listNames(topicDir(tier, topic), ".md").map((name) => {
        const memory = { tier, topic, name };
        return { ...memory, file: memoryFile(memory) };
      }),
    ),
  );
}

// Returns the text of the memory's `> Memory:` first line, or null when the file has none or can't be read.
function memoryLine(file) {
  try {
    const match = fs.readFileSync(file, "utf8").split("\n", 1)[0].match(MEMORY_LINE);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

// Lists topic folders and memory files whose names break NAME_FORMAT. The scripts skip them, so they are never
// counted, promoted or removed until the AI renames them.
function badNames() {
  return TIERS.flatMap((tier) =>
    entries(tierDir(tier))
      .filter((entry) => entry.isDirectory())
      .flatMap((entry) => {
        if (!NAME_FORMAT.test(entry.name)) return [`${tier}/${entry.name}/`];
        return entries(topicDir(tier, entry.name))
          .filter((file) => file.isFile() && file.name.endsWith(".md") && !NAME_FORMAT.test(file.name.slice(0, -3)))
          .map((file) => `${tier}/${entry.name}/${file.name}`);
      }),
  );
}

// Deletes a topic folder once nothing is left in it.
function removeEmptyTopicDir({ tier, topic }) {
  if (entries(topicDir(tier, topic)).length === 0) fs.rmdirSync(topicDir(tier, topic));
}

function readUsedDates(memory) {
  const stat = readJson(statFile(memory), null);
  return Array.isArray(stat?.used_dates) ? keepLatest(stat.used_dates, MAX_USED_DATES) : [];
}

function writeUsedDates(memory, usedDates) {
  writeJson(statFile(memory), { used_dates: keepLatest(usedDates, MAX_USED_DATES) });
}

function recordUse(memory, date) {
  writeUsedDates(memory, [...readUsedDates(memory), date]);
}

// A memory whose stat file is missing, corrupt or holds no valid date starts as used today, which gives it
// the full grace period before removal. Stat files without a memory, and empty stat folders, are deleted.
function syncStats(date) {
  const memories = listMemories();
  memories.filter((memory) => readUsedDates(memory).length === 0).forEach((memory) => writeUsedDates(memory, [date]));
  const statFiles = new Set(memories.map(statFile));
  TIERS.forEach((tier) => {
    const tierStatsDir = path.join(STATS_DIR, tier);
    listNames(tierStatsDir, STAT_SUFFIX).forEach((name) => fs.rmSync(path.join(tierStatsDir, `${name}${STAT_SUFFIX}`)));
    listDirs(tierStatsDir).forEach((topic) => {
      const dir = path.join(tierStatsDir, topic);
      listNames(dir, STAT_SUFFIX)
        .map((name) => path.join(dir, `${name}${STAT_SUFFIX}`))
        .filter((file) => !statFiles.has(file))
        .forEach((file) => fs.rmSync(file));
      if (entries(dir).length === 0) fs.rmdirSync(dir);
    });
  });
}

function idleDates(activeDates, usedDates) {
  const lastUsed = usedDates[usedDates.length - 1];
  return activeDates.filter((activeDate) => activeDate > lastUsed).length;
}

// Returns "promote", "remove" or null.
function consolidationAction(tier, activeDates, usedDates) {
  if (usedDates.length === 0) return null;
  const idle = idleDates(activeDates, usedDates);
  if (tier === "long-term") return idle >= REMOVE_LONG_TERM_AFTER_IDLE_DATES ? "remove" : null;
  if (idle >= REMOVE_SHORT_TERM_AFTER_IDLE_DATES) return "remove";
  const recentActiveDates = activeDates.slice(-PROMOTE_AFTER_ACTIVE_DATES);
  const usedOnEveryRecentDate =
    recentActiveDates.length === PROMOTE_AFTER_ACTIVE_DATES &&
    recentActiveDates.every((activeDate) => usedDates.includes(activeDate));
  return usedOnEveryRecentDate ? "promote" : null;
}

// The variables the core files and hook instructions refer to, so the same text works wherever ai-memory is installed.
function renderVariables() {
  const paths = {
    SHORT_TERM: tierDir("short-term"),
    LONG_TERM: tierDir("long-term"),
    CORE: path.join(ROOT, "core"),
    HOOKS: path.join(ROOT, "hooks"),
    STATS: STATS_DIR,
  };
  return ["# ai-memory: paths", ...Object.entries(paths).map(([name, value]) => `- <${name}>: ${value}`)].join("\n");
}

// Every hook injects its text through this, so each one carries the variables its text uses.
function renderInjection(title, text) {
  return `${renderVariables()}\n\n# ai-memory: ${title}\n\n${text}\n`;
}

module.exports = {
  ROOT,
  PROMOTE_AFTER_ACTIVE_DATES,
  todayUtc,
  readStdinJson,
  debugLog,
  readActivity,
  writeActivity,
  withActiveDate,
  topicDir,
  memoryFile,
  statFile,
  listMemories,
  memoryLine,
  badNames,
  removeEmptyTopicDir,
  readUsedDates,
  writeUsedDates,
  recordUse,
  syncStats,
  idleDates,
  consolidationAction,
  REPORT_FILE,
  renderInjection,
};
