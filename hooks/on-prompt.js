"use strict";
// UserPromptSubmit: records today as an active date, then prints the recall rules and the memory index.
const lib = require("./lib");

const input = lib.readStdinJson();
lib.debugLog("UserPromptSubmit", input);
const date = lib.todayUtc();
lib.writeActivity({ ...lib.withActiveDate(lib.readActivity(), date), reviewing_session: null });
lib.syncStats(date);

const memories = lib.listMemories();
const indexSection = (tier) => {
  const entries = memories
    .filter((memory) => memory.tier === tier)
    .map((memory) => `- ${memory.file}: ${lib.topicLine(memory.file)}`);
  return [`## ${tier}`, ...(entries.length > 0 ? entries : ["(none)"])].join("\n");
};
const index = ["# ai-memory: index", ...lib.TIERS.map(indexSection)].join("\n\n");
process.stdout.write(`${lib.renderCore("recall")}\n\n${index}\n`);
