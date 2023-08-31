import { save } from './functions';

const content = `<?php

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

let name: string = '';
let filename: string = '';
let body: string = '';

const controller = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Controller class name',
    placeHolder: 'E.g. UserController, AuthController...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  filename = '/app/Controllers/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default controller;
