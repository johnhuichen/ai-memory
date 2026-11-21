# ai-memory

A self-evolving memory for AI coding assistants. The AI records what it learns in topic files under `src/`, lists them in `src/index.md`, and reviews and refactors them over time. `src/core.md` defines how the memory works and changes only with your approval.

The AI needs tools to read and write files on your machine.

## Setup

1. Clone this repo anywhere.
2. Run `./setup.sh`. It writes `VARS.md` with the absolute path of this repo, and creates an empty memory index at `src/index.md` if one doesn't exist. Both files are gitignored, along with every memory file except `src/core.md`. Re-run `setup.sh` whenever you move the repo; it leaves an existing index untouched.
3. Configure your AI harness to load these three files at launch, using their absolute paths:
   - `<repo>/VARS.md`
   - `<repo>/src/core.md`
   - `<repo>/src/index.md`

### Kiro

Add the files to `resources` in each agent file in `~/.kiro/agents/`:

```json
"resources": [
  "file://<repo>/VARS.md",
  "file://<repo>/src/core.md",
  "file://<repo>/src/index.md"
]
```

### Claude Code

Add these lines to `~/.claude/CLAUDE.md`:

```
@<repo>/VARS.md
@<repo>/src/core.md
@<repo>/src/index.md
```

### Other harnesses

Add an instruction to the harness's user-level instructions file (for example `~/.codex/AGENTS.md`, or Copilot's custom instructions): "At the start of every session, read `<repo>/VARS.md`, `<repo>/src/core.md` and `<repo>/src/index.md`, and follow `core.md`."

## Contributing

This is an early experiment, and contributions are welcome. Some useful ways to help:

- Try the setup with an assistant other than Kiro, and report what works and what doesn't. Only the Kiro setup has been tested so far.
- Open an issue when the memory behaves in a way you didn't expect, for example when the AI records a lesson it shouldn't, or misses one it should.
- Suggest a lesson for the shared memory files in `src/`. Include the reason the lesson matters; lessons without a reason are left out.

Please open an issue to discuss any change to `src/core.md` before sending a pull request. That file defines how the whole memory works, so changes to it are kept small and made with care.

## License

MIT. See `LICENSE`.
