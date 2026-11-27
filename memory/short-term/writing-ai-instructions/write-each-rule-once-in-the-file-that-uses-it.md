> Memory: When instructions are split across files by task, write each rule once, in the file for the task that uses it, and point to it from other files.

When instructions are split across files by task, write each rule once, in the file for the task that uses it. If a second file also needs the rule, write "follow the rule in <that file>" instead of copying it. Copies drift apart when only one gets updated, and a rule in a file whose task never uses it is text the AI reads for nothing.

Example: a set has `read.md`, `write.md` and `rename.md`. The naming rule for files goes in `write.md`. `rename.md` says "follow the naming rule in `write.md`", and `read.md` doesn't mention it, because reading never names a file.
