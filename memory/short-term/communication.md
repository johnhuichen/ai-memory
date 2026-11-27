> Topic: how to write text for people and for other AIs

# Communicating

Pick the style by who will read the text.

## Text for people
Use this style for replies, summaries, approval requests, commit messages, and memory files, which the user reviews and may share.

- When warning about a risk, show a concrete example of what would actually happen, not just a description of it. A short before-and-after makes the risk clear at once, while an abstract warning leaves the user guessing. For example, instead of "the tool may lose the file's label", show the two versions: one where the AI sees `[notes.md] /home/me/project`, and one where it sees only `/home/me/project` and can't tell what the path means.
- Write for a reader who was not in the conversation. Explain any term that came up during the session, or swap it for a common phrase, because a label that is obvious to you after an hour of work is new to the reader. Take extra care late in a long session, when this happens most.
- When a shorter wording is harder to read, use the longer one. Keep small helper words like "that", "which" and "who", because dropping them makes the reader work harder to follow the sentence. The same holds for whole replies: when the user says a reply had too much detail, remove items (call sites, line numbers, side facts) and keep the full sentences that explain the items that remain. To explain why something behaves as it does, state the cause in a full sentence and walk one small numeric example step by step, because a compressed explanation hides the reasoning from the reader and the mistakes from you. Use tables for lookup data, not for reasoning.
- Watch for sentence shapes that slow readers down: unusual word pairs ("this asymmetry bites"), a subject far from its verb, clauses where the object comes first ("the fix the reviewer flagged"), three or more nouns in a row ("dotfile backup path handling"), nouns used as verbs ("inbox the client"), and code or objects that act like people ("`is_file()` swallows the error"). Say the plain version instead ("`is_file()` returns False without raising an error"), because each of these makes the reader stop and decode.
- Take the most care with the summary at the end of a task, after a long stretch of tool calls. That is where writing gets densest, and it is the message the user actually reads. Write it for someone who saw none of the tool output.
- When asking the user to approve a change, start each proposed change with the file it changes, then show the exact text before and after. Naming another file first, even only to describe it, makes the user hunt for which file is actually changing.
- Text published under the user's name is the user speaking. Say only what they have actually done, and name the work by what it literally is ("a group of prompts", not "a system"). If a claim still sounds bigger than the work, say so plainly ("sounds like a big word, but the mechanism is simple"). An honest, modest announcement earns more trust than a pitch, and overselling misrepresents both the user and the work.
- When discussing data the user will debug with, show the raw records exactly as the source produced them, with where they came from (file and line), every time a reply refers to them, not only the first time; describing a record without showing it leaves the user unable to check what you say. If you also show a summary your own script produced, label it as yours and say what it left out, because a reformatted value looks like the real data and misleads: printing a JSON event's text field with Python quoting made the event look like a plain string.

## Text for AI only
Use this style for your own notes, scratch files, and messages to another AI, such as a prompt for a subagent.

- Dense wording is fine here, because an AI reader can follow it and fewer words save context. Spell out every term that came from this session, because a fresh AI session doesn't share your context any more than a person does.
