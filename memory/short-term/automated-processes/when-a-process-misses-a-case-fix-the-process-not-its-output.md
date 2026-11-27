> Memory: When an automated process misses a case, fix the process and let it redo the work, instead of doing its work by hand.

When an automated process, such as a script, a pipeline or an AI instruction that runs on a schedule, misses a case, propose a fix to the process and let the next run handle the case. Don't do the work by hand. A manual fix hides the gap, so the process keeps missing the case, and it destroys the case you need to test the fix with.

Example: several consolidation rounds left `coding-workflow/present-interpretations-of-ambiguous-requests` under a topic that was too narrow for it. Wrong: move the memory by hand. Right: add a check for narrow topics to `core/consolidate.md` step 4, then run consolidation and see whether it moves the memory.
