import { basename } from 'path';

import { Terminal, TerminalOptions, window } from 'vscode';

const DEFAULT_TERMINAL_NAME = 'CodeIgniter Spark';
const DEFAULT_TERMINAL_KEY = '__spark-default__';
const terminalRegistry = new Map<string, Terminal>();
let hasRegisteredCloseListener = false;

const getTerminalKey = (workingDirectory?: string): string => {
  return workingDirectory ? `spark:${workingDirectory}` : DEFAULT_TERMINAL_KEY;
};

const getTerminalName = (workingDirectory?: string): string => {
  if (!workingDirectory) {
    return DEFAULT_TERMINAL_NAME;
  }

  const workspaceLabel = basename(workingDirectory);
  return `${DEFAULT_TERMINAL_NAME} (${workspaceLabel})`;
};

const getOrCreateTerminal = (
  key: string,
  options: TerminalOptions,
): Terminal => {
  const existingTerminal = terminalRegistry.get(key);

  if (existingTerminal && existingTerminal.exitStatus === undefined) {
    return existingTerminal;
  }

  const terminal = window.createTerminal(options);
  terminalRegistry.set(key, terminal);

  return terminal;
};

const registerCloseListener = (): void => {
  if (hasRegisteredCloseListener) {
    return;
  }

  window.onDidCloseTerminal((closedTerminal) => {
    for (const [key, terminal] of terminalRegistry.entries()) {
      if (terminal === closedTerminal) {
        terminalRegistry.delete(key);
        break;
      }
    }
  });

  hasRegisteredCloseListener = true;
};

/**
 * Runs a command in the terminal
 *
 * @param {string} command - Command to run
 * @param {string | undefined} workingDirectory - Optional working directory for the terminal
 * @example
 * runCommand('echo "Hello, World!"', '/path/to/project');
 *
 * @returns {Promise<void>} - No return value
 */
export const runCommand = async (
  command: string,
  workingDirectory?: string,
): Promise<void> => {
  registerCloseListener();

  const terminalKey = getTerminalKey(workingDirectory);
  const terminalOptions: TerminalOptions = {
    name: getTerminalName(workingDirectory),
    cwd: workingDirectory,
  };

  const terminal = getOrCreateTerminal(terminalKey, terminalOptions);
  terminal.show();
  terminal.sendText(command);
};
