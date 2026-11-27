> Memory: Put small, conceptually related changes in one forge spec, even across repos.

Put small changes in one spec when they are conceptually related, even when they span several repos (list each repo under Codebase; the coder commits in all of them). Every spec is a separate forge run that reads the codebase again, so splitting related small changes burns tokens, while bundling unrelated or large changes makes a spec hard to review.

Example: renaming a config key in a service and in the client repo that reads it goes in one spec that lists both repos. Adding a new feature and fixing an unrelated log message go in two specs.
