# 🏗️ jm-github-standards

<div align="center">

<!--- [![Security Scorecard][scorecard-badge]][scorecard-link] &nbsp; -->

[![OpenSSF Best Practices][OpenSSF_badge]][OpenSSF_link]

  <!--
  [![REUSE Compliance][REUSE_badge]][REUSE_link]
  --->

&nbsp; &nbsp; │ &nbsp; &nbsp;

  <!---
  [![Pipeline][pipeline-badge]][pipeline-link] &nbsp;
  [![Governance][governance-badge]][governance-link] &nbsp;
  [![Documentation Deployment][docs-deploy-badge]][docs-deploy-link] &nbsp;
  -->

[![MegaLinter][MegaLinter-badge]][MegaLinter-link]

&nbsp; &nbsp; │ &nbsp; &nbsp;

[![License: EUPL 1.2][eupl-badge]][eupl-link] &nbsp;
[![License: CC BY 4.0][cc-badge]][cc-link]

<!--
[![Docs][documentation-badge]][documentation-link]
-->
</div>

---

This repository is the **Central Governance & CI/CD Engine** for my GitHub ecosystem. It provides reusable workflows and
serves as the authoritative **blueprint** for language-specific projects (Python, Rust, C++, etc.).

## 🚀 Centralized Shared Workflows

These workflows are designed to be called from downstream repositories to ensure a consistent high-standard quality gate:

- **`shared-megalinter`**: The primary linting engine (supporting 70+ linters).
- **`shared-governance`**: Enforces PR standards, commit linting, and project integrity.
- **`shared-codeql-analysis`**: Centralized security scanning.
- **`shared-scorecard`**: Evaluates OSSF security best practices.
- **`shared-reuse`**: Validates license compliance.
- **`shared-maintenance`**: Automates stale issue handling and repo hygiene.
- **`shared-dependabot-merge`**: Orchestrates secure dependency updates.
- **`sync-labels`**: A specialized workflow to keep labels consistent across all repositories.
- **`shared-docs-validation`**: Validates documentation consistency and quality.

## 🚀 Key Features & Workflow Bundles

- **🚀 Pipeline:** Automated CI with **MegaLinter**, **REUSE** compliance, **CodeQL**, and **Docs-validation**.
- **⚖️ Governance:** PR Analysis (Commitlint), Dependency Review, and automated Issue processing.
- **🧼 Maintenance:** Stale-issue handling and Repo-Linting for consistent project structures.
- **🤖 Automation:** Automated **docs-deployment** via MkDocs and Dependabot orchestration.

## 📋 The Blueprint Concept

Beyond shared actions, this repository provides **standardized configurations** to be mirrored in new projects:

- **Tooling:** Modern stacks using `uv` (Python), `pnpm` (Node), and `go-task`.
- **Documentation:** A high-end **MkDocs** setup with multi-language support and strict link validation.
- **Community:** Best-practice templates for **Issues**, **Discussions**, and **Contributing** guidelines.

## Prerequisites

Ensure you have the following installed:

- [uv](https://github.com/astral-sh/uv) (Python management)
- [pnpm](https://pnpm.io/) (Node management)
- [go-task](https://taskfile.dev/) (Task runner)

## 🛠️ Local Development & Quick Start

To contribute or test these standards locally, we use **Taskfile** to automate the environment.

```bash
  git clone https://github.com/jmuelbert/jm-github-standards.git
  cd jm-github-standards
  task setup       # Install all local dev dependencies
  task lint        # Run all local linters and quality checks
  task docs:serve  # Preview documentation at localhost:8090
```

## 🔗 Integration Example

To inherit these standards in a downstream project, use the following pattern in .github/workflows/standards.yml:.

```yaml
jobs:
  quality:
    uses: jmuelbert/jm-github-standards/.github/workflows/shared-megalinter.yml@main
  security:
    uses: jmuelbert/jm-github-standards/.github/workflows/shared-codeql-analysis.yml@main
```

---

## 🔐 Security & Permissions

All shared workflows use **Step-Security Harden Runner** to monitor network egress.

> [!IMPORTANT]
> Some automation tasks (like syncing labels across repositories) require a
> **Fine-grained Personal Access Token (PAT)** named `SYSTEM_LABEL_SYNC_ACTION` with `Issues: Read/Write` permissions.

---

## 📚 Documentation & Support

<!--- **Full Documentation::** Learn more about our [Standard Configurations][documentation-link]. --->

- **Discussions:** Have a question or an idea? Join our
  [Discussions][discussions-link] for community discussions and support.

- **Contributing:** Check out our [Contributing Guidelines][contributing-guidelines-link] and [Code of Conduct][code-of-conduct-link].

- **Security:** Report vulnerabilities via our [Security Policy][security-link].

---

## ⚖️ License

This project follows a dual-licensing strategy:

- **Code & Workflows:** Licensed under the [European Public License 1.2][eupl-link].
- **Documentation:** Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)][cc-link].
- **Compliance:** [REUSE compliant][license-link]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- Project -->

[license-link]: ./LICENSES
[eupl-link]: ./LICENSES/EUPL-1.2.txt
[eupl-badge]: https://img.shields.io/badge/License-EUPL%201.2-blue.svg
[cc-link]: ./LICENSES/CC-BY-4.0.txt
[cc-badge]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
[code-of-conduct-link]: ./.github/CODE_OF_CONDUCT.md
[security-link]: ./.github/SECURITY.md
[contributing-guidelines-link]: ./.github/CONTRIBUTING.md
[discussions-link]: https://github.com/jmuelbert/jm-github-standards/discussions

<!-- Workflows -->
<!--
[pipeline-badge]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-megalinter.yml/badge.svg
[pipeline-link]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-megalinter.yml
[governance-badge]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-governance.yml/badge.svg
[governance-link]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-governance.yml
[docs-deploy-badge]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/docs-deployment.yml/badge.svg
[docs-deploy-link]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/docs-deployment.yml
-->
<!--
[REUSE_badge]: https://api.reuse.software/badge/github.com/jmuelbert/jm-github-standards
[REUSE_link]: https://api.reuse.software/info/github.com/jmuelbert/jm-github-standards
-->
<!-- Project Docs -->
<!--
[documentation-badge]: https://img.shields.io/badge/Docs-github.io-blue
[documentation-link]: https://jmuelbert.github.io/jm-github-standards

-->
<!--- External -->

<!---
[scorecard-badge]: https://img.shields.io/ossf-scorecard/github.com/jmuelbert/jm-github-standards?label=openssf+scorecard&style=flat
[scorecard-link]: https://securityscorecards.dev/viewer/?uri=github.com/jmuelbert/jm-github-standards
--->

[OpenSSF_badge]: https://www.bestpractices.dev/projects/11865/badge
[OpenSSF_link]: https://www.bestpractices.dev/en/projects/11865/passing
[MegaLinter-badge]: https://img.shields.io/badge/Linter-MegaLinter-blueviolet
[MegaLinter-link]: https://megalinter.io
