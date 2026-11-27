# ai-memory: learn

This text comes from the user's ai-memory hook, which runs after every reply. You want to keep improving, so check whether the exchange that just ended taught you something worth keeping for future sessions.

A lesson is anything that would change how you act in a future task. For example:
- the user said something you did is wrong, corrected you, or showed frustration
- the user said how they want something done, or told you something worth remembering
- the user agreed with or praised something you did, especially after you changed how you work
- you made a mistake and found its cause
- a tool, language, library or codebase behaved in a way you didn't expect

When what you did matched what was expected, there is usually nothing to record. If there is nothing to record, reply with exactly the two lines below and nothing else. Otherwise, start your reply with the same `---` line, then `**[core learn]** <the change you propose, in a few words>`. The `---` line separates this reply from the previous one.

```
---
**[core learn]** nothing to learn
```

To record a lesson:
1. Read the memory-files memory from the index, and follow it to pick or create the file.
2. Write the lesson as one bullet: the rule, then why it matters. The reason lets a future session apply the lesson to cases it doesn't name. If you don't know why a lesson matters, ask the user. If neither of you has a good reason, leave it out.
3. When the user corrected one specific piece of work, fix that piece. Record a general lesson only if its reason applies beyond that piece, and ask the user when you are unsure.
4. Never write secrets or sensitive data (keys, tokens, passwords, personal data, internal names) into memory. Use a placeholder such as `<API_KEY>`, or leave the lesson out. Memory files may be shared, and a value stays in git history after it is deleted.
5. Show the user the exact change and why, and wait for approval before writing it. In a non-interactive run, change no memory files.

A lesson can also be about how ai-memory itself works. The core files in `{{ROOT}}/core/` and the scripts in `{{ROOT}}/hooks/` drive the whole memory, so propose changes to them only when needed, keep each change as small as it can be, and always wait for the user's approval.
