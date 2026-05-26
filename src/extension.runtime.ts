import {
  Disposable,
  ExtensionContext,
  MessageItem,
  Uri,
  WorkspaceFolder,
  commands,
  env,
  l10n,
  window,
  workspace,
} from 'vscode';
import { VSCodeMarketplaceClient } from 'vscode-marketplace-client';

import {
  CommandIds,
  Config,
  ContextKeys,
  EXTENSION_DISPLAY_NAME,
  EXTENSION_ID,
  EXTENSION_NAME,
  EXTENSION_REPOSITORY_URL,
  USER_PUBLISHER,
} from './app/configs';
import {
  FeedbackController,
  FileController,
  ListFilesController,
  TerminalController,
} from './app/controllers';
import {
  FeedbackProvider,
  ListFilesProvider,
  ListRoutesProvider,
} from './app/providers';

export class ExtensionRuntime {
  /**
   * Avoids repeated disabled-state notifications across command invocations.
   */
  private hasDisabledWarningBeenShown = false;

  /**
   * Current workspace-scoped extension configuration.
   */
  private config!: Config;

  constructor(public readonly context: ExtensionContext) {}

  async initialize(): Promise<boolean> {
    const workspaceFolder = await this.selectWorkspaceFolder();

    if (!workspaceFolder) {
      return false;
    }

    this.initializeConfiguration(workspaceFolder);

    if (!this.isExtensionEnabled()) {
      return false;
    }

    this.startVersionChecks();

    return true;
  }

  async start(): Promise<void> {
    const fileController = new FileController(this.config);
    const terminalController = new TerminalController(this.config);
    const listFilesController = new ListFilesController(this.config);
    const listFilesProvider = new ListFilesProvider();
    const listRoutesProvider = new ListRoutesProvider();
    const feedbackProvider = new FeedbackProvider(new FeedbackController());

    const disposables: Disposable[] = [
      this.registerWorkspaceCommands(),
      ...this.registerFileCommands(fileController),
      ...this.registerTerminalCommands(terminalController),
      ...this.registerListFilesResources(
        listFilesController,
        listFilesProvider,
      ),
      ...this.registerListRoutesResources(listRoutesProvider),
      ...this.registerFeedbackResources(feedbackProvider),
      ...this.registerListFilesWatchers(listFilesProvider),
    ];

    this.context.subscriptions.push(...disposables);
  }

  /**
   * Runs non-blocking version checks after startup.
   */
  private startVersionChecks(): void {
    void this.handleLocalVersionNotifications();
    void this.checkMarketplaceVersion();
  }

  /**
   * Returns the extension version declared in package metadata.
   */
  private getCurrentVersion(): string {
    return this.context.extension.packageJSON?.version ?? '0.0.0';
  }

  /**
   * Handles first-run and local update notifications.
   */
  private async handleLocalVersionNotifications(): Promise<void> {
    const previousVersion = this.context.globalState.get<string>(
      ContextKeys.Version,
    );

    const currentVersion = this.getCurrentVersion();

    if (!previousVersion) {
      const welcomeMessage = l10n.t(
        'Welcome to {0} version {1}! The extension is now active',
        EXTENSION_DISPLAY_NAME,
        currentVersion,
      );

      window.showInformationMessage(welcomeMessage);

      await this.context.globalState.update(
        ContextKeys.Version,
        currentVersion,
      );

      return;
    }

    if (previousVersion !== currentVersion) {
      const actionReleaseNotes: MessageItem = {
        title: l10n.t('Release Notes'),
      };
      const actionDismiss: MessageItem = { title: l10n.t('Dismiss') };
      const availableActions = [actionReleaseNotes, actionDismiss];

      const updateMessage = l10n.t(
        "The {0} extension has been updated. Check out what's new in version {1}",
        EXTENSION_DISPLAY_NAME,
        currentVersion,
      );

      const userSelection = await window.showInformationMessage(
        updateMessage,
        ...availableActions,
      );

      if (userSelection?.title === actionReleaseNotes.title) {
        const changelogUrl = `${EXTENSION_REPOSITORY_URL}/blob/main/CHANGELOG.md`;
        env.openExternal(Uri.parse(changelogUrl));
      }

      await this.context.globalState.update(
        ContextKeys.Version,
        currentVersion,
      );
    }
  }

