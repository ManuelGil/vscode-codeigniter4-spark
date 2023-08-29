import save from './functions';

const content = `<?php

namespace App\\Database\\Migrations;

use CodeIgniter\\Database\\Migration;

class {className} extends Migration
{
    public function up()
    {
        //
    }

    public function down()
    {
        //
    }
}

`;

let value: string = '';
let name: string = '';
let format: string = '';
let filename: string = '';
let body: string = '';

const migration = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Migration class name',
    placeHolder: 'Migration class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  const date = new Date();
  format = date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  format = format.replace(/\//g, '-').replace(/,/g, '-').replace(/\s/g, '').replace(/\:/g, '');

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Database/Migrations/' + format + '_' + name + '.php';
  console.log(filename);

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default migration;
