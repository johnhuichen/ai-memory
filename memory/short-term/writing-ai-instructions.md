> Topic: how to write prompts, memory files and other instructions for AI

# Writing Instructions for AI

- Give every rule its intent (a "Why" line), so the AI can apply it to cases the rule doesn't name.
- Make triggers and steps concrete. "Re-read at the start of every task" works; "from time to time" or "every action" doesn't, because the AI can't act on vague timing and checking after every action is impractical.
- Define what counts by its effect, not by a closed list or hard exclusions. "Record anything that would change how you act next time" beats "nothing to record when you were correct", which would block lessons like a confirmed uncertain choice.
- Build file paths from a variable such as `<MEMORY_ROOT>` defined in a gitignored file, so the instructions work for every user and harness.
- Start with the simplest rule that does the job and add detail only when it proves needed. Elaborate rules (strength tiers, scope precedence) are harder to follow and to maintain than "use your best judgement, ask when unsure".
- Keep instructions harness-neutral (Kiro, Claude Code, Copilot, Codex), so the same files work in any AI tool. Keep a rule even if one harness's system prompt already says it; other harnesses don't have that prompt.