  /**
   * Checks Marketplace for a newer published extension version.
   */
  private async checkMarketplaceVersion(): Promise<void> {
    const currentVersion = this.getCurrentVersion();

    try {
      const latestVersion = await VSCodeMarketplaceClient.getLatestVersion(
        USER_PUBLISHER,
        EXTENSION_NAME,
      );

      if (latestVersion === currentVersion) {
        return;
      }

      const actionUpdateNow: MessageItem = { title: l10n.t('Update Now') };
      const actionDismiss: MessageItem = { title: l10n.t('Dismiss') };
      const availableActions = [actionUpdateNow, actionDismiss];

      const updateMessage = l10n.t(
        'A new version of {0} is available. Update to version {1} now',
        EXTENSION_DISPLAY_NAME,
        latestVersion,
      );

      const userSelection = await window.showInformationMessage(
        updateMessage,
        ...availableActions,
      );

      if (userSelection?.title === actionUpdateNow.title) {
        await commands.executeCommand(
          'workbench.extensions.action.install.anotherVersion',
          `${USER_PUBLISHER}.${EXTENSION_NAME}`,
        );
      }
    } catch (error) {
      console.error('Error retrieving extension version:', error);
    }
  }

  /**
   * Selects the workspace folder to use for the extension.
   * VSCode does not guarantee a workspace folder exists during activation,
   * so this method explicitly handles missing workspace scenarios.
   */
  private async selectWorkspaceFolder(): Promise<WorkspaceFolder | undefined> {
    const workspaceFolders = workspace.workspaceFolders;

    // Check if there are workspace folders
    if (!workspaceFolders || workspaceFolders.length === 0) {
      const message = l10n.t(
        '{0}: No workspace folders are open. Please open a workspace folder to use this extension',
        EXTENSION_DISPLAY_NAME,
      );
      window.showErrorMessage(message);

      return undefined;
    }

    // Try to load previously selected workspace folder from global state
    const previousFolderUri = this.context.globalState.get<string>(
      ContextKeys.SelectedWorkspaceFolder,
    );
    let previousFolder: WorkspaceFolder | undefined;

    // Find the workspace folder by URI
    if (previousFolderUri) {
      previousFolder = workspaceFolders.find(
        (folder) => folder.uri.toString() === previousFolderUri,
      );
    }

    // Determine the workspace folder to use
    // Only one workspace folder available
    if (workspaceFolders.length === 1) {
      return workspaceFolders[0];
    }

    // Use previously selected workspace folder if available
    if (previousFolder) {
      // Notify the user which workspace is being used
      window.showInformationMessage(
        l10n.t('Using workspace folder: {0}', previousFolder.name),
      );

      return previousFolder;
    }

    // Multiple workspace folders and no previous selection
    const placeHolder = l10n.t(
      '{0}: Select a workspace folder to use. This folder will be used to load workspace-specific configuration for the extension',
      EXTENSION_DISPLAY_NAME,
    );
    const selectedFolder = await window.showWorkspaceFolderPick({
      placeHolder,
    });

    // Remember the selection for future use
    if (selectedFolder) {
      this.context.globalState.update(
        ContextKeys.SelectedWorkspaceFolder,
        selectedFolder.uri.toString(),
      );
    }

    return selectedFolder;
  }

  /**
   * Initializes workspace configuration and registers configuration listeners.
   *
   * @param selectedWorkspaceFolder - The workspace folder used to load the configuration.
   */
  private initializeConfiguration(
    selectedWorkspaceFolder: WorkspaceFolder,
  ): void {
    this.config = new Config(
      workspace.getConfiguration(EXTENSION_ID, selectedWorkspaceFolder.uri),
    );

    this.config.workspaceSelection = selectedWorkspaceFolder.uri.fsPath;

    workspace.onDidChangeConfiguration((configurationChangeEvent) => {
      const updatedWorkspaceConfig = workspace.getConfiguration(
        EXTENSION_ID,
        selectedWorkspaceFolder.uri,
      );

      if (
        configurationChangeEvent.affectsConfiguration(
          `${EXTENSION_ID}.enable`,
          selectedWorkspaceFolder.uri,
        )
      ) {
        const isExtensionEnabled =
          updatedWorkspaceConfig.get<boolean>('enable');

        this.config.update(updatedWorkspaceConfig);

        if (isExtensionEnabled) {
          const enabledMessage = l10n.t(
            'The {0} extension is now enabled and ready to use',
            EXTENSION_DISPLAY_NAME,
          );
          window.showInformationMessage(enabledMessage);
        } else {
          const disabledMessage = l10n.t(
            'The {0} extension is now disabled',
            EXTENSION_DISPLAY_NAME,
          );
          window.showInformationMessage(disabledMessage);
        }
      }

      if (
        configurationChangeEvent.affectsConfiguration(
          EXTENSION_ID,
          selectedWorkspaceFolder.uri,
        )
      ) {
        this.config.update(updatedWorkspaceConfig);
      }
    });
  }

