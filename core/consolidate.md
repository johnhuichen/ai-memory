# ai-memory: consolidate

This runs at most once a day. The report above lists what the hook script already changed and what is left for you. Do these steps after the learn step:

1. Tell the user, as a short list, what the script promoted to long-term and removed from short-term. If the report lists nothing, say so in one line.
2. For each merge task, merge the short-term file into the long-term file, keeping each lesson once, then delete the short-term file. This needs no approval.
3. For each long-term memory the report lists as unused, ask the user whether to delete it. If they say yes, delete the file. If they say no, run `node {{ROOT}}/hooks/on-stop.js --keep long-term/<topic>`, so the memory counts as used today and isn't raised again for a while.
4. Review every memory file, and the core files in `{{ROOT}}/core/`. Remove lessons that are no longer useful, shorten lessons without losing information or making them harder to read, correct what is wrong, and merge lessons that repeat each other, also across files. Propose these edits and wait for the user's approval before applying them. Keep changes to core files as small as they can be.

Reads of memory files from now until the user's next message don't count as use, so this review doesn't keep stale memories alive.

Why: the context window is valuable. With too little written, a lesson isn't stored well enough to use. With too much, the important lessons get lost. Reviewing keeps memory at that balance.
