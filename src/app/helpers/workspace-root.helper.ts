/**
 * @fileoverview Resolves the effective workspace root path for all file operations
 * in the extension. Acts as the single source of truth for determining where
 * generated files should be placed.
 */

import { type WorkspaceFolder, workspace } from 'vscode';

import { Config } from '../configs';

/**
 * Returns the workspace root path used as the base for all file operations.
 *
 * Resolution order:
 * 1. `config.workspaceSelection` — set from the workspace folder the user selected
 *    via the sidebar (persisted in global state).
 * 2. First VSCode workspace folder — fallback for single-folder workspaces
 *    or when no explicit selection has been made.
 * 3. `undefined` — when no workspace is open.
 *
 * @param config - The extension configuration instance.
 * @returns Absolute filesystem path to the workspace root,
 *   or `undefined` if no workspace is available.
 */
export const getWorkspaceRoot = (config: Config): string | undefined => {
  return (
    config.workspaceSelection ?? workspace.workspaceFolders?.[0]?.uri.fsPath
  );
};

/**
 * Returns the VS Code WorkspaceFolder that matches the persisted selection.
 * Unlike {@link getWorkspaceRoot}, this helper does NOT fall back to the first
 * workspace to avoid silently switching folders without user intent.
 */
export const getSelectedWorkspaceFolder = (
  config: Config,
): WorkspaceFolder | undefined => {
  const selectedWorkspacePath: string | undefined = config.workspaceSelection;
  const workspaceFolders: readonly WorkspaceFolder[] | undefined =
    workspace.workspaceFolders;

  if (!selectedWorkspacePath || !workspaceFolders?.length) {
    return undefined;
  }

  return workspaceFolders.find((folder) => {
    return folder.uri.fsPath === selectedWorkspacePath;
  });
};
