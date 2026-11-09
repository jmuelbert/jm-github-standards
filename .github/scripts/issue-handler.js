/**
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: 2026-present Jürgen Mülbert <juergen.muelbert@gmail.com>
 *
 * Handles issue triage by adding labels based on the issue title and body.
 */

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Robustly fetches the JSON configuration.
 * Prioritizes GITHUB_WORKSPACE to ensure paths work in CI environments.
 */
const loadConfig = async (core, workspace) => {
	const fileName = "issue-triage.json";
	const localPath = join(workspace, ".github/config", fileName);
	const sharedPath = join(
		workspace,
		".jm-github-standards/.github/config",
		fileName,
	);

	if (existsSync(localPath)) {
		core.info(`✅ Lokale Konfiguration gefunden: ${localPath}`);
		const content = await readFile(localPath, "utf-8");
		return JSON.parse(content);
	}

	if (existsSync(sharedPath)) {
		core.info(`ℹ️ Keine lokale Config. Nutze zentralen Standard: ${sharedPath}`);
		const content = await readFile(sharedPath, "utf-8");
		return JSON.parse(content);
	}

	throw new Error(
		`Konnte ${fileName} weder lokal noch im Standards-Verzeichnis finden.`,
	);
};

export default async ({ github, context, core }) => {
	try {
		// Note: Config is usually located in the main repo's .github/config folder
		const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
		const config = await loadConfig(core, workspace);

		const issue = context.payload.issue;
		if (!issue) {
			core.info("No issue found in the current context. Skipping triage.");
			return;
		}

		const labels = new Set();
		const title = issue.title.toLowerCase();
		const body = issue.body?.toLowerCase() || "";

		// 1. Process type labels based on title prefixes (e.g., "feat:", "fix:")
		if (config.labels?.types) {
			Object.entries(config.labels.types).forEach(([prefix, typeLabels]) => {
				if (title.startsWith(prefix.toLowerCase())) {
					typeLabels.forEach((label) => {
						labels.add(label);
					});
				}
			});
		}

		// 2. Process trigger labels based on keywords in the body
		if (config.labels?.triggers) {
			Object.entries(config.labels.triggers).forEach(
				([trigger, triggerLabels]) => {
					if (body.includes(trigger.toLowerCase())) {
						// Geschweifte Klammern verhindern den impliziten Rückgabewert
						triggerLabels.forEach((label) => {
							labels.add(label);
						});
					}
				},
			);
		}

		// 3. Size-based labeling based on body length
		if (config.labels?.sizes) {
			const length = body.length;
			if (length > config.labels.sizes.medium) {
				labels.add("size/large");
			} else if (length > config.labels.sizes.small) {
				labels.add("size/medium");
			} else {
				labels.add("size/small");
			}
		}

		// Apply labels via GitHub API
		if (labels.size > 0) {
			const labelArray = Array.from(labels);
			await github.rest.issues.addLabels({
				owner: context.repo.owner,
				repo: context.repo.repo,
				issue_number: issue.number,
				labels: labelArray,
			});
			core.info(
				`✅ Successfully applied triage labels: ${labelArray.join(", ")}`,
			);
		} else {
			core.info("ℹ️ No triage labels matched the criteria.");
		}
	} catch (error) {
		// core.setFailed ensures the workflow status turns red on failure
		core.setFailed(`Issue Triage failed: ${error.message}`);
	}
};
