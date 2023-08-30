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

let name: string = '';
let filename: string = '';
let body: string = '';

const seeder = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Seeder class name',
    placeHolder: 'E.g. UserSeeder, GroupSeeder...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! 3 or more characters (only letters)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  filename = '/app/Database/Seeds/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default seeder;
