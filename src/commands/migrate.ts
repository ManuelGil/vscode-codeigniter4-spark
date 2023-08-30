const migrate = async (vscode: any) => {
  const terminal = vscode.window.createTerminal({ hideFromUser: true });
  terminal.sendText('php spark migrate');
};

const migrateRefresh = async (vscode: any) => {
  const terminal = vscode.window.createTerminal({ hideFromUser: true });
  terminal.sendText('php spark migrate:refresh');
};

const migrateRollback = async (vscode: any) => {
  const terminal = vscode.window.createTerminal({ hideFromUser: true });
  terminal.sendText('php spark migrate:rollback');
};

export { migrate, migrateRefresh, migrateRollback };
