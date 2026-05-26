// The module 'vscode' contains the VSCode extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { ExtensionRuntime } from './extension.runtime';

let runtime: ExtensionRuntime | undefined;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  runtime = new ExtensionRuntime(context);

  try {
    const initialized = await runtime.initialize();

    if (!initialized) {
      return;
    }

    await runtime.start();
  } catch (error) {
    runtime = undefined;
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Failed to activate extension: ${errorMessage}`);
    vscode.window.showErrorMessage(
      vscode.l10n.t('Failed to activate the extension: {0}', errorMessage),
    );
  }
}

export function deactivate() {}
