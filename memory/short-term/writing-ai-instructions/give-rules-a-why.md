> Memory: Give every rule its intent, so the AI can apply it to cases the rule doesn't name.

Give every rule its reason, so the AI can apply it to cases the rule doesn't name.

Example: "Don't edit files in `build/`" leaves the AI unsure about `dist/`. "Don't edit files in `build/`, because the build overwrites them" tells it that `dist/`, which the build also writes, is the same case.
