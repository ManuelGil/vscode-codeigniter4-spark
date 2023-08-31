import { execute } from './functions';

let show: string = '';

const serve = async (vscode: any) => {
  show = await vscode.window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Show in terminal?',
  });

  if (show.length === 0) {
    return;
  }

  execute(vscode, 'server', 'php spark serve', show === 'Yes');
};

export default serve;
