import { execute } from './functions';

let show: string = '';

const cacheClear = async (vscode: any) => {
  show = await vscode.window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Show in terminal?',
  });

  if (show.length === 0) {
    return;
  }

  execute(vscode, 'cache clear', 'php spark cache:clear', show === 'Yes');
};

const cacheInfo = async (vscode: any) => {
  execute(vscode, 'cache info', 'php spark cache:info', true);
};

export { cacheClear, cacheInfo };
