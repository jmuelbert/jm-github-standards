#!/bin/bash
set -euo pipefail

VERSION="${1:?Version required}"
CLEAN_VER="${VERSION#v}"

echo "Updating floating tags for version: v$CLEAN_VER"

MAJOR="v$(echo "$CLEAN_VER" | cut -d. -f1)"
MINOR="v$(echo "$CLEAN_VER" | cut -d. -f1,2)"

git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

git tag -f "$MAJOR"
git tag -f "$MINOR"
git push origin "$MAJOR" "$MINOR" --force
