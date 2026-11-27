> Memory: Change only what the request needs, match the existing style, and leave adjacent code as it is.

Change only what the request needs, and match the existing style even if you'd do it differently. Leave adjacent code, comments and formatting as they are, and mention unrelated dead code instead of deleting it. Every changed line should trace to the request, which keeps the diff easy to review and avoids breaking code that worked.

Example: asked to fix an off-by-one error in `parse_date()`, change that line. Don't also turn the file's `var` declarations into `let` or reformat `parse_time()` below it. If nothing calls `parse_time()`, say so in your reply instead of deleting it.