  /**
   * Returns whether commands should execute under current configuration.
   *
   * @remarks
   * Shows a disabled warning once until the extension is re-enabled.
   */
  private isExtensionEnabled(): boolean {
    const isEnabled = this.config.enable;

    if (isEnabled) {
      this.hasDisabledWarningBeenShown = false;
      return true;
    }

    if (!this.hasDisabledWarningBeenShown) {
      window.showErrorMessage(
        l10n.t(
          'The {0} extension is disabled in settings. Enable it to use its features',
          EXTENSION_DISPLAY_NAME,
        ),
      );
      this.hasDisabledWarningBeenShown = true;
    }

    return false;
  }

  /**
   * Registers workspace selection command for multi-root workspaces.
   */
  private registerWorkspaceCommands(): Disposable {
    return commands.registerCommand(
      `${EXTENSION_ID}.${CommandIds.ChangeWorkspace}`,
      async () => {
        const selectedFolder = await window.showWorkspaceFolderPick({
          placeHolder: l10n.t('Select a workspace folder to use'),
        });

        if (!selectedFolder) {
          return;
        }

        await this.context.globalState.update(
          ContextKeys.SelectedWorkspaceFolder,
          selectedFolder.uri.toString(),
        );

        const updatedConfiguration = workspace.getConfiguration(
          EXTENSION_ID,
          selectedFolder.uri,
        );

        this.config.update(updatedConfiguration);

        this.config.workspaceSelection = selectedFolder.uri.fsPath;

        window.showInformationMessage(
          l10n.t('Switched to workspace folder: {0}', selectedFolder.name),
        );
      },
    );
  }

  private registerFileCommands(fileController: FileController): Disposable[] {
    const disposableFileCommand = commands.registerCommand(
      `${EXTENSION_ID}.file.command`,
      (args) => {
        fileController.newCommand(args);
      },
    );
    const disposableFileConfig = commands.registerCommand(
      `${EXTENSION_ID}.file.config`,
      (args) => {
        fileController.newConfig(args);
      },
    );
    const disposableFileController = commands.registerCommand(
      `${EXTENSION_ID}.file.controller`,
      (args) => {
        fileController.newController(args);
      },
    );
    const disposableFileEntity = commands.registerCommand(
      `${EXTENSION_ID}.file.entity`,
      (args) => {
        fileController.newEntity(args);
      },
    );
    const disposableFileFilter = commands.registerCommand(
      `${EXTENSION_ID}.file.filter`,
      (args) => {
        fileController.newFilter(args);
      },
    );
    const disposableFileHelper = commands.registerCommand(
      `${EXTENSION_ID}.file.helper`,
      (args) => {
        fileController.newHelper(args);
      },
    );
    const disposableFileInterface = commands.registerCommand(
      `${EXTENSION_ID}.file.interface`,
      (args) => {
        fileController.newInterface(args);
      },
    );
    const disposableFileLanguage = commands.registerCommand(
      `${EXTENSION_ID}.file.language`,
      (args) => {
        fileController.newLanguage(args);
      },
    );
    const disposableFileLibrary = commands.registerCommand(
      `${EXTENSION_ID}.file.library`,
      (args) => {
        fileController.newLibrary(args);
      },
    );
    const disposableFileMigration = commands.registerCommand(
      `${EXTENSION_ID}.file.migration`,
      (args) => {
        fileController.newMigration(args);
      },
    );
    const disposableFileModel = commands.registerCommand(
      `${EXTENSION_ID}.file.model`,
      (args) => {
        fileController.newModel(args);
      },
    );
    const disposableFileResource = commands.registerCommand(
      `${EXTENSION_ID}.file.resource`,
      (args) => {
        fileController.newResource(args);
      },
    );
    const disposableFileSeeder = commands.registerCommand(
      `${EXTENSION_ID}.file.seeder`,
      (args) => {
        fileController.newSeeder(args);
      },
    );
    const disposableFileTrait = commands.registerCommand(
      `${EXTENSION_ID}.file.trait`,
      (args) => {
        fileController.newTrait(args);
      },
    );
    const disposableFileValidation = commands.registerCommand(
      `${EXTENSION_ID}.file.validation`,
      (args) => {
        fileController.newValidation(args);
      },
    );

    return [
      disposableFileCommand,
      disposableFileConfig,
      disposableFileController,
      disposableFileEntity,
      disposableFileFilter,
      disposableFileHelper,
      disposableFileInterface,
      disposableFileLanguage,
      disposableFileLibrary,
      disposableFileMigration,
      disposableFileModel,
      disposableFileResource,
      disposableFileSeeder,
      disposableFileTrait,
      disposableFileValidation,
    ];
  }

