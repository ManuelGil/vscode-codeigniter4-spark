import save from './functions';

const content = `<?php

namespace Config;

use CodeIgniter\\Config\\BaseConfig;

class {className} extends BaseConfig
{
    public function index()
    {
        //
    }
}

`;

let value: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const config = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Config class name',
    placeHolder: 'Config class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Configs/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default config;
