# CodeIgniter 4 Spark

[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-codeigniter4-spark?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-codeigniter4-spark?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-codeigniter4-spark?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-codeigniter4-spark?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark&ssr=false#review-details)
[![GitHub Stars](https://img.shields.io/github/stars/ManuelGil/vscode-codeigniter4-spark?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-codeigniter4-spark)
[![License](https://img.shields.io/github/license/ManuelGil/vscode-codeigniter4-spark?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-codeigniter4-spark/blob/main/LICENSE)

> A suite of commands and shortcuts integrated into Visual Studio Code to streamline common CodeIgniter 4 tasks.

## Why This Extension?

CodeIgniter 4 Spark automates frequent framework operations (such as cache management, database migrations, and file scaffolding) directly from the editor. By providing Spark commands within VS Code, developers can:

- Execute cache, migration, and configuration commands without leaving the IDE
- Scaffold controllers, models, entities, filters, and more with a single command
- Inspect routes, clear caches, and generate encryption keys instantly
- Reduce context switching and maintain focus on application logic

![demo](https://raw.githubusercontent.com/ManuelGil/vscode-codeigniter4-spark/main/docs/images/demo.gif)

![preview](https://raw.githubusercontent.com/ManuelGil/vscode-codeigniter4-spark/main/docs/images/preview.png)

## Requirements

- CodeIgniter 4.3.0 or later
- Visual Studio Code 1.88.0 or later (compatible with VSCodium and other VS Code-based editors)

## Installation

1. Open [Visual Studio Code](https://code.visualstudio.com/) or a compatible editor.
2. Navigate to the **Extensions** view (`Ctrl+Shift+X` on Windows/Linux or `⌘+Shift+X` on macOS).
3. Search for **CodeIgniter 4 Spark** or install directly from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark).
4. Click **Install** and reload the editor when prompted.

## Configuration

Add or update the following settings in your project's `.vscode/settings.json` to tailor file watching and display:

```jsonc
{
  "spark.files.include": ["php"],          // Extensions to include in the file tree
  "spark.files.exclude": [
    "**/vendor/**",
    "**/.*/**"
  ],                                         // Paths to exclude
  "spark.files.watch": ["helpers"],        // Folders to watch for changes
  "spark.files.showPath": true              // Show the file path
}
```

Reload the editor to apply configuration changes.

## Getting Started

1. Open the **Command Palette** (`Ctrl+Shift+P` or `⌘+Shift+P`).
2. Type `Spark:` to view available commands.
3. Select and execute a command such as **Spark: Start Server**, **Spark: Make Controller**, or **Spark: Migrate**.
4. For scaffolding commands, follow the prompts to specify names and options; the extension will generate files with appropriate boilerplate.

## Available Commands

| Command                     | Description                                  |
| --------------------------- | -------------------------------------------- |
| **Spark: Start Server**     | Launches the development server              |
| **Spark: Clear Cache**      | Clears application and system cache          |
| **Spark: Cache Info**       | Displays cache statistics                    |
| **Spark: List Routes**      | Outputs all defined routes                   |
| **Spark: Optimize**         | Prepares application for production          |
| **Spark: PHP INI Check**    | Verifies PHP configuration settings          |
| **Spark: DB Create**        | Creates a new database schema                |
| **Spark: Migrate**          | Runs all pending migrations                  |
| **Spark: Migrate Refresh**  | Drops all tables and re-runs all migrations  |
| **Spark: Migrate Rollback** | Rolls back the last batch of migrations      |
| **Spark: Generate Key**     | Generates a new encryption key               |
| **Spark: Make Controller**  | Generates a controller file with boilerplate |
| **Spark: Make Model**       | Generates a model file with boilerplate      |
| **Spark: Make Entity**      | Generates an entity class                    |
| **Spark: Make Filter**      | Generates a filter class                     |
| **Spark: Make Helper**      | Generates a helper file                      |
| **Spark: Make Migration**   | Generates a migration class with timestamp   |
| **Spark: Make Seeder**      | Generates a database seeder class            |
| **Spark: Clear Logs**       | Deletes all log files                        |
| *…and more*                 | See the Command Palette for a full list      |

## Contributing

Contributions, issue reports, and feature requests are welcome:

1. Fork the [repository](https://github.com/ManuelGil/vscode-codeigniter4-spark).
2. Create a branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes and push to your fork.
4. Open a pull request against the `main` branch.

Please review the [Contribution Guidelines](https://github.com/ManuelGil/vscode-codeigniter4-spark/blob/main/CONTRIBUTING.md) and [Code of Conduct](https://github.com/ManuelGil/vscode-codeigniter4-spark/blob/main/CODE_OF_CONDUCT.md) before contributing.

## Changelog

For a complete list of updates, see [CHANGELOG.md](https://github.com/ManuelGil/vscode-codeigniter4-spark/blob/main/CHANGELOG.md).

## Authors

- **Manuel Gil** - *Owner* - [@ManuelGil](https://github.com/ManuelGil)

For a complete list of contributors, please refer to the [contributors](https://github.com/ManuelGil/vscode-codeigniter4-spark/contributors) page.

## Follow Me

- **GitHub**: [![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge\&logo=github)](https://github.com/ManuelGil)
- **X (formerly Twitter)**: [![X Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge\&logo=x)](https://twitter.com/imgildev)

## Other Extensions

- **[Auto Barrel](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)**
  Automatically generates and maintains barrel (`index.ts`) files for your TypeScript projects.

- **[Angular File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)**
  Generates boilerplate and navigates your Angular (9→20+) project from within the editor, with commands for components, services, directives, modules, pipes, guards, reactive snippets, and JSON2TS transformations.

- **[NestJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-generator)**
  Simplifies creation of controllers, services, modules, and more for NestJS projects, with custom commands and Swagger snippets.

- **[NestJS Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-snippets-extension)**
  Ready-to-use code patterns for creating controllers, services, modules, DTOs, filters, interceptors, and more in NestJS.

- **[T3 Stack / NextJS / ReactJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)**
  Automates file creation (components, pages, hooks, API routes, etc.) in T3 Stack (Next.js, React) projects and can start your dev server from VSCode.

- **[Drizzle ORM Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-drizzle-snippets)**
  Collection of code snippets to speed up Drizzle ORM usage, defines schemas, migrations, and common database operations in TypeScript/JavaScript.

- **[CodeIgniter 4 Spark](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)**
  Scaffolds controllers, models, migrations, libraries, and CLI commands in CodeIgniter 4 projects using Spark, directly from the editor.

- **[CodeIgniter 4 Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-snippets)**
  Snippets for accelerating development with CodeIgniter 4, including controllers, models, validations, and more.

- **[CodeIgniter 4 Shield Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-shield-snippets)**
  Snippets tailored to CodeIgniter 4 Shield for faster authentication and security-related code.

- **[Mustache Template Engine - Snippets & Autocomplete](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-mustache-snippets)**
  Snippets and autocomplete support for Mustache templates, making HTML templating faster and more reliable.

## Recommended Browser Extension

For developers who work with `.vsix` files for offline installations or distribution, the complementary [**One-Click VSIX**](https://chromewebstore.google.com/detail/imojppdbcecfpeafjagncfplelddhigc?utm_source=item-share-cb) extension is recommended, available for both Chrome and Firefox.

> **One-Click VSIX** integrates a direct "Download Extension" button into each VSCode Marketplace page, ensuring the file is saved with the `.vsix` extension, even if the server provides a `.zip` archive. This simplifies the process of installing or sharing extensions offline by eliminating the need for manual file renaming.

- [Get One-Click VSIX for Chrome &rarr;](https://chromewebstore.google.com/detail/imojppdbcecfpeafjagncfplelddhigc?utm_source=item-share-cb)
- [Get One-Click VSIX for Firefox &rarr;](https://addons.mozilla.org/es-ES/firefox/addon/one-click-vsix/)

## License

This project is licensed under the **MIT License**. See the [LICENSE](https://github.com/ManuelGil/vscode-codeigniter4-spark/blob/main/LICENSE) file for full details.
