import {
  Event,
  EventEmitter,
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
  workspace,
} from 'vscode';

import { EXTENSION_ID } from '../configs';
import { ListFilesController } from '../controllers';
import { NodeModel } from '../models';

/**
 * The ListRoutesProvider class
 *
 * @class
 * @classdesc The class that represents the list of files provider.
 * @export
 * @public
 * @implements {TreeDataProvider<NodeModel>}
 * @property {EventEmitter<NodeModel | undefined | null | void>} _onDidChangeTreeData - The onDidChangeTreeData event emitter
 * @property {Event<NodeModel | undefined | null | void>} onDidChangeTreeData - The onDidChangeTreeData event
 * @property {ListFilesController} controller - The list of files controller
 * @example
 * const provider = new ListRoutesProvider();
 *
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
 */
export class ListRoutesProvider implements TreeDataProvider<NodeModel> {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties
  /**
   * The onDidChangeTreeData event.
   * @type {Event<NodeModel | undefined | null | void>}
   * @public
   * @memberof ListRoutesProvider
   * @example
   * readonly onDidChangeTreeData: Event<Node | undefined | null | void>;
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#Event
   */
  readonly onDidChangeTreeData: Event<NodeModel | undefined | null | void>;

  // Private properties
  /**
   * The onDidChangeTreeData event emitter.
   * @type {EventEmitter<NodeModel | undefined | null | void>}
   * @private
   * @memberof ListRoutesProvider
   * @example
   * this._onDidChangeTreeData = new EventEmitter<Node | undefined | null | void>();
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#EventEmitter
   */
  private _onDidChangeTreeData: EventEmitter<
    NodeModel | undefined | null | void
  >;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ListRoutesProvider class
   *
   * @constructor
   * @public
   * @memberof ListRoutesProvider
   */
  constructor() {
    this._onDidChangeTreeData = new EventEmitter<
      NodeModel | undefined | null | void
    >();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Returns the tree item for the supplied element.
   *
   * @function getTreeItem
   * @param {NodeModel} element - The element
   * @public
   * @memberof ListRoutesProvider
   * @example
   * const treeItem = provider.getTreeItem(element);
   *
   * @returns {TreeItem | Thenable<TreeItem>} - The tree item
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getTreeItem(element: NodeModel): TreeItem | Thenable<TreeItem> {
    return element;
  }

  /**
   * Returns the children for the supplied element.
   *
   * @function getChildren
   * @param {NodeModel} [element] - The element
   * @public
   * @memberof ListRoutesProvider
   * @example
   * const children = provider.getChildren(element);
   *
   * @returns {ProviderResult<NodeModel[]>} - The children
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getChildren(element?: NodeModel): ProviderResult<NodeModel[]> {
    if (element) {
      return element.children;
    }

    return this.getListRoutes();
  }

  /**
   * Refreshes the tree data.
   *
   * @function refresh
   * @public
   * @memberof FeedbackProvider
   * @example
   * provider.refresh();
   *
   * @returns {void} - No return value
   */
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  // Private methods
  /**
   * Returns the list of files.
   *
   * @function getListRoutes
   * @private
   * @memberof ListRoutesProvider
   * @example
   * const files = provider.getListRoutes();
   *
   * @returns {Promise<NodeModel[] | undefined>} - The list of files
   */
  private async getListRoutes(): Promise<NodeModel[] | undefined> {
    const files = await ListFilesController.getFiles();

    if (!files) {
      return;
    }

    // List of Modules
    const nodes = files.filter((file) =>
      file.label.toString().toLowerCase().includes('routes'),
    );

    for (const file of nodes) {
      const document = await workspace.openTextDocument(
        file.resourceUri?.path ?? '',
      );

      const children = Array.from(
        { length: document.lineCount },
        (_, index) => {
          const line = document.lineAt(index);

          let node: NodeModel | undefined;
          let type: string | undefined;

          if (
            line.text.match(
              />(match|head|options|get|post|patch|put|delete|cli)\(/g,
            )
          ) {
            const route = line.text
              .trim()
              .replace(
                /\$routes\->(match|head|options|get|post|patch|put|delete|cli)\(/g,
                '',
              )
              .split(',');

            node = new NodeModel(
              route[1].replace(/[';\)]+/g, '').replace(/::/g, ' -> '),
              new ThemeIcon('symbol-method'),
              {
                command: `${EXTENSION_ID}.list.gotoLine`,
                title: line.text,
                arguments: [file.resourceUri, index],
              },
            );
          }

          if (
            line.text.match(
              /(match|head|options|get|post|patch|put|delete|cli)/g,
            )
          ) {
            type = line.text.match(
              /(match|head|options|get|post|patch|put|delete|cli)/g,
            )?.[0];
          }

          return { node, type };
        },
      );

      if (children.length === 0) {
        continue;
      }

      const nodeTypes = [
        'options',
        'get',
        'post',
        'patch',
        'put',
        'delete',
        'head',
        'match',
        'cli',
      ];

      const nodes = nodeTypes.map((type) =>
        this.createNodeModel(type, children),
      );

      file.setChildren(nodes.filter((node) => node.children?.length));
    }

    return nodes.filter((file) => file.children?.length);
  }

  /**
   * Returns the node model.
   *
   * @function createNodeModel
   * @param {string} type - The type
   * @param {any[]} children - The children
   * @private
   * @memberof ListRoutesProvider
   * @example
   * const nodeModel = provider.createNodeModel(type, children);
   *
   * @returns {NodeModel} - The node model
   */
  private createNodeModel(type: string, children: any[]): NodeModel {
    const filteredChildren = children
      .filter((child) => child.type === type)
      .map((child) => child.node) as NodeModel[];

    return new NodeModel(
      `${type.charAt(0).toUpperCase() + type.slice(1)}: ${
        filteredChildren.length
      }`,
      new ThemeIcon('symbol-folder'),
      undefined,
      undefined,
      type,
      filteredChildren.sort((a, b) =>
        a.label.toString().localeCompare(b.label.toString()),
      ),
    );
  }
}
