import save from './functions';

let content = `<?php

namespace App\\Entities;

use CodeIgniter\\Entity\\Entity;

class {className} extends Entity
{
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [];
}

`;

let value: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const entity = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Entity class name',
    placeHolder: 'Entity class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Entities/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default entity;
