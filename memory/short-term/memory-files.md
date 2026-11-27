> Topic: how ai-memory memory files are laid out and written

# Memory Files

- Memory files live in `~/.kiro/ai-memory/memory/`, in two tiers. `short-term/` holds new lessons, and `long-term/` holds lessons that were promoted after steady use. Put every new lesson in short-term, even when long-term has a file on the same topic. Every lesson then earns its promotion, and consolidation merges the two files when it promotes.
- Name a memory file after its topic, in lowercase with hyphens, for example `git-worktrees.md`. Short-term and long-term files with the same name hold the same topic, so promotion knows which files to merge.
- Make the first line of each memory file `> Topic: <the topic in one line>`, then write one bullet per lesson: the rule, then why it matters. Describe the topic, not the lessons. The hooks build the memory index from this line, and a topic description stays accurate as lessons change.
- Never edit files under `~/.kiro/ai-memory/stats/` by hand. The hook scripts own them, and the promotion and removal rules depend on their exact contents.
