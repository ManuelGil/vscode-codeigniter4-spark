import PromisePool from '@supercharge/promise-pool';
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

  /**
   * Indicates whether the provider has been disposed.
   * @type {boolean}
   * @private
   * @memberof ListRoutesProvider
   * @example
   * this._isDisposed = false;
   */
  private _isDisposed = false;

  /**
   * The cached nodes.
   * @type {NodeModel[] | undefined}
   * @private
   * @memberof ListRoutesProvider
   * @example
   * this._cachedNodes = undefined;
   */
  private _cachedNodes: NodeModel[] | undefined = undefined;

  /**
   * The cache promise.
   * @type {Promise<NodeModel[] | undefined> | undefined}
   * @private
   * @memberof ListRoutesProvider
   * @example
   * this._cachePromise = undefined;
   */
  private _cachePromise: Promise<NodeModel[] | undefined> | undefined =
    undefined;

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

    if (this._cachedNodes) {
      return this._cachedNodes;
    }

    if (this._cachePromise) {
      return this._cachePromise;
    }

    this._cachePromise = this.getListRoutes().then((nodes) => {
      this._cachedNodes = nodes;
      this._cachePromise = undefined;
      return nodes;
    });

    return this._cachePromise;
  }

  /**
   * Refreshes the tree data by firing the event.
   *
   * @function refresh
   * @public
   * @memberof ListRoutesProvider
   * @example
   * provider.refresh();
   *
   * @returns {void} - No return value
   */
  refresh(): void {
    this._cachedNodes = undefined;
    this._cachePromise = undefined;
    this._onDidChangeTreeData.fire();
  }

  /**
   * Disposes the provider.
   *
   * @function dispose
   * @public
   * @memberof ListRoutesProvider
   * @example
   * provider.dispose();
   *
   * @returns {void} - No return value
   */
  dispose(): void {
    this._onDidChangeTreeData.dispose();
    if (this._isDisposed) {
      return;
    }

    this._isDisposed = true;

    if (this._onDidChangeTreeData) {
      this._onDidChangeTreeData.dispose();
    }
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
   * @returns {Promise<NodeModel[]>} - The list of files
   */
  private async getListRoutes(): Promise<NodeModel[]> {
    const files = await ListFilesController.getFiles();

    if (!files) {
      return [];
    }

    const routeFiles = files.filter((file) =>
      file.label.toString().toLowerCase().includes('routes'),
    );

    if (routeFiles.length === 0) {
      return [];
    }

    const { results } = await PromisePool.for(routeFiles)
      .withConcurrency(3)
      .process(async (file) => {
        if (!file.resourceUri) {
          return undefined;
        }

        const document = await workspace.openTextDocument(file.resourceUri);
        const rawEntries: Array<{ node?: NodeModel; type?: string }> = [];

        for (let i = 0; i < document.lineCount; i++) {
          const text = document.lineAt(i).text;

          const routeMatch = text.match(
            />\s*(match|head|options|get|post|patch|put|delete|cli)\(/,
          );

          if (routeMatch) {
            const [, method] = routeMatch;
            const parts = text
              .trim()
              .replace(
                /\$routes->(match|head|options|get|post|patch|put|delete|cli)\(/,
                '',
              )
              .split(',');
            const routePath =
              parts[1]?.replace(/[';\)]+/g, '').replace(/::/g, ' → ') || '';

            const node = new NodeModel(
              routePath,
              new ThemeIcon('symbol-method'),
              {
                command: `${EXTENSION_ID}.list.gotoLine`,
                title: text.trim(),
                arguments: [file.resourceUri, i],
              },
            );
            rawEntries.push({ node, type: method });
            continue;
          }

          const typeMatch = text.match(
            /\b(match|head|options|get|post|patch|put|delete|cli)\b/,
          );

          if (typeMatch) {
            rawEntries.push({ type: typeMatch[0] });
          }
        }

        const httpMethods = [
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

        const grouped = httpMethods
          .map((method) => this.createNodeModel(method, rawEntries))
          .filter((group) => group.children?.length);

        file.setChildren(grouped);

        return grouped.length ? file : undefined;
      });

    return results.filter((file): file is NodeModel => file !== undefined);
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
