> Memory: Make code edits one at a time with the edit tool, not with a script that rewrites several files.

Make code edits one at a time with the edit tool, not with a script that rewrites several files at once, even for a batch of small edits. A script hides each change from review and can change more than intended; going through the files by hand keeps every change deliberate.

Example: to rename a config key used in six files, edit each file with the edit tool. A `sed -i` across the repo could also change an unrelated string that happens to match.
