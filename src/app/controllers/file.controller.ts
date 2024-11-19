import { l10n, Uri } from "vscode";

// Import the Config and helper functions
import { Config } from "../configs";
import {
  getName,
  getPath,
  getRelativePath,
  pluralize,
  saveFile,
  underscore,
} from "../helpers";

/**
 * The FileController class.
 *
 * @class
 * @classdesc The class that represents the example controller.
 * @export
 * @public
 * @property {Config} config - The configuration
 * @example
 * const controller = new FileController(config);
 */
export class FileController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FileController class.
   *
   * @constructor
   * @param {Config} config - The configuration
   * @public
   * @memberof FileController
   */
  constructor(private readonly config: Config) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Creates a new command.
   *
   * @function newCommand
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newCommand();
   *
   * @returns {Promise<void>} - No return value
   */
  async newCommand(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Commands";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Commands...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the command class name"),
      "E.g. CustomCommand, CliCommand...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const content = `<?php

namespace App\\Commands;

use CodeIgniter\\CLI\\BaseCommand;
use CodeIgniter\\CLI\\CLI;

class ${className} extends BaseCommand
{
    /**
     * The Command's Group
     *
     * @var string
     */
    protected $group = 'CodeIgniter';

    /**
     * The Command's Name
     *
     * @var string
     */
    protected $name = 'command:name';

    /**
     * The Command's Description
     *
     * @var string
     */
    protected $description = '';

    /**
     * The Command's Usage
     *
     * @var string
     */
    protected $usage = 'command:name [arguments] [options]';

    /**
     * The Command's Arguments
     *
     * @var array
     */
    protected $arguments = [];

    /**
     * The Command's Options
     *
     * @var array
     */
    protected $options = [];

    /**
     * Actually execute a command.
     *
     * @param array $params
     */
    public function run(array $params)
    {
        //
    }
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new config.
   *
   * @function newConfig
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newConfig();
   *
   * @returns {Promise<void>} - No return value
   */
  async newConfig(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Config";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Config...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the config class name"),
      "E.g. CustomConfig, UserConfig...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const content = `<?php

namespace Config;

use CodeIgniter\\Config\\BaseConfig;

class ${className} extends BaseConfig
{
    public function index()
    {
        //
    }
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new controller.
   *
   * @function newController
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newController();
   *
   * @returns {Promise<void>} - No return value
   */
  async newController(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Controllers";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Controllers...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the controller class name"),
      "E.g. CustomController, UserController...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const content = `<?php`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new entity.
   *
   * @function newEntity
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newEntity();
   *
   * @returns {Promise<void>} - No return value
   */
  async newEntity(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Entities";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Entities...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the entity class name"),
      "E.g. CustomEntity, UserEntity...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const content = `<?php

namespace App\\Entities;

use CodeIgniter\\Entity\\Entity;

class ${className} extends Entity
{
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [];
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new filter.
   *
   * @function newFilter
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newFilter();
   *
   * @returns {Promise<void>} - No return value
   */
  async newFilter(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Filters";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Filters...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the filter class name"),
      "E.g. CustomFilter, UserFilter...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const content = `<?php

namespace App\\Filters;

use CodeIgniter\\Filters\\FilterInterface;
use CodeIgniter\\HTTP\\RequestInterface;
use CodeIgniter\\HTTP\\ResponseInterface;

class ${className} implements FilterInterface
{
    /**
     * Do whatever processing this filter needs to do.
     * By default it should not return anything during
     * normal execution. However, when an abnormal state
     * is found, it should return an instance of
     * CodeIgniter\\HTTP\\Response. If it does, script
     * execution will end and that Response will be
     * sent back to the client, allowing for error pages,
     * redirects, etc.
     *
     * @param RequestInterface $request
     * @param array|null       $arguments
     *
     * @return mixed
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        //
    }

    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return mixed
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new helper.
   *
   * @function newHelper
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newHelper();
   *
   * @returns {Promise<void>} - No return value
   */
  async newHelper(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Helpers";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Helpers...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const name = await getName(
      l10n.t("Enter the helper name"),
      "E.g. custom, user...",
      (name: string) => {
        if (!/^[a-z][a-z_]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!name) {
      return;
    }

    const content = `<?php

function custom_function()
{
    //
}
`;

    const filename = `${name}_helper.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new language.
   *
   * @function newLanguage
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newLanguage();
   *
   * @returns {Promise<void>} - No return value
   */
  async newLanguage(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Language";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Name without path delimeter. E.g. app/Language/en, app/Language/fr-CA, app/Language/zh-cn...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const name = await getName(
      l10n.t("Enter the language file name without extension"),
      "Name without extension. E.g. Validation, Profile...",
      (name: string) => {
        if (!/^[A-Za-z]{3,}$/.test(name)) {
          return "Invalid format! 3 or more characters (only letters).";
        }
        return;
      }
    );

    if (!name) {
      return;
    }

    const content = `<?php

return [
    //
];
`;

    const filename = `${name}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new migration.
   *
   * @function newMigration
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newMigration();
   *
   * @returns {Promise<void>} - No return value
   */
  async newMigration(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Database/Migrations";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Database/Migrations...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const name = await getName(
      l10n.t("Enter the migration class name"),
      "E.g. CustomMigration, UserMigration...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!name) {
      return;
    }

    const content = `<?php

namespace App\\Database\\Migrations;

use CodeIgniter\\Database\\Migration;

class ${name} extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('table_name');
    }

    public function down()
    {
        $this->forge->dropTable('table_name');
    }
}
`;

    const date = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    } as Intl.DateTimeFormatOptions;
    const format = date
      .toLocaleDateString("en-CA", options)
      .replace(/[\/,]/g, "-")
      .replace(/[\s:]/g, "");

    const filename = `${format}_${name}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new model.
   *
   * @function newModel
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newModel();
   *
   * @returns {Promise<void>} - No return value
   */
  async newModel(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Models";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Models...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the model class name"),
      "E.g. CustomModel, UserModel...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const tableName = pluralize(underscore(className.replace("Model", "")));

    const content = `<?php

namespace App\\Models;

use CodeIgniter\\Model;

class ${className} extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = '${tableName}';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new resource.
   *
   * @function newResource
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newResource();
   *
   * @returns {Promise<void>} - No return value
   */
  async newResource(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Controllers";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Controllers...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the resource class name"),
      "E.g. CustomResource, UserResource...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const modelName = await getName(
      l10n.t("Enter the model class name"),
      "E.g. CustomModel, UserModel...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!modelName) {
      return;
    }