  private registerTerminalCommands(
    terminalController: TerminalController,
  ): Disposable[] {
    const disposableTerminalCacheClear = commands.registerCommand(
      `${EXTENSION_ID}.terminal.cache.clear`,
      () => {
        terminalController.cacheClear();
      },
    );
    const disposableTerminalCacheInfo = commands.registerCommand(
      `${EXTENSION_ID}.terminal.cache.info`,
      () => {
        terminalController.cacheInfo();
      },
    );
    const disposableTerminalDbCreate = commands.registerCommand(
      `${EXTENSION_ID}.terminal.db.create`,
      () => {
        terminalController.dbCreate();
      },
    );
    const disposableTerminalDbSeed = commands.registerCommand(
      `${EXTENSION_ID}.terminal.db.seed`,
      () => {
        terminalController.dbSeed();
      },
    );
    const disposableTerminalDbTable = commands.registerCommand(
      `${EXTENSION_ID}.terminal.db.table`,
      () => {
        terminalController.dbTable();
      },
    );
    const disposableTerminalFilterCheck = commands.registerCommand(
      `${EXTENSION_ID}.terminal.filter.check`,
      () => {
        terminalController.filterCheck();
      },
    );
    const disposableTerminalKey = commands.registerCommand(
      `${EXTENSION_ID}.terminal.key`,
      () => {
        terminalController.key();
      },
    );
    const disposableTerminalLogsClear = commands.registerCommand(
      `${EXTENSION_ID}.terminal.logs.clear`,
      () => {
        terminalController.logsClear();
      },
    );
    const disposableTerminalMigrate = commands.registerCommand(
      `${EXTENSION_ID}.terminal.migrate`,
      () => {
        terminalController.migrate();
      },
    );
    const disposableTerminalMigrateRefresh = commands.registerCommand(
      `${EXTENSION_ID}.terminal.migrate.refresh`,
      () => {
        terminalController.migrateRefresh();
      },
    );
    const disposableTerminalMigrateRollback = commands.registerCommand(
      `${EXTENSION_ID}.terminal.migrate.rollback`,
      () => {
        terminalController.migrateRollback();
      },
    );
    const disposableTerminalMigrateStatus = commands.registerCommand(
      `${EXTENSION_ID}.terminal.migrate.status`,
      () => {
        terminalController.migrateStatus();
      },
    );
    const disposableTerminalNamespaces = commands.registerCommand(
      `${EXTENSION_ID}.terminal.namespaces`,
      () => {
        terminalController.namespaces();
      },
    );
    const disposableTerminalOptimize = commands.registerCommand(
      `${EXTENSION_ID}.terminal.optimize`,
      () => {
        terminalController.optimize();
      },
    );
    const disposableTerminalIniCheck = commands.registerCommand(
      `${EXTENSION_ID}.terminal.iniCheck`,
      () => {
        terminalController.iniCheck();
      },
    );
    const disposableTerminalRoutes = commands.registerCommand(
      `${EXTENSION_ID}.terminal.routes`,
      () => {
        terminalController.routes();
      },
    );
    const disposableTerminalServe = commands.registerCommand(
      `${EXTENSION_ID}.terminal.serve`,
      () => {
        terminalController.serve();
      },
    );

    return [
      disposableTerminalCacheClear,
      disposableTerminalCacheInfo,
      disposableTerminalDbCreate,
      disposableTerminalDbSeed,
      disposableTerminalDbTable,
      disposableTerminalFilterCheck,
      disposableTerminalKey,
      disposableTerminalLogsClear,
      disposableTerminalMigrate,
      disposableTerminalMigrateRefresh,
      disposableTerminalMigrateRollback,
      disposableTerminalMigrateStatus,
      disposableTerminalNamespaces,
      disposableTerminalOptimize,
      disposableTerminalIniCheck,
      disposableTerminalRoutes,
      disposableTerminalServe,
    ];
  }

