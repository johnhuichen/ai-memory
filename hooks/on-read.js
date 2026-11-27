"use strict";
// PostToolUse on read and shell tools: records today as a used date for every memory file the tool read.
const fs = require("fs");
const lib = require("./lib");

const MEMORY_PATH = /memory\/(short-term|long-term)\/([a-z0-9][a-z0-9-]*)\.md/g;

const collectStrings = (value) =>
  typeof value === "string"
    ? [value]
    : value && typeof value === "object"
      ? Object.values(value).flatMap(collectStrings)
      : [];

const input = lib.readStdinJson();
lib.debugLog("PostToolUse", input);
const activity = lib.readActivity();
const toolInput = input.tool_input || {};
const isShell = typeof toolInput.command === "string";

if (!(activity.reviewing_session && activity.reviewing_session === input.session_id)) {
  const date = lib.todayUtc();
  const readSources = isShell ? [toolInput.command].filter((command) => /^\s*cat\s/.test(command)) : collectStrings(toolInput);
  const usedMemories = readSources
    .flatMap((source) => [...source.matchAll(MEMORY_PATH)].map((match) => ({ tier: match[1], topic: match[2] })))
    .filter(({ tier, topic }) => fs.existsSync(lib.memoryFile(tier, topic)));
  if (usedMemories.length > 0) {
    lib.writeActivity(lib.withActiveDate(activity, date));
    usedMemories.forEach(({ tier, topic }) => lib.recordUse(tier, topic, date));
  }
}
