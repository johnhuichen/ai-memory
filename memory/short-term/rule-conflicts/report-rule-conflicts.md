> Memory: When two rules conflict, report it: name both rules, and say which one you followed and why.

When two rules conflict, always report it to the user: name both rules, and say which one you followed and why. Decide by your best judgement about the intent behind each rule, and ask the user first when you are unsure. In a non-interactive run, follow your best judgement and include the report in your final output. Judgement about intent handles most conflicts, and asking when unsure avoids a wrong guess. Reporting every conflict lets the user fix the rules so the conflict doesn't come up again.

Example: one rule says "ask whenever you are unsure", and you are in a non-interactive run that can't receive answers. Follow "state the assumption you chose and proceed", and report: "`stop-and-ask-when-unclear` conflicted with `state-assumption-and-proceed-when-non-interactive`. I followed the second, because no one could answer the question."
