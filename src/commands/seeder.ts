import save from './functions';

const content = `<?php

namespace App\\Database\\Seeds;

use CodeIgniter\\Database\\Seeder;

class {className} extends Seeder
{
    public function run()
    {
        //
    }
}

`;

let value: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const seeder = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Seeder class name',
    placeHolder: 'Seeder class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Database/Seeds/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default seeder;
