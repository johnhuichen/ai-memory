> This is a memory file governed by `<MEMORY_ROOT>/src/core.md`.

# Code Style

## Naming
- Name things so a reader understands what they hold without reading surrounding code. If you'd have to trace back to the declaration, the name isn't good enough.
- Name variables after what they contain, not their type or a shortened alias.
- Use abbreviations only when universally understood (`url`, `id`, `i` for a loop index), so the reader never has to decode a name.
- For an owned copy or a rebinding, reuse the same name: `let ticker = ticker.to_owned();` and `let client = self.client.clone();`, not `let sym = ...` or `let c = ...`. A new name suggests a different value.
- Name functions and methods after what they do, not how they do it, so the name survives changes to the implementation.

## Immutability and pure functions
Prefer immutable data and pure functions by default; they are easier to reason about and test.
- Declare variables immutable unless mutation is necessary.
- Construct values fully at creation instead of mutating them afterwards. Build collections before passing them to constructors.
- Expose state through private fields with read-only accessors, not public mutable fields.
- Return new values instead of mutating arguments.
- Keep functions free of side effects beyond their return value unless the side effect is their purpose (logging, I/O), so the same inputs always give the same output.
