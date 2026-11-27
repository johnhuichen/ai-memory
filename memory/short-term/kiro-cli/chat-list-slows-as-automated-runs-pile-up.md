> Memory: `/chat list` slows down as automated `--no-interactive` runs fill `conversations_v2`.

`/chat list` slows down as `conversations_v2` grows. Every `kiro-cli chat --no-interactive` run (e.g. an automated agent runner) saves a conversation, so automated runs bloat it; check row counts per key first.
