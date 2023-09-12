import { save } from './functions';

const content = `<?php

namespace App\\Commands;

use CodeIgniter\\CLI\\BaseCommand;
use CodeIgniter\\CLI\\CLI;

class {className} extends BaseCommand
{
    /**
     * The Command's Group
     *
     * @var string
     */
    protected $group = 'CodeIgniter';

    /**
     * The Command's Name
     *
     * @var string
     */
    protected $name = 'command:name';

    /**
     * The Command's Description
     *
     * @var string
     */
    protected $description = '';

    /**
     * The Command's Usage
     *
     * @var string
     */
    protected $usage = 'command:name [arguments] [options]';

    /**
     * The Command's Arguments
     *
     * @var array
     */
    protected $arguments = [];

    /**
     * The Command's Options
     *
     * @var array
     */
    protected $options = [];

    /**
     * Actually execute a command.
     *
     * @param array $params
     */
    public function run(array $params)
    {
        //
    }
}

`;

let name: string = '';
let filename: string = '';
let body: string = '';

const command = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Command class name',
    placeHolder: 'E.g. CustomCommand, CliCommand...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1).';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  if (name === 'BaseCommand') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  filename = '/app/Commands/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default command;
