> Memory: Don't add a comment when a reader can understand the code without it.

Don't add a comment when a reader can understand the code without it. When writing code, first try to make the code say it: a clearer name, an extracted function, a test name that states the case, or an `expect` message. When the task is only to trim comments, change no code. A comment that repeats the code is noise, and it drifts from the code as the code changes.

Example: instead of `// retry up to 3 times` above `for _ in 0..3`, name the constant `MAX_RETRIES` and drop the comment. A comment that explains why, such as `// the API rejects bursts, so wait between tries`, stays.
