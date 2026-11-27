> Memory: Prefer immutable data and pure functions by default.

Prefer immutable data and pure functions by default; they are easier to reason about and test.
- Declare variables immutable unless mutation is necessary.
- Construct values fully at creation instead of mutating them afterwards. Build collections before passing them to constructors.
- Expose state through private fields with read-only accessors, not public mutable fields.
- Return new values instead of mutating arguments.
- Keep functions free of side effects beyond their return value unless the side effect is their purpose (logging, I/O), so the same inputs always give the same output.
