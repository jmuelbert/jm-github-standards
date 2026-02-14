# Contributing to jm-github-standards

First off, thank you for considering contributing to jm-github-standards! 🎉

This project aims to set the gold standard for GitHub automation and repository configurations. We welcome contributions
of all kinds: new workflows, Taskfile improvements, documentation, and ideas.

---

This guide will walk you through our standards and the contribution process.

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct v3.0](https://www.contributor-covenant.org/version/3/0/code_of_conduct/).
By participating, you are expected to uphold this code.
Please report unacceptable behavior to the maintainers.

---

## 🚀 Getting Started

1. **Fork & Clone**

   Fork the repository via GitHub and clone your fork locally:

   ```bash
     git clone https://github.com/your-username/jm-github-standards.git
     cd jm-github-standards
   ```

2. **Development Environment**

   We use [Task](https://taskfile.dev/) as our primary entry point for automation and environment setup.

   ```bash
     task setup
   ```

3. **Documentation**

   Documentation is built with [MkDocs](https://www.mkdocs.org/). Preview changes locally:

   ```bash
     task docs:serve
   ```

---

## ✅ How to Contribute

### Reporting Bugs & Feature Requests 💡

- Use the **GitHub Issues** page.

- For bugs, provide steps to reproduce and environment details.

- For features, explain the use case and how it fits into the "standards" philosophy.

### Submitting Changes 📝

1. **Branching:** Create a descriptive branch name.

   ```bash
       git checkout -b feat/add-security-workflow
   ```

2. **Implementation:** Ensure your changes align with the standards below.

3. **Validation:** Run the local linting suite. This is critical for YAML and Workflow integrity.

   ```bash
       task lint
   ```

4. **Commits:** We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

   ```plaintext
       feat: ...  -> Triggers a MINOR version bump
       fix: ...   -> Triggers a PATCH version bump
       BREAKING CHANGE: ... -> Triggers a MAJOR version bump
       docs: add usage guide for Taskfile
   ```

## 📖 Technical Standards

Since this project focuses on infrastructure-as-code and automation, please adhere to these rules:

### ⚙️ GitHub Workflows

- **Modularity:** Use [Reusable Workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
  wherever possible to reduce duplication.

- **Security:** Always define explicit `permissions` for `GITHUB_TOKEN` and use secrets for sensitive data.

- **Validation:** All workflows must pass [actionlint](https://github.com/rhysd/actionlint) (included in `task lint`).

### 🛠 Taskfile

- The `Taskfile.yml` is the "Single Source of Truth" for local commands.

- Use **internal tasks** (prefixed with `_`) for logic that shouldn't be called directly by users.

- Keep tasks cross-platform compatible.

### 🐍 Python & Scripts

- **Python 3.12+** (if scripts are required).

- Follow **PEP 8** enforced by **Ruff**.

- Use **Type Hints** and **Google-style docstrings**.

### 📝 Documentation & Markdown

- **Markdown:** Follow GitHub-flavored Markdown.

- **Docs:** Built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## 🌍 Translations

We support internationalization (i18n). To add a new language:

1. **Create the folder:** 'docs/<language-code>/`(e.g.,`docs/de/`).

2. **Translate content:** Copy the English structure and translate the `.md` files.

3. **Update Config:** Ensure the new language is registered in mkdocs.yml.

## 📦 Releases (Maintainers only)

This project uses **Automated Semantic Releases**.

- Releases are triggered automatically when changes are merged into `main`.
- The versioning and `CHANGELOG.md` are handled by the CI pipeline based on the
  [Conventional Commits](https://www.conventionalcommits.org/) provided in PR titles and commits.

## 🏷 Versioning Standard (SemVer)

We strictly follow [Semantic Versioning 2.0.0](https://semver.org/). This is crucial for users who depend on our
workflows and configurations.

- **MAJOR (x.0.0):** Significant changes or breaking changes in workflows (for example, removing a required input or
renaming a core task).

- **MINOR (0.x.0):** New features or new reusable workflows added in a backward-compatible manner.

- **PATCH (0.0.x):** Backward-compatible bug fixes or minor documentation tweaks.

**Tip:** Always use the `v` prefix for git tags (for example, `v1.2.3`).

## 📄 License

Contributions are licensed under the [EUPL-1.2](https://interoperable-europe.ec.europa.eu/collection/eupl/eupl-text-eupl-12).

## 🙏 Thank you

Your contributions make jm-github-standards more robust for everyone! 💙
