> Memory: Kiro saves conversations per working directory, so `/chat` only lists sessions from the current directory.

Kiro saves conversations in `~/.local/share/kiro-cli/data.sqlite3`, table `conversations_v2`, keyed by working directory. Session files in `~/.kiro/sessions/cli/` record a `cwd` too. `/chat` lists only sessions from the current directory, so "no previous session found" usually means a different directory.
