> Memory: When a step-by-step instruction gains a new check, add it to the step that looks for problems, not only to the step that allows the fix.

When a step-by-step instruction gains a new check, add it to the step that lists what to look for, not only to the step that allows acting on it. The AI looks only for what the finding step names, so a permission elsewhere never fires.

Example: `consolidate.md` step 4 lists what the review looks for, and step 5 makes the fixes. Allowing "drop obvious rules" only in step 5 left the review never looking for them. Step 4 had to list "a rule a careful assistant follows without being told".
