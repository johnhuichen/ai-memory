"use strict";
// UserPromptSubmit: records today as an active date, syncs stats, then points the agent at the recall rules
// and the tier indexes. Kiro truncates long hook output, so the hook only names the files to read.
const lib = require("./lib");

const input = lib.readStdinJson();
lib.debugLog("UserPromptSubmit", input);
const date = lib.todayUtc();
lib.writeActivity({ ...lib.withActiveDate(lib.readActivity(), date), reviewing_session: null });
lib.syncStats(date);

const pointer = "Before you work on this message, read `<CORE>/recall.md` with the read tool, and follow it.";
process.stdout.write(lib.renderInjection("recall", pointer));
