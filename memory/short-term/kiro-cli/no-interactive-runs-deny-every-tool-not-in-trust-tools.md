> Memory: `kiro-cli chat --no-interactive` denies every tool not listed in `--trust-tools`, so trust the tools the run will actually reach for, not the ones you expect.

In `kiro-cli chat --no-interactive`, a tool that isn't in `--trust-tools` is denied outright, because no one can approve it. The AI in the run picks its own tools and may use another tool than you expected, so a narrow trust list can make the run quietly do something else. Before trusting a wide tool such as `run_command`, ask the user, because the run can then execute any command.

Example: a recall test trusted `fs_read,glob,grep`. The session tried to list the memory folders with `run_command`, which was denied, so it read no memories and reported `[core recall] none`. That made the test meaningless. A fair run needs `--trust-tools=fs_read,run_command`.
