import * as vscode from 'vscode';

import {
  Config,
  EXTENSION_ID,
  EXTENSION_NAME,
  EXTENSION_REPOSITORY_URL,
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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.WorkspaceFolder | undefined;

  // Check if there are workspace folders
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    const message = vscode.l10n.t(
      'No workspace folders are open. Please open a workspace folder to use this extension',
    );
    vscode.window.showErrorMessage(message);
    return;
  }

  // Optionally, prompt the user to select a workspace folder if multiple are available
  if (vscode.workspace.workspaceFolders.length === 1) {
    resource = vscode.workspace.workspaceFolders[0];
  } else {
    const placeHolder = vscode.l10n.t(
      'Select a workspace folder to use. This folder will be used to load workspace-specific configuration for the extension',
    );
    const selectedFolder = await vscode.window.showWorkspaceFolderPick({
      placeHolder,
    });

    resource = selectedFolder;
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new Config(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource?.uri),
  );

  // Watch for changes in the configuration
  vscode.workspace.onDidChangeConfiguration((event) => {
    const workspaceConfig = vscode.workspace.getConfiguration(
      EXTENSION_ID,
      resource?.uri,
    );

    if (event.affectsConfiguration(`${EXTENSION_ID}.enable`, resource?.uri)) {
      const isEnabled = workspaceConfig.get<boolean>('enable');

      config.update(workspaceConfig);

      if (isEnabled) {
        const message = vscode.l10n.t('{0} is now enabled and ready to use', [
          EXTENSION_NAME,
        ]);
        vscode.window.showInformationMessage(message);
      } else {
        const message = vscode.l10n.t('{0} is now disabled', [EXTENSION_NAME]);
        vscode.window.showInformationMessage(message);
      }
    }

    if (event.affectsConfiguration(EXTENSION_ID, resource?.uri)) {
      config.update(workspaceConfig);
    }
  });

  // -----------------------------------------------------------------
  // Get version of the extension
  // -----------------------------------------------------------------

  // Get the previous version of the extension
  const previousVersion = context.globalState.get('version');
  // Get the current version of the extension
  const currentVersion = context.extension.packageJSON.version;

  // Check if the extension is running for the first time
  if (!previousVersion) {
    const message = vscode.l10n.t(
      'Welcome to {0} version {1}! The extension is now active',
      [EXTENSION_NAME, currentVersion],
    );
    vscode.window.showInformationMessage(message);

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // Check if the extension has been updated
  if (previousVersion && previousVersion !== currentVersion) {
    const actions: vscode.MessageItem[] = [
      {
        title: vscode.l10n.t('Release Notes'),
      },
      {
        title: vscode.l10n.t('Close'),
      },
    ];

    const message = vscode.l10n.t(
      'New version of {0} is available. Check out the release notes for version {1}',
      [EXTENSION_NAME, currentVersion],
    );
    vscode.window.showInformationMessage(message, ...actions).then((option) => {
      if (!option) {
        return;
      }

      // Handle the actions
      switch (option?.title) {
        case actions[0].title:
          vscode.env.openExternal(
            vscode.Uri.parse(
              `${EXTENSION_REPOSITORY_URL}/blob/main/CHANGELOG.md`,
            ),
          );
          break;

        default:
          break;
      }
    });

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // -----------------------------------------------------------------
  // Register FileController and commands
  // -----------------------------------------------------------------

  // Create a new FileController
  const fileController = new FileController(config);

  const disposableFileCommand = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.command`,
    (args) => {
      fileController.newCommand(args);
    },
  );
  const disposableFileConfig = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.config`,
    (args) => {
      fileController.newConfig(args);
    },
  );
  const disposableFileController = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.controller`,
    (args) => {
      fileController.newController(args);
    },
  );
  const disposableFileEntity = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.entity`,
    (args) => {
      fileController.newEntity(args);
    },
  );
  const disposableFileFilter = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.filter`,
    (args) => {
      fileController.newFilter(args);
    },
  );
  const disposableFileHelper = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.helper`,
    (args) => {
      fileController.newHelper(args);
    },
  );
  const disposableFileLanguage = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.language`,
    (args) => {
      fileController.newLanguage(args);
    },
  );
  const disposableFileMigration = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.migration`,
    (args) => {
      fileController.newMigration(args);
    },
  );
  const disposableFileModel = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.model`,
    (args) => {
      fileController.newModel(args);
    },
  );
  const disposableFileResource = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.resource`,
    (args) => {
      fileController.newResource(args);
    },
  );
  const disposableFileSeeder = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.seeder`,
    (args) => {
      fileController.newSeeder(args);
    },
  );
  const disposableFileValidation = vscode.commands.registerCommand(
    `${EXTENSION_ID}.file.validation`,
    (args) => {
      fileController.newValidation(args);
    },
  );

  // -----------------------------------------------------------------
  // Register TerminalController and commands
  // -----------------------------------------------------------------

  // Create a new TerminalController
  const terminalController = new TerminalController(config);

  const disposableTerminalCacheClear = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.clear`,
    () => {
      terminalController.cacheClear();
    },
  );
  const disposableTerminalCacheInfo = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.cache.info`,
    () => {
      terminalController.cacheInfo();
    },
  );
  const disposableTerminalDbCreate = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.db.create`,
    () => {
      terminalController.dbCreate();
    },
  );
  const disposableTerminalDbSeed = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.db.seed`,
    () => {
      terminalController.dbSeed();
    },
  );
  const disposableTerminalDbTable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.db.table`,
    () => {
      terminalController.dbTable();
    },
  );
  const disposableTerminalFilterCheck = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.filter.check`,
    () => {
      terminalController.filterCheck();
    },
  );
  const disposableTerminalKey = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.key`,
    () => {
      terminalController.key();
    },
  );
  const disposableTerminalLogsClear = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.logs.clear`,
    () => {
      terminalController.logsClear();
    },
  );
  const disposableTerminalMigrate = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.migrate`,
    () => {
      terminalController.migrate();
    },
  );
  const disposableTerminalMigrateRefresh = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.migrate.refresh`,
    () => {
      terminalController.migrateRefresh();
    },
  );
  const disposableTerminalMigrateRollback = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.migrate.rollback`,
    () => {
      terminalController.migrateRollback();
    },
  );
  const disposableTerminalMigrateStatus = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.migrate.status`,
    () => {
      terminalController.migrateStatus();
    },
  );
  const disposableTerminalNamespaces = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.namespaces`,
    () => {
      terminalController.namespaces();
    },
  );
  const disposableTerminalOptimize = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.optimize`,
    () => {
      terminalController.optimize();
    },
  );
  const disposableTerminalIniCheck = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.iniCheck`,
    () => {
      terminalController.iniCheck();
    },
  );
  const disposableTerminalRoutes = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.routes`,
    () => {
      terminalController.routes();
    },
  );
  const disposableTerminalServe = vscode.commands.registerCommand(
    `${EXTENSION_ID}.terminal.serve`,
    () => {
      terminalController.serve();
    },
  );

  // -----------------------------------------------------------------
  // Register ListFilesController
  // -----------------------------------------------------------------

  // Create a new ListFilesController
  const listFilesController = new ListFilesController(config);

  const disposableListOpenFile = vscode.commands.registerCommand(
    `${EXTENSION_ID}.list.openFile`,
    (uri) => listFilesController.openFile(uri),
  );

  const disposableListGotoLine = vscode.commands.registerCommand(
    `${EXTENSION_ID}.list.gotoLine`,
    (uri, line) => listFilesController.gotoLine(uri, line),
  );

  // -----------------------------------------------------------------
  // Register ListFilesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListFilesProvider
  const listFilesProvider = new ListFilesProvider();

  // Register the list provider
  const disposableListFilesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listFilesView`,
    {
      treeDataProvider: listFilesProvider,
      showCollapseAll: true,
    },
  );

  const disposableRefreshListFiles = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listFiles.refreshList`,
    () => listFilesProvider.refresh(),
  );

  // -----------------------------------------------------------------
  // Register ListRoutesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListRoutesProvider
  const listRoutesProvider = new ListRoutesProvider();

  // Register the list provider
  const disposableListRoutesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listRoutesView`,
    {
      treeDataProvider: listRoutesProvider,
      showCollapseAll: true,
    },
  );

  const disposableRefreshListRoutes = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listRoutes.refreshList`,
    () => listRoutesProvider.refresh(),
  );

  // -----------------------------------------------------------------
  // Register ListFilesProvider events
  // -----------------------------------------------------------------

  vscode.workspace.onDidCreateFiles(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidSaveTextDocument(() => {
    listFilesProvider.refresh();
  });

  // -----------------------------------------------------------------
  // Register FeedbackProvider and Feedback commands
  // -----------------------------------------------------------------

  // Create a new FeedbackProvider
  const feedbackProvider = new FeedbackProvider(new FeedbackController());

  // Register the feedback provider
  const disposableFeedbackTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.feedbackView`,
    {
      treeDataProvider: feedbackProvider,
    },
  );

  // Register the commands
  const disposableFeedbackAboutUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.aboutUs`,
    () => feedbackProvider.controller.aboutUs(),
  );
  const disposableFeedbackReportIssues = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.reportIssues`,
    () => feedbackProvider.controller.reportIssues(),
  );
  const disposableFeedbackRateUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.rateUs`,
    () => feedbackProvider.controller.rateUs(),
  );
  const disposableFeedbackSupportUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.supportUs`,
    () => feedbackProvider.controller.supportUs(),
  );

  context.subscriptions.push(
    disposableFileCommand,
    disposableFileConfig,
    disposableFileController,
    disposableFileEntity,
    disposableFileFilter,
    disposableFileHelper,
    disposableFileLanguage,
    disposableFileMigration,
    disposableFileModel,
    disposableFileResource,
    disposableFileSeeder,
    disposableFileValidation,
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
    disposableListOpenFile,
    disposableListGotoLine,
    disposableListFilesTreeView,
    disposableRefreshListFiles,
    disposableListRoutesTreeView,
    disposableRefreshListRoutes,
    disposableFeedbackTreeView,
    disposableFeedbackAboutUs,
    disposableFeedbackReportIssues,
    disposableFeedbackRateUs,
    disposableFeedbackSupportUs,
  );
}

export function deactivate() {}