  private registerListFilesResources(
    listFilesController: ListFilesController,
    listFilesProvider: ListFilesProvider,
  ): Disposable[] {
    const disposableListOpenFile = commands.registerCommand(
      `${EXTENSION_ID}.list.openFile`,
      (uri) => listFilesController.openFile(uri),
    );

    const disposableListGotoLine = commands.registerCommand(
      `${EXTENSION_ID}.list.gotoLine`,
      (uri, line) => listFilesController.gotoLine(uri, line),
    );

    const disposableListFilesTreeView = window.createTreeView(
      `${EXTENSION_ID}.listFilesView`,
      {
        treeDataProvider: listFilesProvider,
        showCollapseAll: true,
      },
    );

    const disposableRefreshListFiles = commands.registerCommand(
      `${EXTENSION_ID}.listFiles.refreshList`,
      () => listFilesProvider.refresh(),
    );

    return [
      disposableListOpenFile,
      disposableListGotoLine,
      disposableListFilesTreeView,
      disposableRefreshListFiles,
    ];
  }

  private registerListRoutesResources(
    listRoutesProvider: ListRoutesProvider,
  ): Disposable[] {
    const disposableListRoutesTreeView = window.createTreeView(
      `${EXTENSION_ID}.listRoutesView`,
      {
        treeDataProvider: listRoutesProvider,
        showCollapseAll: true,
      },
    );

    const disposableRefreshListRoutes = commands.registerCommand(
      `${EXTENSION_ID}.listRoutes.refreshList`,
      () => listRoutesProvider.refresh(),
    );

    return [disposableListRoutesTreeView, disposableRefreshListRoutes];
  }

  private registerListFilesWatchers(
    listFilesProvider: ListFilesProvider,
  ): Disposable[] {
    const disposableOnDidCreateFiles = workspace.onDidCreateFiles(() => {
      listFilesProvider.refresh();
    });
    const disposableOnDidSaveTextDocument = workspace.onDidSaveTextDocument(
      () => {
        listFilesProvider.refresh();
      },
    );

    return [disposableOnDidCreateFiles, disposableOnDidSaveTextDocument];
  }

  private registerFeedbackResources(
    feedbackProvider: FeedbackProvider,
  ): Disposable[] {
    const disposableFeedbackTreeView = window.createTreeView(
      `${EXTENSION_ID}.feedbackView`,
      {
        treeDataProvider: feedbackProvider,
      },
    );

    // Register the commands
    const disposableFeedbackAboutUs = commands.registerCommand(
      `${EXTENSION_ID}.feedback.aboutUs`,
      () => feedbackProvider.controller.aboutUs(),
    );
    const disposableFeedbackReportIssues = commands.registerCommand(
      `${EXTENSION_ID}.feedback.reportIssues`,
      () => feedbackProvider.controller.reportIssues(),
    );
    const disposableFeedbackRateUs = commands.registerCommand(
      `${EXTENSION_ID}.feedback.rateUs`,
      () => feedbackProvider.controller.rateUs(),
    );
    const disposableFeedbackSupportUs = commands.registerCommand(
      `${EXTENSION_ID}.feedback.supportUs`,
      () => feedbackProvider.controller.supportUs(),
    );

    return [
      disposableFeedbackTreeView,
      disposableFeedbackAboutUs,
      disposableFeedbackReportIssues,
      disposableFeedbackRateUs,
      disposableFeedbackSupportUs,
    ];
  }
}
