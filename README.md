# 🏗️ jm-github-standards

<div align="center">

[![Security Scorecard][scorecard-badge]][scorecard-link] &nbsp;

[![OpenSSF Best Practices][OpenSSF_badge]][OpenSSF_link]

[![REUSE Compliance][REUSE_badge]][REUSE_link]

&nbsp; &nbsp; │ &nbsp; &nbsp;

[![Pipeline][pipeline-badge]][pipeline-link] &nbsp;
[![Governance][governance-badge]][governance-link] &nbsp;
[![Documentation Deployment][docs-deploy-badge]][docs-deploy-link] &nbsp;

[![MegaLinter][MegaLinter-badge]][MegaLinter-link]

&nbsp; &nbsp; │ &nbsp; &nbsp;‰

[![License: EUPL 1.2][eupl-badge]][eupl-link] &nbsp;
[![License: CC BY 4.0][cc-badge]][cc-link]

[![Docs][documentation-badge]][documentation-link]

</div>

---

This repository is the **Central Governance & CI/CD Engine** for my GitHub ecosystem. It provides reusable workflows
and serves as the authoritative **blueprint** for language-specific projects.

## 🚀 Key Features

- **🚀 CI/CD:** Automated pipelines via **MegaLinter**, **CodeQL**, and **Biome**.
- **⚖️ Governance:** PR analysis, semantic versioning, and automated issue labeling.
- **🧼 Maintenance:** Centralized dependency orchestration and repo hygiene.
- **📚 Documentation:** High-end **Astro/Starlight** setup with multi-language support.

## 📋 The Blueprint Concept

Beyond shared actions, this repository provides **standardized configurations**:

- **Tooling:** Modern stacks using `pnpm` and `go-task`.
- **Documentation:** A performant **Astro** setup, strictly validated via `cspell` and `vale`.

## 🛠️ Local Development

We use **Taskfile** as the single entry point for all local commands.

```bash
  git clone [https://github.com/jmuelbert/jm-github-standards.git](https://github.com/jmuelbert/jm-github-standards.git)
  cd jm-github-standards
  pnpm install
  task setup       # Install dev dependencies
  task lint        # Run the full quality suite (Biome, Linting, etc.)
  task docs:dev    # Preview documentation locally
```

## 🔗 Integration Example

```yaml
jobs:
  quality:
    uses: jmuelbert/jm-github-standards/.github/workflows/shared-biome.yml@v3
```

## 📚 Documentation

**Explore our full documentation at: [https://jmuelbert.github.io/jm-github-standards/](https://jmuelbert.github.io/jm-github-standards/)**

- - **Contributing:** Check out our [Contributing Guidelines][contributing-guidelines-link].
- **Discussions:** Join our [Discussions][discussions-link].

---

## ⚖️ License

This project follows a dual-licensing strategy:

- **Code & Workflows:** Licensed under the [European Public License 1.2][eupl-link].
- **Documentation:** Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)][cc-link].
- **Compliance:** [REUSE compliant][license-link]

<!-- Project -->

[license-link]: ./LICENSES
[eupl-link]: ./LICENSES/EUPL-1.2.txt
[eupl-badge]: https://img.shields.io/badge/License-EUPL%201.2-blue.svg
[cc-link]: ./LICENSES/CC-BY-4.0.txt
[cc-badge]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
[contributing-guidelines-link]: ./.github/CONTRIBUTING.md
[discussions-link]: https://github.com/jmuelbert/jm-github-standards/discussions

<!-- Workflows -->

[pipeline-badge]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-megalinter.yml/badge.svg
[pipeline-link]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-megalinter.yml
[governance-badge]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-governance.yml/badge.svg
[governance-link]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/shared-governance.yml
[docs-deploy-badge]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/docs-deployment.yml/badge.svg
[docs-deploy-link]: https://github.com/jmuelbert/jm-github-standards/actions/workflows/docs-deployment.yml
[REUSE_badge]: https://api.reuse.software/badge/github.com/jmuelbert/jm-github-standards
[REUSE_link]: https://api.reuse.software/info/github.com/jmuelbert/jm-github-standards

<!-- Project Docs -->

[documentation-badge]: https://img.shields.io/badge/Docs-github.io-blue
[documentation-link]: https://jmuelbert.github.io/jm-github-standards

<!--- External -->

[scorecard-badge]: https://img.shields.io/ossf-scorecard/github.com/jmuelbert/jm-github-standards?label=openssf+scorecard&style=flat
[scorecard-link]: https://securityscorecards.dev/viewer/?uri=github.com/jmuelbert/jm-github-standards
[OpenSSF_badge]: https://www.bestpractices.dev/projects/15157/badge
[OpenSSF_link]: https://www.bestpractices.dev/en/projects/15157/passing
[MegaLinter-badge]: https://img.shields.io/badge/Linter-MegaLinter-blueviolet
[MegaLinter-link]: https://megalinter.io
