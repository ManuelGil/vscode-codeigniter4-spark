# CodeIgniter 4 Spark for VSCode

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-codeigniter4-spark?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-codeigniter4-spark?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-codeigniter4-spark?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-codeigniter4-spark?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/vscode-codeigniter4-spark?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-codeigniter4-spark)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-codeigniter4-spark?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-codeigniter4-spark/blob/main/LICENSE)

CodeIgniter 4 Spark is a Visual Studio Code extension that provides a set of useful commands and shortcuts for CodeIgniter 4 framework.

![demo](https://raw.githubusercontent.com/ManuelGil/vscode-codeigniter4-spark/main/docs/images/demo.gif)

![preview](https://raw.githubusercontent.com/ManuelGil/vscode-codeigniter4-spark/main/docs/images/preview.png)

## Index

- [CodeIgniter 4 Spark for VSCode](#codeigniter-4-spark-for-vscode)
  - [Index](#index)
  - [Requirements](#requirements)
  - [Project Settings](#project-settings)
  - [Features](#features)
    - [Cache](#cache)
    - [CodeIgniter](#codeigniter)
    - [Database](#database)
    - [Encryption](#encryption)
    - [Generators](#generators)
    - [Housekeeping](#housekeeping)
  - [Connect with me](#connect-with-me)
  - [Other Extensions](#other-extensions)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Requirements

- CodeIgniter 4.3.0 or later
- VSCode 1.76.0 or later

## Project Settings

Configure your project by creating or updating a settings.json file at the project's root. If you already have a `.vscode/settings.json` file, skip the first two steps.

1. Open the command palette in VSCode:

   - `CTRL + SHIFT + P` (Windows)
   - `CMD + SHIFT + P` (Mac OS)

2. Type `Preferences: Open Workspace Settings (JSON)`.

3. In the `.vscode/settings.json` file, copy and paste the following settings:

   ```jsonc
   {
     "spark.files.include": [
         "php"
     ], // The file extensions to watch for changes. Example: "php"
     "spark.files.exclude": [
         "**/vendor/**",
         "**/.*/**"
     ], // The files to exclude from watching. Example: "**/vendor/**", "**/.*/**"
     "spark.files.watch": [
         "helpers"
     ], // The types of files to watch for changes. Example: "helpers"
     "spark.files.showPath": true, // Show the path of the file in the list of files to watch
   }
   ```

4. **Restart VS Code**

Your project is now set up to automatically format code upon saving.

## Features

### Cache

| Title | Purpose |
| --- | --- |
| Spark: Clear Cache | Clears the current system caches |
| Spark: Cache Info | Shows file cache information in the current system |

### CodeIgniter

| Title | Purpose |
| --- | --- |
| Spark: Filter Check | Check filters for a route |
| Spark: Namespaces | Verifies your namespaces are setup correctly |
| Spark: Optimize | Optimize for production |
| Spark: PHP INI check | Check your php.ini settings |
| Spark: List Routes | Displays all routes |
| Spark: Start Server | Launches the CodeIgniter PHP-Development Server |

### Database

| Title | Purpose |
| --- | --- |
| Spark: DB Create | Create a new database schema |
| Spark: DB Seed | Runs the specified seeder to populate known data into the database |
| Spark: DB Table | Retrieves information on the selected table |
| Spark: Migrate | Locates and runs all new migrations against the database |
| Spark: Migrate Refresh | Refreshes the database state by first rolling back all migrations, and then migrating all |
| Spark: Migrate Rollback | Run the "down" method for all migrations |
| Spark: Migrate Status | Displays a list of all migrations and whether they've been run or not |

### Encryption

| Title | Purpose |
| --- | --- |
| Spark: Generate Key | Generates a new encryption key and writes it in an `.env` file |

### Generators

| Title | Purpose |
| --- | --- |
| Spark: Make Command | Generates a new spark command |
| Spark: Make Config | Generates a new config file |
| Spark: Make Controller | Generates a new controller file |
| Spark: Make Entity | Generates a new entity file |
| Spark: Make Filter | Generates a new filter file |
| Spark: Make Helper | Generates a new helper file |
| Spark: Make Language | Generates a new language file |
| Spark: Make Migration | Generates a new migration file |
| Spark: Make Model | Generates a new model file |
| Spark: Make Resource | Generates a new resource file |
| Spark: Make Seeder | Generates a new seeder file |
| Spark: Make Validation | Generates a new validation file |

### Housekeeping

| Title | Purpose |
| --- | --- |
| Spark: Clear Logs | Clears all log files |

## Connect with me

[![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge&logo=github)](https://github.com/ManuelGil)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge&logo=x)](https://twitter.com/imgildev)

## Other Extensions

- [CodeIgniter 4 Spark](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)
- [Auto Barrel](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
- [JSON Flow](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-json-flow)
- [Angular File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
- [NestJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-generator)
- [T3 Stack / NextJS / ReactJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-codeigniter4-spark/contributors) who participated in this project.

## License

CodeIgniter 4 Spark for VSCode is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details.
