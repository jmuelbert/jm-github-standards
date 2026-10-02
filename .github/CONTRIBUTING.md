# Contributing to jm-github-standards

Thank you for your interest in jm-github-standards! This project aims to set the gold standard for GitHub automation
and repository configurations.

---

## 🚀 Getting Started

### 2. Prerequisites

- Ensure you have [pnpm](https://pnpm.io/) installed (we use `pnpm@10.33.2`).
- Ensure you have [Task](https://taskfile.dev/) installed (we use `task@3.31.0`).
- The `Taskfile.yml` is the "Single Source of Truth" for local commands.
- Use **internal tasks** (prefixed with `_`) for logic that shouldn't be called directly by users.
- Keep tasks cross-platform compatible.

### 2. Fork & Clone

````bash
  git clone [https://github.com/your-username/jm-github-standards.git](https://github.com/your-username/jm-github-standards.git)
  cd jm-github-standards
  task setup


## 3. Documentation & Preview

We use Astro with Starlight. To preview changes locally:

  ```bash
      task docs:dev
````

## ✅ How to Contribute

### Submitting Changes 📝

1. **Branching:** Use descriptive branch names (e.g., `feat/add-biome-workflow`, `fix/docs-typo`).

2. **Validation:** Run our local quality suite before pushing. This is critical to pass CI checks:

```bash
    task lint
```

3. **Commits:** We follow Conventional Commits.

## 📖 Technical Standards

Since this project focuses on infrastructure-as-code and automation, please adhere to these rules:

### ⚙️ GitHub Workflows

- **Modularity:** Use Reusable Workflows.
- **Security:** Define explicit permissions for `GITHUB_TOKEN`.
- **Validation:** All workflows must pass `actionlint`.

### 🔍 Linting & Quality

- **Code:** We use Biome for consistent formatting and linting.
- **Markdown:** Validated via `markdownlint`.
- **Spelling:** Checked via cspell (run `pnpm docs:cspell:docs`).
- **Standards:** We use Vale for prose linting (run `pnpm docs:vale`).

### 📝 Documentation

- **Built with Astro/Starlight.**
- **Language:** English is the primary language.
- **i18n:** New languages are added via subdirectories in `docs/src/content/docs/` (e.g., `docs/de/`).

### 🏷 Versioning & Releases

We follow [Semantic Versioning 2.0.0](https://semver.org/).

- Releases are automated via CI.
- Versioning is derived from Conventional Commits in the PR history.
- Always use the `v` prefix for tags.

## 📄 License

Contributions are licensed under the [EUPL-1.2](https://interoperable-europe.ec.europa.eu/collection/eupl/eupl-text-eupl-12).

## 🙏 Thank you

Your contributions make jm-github-standards more robust for everyone! 💙
