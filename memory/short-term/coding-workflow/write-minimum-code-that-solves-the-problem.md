> Memory: Write the minimum code that solves the problem, and rewrite your code if it could be far shorter.

Write the minimum code that solves the problem: only requested features, abstractions only for code used in more than one place, configurability only when asked for, and error handling only for scenarios that can happen. If what you wrote could be far shorter (200 lines that could be 50), rewrite it. Test: would a senior engineer call it overcomplicated? If so, simplify. Speculative and extra code adds maintenance with no proven value, hides bugs, and costs every future reader time.

Example: asked to read settings from one config file, read that file. Don't add a plugin system for config sources or a `--config-format` flag that no one asked for. A 60-line class with a factory and a strategy interface that only ever formats a date one way becomes one 5-line function.
