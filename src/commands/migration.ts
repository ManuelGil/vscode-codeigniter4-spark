import { save } from './functions';

const content = `<?php

namespace App\\Database\\Migrations;

use CodeIgniter\\Database\\Migration;

class {className} extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('table_name');
    }

    public function down()
    {
        $this->forge->dropTable('table_name');
    }
}

`;

let name: string = '';
let format: string = '';
let filename: string = '';
let body: string = '';

const migration = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Migration class name',
    placeHolder: 'E.g. InitMigration, UserMigration...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
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

  if (name.length === 0) {
    return;
  }

  if (name === 'Migration') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  format = format.replace(/\//g, '-').replace(/,/g, '-').replace(/\s/g, '').replace(/\:/g, '');

  filename = '/app/Database/Migrations/' + format + '_' + name + '.php';
  console.log(filename);

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default migration;
