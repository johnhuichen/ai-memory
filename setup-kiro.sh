#!/bin/sh
# Installs ai-memory for Kiro CLI:
# - links ~/.kiro/ai-memory to this repo, so everything ai-memory uses is reachable under ~/.kiro
# - writes ~/.kiro/hooks/ai-memory.json, whose commands run the scripts through that link
# Memories and stats stay in this repo. Kiro skips hook files that are symlinks, so the hook file is written, not linked.
# Run this again after moving the repo or changing hooks/ai-memory.json.
set -eu
repo="$(cd "$(dirname "$0")" && pwd -P)"
link="$HOME/.kiro/ai-memory"
hook="$HOME/.kiro/hooks/ai-memory.json"
command -v node >/dev/null || { echo "node is not on PATH. Install Node.js 18 or later." >&2; exit 1; }
if [ -e "$link" ] && [ ! -L "$link" ]; then
  echo "$link exists and is not a symlink. Move it away, then run this again." >&2
  exit 1
fi
mkdir -p "$HOME/.kiro/hooks"
ln -sfn "$repo" "$link"
echo "Linked $link -> $repo"
# Remove first: writing onto an old symlink would write through it into the repo.
rm -f "$hook"
ROOT="$link" TEMPLATE="$repo/hooks/ai-memory.json" HOOK="$hook" node -e '
const fs = require("fs");
const template = fs.readFileSync(process.env.TEMPLATE, "utf8");
const rootInJson = JSON.stringify(process.env.ROOT).slice(1, -1);
const hooks = template.split("{{ROOT}}").join(rootInJson);
JSON.parse(hooks);
fs.writeFileSync(process.env.HOOK, hooks);
'
echo "Wrote $hook"
