#!/usr/bin/env bash
# SPDX-License-Identifier: EUPL-1.2
# Label synchronization script

set -euo pipefail

# Configuration
readonly REPO="${GITHUB_REPOSITORY}"
readonly DRY_RUN="${DRY_RUN:-false}"
readonly CONFIG_URL="${CONFIG_URL:-https://raw.githubusercontent.com/jmuelbert/jm-github-standards/main/.github/config/labels.json}"
readonly PROTECTED_PATTERNS="${PROTECTED_PATTERNS:-^(v\d+|github-|dependabot)}"
DATE_NOW=$(date +%s)
readonly AUDIT_LOG="sync-audit-${DATE_NOW}.log"

DELETED=0
CREATED=0
UPDATED=0

# Helper functions
log() {
  echo "$@" | tee -a "$AUDIT_LOG"
}

log_section() {
  echo "" | tee -a "$AUDIT_LOG"
  log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  log "$@"
  log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

error_exit() {
  log "❌ Error: $*"
  exit 1
}

# Download & validate config
log_section "📥 Downloading configuration"
log "URL: $CONFIG_URL"

curl -sSL \
  -H "Authorization: token $GH_TOKEN" \
  -o labels.json \
  "$CONFIG_URL" || error_exit "Failed to download config"

[ -s labels.json ] || error_exit "Config file is empty"

log_section "🔍 Validating configuration"
jq empty labels.json || error_exit "Invalid JSON"
jq -e 'all(. ; has("name") and has("color"))' labels.json >/dev/null || error_exit "Missing required fields"

label_count=$(jq 'length' labels.json)
log "✅ Valid config with $label_count labels"

# Extract standard names
jq -r '.[].name' labels.json | sort >standard_names.txt

# Phase 1: Pruning
log_section "🗑️  PHASE 1: Pruning non-standard labels"

gh label list --repo "$REPO" --json name --jq '.[].name' | sort >local_names.txt

prune_candidates=()
while IFS= read -r local_label; do
  grep -qFx "$local_label" standard_names.txt && continue
  echo "$local_label" | grep -qE "$PROTECTED_PATTERNS" && {
    log "🛡️  PROTECTED: $local_label"
    continue
  }
  prune_candidates+=("$local_label")
done <local_names.txt

if [ ${#prune_candidates[@]} -eq 0 ]; then
  log "✅ No labels to prune"
else
  log "Found ${#prune_candidates[@]} label(s) to delete:"
  printf '  - %s\n' "${prune_candidates[@]}" | tee -a "$AUDIT_LOG"

  # Check issue impact
  log ""
  log "⚠️  Checking issue impact..."
  total_issues=0
  for label in "${prune_candidates[@]}"; do
    count=$(gh issue list --repo "$REPO" --label "$label" --json number --jq 'length' 2>/dev/null || echo "0")
    [ "$count" -gt 0 ] && log "  └─ '$label': $count issue(s)" && ((total_issues += count))
  done
  [ "$total_issues" -gt 0 ] && log "⚠️  $total_issues issue(s) affected"

  # Execute deletions
  if [ "$DRY_RUN" != "true" ]; then
    log ""
    log "🔴 EXECUTING DELETIONS..."
    for label in "${prune_candidates[@]}"; do
      gh label delete "$label" --repo "$REPO" --yes 2>/dev/null && {
        log "  ✓ Deleted: $label"
        ((DELETED++))
      } || log "  ✗ Failed: $label"
    done
  else
    log "[DRY-RUN: No changes made]"
  fi
fi

# Phase 2: Syncing
log_section "📝 PHASE 2: Syncing labels from config"

jq -c '.[]' labels.json | while read -r label; do
  NAME=$(echo "$label" | jq -r '.name')
  COLOR=$(echo "$label" | jq -r '.color')
  DESC=$(echo "$label" | jq -r '.description // ""')

  if gh label list --repo "$REPO" --json name --jq ".[] | select(.name == \"$NAME\")" 2>/dev/null | grep -q "$NAME"; then
    # Update
    if [ "$DRY_RUN" != "true" ]; then
      gh label edit "$NAME" --repo "$REPO" --color "$COLOR" --description "$DESC" 2>/dev/null && {
        log "  ✓ Updated: $NAME"
        ((UPDATED++))
      } || log "  ✗ Failed: $NAME"
    else
      log "  [DRY-RUN] Would update: $NAME"
      ((UPDATED++))
    fi
  else
    # Create
    if [ "$DRY_RUN" != "true" ]; then
      gh label create "$NAME" --repo "$REPO" --color "$COLOR" --description "$DESC" 2>/dev/null && {
        log "  ✓ Created: $NAME"
        ((CREATED++))
      } || log "  ✗ Failed: $NAME"
    else
      log "  [DRY-RUN] Would create: $NAME"
      ((CREATED++))
    fi
  fi
done

# Summary
log_section "📊 SUMMARY"
log "Created:  $CREATED"
log "Updated:  $UPDATED"
log "Deleted:  $DELETED"
[ "$DRY_RUN" = "true" ] && log "ℹ️  DRY-RUN MODE: No changes applied"
log "✅ Complete"

# Output for workflow
{
  echo "deleted_count=$DELETED"
  echo "created_count=$CREATED"
  echo "updated_count=$UPDATED"
} >>"$GITHUB_OUTPUT"
