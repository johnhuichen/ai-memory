> Topic: how to approach a task that writes or changes code

# Coding Workflow

These rules favor caution over speed; for trivial tasks, use judgment. They are working when diffs have fewer unnecessary changes, code needs fewer rewrites for overcomplication, and clarifying questions come before implementation instead of after mistakes.

## Before coding
- State your assumptions explicitly, and ask when uncertain. A hidden assumption becomes wrong code the user has to catch.
- When a request has several interpretations, present them instead of picking one silently, so the user chooses what gets built.
- When a simpler approach exists, say so, and push back when warranted. A better plan helps the user more than agreement.
- When something is unclear, stop, name what is confusing, and ask. A question costs less than a wrong guess.
- In a non-interactive run, state the assumption you chose and proceed, so the run finishes and the reviewer can check the choice.
- When proposing a design or code change, stay at the level of the domain model: show the definitions of new or changed types with their methods, and how they work with the existing types. Leave out call-site changes, line numbers and file-by-file consequences, because they follow from the model and crowd the reader's context. Say what a method does only where its behavior is a decision the user could disagree with.

## Simplicity
- Write the minimum code that solves the problem: only requested features, abstractions only for code used in more than one place, configurability only when asked for, and error handling only for scenarios that can happen. Speculative code adds maintenance with no proven value.
- If the code could be far shorter (200 lines that could be 50), rewrite it. Test: would a senior engineer call it overcomplicated? If so, simplify.

## Surgical changes
- Change only what the request needs, and match the existing style even if you'd do it differently. Every changed line should trace to the request, which keeps the diff easy to review.
- Leave adjacent code, comments, formatting and working code as they are. Mention unrelated dead code instead of deleting it.
- Remove imports, variables and functions that your own changes made unused; leave pre-existing dead code unless asked.
- Make code edits one at a time with the edit tool, not with a script that rewrites several files at once, even for a batch of small edits. A script hides each change from review and can change more than intended; going through the files by hand keeps every change deliberate.
- Stay on the task the user set. When a side concern comes up (another bug, an improvement, a related question), note it and raise it after the task is done, unless it blocks the task or changes its outcome. Side topics raised mid-task split the user's attention and drag the conversation away from what they asked for.

## Verification
- Turn each task into a verifiable goal before starting, so you can loop until it is met without asking: "add validation" → write tests for invalid inputs, then make them pass; "fix the bug" → write a test that reproduces it, then make it pass; "refactor X" → ensure tests pass before and after.
- For multi-step tasks, state a brief plan with a check per step (`1. [step] → verify: [check]`). Weak criteria like "make it work" force constant clarification.
