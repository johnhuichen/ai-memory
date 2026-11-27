> Memory: Text only an AI reads may be dense, but spell out every term from the session.

In text for AI only, dense wording is fine, because an AI reader can follow it and fewer words save context. Memory files don't count as AI-only, even though an AI reads them at recall, because the user reviews them and may share them, so write them for people. Spell out every term that came from this session, because a fresh AI session doesn't share your context any more than a person does.

Example: in a prompt for a subagent, "Fix flaky test in `auth_test.rs`: fails about 1 in 5 runs, likely a timing race" is fine. "Apply the plan B fix" is not, because the subagent never saw plan B.
