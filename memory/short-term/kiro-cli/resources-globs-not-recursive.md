> Memory: Agent `resources` globs like `dir/*.md` match only that directory, not subdirectories.

Agent `resources` globs like `dir/*.md` match only that directory, not subdirectories, so files in a subdirectory are silently left out of the agent's context.

Example: `file://~/.kiro/steering/*.md` loads `steering/a.md` but not `steering/team/b.md`. Add `file://~/.kiro/steering/team/*.md` as its own entry.
