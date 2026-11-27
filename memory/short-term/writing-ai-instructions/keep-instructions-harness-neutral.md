> Memory: Keep instructions harness-neutral, so the same files work in any AI tool.

Keep instructions harness-neutral (Kiro, Claude Code, Copilot, Codex), so the same files work in any AI tool. Keep a rule even if one harness's system prompt already says it; other harnesses don't have that prompt.

Example: write "read the file with your read tool", not "call `fs_read`", which only one harness has.
