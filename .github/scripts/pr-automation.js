/**
 * SPDX-License-Identifier: EUPL-1.2
 * SPDX-FileCopyrightText: 2026-present Jürgen Mülbert <juergen.muelbert@gmail.com>
 *
 * Automates PR labeling based on the PR title and body, and adds a review checklist.
 */

export default async ({ github, context, core }) => {
  try {
    const pr = context.payload.pull_request;
    if (!pr) {
      core.info('Not a pull request event. Skipping PR automation.');
      return;
    }

    // Maintain existing labels while adding/removing new ones
    const labels = new Set(pr.labels.map((l) => l.name));
    const minCoverage = process.env.MIN_COVERAGE || 50;

    // 1. Conventional Commit Title Parsing
    const titlePattern = /^(fix|feat|docs|test|chore|refactor|style|perf)(?:\(.*\))?:/;
    const match = pr.title.match(titlePattern);

    const typeMapping = {
      feat: 'feature',
      fix: 'fix',
      docs: 'documentation',
      test: 'test',
      chore: 'chore',
      perf: 'performance-label',
      refactor: 'source',
    };

    if (match) {
      const type = match[1].toLowerCase();
      if (typeMapping[type]) {
        labels.add(typeMapping[type]);
      }
    }

    // 2. Body Keyword Analysis
    const body = pr.body?.toLowerCase() || '';
    const checks = {
      'security-label': ['security', 'vulnerability', 'cve', 'auth', 'authentication'],
      'performance-label': ['performance', 'optimize', 'speed', 'perf'],
      'documentation-label': ['documentation', 'docs', 'readme'],
      'dependencies-label': ['dependency', 'dependencies', 'deps'],
      'breaking-label': ['breaking change', 'breaking-change'],
      'deprecation-label': ['deprecate', 'deprecated'],
    };

    Object.entries(checks).forEach(([label, keywords]) => {
      if (keywords.some((keyword) => body.includes(keyword))) {
        labels.add(label);
      }
    });

    // 3. Draft Status Management
    if (pr.draft) {
      labels.add('status: work-in-progress');
      labels.delete('status: ready-for-review');
    } else {
      labels.add('status: ready-for-review');
      labels.delete('status: work-in-progress');
    }

    // 4. Synchronize Labels
    const finalLabels = Array.from(labels);
    await github.rest.issues.setLabels({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pr.number,
      labels: finalLabels,
    });
    core.info(`✅ PR labels synchronized: ${finalLabels.join(', ')}`);

    // 5. Post Review Checklist (Only when PR is first opened)
    if (context.payload.action === 'opened') {
      const checklist = `## PR Review Checklist

### 🎯 Prerequisites
- [ ] PR title follows [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Branch is up to date with target branch
- [ ] All automated checks are passing

### 📝 Documentation
- [ ] Documentation updated (and translations if applicable)
- [ ] API changes documented
- [ ] Inline comments added for complex logic

### 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Coverage meets minimum threshold (${minCoverage}%)
- [ ] All tests passing locally

### 🔒 Security & Quality
- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] Code follows project style guide
`;

      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: pr.number,
        body: checklist,
      });
      core.info('✅ Review checklist posted.');
    }
  } catch (error) {
    core.setFailed(`PR Automation failed: ${error.message}`);
  }
};
