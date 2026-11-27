> Memory: Turn each task into a verifiable goal before starting, and give a multi-step task a brief plan with a check per step.

Turn each task into a verifiable goal before starting, so you can loop until it is met without asking: "add validation" → write tests for invalid inputs, then make them pass; "fix the bug" → write a test that reproduces it, then make it pass; "refactor X" → ensure tests pass before and after. For multi-step tasks, state a brief plan with a check per step. Weak criteria like "make it work" force constant clarification.

Example:
1. Add the `archived` column in a migration → verify: the migration runs on a copy of the database.
2. Set `archived = false` on existing rows → verify: no row has a null value.
3. Hide archived items in the list endpoint → verify: a test with one archived item gets it filtered out.
