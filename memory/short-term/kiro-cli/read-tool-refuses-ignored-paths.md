> Memory: On the v3 engine, Kiro's read tool refuses paths that match git's global ignore file.

On the v3 engine, Kiro's file-reading tool refuses any path that matches git's global ignore file (`~/.config/git/ignore`), and no setting or `fs_read` allow overrides it. That file lists `.kiro`, so read anything under `~/.kiro/`, memory files included, with the shell (`cat`), because the tool fails every time and wastes a call.
