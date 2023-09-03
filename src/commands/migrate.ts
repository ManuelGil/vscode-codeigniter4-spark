import { execute } from './functions';

let show: string = '';

const migrate = async (vscode: any) => {
  show = await vscode.window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Show in terminal?',
  });

  if (show.length === 0) {
    return;
  }

  execute(vscode, 'migrate', 'php spark migrate', show === 'Yes');
};

const migrateRefresh = async (vscode: any) => {
  execute(vscode, 'migrate refresh', 'php spark migrate:refresh', true);
};

const migrateRollback = async (vscode: any) => {
  execute(vscode, 'migrate rollback', 'php spark migrate:rollback', true);
};

const migrateStatus = async (vscode: any) => {
  execute(vscode, 'migrate status', 'php spark migrate:status', true);
};

export { migrate, migrateRefresh, migrateRollback, migrateStatus };
