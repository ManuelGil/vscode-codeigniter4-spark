import { l10n, window } from 'vscode';

// Import the Config and helper functions
import { Config } from '../configs';
import { getName, getWorkspaceRoot, pickItem, runCommand } from '../helpers';

/**
 * The TerminalController class.
 *
 * @class
 * @classdesc The class that manages terminal commands for CodeIgniter 4 Spark.
 * @export
 * @public
 * @property {Config} config - The configuration
 * @example
 * const controller = new TerminalController(config);
 */
export class TerminalController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the TerminalController class.
   *
   * @constructor
   * @param {Config} config - The configuration
   * @public
   * @memberof TerminalController
   */
  constructor(private readonly config: Config) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Clear the cache.
   *
   * @function cacheClear
   * @public
   * @memberof TerminalController
   * @example
   * await controller.cacheClear();
   *
   * @returns {Promise<void>} - No return value
   */
  cacheClear() {
    this.runSparkCommand('cache clear', 'php spark cache:clear');
  }

  /**
   * Display the cache info.
   *
   * @function cacheInfo
   * @public
   * @memberof TerminalController
   * @example
   * await controller.cacheInfo();
   *
   * @returns {Promise<void>} - No return value
   */
  cacheInfo() {
    this.runSparkCommand('cache info', 'php spark cache:info');
  }

  /**
   * Create a new database.
   *
   * @function dbCreate
   * @public
   * @memberof TerminalController
   * @example
   * await controller.dbCreate();
   *
   * @returns {Promise<void>} - No return value
   */
  dbCreate() {
    this.runSparkCommand('db create', 'php spark db:create');
  }

  /**
   * Create a new seeder.
   *
   * @function dbSeed
   * @public
   * @memberof TerminalController
   * @example
   * await controller.dbSeed();
   *
   * @returns {Promise<void>} - No return value
   */
  dbSeed() {
    this.runSparkCommand('db seed', 'php spark db:seed');
  }

  /**
   * Create a new table.
   *
   * @function dbTable
   * @public
   * @memberof TerminalController
   * @example
   * await controller.dbTable();
   *
   * @returns {Promise<void>} - No return value
   */
  dbTable() {
    this.runSparkCommand('db table', 'php spark db:table');
  }

  /**
   * Check the filters.
   *
   * @function filterCheck
   * @public
   * @memberof TerminalController
   * @example
   * await controller.filterCheck();
   *
   * @returns {Promise<void>} - No return value
   */
  async filterCheck() {
    const method = await pickItem(
      ['get', 'post', 'path', 'put', 'delete', 'options'],
      'HTTP method',
    );

    if (!method) {
      return;
    }

    const prompt = l10n.t(
      'Enter the route for the {0} method',
      method.toUpperCase(),
    );
    const route = await window.showInputBox({
      prompt,
      placeHolder: 'E.g. /, products/1, users/1/edit...',
    });

    if (!route) {
      return;
    }

    this.runSparkCommand(
      'filter check',
      `php spark filter:check ${method} ${route}`,
    );
  }

  /**
   * Generate a new key.
   *
   * @function key
   * @public
   * @memberof TerminalController
   * @example
   * await controller.key();
   *
   * @returns {Promise<void>} - No return value
   */
  key() {
    this.runSparkCommand('key generate', 'php spark key:generate');
  }

  /**
   * Clear the logs.
   *
   * @function logsClear
   * @public
   * @memberof TerminalController
   * @example
   * await controller.logsClear();
   *
   * @returns {Promise<void>} - No return value
   */
  logsClear() {
    this.runSparkCommand('logs clear', 'php spark logs:clear');
  }

  /**
   * Execute the migrations.
   *
   * @function migrate
   * @public
   * @memberof TerminalController
   * @example
   * await controller.migrate();
   *
   * @returns {Promise<void>} - No return value
   */
  async migrate() {
    this.runSparkCommand('migrate', 'php spark migrate');
  }

  /**
   * Refresh the migrations.
   *
   * @function migrateRefresh
   * @public
   * @memberof TerminalController
   * @example
   * await controller.migrateRefresh();
   *
   * @returns {Promise<void>} - No return value
   */
  migrateRefresh() {
    this.runSparkCommand('migrate refresh', 'php spark migrate:refresh');
  }

  /**
   * Rollback the migrations.
   *
   * @function migrateRollback
   * @public
   * @memberof TerminalController
   * @example
   * await controller.migrateRollback();
   *
   * @returns {Promise<void>} - No return value
   */
  migrateRollback() {
    this.runSparkCommand('migrate rollback', 'php spark migrate:rollback');
  }

  /**
   * Show the migration status.
   *
   * @function migrateStatus
   * @public
   * @memberof TerminalController
   * @example
   * await controller.migrateStatus();
   *
   * @returns {Promise<void>} - No return value
   */
  migrateStatus() {
    this.runSparkCommand('migrate status', 'php spark migrate:status');
  }

  /**
   * Verify the namespace.
   *
   * @function namespaces
   * @public
   * @memberof TerminalController
   * @example
   * await controller.namespaces();
   *
   * @returns {Promise<void>} - No return value
   */
  namespaces() {
    this.runSparkCommand('namespaces', 'php spark namespaces');
  }

  /**
   * Optimize the application.
   *
   * @function optimize
   * @public
   * @memberof TerminalController
   * @example
   * await controller.optimize();
   *
   * @returns {Promise<void>} - No return value
   */
  optimize() {
    this.runSparkCommand('optimize', 'php spark optimize');
  }

  /**
   * Check the PHP configuration.
   *
   * @function iniCheck
   * @public
   * @memberof TerminalController
   * @example
   * await controller.iniCheck();
   *
   * @returns {Promise<void>} - No return value
   */
  iniCheck() {
    this.runSparkCommand('ini check', 'php spark phpini:check');
  }

  /**
   * List the routes.
   *
   * @function routes
   * @public
   * @memberof TerminalController
   * @example
   * await controller.routes();
   *
   * @returns {Promise<void>} - No return value
   */
  routes() {
    this.runSparkCommand('routes', 'php spark routes');
  }

  /**
   * Run the server.
   *
   * @function serve
   * @public
   * @memberof TerminalController
   * @example
   * await controller.serve();
   *
   * @returns {Promise<void>} - No return value
   */
  async serve() {
    const items = [
      {
        label: 'Host',
        description: '--host',
        detail: 'Start the server on a specific host',
      },
      {
        label: 'Port',
        description: '--port',
        detail: 'Start the server on a specific port',
      },
    ];

    let options: any = [];
    let extras: any = [];

    const placeHolder = l10n.t(
      'Select the options for the server command (optional)',
    );
    options = await window.showQuickPick(items, {
      placeHolder,
      canPickMany: true,
    });

    if (options.find((item: any) => item.description === '--host')) {
      const prompt = l10n.t('Enter the host for the server command');
      const host = await getName(prompt, 'E.g. localhost', (host: string) => {
        if (!host) {
          return 'The host is required';
        }
        return;
      });

      if (host) {
        extras.push(`--host ${host}`);
      }
    }

    if (options.find((item: any) => item.description === '--port')) {
      const prompt = l10n.t('Enter the port for the server command');
      const port = await getName(prompt, 'E.g. 8080', (port: string) => {
        if (!port) {
          return 'The port is required';
        }
        return;
      });

      if (port) {
        extras.push(`--port ${port}`);
      }
    }

    this.runSparkCommand('server', `php spark serve ${extras.join(' ')}`);
  }

  // -----------------------------------------------------------------
  // Private methods
  // -----------------------------------------------------------------

  /**
   * Ensures Spark commands run inside the selected workspace folder.
   */
  private runSparkCommand(_title: string, command: string): void {
    const workspaceRoot = getWorkspaceRoot(this.config);
    void runCommand(command, workspaceRoot);
  }
}
