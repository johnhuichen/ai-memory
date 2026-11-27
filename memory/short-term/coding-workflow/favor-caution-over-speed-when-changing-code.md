> Memory: Favor caution over speed when writing or changing code; for trivial tasks, use judgment.

Favor caution over speed when writing or changing code: read before editing, ask before guessing, and check the result. For trivial tasks, use judgment. Caution is working when diffs have fewer unnecessary changes, code needs fewer rewrites, and questions come before implementation instead of after mistakes.

Example: before renaming a function that other modules import, find every caller and ask whether it is part of a public API. To fix a typo in a comment, just fix it.
