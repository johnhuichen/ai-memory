> Memory: Name functions and methods after what they do, not how they do it.

Name functions and methods after what they do, not how they do it, so the name survives changes to the implementation.

Example: `load_user_settings()`, not `read_json_from_disk()`. If the settings later move to a database, the first name still fits and the second one is wrong.
