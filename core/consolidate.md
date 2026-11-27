# ai-memory: consolidate

This runs once a day. The script has already promoted and removed memories by how recently they were used, and the report lists what it changed. Do these steps after the learn step:

1. After a blank line, put `**[core consolidate]** <what the script changed, and what you propose, in a few words>` on its own line. Write a `[core consolidate]` line only in a reply to this instruction, never in a main reply. Then copy the report's lists exactly as the script wrote them, leaving out the empty ones. If all are empty, say so in one line.
2. Read every memory in `<LONG_TERM>` and `<SHORT_TERM>`, in as few tool calls as you can, and find memories that repeat each other, also across topics and tiers, including any pair the report lists as not promoted. Propose each merge and wait for the user's approval. To merge, keep one memory file, delete the others, and remove their entries from their topic's `index.json`.

Reads of memory files from now until the user's next message don't count as use, so this review doesn't keep unused memories alive.
