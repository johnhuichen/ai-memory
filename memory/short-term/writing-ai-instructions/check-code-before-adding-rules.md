> Memory: Before adding a rule to an AI instruction, check whether code already enforces it.

Before adding a rule to an AI instruction, check whether code already enforces it, and tell the AI only what the code leaves to it. Restating what the code does costs context and drifts from the code.

Example: a script already skips file names with uppercase letters. The instruction doesn't need "never use uppercase". It needs only what the script can't check, such as "the name must state the lesson".
