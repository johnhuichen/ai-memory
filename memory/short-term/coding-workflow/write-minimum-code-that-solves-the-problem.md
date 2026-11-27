> Memory: Write the minimum code that solves the problem.

Write the minimum code that solves the problem: only requested features, abstractions only for code used in more than one place, configurability only when asked for, and error handling only for scenarios that can happen. Speculative code adds maintenance with no proven value.

Example: asked to read settings from one config file, read that file. Don't add a plugin system for config sources or a `--config-format` flag that no one asked for.
