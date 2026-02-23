# 🏛 GitHub Standards

Welcome to the central nervous system of our repository infrastructure. This
documentation defines the standards for CI/CD, code quality, and automation
applied across all projects within this organization.

## 🎯 Vision

A consistent ecosystem where security, code style, and maintainability are
guaranteed automatically, allowing us to focus on what matters most: writing code.

## 🚀 Quick Start: Onboarding a New Project

Integrating a project into our standard circle requires only three simple steps:

## 1. Create Workflows

Create a file at `.github/workflows/maintenance.yml` in your target repository
and call our central logic:

```yaml
uses: jmuelbert/github-standards/.github/workflows/maintenance.yml@v1
secrets: inherit
```

## 2. Link Configurations

Ensure your local linters ([Ruff](https://github.com/astral-sh/ruff),
[Vale](https://github.com/ValeLint/vale)) point to the rules defined here or
have been adopted from our standard template.

## 3. Sync Labels

Run the sync-labels workflow once to apply the unified color scheme and label set.

## 🛠 Core Components

| Component  | Tool                                                                          | Status    | Description                                        |
| ---------- | ----------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| Linting    | [MegaLinter](https://github.com/marketplace/actions/megalinter)               | 🟢 Active | Validates 70+ languages including Ruff for Python. |
| Governance | [Repolinter](https://github.com/marketplace/actions/repolinter)               | 🟢 Active | Enforces LICENSE, README, and Taskfile presence.   |
| Security   | [Dependency Review](https://github.com/marketplace/actions/dependency-review) | 🟢 Active | Blocks vulnerable packages & AGPL licenses.        |
| Automation | GitHub Script                                                                 | 🟢 Active | Automated labeling and PR assignments.             |

## 📚 Further Reading

- [Ruff Guide](./guides/ruff.md): Why we replaced Black & Flake8 with Ruff.

- [Label Catalog](./governance/labels.md): Understanding colors, scopes, and priorities.

- [Maintenance](./workflows/maintenance.md): Detailed insights into weekly repository health checks.

!!! info "Tipp für neue Repos" Nutze die Taskfile.yml Vorlage, um neue Projekte mit
einem einzigen Befehl (task init) gemäß dieser Standards zu initialisieren.
