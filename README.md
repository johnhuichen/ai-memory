# ai-memory

A self-evolving memory for Kiro CLI. Kiro records what it learns in memory files, reads the relevant ones at the start of each task, and tidies them once a day. Kiro hooks drive every step, so the rules arrive in the conversation at the moment they apply instead of depending on the AI to remember them.

## Setup

Requirements: Kiro CLI 3.6 or later on the V3 engine, and Node.js 18 or later on `PATH`.

1. Clone this repo anywhere, for example `~/Code/ai-memory`.
2. Run `./setup-kiro.sh`. It links `~/.kiro/ai-memory` to the repo, so everything ai-memory uses is reachable under `~/.kiro`, and writes `~/.kiro/hooks/ai-memory.json`, which installs the hooks for every workspace. Memories and stats stay in the repo. Kiro skips hook files that are symlinks, so setup writes the hook file instead of linking it: run setup again after moving the repo or changing `hooks/ai-memory.json`. Changes to the scripts and core files take effect without it.
3. Start a new Kiro session. Sessions load hooks when they start.

## Layout

- `core/` holds the rules the hooks inject: `recall.md`, `learn.md` and `consolidate.md`. `learn.md` and `consolidate.md` both point to `write-memory.md`, which says how to name and write a memory.
- `memory/short-term/` and `memory/long-term/` hold the memories. A memory is one file holding one lesson, at `memory/<tier>/<topic>/<name>.md`, and its first line is `> Memory: <the rule in one line>`. There is no index: topic and memory names are hyphenated lowercase words that say what they hold, so the AI picks memories by name. The scripts skip any other name and list it in the daily report.
- `stats/` holds what the scripts read and write: `activity.json`, `stats/<tier>/<topic>/<name>.stat.json` for each memory, and `consolidation-report.md`, the latest daily report.
- `hooks/` holds the hook definitions and their Node scripts.

## How it works

All dates are UTC, in `YYYY-MM-DD` format. An active date is a date on which you sent Kiro a message. A memory's used dates are the dates on which Kiro read its file. Its idle dates are the active dates after its last use.

Kiro cuts hook output after about 2,500 characters, so each hook injects only the paths and a pointer to the files to read.

| Hook | Script | What it does |
|---|---|---|
| `UserPromptSubmit` | `on-prompt.js` | Adds today to the active dates and syncs stats. Then tells Kiro to read `core/recall.md`, which has it list the memory folders and read the memories whose names apply. |
| `PostToolUse` | `on-read.js` | When Kiro reads a memory file with the read tool, at its exact path, adds today to that memory's used dates. Folder listings don't count. |
| `Stop` | `on-stop.js` | Once a day, promotes and removes memories by the rules below, deletes topic folders left empty, and writes the report, which also lists names the scripts ignore. Then returns `{"decision": "block"}` telling Kiro to read `core/learn.md`, plus the report and `core/consolidate.md` on the first Stop of the day. |

Consolidation rules, applied by the script without asking:

| Rule | Condition |
|---|---|
| Promote a short-term memory | It was used on each of the last 5 active dates |
| Remove a short-term memory | It has 14 or more idle dates |
| Remove a long-term memory | It has 360 or more idle dates |

After the script runs, Kiro reviews all memories and merges duplicates and fixes memories that break the writing rules, without asking. It keeps every rule the memories state, and lists each change so you can check it in git. New lessons are also written without asking, and shown to you after.

### Why the date lists stay short

- `activity.json` keeps the last 360 active dates, the largest threshold above. A memory last used before the oldest of those 360 dates already has 360 or more active dates after it, so dates further back never change a decision.
- Each stat file keeps the last 5 used dates. Promotion needs a use on each of the last 5 active dates, and those are the 5 most recent dates, so older uses can't count. Removal only needs the latest use.

### Debugging

Create `/tmp/ai-memory-debug` and every hook appends its event to `/tmp/ai-memory-debug.log`.

## Contributing

This is an early experiment, and contributions are welcome. Some useful ways to help:

- Open an issue when the memory behaves in a way you didn't expect, for example when the AI records a lesson it shouldn't, or misses one it should.
- Suggest a lesson for the memory files. Include the reason the lesson matters; lessons without a reason are left out.

Please open an issue to discuss any change to `core/` or `hooks/` before sending a pull request. Those files define how the whole memory works, so changes to them are kept small and made with care.

## License

MIT. See `LICENSE`.
