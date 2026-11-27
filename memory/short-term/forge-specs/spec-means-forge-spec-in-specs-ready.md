> Memory: When the user asks for a spec, they mean a forge spec file written to `~/forge/<workflow>/specs/ready/`.

forge is an autonomous agent runner. It picks up spec files and implements them: it writes code, runs tests, and commits to git. Each run uses a named workflow under `~/forge/`, and the workflow sets the prompts and config.

To write a spec:
1. Discuss the change and its tradeoffs first. Push back if the change isn't needed, rests on a misunderstanding, or would make things worse.
2. List `~/forge/`. If there is only one workflow, use it. Otherwise ask which one.
3. Read `~/forge/<workflow>/prompts/spec_guide.md` for the format. The format belongs to the workflow, so the guide is the source of truth.
4. Show the spec and write it to `~/forge/<workflow>/specs/ready/` once the user approves.

Don't edit the target codebase yourself. forge owns the working tree during a run, so a direct edit can clash with it. Prompt files such as `coder.md` and `reviewer.md` are the exception: you may edit them directly once the user approves.
