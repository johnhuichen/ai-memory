# ai-memory: consolidate

This runs once a day. The script has already promoted and removed memories by how recently they were used, and the report above lists what it changed. Do these steps after the learn step:

1. After a blank line, put `**[core consolidate]** <what the script changed, and what you propose, in a few words>` on its own line. Then copy the report's promoted and removed lists exactly as the script wrote them, each line with its reason. If both are empty, say so in one line.
2. Read the `index.json` of every topic in `<LONG_TERM>` and `<SHORT_TERM>`, and the core files in `<CORE>`. Propose merging memories that repeat each other, also across topics and tiers and including any pair the report lists as not promoted, shortening memories without losing information or making them harder to read, and correcting what is wrong. Read a memory file only when its index line suggests one of these edits. To merge, keep one memory file and delete the others. Wait for the user's approval before applying any edit, and keep changes to core files as small as they can be.
3. For each topic the report lists without a description, add one to that tier's `index.json`.

Reads of memory files from now until the user's next message don't count as use, so this review doesn't keep unused memories alive.

Why: the context window is valuable. With too little written, a lesson isn't stored well enough to use. With too much, the important lessons get lost. Reviewing keeps memory at that balance.
