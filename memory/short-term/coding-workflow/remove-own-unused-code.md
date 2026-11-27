> Memory: Remove imports, variables and functions that your own changes made unused.

Remove imports, variables and functions that your own changes made unused; leave pre-existing dead code unless asked. Your own leftovers are part of your change, while older dead code is the user's decision.

Example: your change replaces the only call to `format_legacy()`, so delete `format_legacy()` and its import. Another function that was already unused before your change stays.
