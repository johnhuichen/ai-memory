> Memory: To test whether an AI follows a rule, pick a setup where the rule clearly applies and no competing rule does.

To test whether an AI follows a rule, pick a prompt and a mode where the rule clearly applies and no other rule tells it to do something else. Otherwise a miss can mean the AI ignored the rule, or that it correctly followed the competing rule, and the test can't tell which.

Example: to test whether recall reads `present-interpretations-of-ambiguous-requests`, a `--no-interactive` run asked "Write a short intro for the README." The request was only mildly ambiguous, and in a non-interactive run `state-assumption-and-proceed-when-non-interactive` applies instead, so the miss proved nothing. A clearly ambiguous request such as "make the README better", in an interactive session, tests the rule.
