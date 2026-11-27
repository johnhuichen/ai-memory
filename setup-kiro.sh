#!/bin/sh
# Installs ai-memory for Kiro CLI. Links ~/.kiro/ai-memory to this repo and the hook file into ~/.kiro/hooks.
# Writes no memory files: memories and stats stay in this repo.
set -eu
repo="$(cd "$(dirname "$0")" && pwd -P)"
link="$HOME/.kiro/ai-memory"
command -v node >/dev/null || { echo "node is not on PATH. Install Node.js 18 or later." >&2; exit 1; }
if [ -e "$link" ] && [ ! -L "$link" ]; then
  echo "$link exists and is not a symlink. Move it away, then run this again." >&2
  exit 1
fi
mkdir -p "$HOME/.kiro/hooks"
ln -sfn "$repo" "$link"
ln -sfn "$link/hooks/ai-memory.json" "$HOME/.kiro/hooks/ai-memory.json"
echo "Linked $link -> $repo"
echo "Linked $HOME/.kiro/hooks/ai-memory.json -> $link/hooks/ai-memory.json"
