import save from './functions';

let content = `<?php

namespace App\\Validation;

class {className}
{
    // public function custom_rule(): bool
    // {
    //     return true;
    // }
}

`;

let value: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const validation = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Validation class name',
    placeHolder: 'Validation class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Validation/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default validation;
