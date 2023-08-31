import { save } from './functions';

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

let name: string = '';
let filename: string = '';
let body: string = '';

const config = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Config class name',
    placeHolder: 'E.g. CustomConfig, UserConfig...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  filename = '/app/Configs/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default config;
