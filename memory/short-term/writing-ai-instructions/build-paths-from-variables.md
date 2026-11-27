> Memory: Build file paths in instructions from a variable, so they work for every user and harness.

Build file paths in instructions from a variable such as `<CORE>`, which a script or config fills in for each install, so the instructions work for every user and harness. An absolute path works only on the machine it was written on.

Example: write "read `<CORE>/recall.md`", not "read `/home/me/.kiro/ai-memory/core/recall.md`".
