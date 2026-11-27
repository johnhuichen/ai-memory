# ai-memory: write a memory

Follow these rules whenever you create, change, merge or rename a memory.

1. A memory is one file holding one lesson, at `<tier>/<topic>/<name>.md`. New memories always go in `<SHORT_TERM>`, even when `<LONG_TERM>` has the topic, so each memory earns its promotion. Before writing, list the topic's files in both tiers, so you update an existing memory instead of writing a duplicate.
2. Name topics and memories in hyphenated lowercase words, using only `a-z` and `0-9`. The scripts ignore any other name, so a misnamed memory is never recalled by name or counted. Recall decides whether to open a memory from its `<topic>/<name>` alone, so the name must carry the lesson:
   - A topic names the subject or task it applies to, such as `zsh` or `unit-tests`. When a memory applies to several topics, put it under a topic that covers all of them, and create one if none does, because recall skips a topic that looks unrelated to the message. For example, "present interpretations of an ambiguous request" applies to coding and to writing, so it belongs in `handling-requests`, not `coding-workflow`.
   - A memory's name states its rule or fact, such as `unit-tests/find-elements-only-by-testid` or `kiro-cli/resources-globs-not-recursive`. A name that only labels a theme, such as `minimum-code` or `harness-neutral`, fails, because a reader can't tell what it asks without opening it.
   - The test: from `<topic>/<name>` alone, a reader can say when the memory applies and what it says. If they can't, make the name longer. Long names are fine.
3. Make the first line `> Memory: <the rule in one line>`. Then state the rule, why it matters, and an example:
   - State the lesson at the level of its cause, not the case it came from, and use that case as the example. A lesson tied to one case is never recalled for the others.
   - The reason lets a future session apply the lesson to cases it doesn't name. If you don't know why a lesson matters, ask the user. If neither of you has a good reason, leave the lesson out.
   - Leave out a rule a careful assistant follows without being told, even without this harness's system prompt, such as "run the tests after changing code". It costs a read at every recall and changes nothing. Keep it when the user had to correct you on it, because that shows it wasn't obvious.
   - The example shows the rule applied to one specific case, such as a wrong and a right version. A rule without an example is easy to misread, or to miss when it applies. Leave the example out only when the rule is so obvious that an example adds nothing.
4. Never write secrets or sensitive data (keys, tokens, passwords, personal data, internal names) into memory. Use a placeholder such as `<API_KEY>`, or leave the lesson out. Memory files may be shared, and a value stays in git history after it is deleted.
5. The scripts own the stats, so never edit a stat file's contents. When you rename or move a memory, or rename its topic, without changing its content, also move its stat file from `<STATS>/<tier>/<topic>/<old-name>.stat.json` to the matching new path, so the memory keeps its used dates. Otherwise the renamed memory starts with fresh stats.

A complete memory, `zsh/print-literal-text-with-print-not-echo.md`:

```markdown
> Memory: In zsh, pipe literal text with `print -r --` or `printf '%s'`, not `echo`.

In zsh, pipe literal text such as a JSON test payload with `print -r -- "$text"` or `printf '%s' "$text"`, not `echo`. zsh's `echo` turns `\n` into a real newline, which breaks a JSON string and makes a test fail for a reason unrelated to the code.

Example: `echo '{"msg":"a\nb"}' | node parse.js` hands the script a broken JSON string, while `print -r -- '{"msg":"a\nb"}' | node parse.js` hands it the text as written.
```
