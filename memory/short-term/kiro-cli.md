> Topic: how Kiro CLI works

# Kiro CLI

- Kiro saves conversations in `~/.local/share/kiro-cli/data.sqlite3`, table `conversations_v2`, keyed by working directory. Session files in `~/.kiro/sessions/cli/` record a `cwd` too. `/chat` lists only sessions from the current directory, so "no previous session found" usually means a different directory.
- `/chat list` slows down as `conversations_v2` grows. Every `kiro-cli chat --no-interactive` run (e.g. an automated agent runner) saves a conversation, so automated runs bloat it; check row counts per key first.
- `kiro-cli chat` has no flag to disable saving, and `--list-sessions` ignores `--format json`. Use `--delete-session <id>` to remove a session.
- To delete conversations safely: back up with `sqlite3 <db> ".backup <file>"`, delete rows, run `VACUUM`, then `pragma integrity_check`. Leave files of sessions whose `.lock` pid is still alive.
- Agent `resources` globs like `dir/*.md` match only that directory, not subdirectories.
- On the v3 engine, Kiro's file-reading tool refuses any path that matches git's global ignore file (`~/.config/git/ignore`), and no setting or `fs_read` allow overrides it. That file lists `.kiro`, so read anything under `~/.kiro/`, memory files included, with the shell (`cat`), because the tool fails every time and wastes a call.
