"use strict";
// PostToolUse on the read tool: records today as a used date for every memory file the tool read.
const fs = require("fs");
const lib = require("./lib");

const collectStrings = (value) =>
  typeof value === "string"
    ? [value]
    : value && typeof value === "object"
      ? Object.values(value).flatMap(collectStrings)
      : [];

// A path counts only if it is exactly a memory file, through the ~/.kiro link or the repo itself.
const realRoot = fs.realpathSync(lib.ROOT);
const memoryByPath = new Map(
  lib.listMemories().flatMap((memory) => [
    [memory.file, memory],
    [memory.file.replace(lib.ROOT, realRoot), memory],
  ]),
);

const input = lib.readStdinJson();
lib.debugLog("PostToolUse", input);
const activity = lib.readActivity();
// A refused or failed read returns no file content, so a read counts only if the response shows the file's topic line.
const response = collectStrings(input.tool_response).join("\n");

if (!(activity.reviewing_session && activity.reviewing_session === input.session_id)) {
  const date = lib.todayUtc();
  const usedMemories = [...new Set(collectStrings(input.tool_input || {}).map((source) => memoryByPath.get(source)))]
    .filter(Boolean)
    .filter((memory) => response.includes(`Topic: ${lib.topicLine(memory.file)}`));
  if (usedMemories.length > 0) {
    lib.writeActivity(lib.withActiveDate(activity, date));
    usedMemories.forEach(({ tier, topic }) => lib.recordUse(tier, topic, date));
  }
}
