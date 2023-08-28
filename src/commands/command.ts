import save from './functions';

let content = `<?php

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

let value: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const command = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Command class name',
    placeHolder: 'Command class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Commands/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default command;
