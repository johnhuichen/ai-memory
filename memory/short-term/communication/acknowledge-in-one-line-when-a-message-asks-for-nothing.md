> Memory: When a message only informs and asks for nothing, acknowledge it in one line, without inspecting, predicting or explaining.

When a message only tells you something, such as a status update or a step the user is about to take, reply with one line, such as "Ready." or "Noted.". Don't inspect files, predict results or explain until the user asks. A message that asks for nothing wants no work, so extra tool calls and text cost the user tokens and money without helping.

Example: "I am trying to test consolidation. Updated activity.json manually" gets "Ready.", not a read of `activity.json` and a forecast of the consolidation report. The same goes for "I pushed the fix to staging."
