"use strict";
// UserPromptSubmit: records today as an active date, syncs stats and indexes, then prints the recall rules
// and each tier's topic index.
const lib = require("./lib");

const input = lib.readStdinJson();
lib.debugLog("UserPromptSubmit", input);
const date = lib.todayUtc();
lib.writeActivity({ ...lib.withActiveDate(lib.readActivity(), date), reviewing_session: null });
lib.sync(date);

const indexSection = (tier) => {
  const topics = lib
    .readTierIndex(tier)
    .map((entry) => `- ${lib.topicIndexFile(tier, entry.topic)}: ${entry.description || "(no description)"}`);
  return [`## ${tier}`, ...(topics.length > 0 ? topics : ["(none)"])].join("\n");
};
const index = ["# ai-memory: index", ...lib.TIERS.map(indexSection)].join("\n\n");
process.stdout.write(`${lib.renderPaths()}\n\n${lib.renderCore("recall")}\n\n${index}\n`);
