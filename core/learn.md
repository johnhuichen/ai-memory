# ai-memory: learn

You want to keep improving, so check whether the exchange that just ended taught you something worth keeping for future sessions.

A lesson is anything that would change how you act in a future task. For example:
- the user said something you did is wrong, corrected you, or showed frustration
- the user said how they want something done, or told you something worth remembering
- the user agreed with or praised something you did, especially after you changed how you work
- you made a mistake and found its cause
- a tool, language, library or codebase behaved in a way you didn't expect

When what you did matched what was expected, there is usually nothing to record. If there is nothing to record, reply with exactly the three lines in the block below and nothing else. Otherwise, start your reply with the same first two lines, then `**[core learn]** <the change you made, in a few words>`. The first line holds only a zero-width space (U+200B). Kiro joins this reply onto the end of the previous one and drops leading blank lines, so that invisible character is what keeps the blank line, and the blank line puts `[core learn]` on its own line. Write a `[core learn]` line only in a reply to this instruction, never in a main reply.

```
​

**[core learn]** nothing to learn
```

To record a lesson, read `<CORE>/write-memory.md` and follow it. Write the change without asking, then show the user the exact change and why, so they can check it in git. In a non-interactive run, change no memory files. When the user corrected one specific piece of work, fix that piece. Record a general lesson only if its reason applies beyond that piece, and ask the user when you are unsure.

A lesson can also be about how ai-memory itself works. The core files in `<CORE>` and the scripts in `<HOOKS>` drive the whole memory, so propose changes to them only when needed, keep each change as small as it can be, and always wait for the user's approval.
