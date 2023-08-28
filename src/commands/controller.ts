import save from './functions';

let content = `<?php

namespace App\\Controllers;

use App\\Controllers\\BaseController;

class {className} extends BaseController
{
    public function index()
    {
        //
    }
}

`;

let value: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const controller = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Controller class name',
    placeHolder: 'Controller class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Controllers/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default controller;
