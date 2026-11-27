> Memory: Put small, conceptually related changes in one forge spec, even across repos.

Put small changes in one spec when they are conceptually related, even when they span several repos (list each repo under Codebase; the coder commits in all of them). Every spec is a separate forge run that reads the codebase again, so splitting related small changes burns tokens, while bundling unrelated or large changes makes a spec hard to review.
