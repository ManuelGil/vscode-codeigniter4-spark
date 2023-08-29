import save from './functions';

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

let value: string = '';
let model: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const helper = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Resource class name',
    placeHolder: 'Resource class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  model = await vscode.window.showInputBox({
    prompt: 'Model class name',
    placeHolder: 'Model class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.replace(/\s/g, '_').toLowerCase();
  filename = '/app/Controllers/' + name + '.php';

  body = content.replace('{className}', name).replace('{modelName}', model);

  save(vscode, fs, path, filename, body);
};

export default helper;
