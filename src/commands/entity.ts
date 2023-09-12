import { save } from './functions';

const content = `<?php

namespace App\\Entities;

use CodeIgniter\\Entity\\Entity;

class {className} extends Entity
{
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [];
}

`;

let name: string = '';
let filename: string = '';
let body: string = '';

const entity = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Entity class name',
    placeHolder: 'E.g. UserEntity, GroupEntity...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  if (name === 'Entity') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  filename = '/app/Entities/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default entity;
