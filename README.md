# ai-memory

A self-evolving memory for Kiro CLI. Kiro records what it learns in memory files, reads the relevant ones at the start of each task, and tidies them once a day. Kiro hooks drive every step, so the rules arrive in the conversation at the moment they apply instead of depending on the AI to remember them.

## Setup

Requirements: Kiro CLI 3.6 or later on the V3 engine, and Node.js 18 or later on `PATH`.

1. Clone this repo anywhere, for example `~/Code/ai-memory`.
2. Run `./setup-kiro.sh`. It links `~/.kiro/ai-memory` to the repo, so everything ai-memory uses is reachable under `~/.kiro`, and writes `~/.kiro/hooks/ai-memory.json`, which installs the hooks for every workspace. Memories and stats stay in the repo. Kiro skips hook files that are symlinks, so setup writes the hook file instead of linking it: run setup again after moving the repo or changing `hooks/ai-memory.json`. Changes to the scripts and core files take effect without it.
3. Start a new Kiro session. Sessions load hooks when they start.

## Layout

- `core/` holds the rules the hooks inject: `recall.md`, `learn.md` and `consolidate.md`.
- `memory/short-term/` and `memory/long-term/` hold the memory files, one per topic. Each file starts with `> Topic: <the topic in one line>`.
- `stats/` holds dates that the scripts read and write: `activity.json`, and one `<topic>.stat.json` per memory.
- `hooks/` holds the hook definitions and their Node scripts.

## How it works

All dates are UTC, in `YYYY-MM-DD` format. An active date is a date on which you sent Kiro a message. A memory's used dates are the dates on which Kiro read its file.

| Hook | Script | What it does |
|---|---|---|
| `UserPromptSubmit` | `on-prompt.js` | Adds today to the active dates, then injects `core/recall.md` and an index of every memory file. |
| `PostToolUse` | `on-read.js` | When Kiro reads a memory file with the read tool, at its exact path, adds today to that memory's used dates. |
| `Stop` | `on-stop.js` | Runs consolidation at most once a day, then returns `{"decision": "block"}` with `core/learn.md`, and the consolidation report and `core/consolidate.md` when consolidation ran. Kiro then runs a follow-up that acts on them. |

Consolidation rules:

| Rule | Condition | Approval |
|---|---|---|
| Promote a short-term memory | It was used on each of the last 5 active dates | Not needed |
| Remove a short-term memory | 14 or more active dates came after its last use | Not needed |
| Remove a long-term memory | 30 or more active dates came after its last use | Kiro asks you |

New lessons and edits from the daily review always wait for your approval.

### Why the date lists stay short

- `activity.json` keeps the last 30 active dates, the largest threshold above. A memory last used before the oldest of those 30 dates already has 30 or more active dates after it, so dates further back never change a decision.
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
