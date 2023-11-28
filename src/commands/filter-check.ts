import { execute } from './functions';

let method: string = '';
let route: string = '';

const filterCheck = async (vscode: any) => {
  method = await vscode.window.showQuickPick(['get', 'post', 'path', 'put', 'delete', 'options'], {
    placeHolder: 'HTTP method',
  });

  if (method.length === 0) {
    return;
  }

  route = await vscode.window.showInputBox({
    prompt: 'route',
    placeHolder: 'E.g. /, products/1, users/1/edit...',
  });

  if (route.length === 0) {
    return;
  }

  execute(vscode, 'filter check', `php spark filter:check ${method} ${route}`, true);
};

export default filterCheck;
