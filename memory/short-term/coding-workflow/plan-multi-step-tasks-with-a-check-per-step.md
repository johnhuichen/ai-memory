> Memory: For multi-step tasks, state a brief plan with a check per step.

For multi-step tasks, state a brief plan with a check per step. Weak criteria like "make it work" force constant clarification.

Example:
1. Add the `archived` column in a migration → verify: the migration runs on a copy of the database.
2. Set `archived = false` on existing rows → verify: no row has a null value.
3. Hide archived items in the list endpoint → verify: a test with one archived item gets it filtered out.
