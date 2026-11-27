# ai-memory: recall

Memory holds lessons from past sessions, one lesson per memory file, grouped in topics. Read `<SHORT_TERM>/index.json` and `<LONG_TERM>/index.json`, which list each tier's topics. Then read `<tier>/<topic>/index.json` for each topic that relates to this message, which lists its memories, and then each memory that applies. Use the read tool at each file's exact path. A hook counts only reads of memory files as use.

Start your reply with `**[core recall]** <topic/memory names you read>`, or only `**[core recall]** none`.
