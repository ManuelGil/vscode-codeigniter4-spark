import { save } from './functions';

const content = `<?php

namespace App\\Controllers;

use CodeIgniter\\RESTful\\ResourceController;

class {className} extends ResourceController
{

    protected $modelName = 'App\\Models\\{modelName}';
    protected $format    = 'json';

    public function index()
    {
        //
    }

    public function show($id = null)
    {
        //
    }

    public function new()
    {
        //
    }

    public function create()
    {
        //
    }

    public function edit($id = null)
    {
        //
    }

    public function update($id = null)
    {
        //
    }

    public function delete($id = null)
    {
        //
    }
}

`;

let model: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const helper = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Resource class name',
    placeHolder: 'E.g. UserController, AuthController...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
      }
    },
  });

  model = await vscode.window.showInputBox({
    prompt: 'Model class name',
    placeHolder: 'E.g. UserModel, GroupModel...',
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

  body = content.replace('{className}', name).replace('{modelName}', model);

  save(vscode, fs, path, filename, body);
};

export default helper;
