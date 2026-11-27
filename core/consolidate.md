# ai-memory: consolidate

This runs once a day. The script has already promoted and removed memories by how recently they were used, and the report lists what it changed. Do these steps after the learn step:

1. After a blank line, put `**[core consolidate]** <what the script changed, and what you changed, in a few words>` on its own line. Write a `[core consolidate]` line only in a reply to this instruction, never in a main reply. Then copy the report's lists exactly as the script wrote them, leaving out the empty ones. If all are empty, say so in one line.
2. Read `<CORE>/write-memory.md`, which every change below follows. Then read every memory in `<LONG_TERM>` and `<SHORT_TERM>`, in as few tool calls as you can.
3. Find memories that repeat each other, also across topics and tiers, including any pair the report lists as not promoted. To merge, keep one memory file and delete the others.
4. Find memories that break the rules in `write-memory.md`: a name the report lists as ignored or that fails the naming test, a topic whose name is narrower than the memories filed in it, a missing reason, a missing example where the rule needs one, or a rule a careful assistant follows without being told. Fix a narrow topic by renaming it when all its memories are wider than its name, and otherwise by moving the wider memories to a topic that covers them. Work out a fix for each, and delete a memory whose rule is that obvious.
5. Make each merge and fix without asking. The review only reorganizes lessons already recorded, and git keeps every earlier version, so the user can check the changes afterwards instead of approving each one. Keep every rule the memories state: merge and reword them, but don't add rules, and drop only the obvious ones step 4 finds. Then list each change, one line per memory file: its path and what changed.

Reads of memory files from now until the user's next message don't count as use, so this review doesn't keep unused memories alive.