    const content = `<?php

namespace App\\Controllers;

use CodeIgniter\\RESTful\\ResourceController;

class ${className} extends ResourceController
{

    protected $modelName = 'App\\Models\\${modelName}';
    protected $format    = 'json';

    public function index()
    {
        //
    }

    public function show($id = null)
    {
        //
    }

    public function new()
    {
        //
    }

    public function create()
    {
        //
    }

    public function edit($id = null)
    {
        //
    }

    public function update($id = null)
    {
        //
    }

    public function delete($id = null)
    {
        //
    }
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new seeder.
   *
   * @function newSeeder
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newSeeder();
   *
   * @returns {Promise<void>} - No return value
   */
  async newSeeder(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Database/Seeds";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Database/Seeds...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the seeder class name"),
      "E.g. CustomSeeder, UserSeeder...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const content = `<?php

namespace App\\Database\\Seeds;

use CodeIgniter\\Database\\Seeder;

class ${className} extends Seeder
{
    public function run()
    {
        $data = [];

        $this->db->table('table_name')->insertBatch($data);
    }
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new validation.
   *
   * @function newValidation
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * await controller.newValidation();
   *
   * @returns {Promise<void>} - No return value
   */
  async newValidation(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path
      ? await getRelativePath(path.path)
      : "app/Validation";

    // Get the path to the folder
    const folder = await getPath(
      l10n.t("Enter the folder name"),
      "Folder name. E.g. app, app/Validation...",
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
          return "The folder name must be a valid name";
        }
        return;
      }
    );

    if (!folder) {
      return;
    }

    const className = await getName(
      l10n.t("Enter the validation class name"),
      "E.g. CustomValidation, User/Validation...",
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return "Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).";
        }
        return;
      }
    );

    if (!className) {
      return;
    }

    const content = `<?php

namespace App\\Validation;

class ${className}
{
    public function custom_rule(string $string, string $fields, array $data): bool
    {
        return true;
    }
}
`;

    const filename = `${className}.php`;

    saveFile(folder, filename, content);
  }
}
