/**
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: 2026-present Jürgen Mülbert <juergen.muelbert@gmail.com>
 *
 * Unified handler for Dependabot: Analyzes metadata, applies labels, and generates reports.
 */

export default async ({ github, context, core }) => {
  try {
    const safeParse = (envVar) => {
      const value = process.env[envVar];
      if (!value) return '';
      try {
        return JSON.parse(value);
      } catch (_e) {
        return value;
      }
    };

    const dependencyNames = safeParse('DEPENDENCY_NAMES');
    const dependencyType = safeParse('DEPENDENCY_TYPE');
    const updateType = safeParse('UPDATE_TYPE');
    const alertState = safeParse('ALERT_STATE');

    const labels = [];

    // --- Unified Label Logic ---
    if (dependencyType === 'direct:production') {
      labels.push('production-dependency');
    } else if (dependencyType) {
      labels.push('development-dependency');
    }

    if (updateType.includes('semver-patch')) labels.push('patch-update');
    else if (updateType.includes('semver-minor')) labels.push('minor-update');
    else if (updateType.includes('semver-major')) labels.push('major-update');

    if (alertState === 'fixed') labels.push('security');

    const prNumber = context.payload.pull_request?.number;
    if (!prNumber) throw new Error('No PR number found.');

    // --- Action 1: Apply Labels ---
    if (labels.length > 0) {
      await github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: prNumber,
        labels: labels,
      });
      core.info(`✅ Labels applied: ${labels.join(', ')}`);
    }

    // --- Action 2: Generate Summary Report ---
    await core.summary
      .addHeading('📦 Dependency Update Summary')
      .addTable([
        ['Property', 'Value'],
        ['Dependencies', `\`${dependencyNames || 'N/A'}\``],
        ['Type', dependencyType || 'N/A'],
        ['Scope', updateType || 'N/A'],
        ['Security Fix', alertState === 'fixed' ? '✅ Yes' : '❌ No'],
      ])
      .write();
  } catch (error) {
    core.setFailed(`Dependency Handler failed: ${error.message}`);
  }
};
