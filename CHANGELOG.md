# Change Log

All notable changes to the "CodeIgniter 4 Spark for VSCode" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.4.0] - 2025-03-11

### Added

- Add `vscode-marketplace-client` dependency to check for extension updates and display a notification

### Changed

- Update the `extension.ts` file to use the new `vscode-marketplace-client` dependency
- Update Localization strings for the extension

## [2.3.0] - 2025-01-10

### Added

- Add version extension check to show a message when the extension is outdated
- Add VS Code test configuration and update test scripts

### Changed

- Improve the welcome and update messages in the extension
- Upgrade dependencies to the latest versions available

## [2.2.0] - 2024-11-19

### Added

- Add `spark optimize` command to the extension to optimize for production
- Add `spark phpini:check` command to the extension to check the PHP configuration
- Add `biome` linting and formatting tool to the project
- Add `biome` configuration file to define the linting and formatting rules
- Add version extension check to show a message when the extension is outdated
- Add Spanish language support to the extension

### Changed

- Update `spark serve` command to allow the user to specify the host and port
- Update the `package.json` file to include the new configuration for the Spanish language support
- Update messages in the extension to use localization for the Spanish language
- Update dependencies to the latest versions available

### Removed

- Remove `ESLint` and `Prettier` configurations
- Remove unused configuration files

## [2.1.0] - 2024-03-27

### Changed

- Update the `getFiles` method in the `ListFilesController` so that it can be used without instantiating the class
- Update the `ListFilesProvider` and `ListRoutesProvider` to use the new `getFiles` method
- Upgrade dependencies to the latest versions available

## [2.0.0] - 2024-03-06

### Added

- Add List of Files View
- Add List of Routes View
- Add Feedback View
- Add file includes section to the settings
- Add file excludes section to the settings
- Add file to watch section to the settings
- Add show path of the file in the list of files to watch to the settings
- Add compodoc dependencies for the documentation generation

### Changed

- Refactor the folder structure of the extension to improve the codebase
- Improve the generation of the files to use the new folder structure
- Upgrade dependencies to the latest versions available
- Update settings to use the new folder structure
- Improve the documentation of the extension

## [1.8.1] - 2023-12-30

### Fixed

- Improve docuemntation

## [1.8.0] - 2023-12-03

### Added

- Add Logs Command
- Add Namespaces Command

## [1.7.0] - 2023-11-27

### Added

- Add Filter Command

## [1.6.1] - 2023-11-05

### Fixed

- Fix typos

## [1.6.0] - 2023-11-02

### Changed

- Update templates

## [1.5.0] - 2023-09-12

### Added

- Add Filename restrictions

### Fixed

- Fix Make Config command

## [1.4.0] - 2023-09-03

### Added

- Add Database Commands

### Fixed

- Fix Language file creation

## [1.3.0] - 2023-08-31

### Added

- Add Serve Command
- Add Key Command
- Add Cache Commands
- Add Routes Command

## [1.2.0] - 2023-08-30

### Added

- Add Migrate Commands

### Fixed

- Fix formatting and validation of file names

## [1.1.0] - 2023-08-28

### Added

- Add Resource Command

### Fixed

- Fix typos

## [1.0.1] - 2023-08-27

### Fixed

- Fix typos

## [1.0.0] - 2023-08-27

- Initial release

[unreleased]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v2.4.0...HEAD
[2.4.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.8.1...v2.0.0
[1.8.1]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/ManuelGil/vscode-codeigniter4-spark/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/ManuelGil/vscode-codeigniter4-spark/releases/tag/v1.0.0
