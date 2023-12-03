import { save } from './functions';

const content = `<?php

namespace App\\Validation;

class {className}
{
    public function custom_rule(string $string, string $fields, array $data): bool
    {
        return true;
    }
}
`;

let name: string = '';
let filename: string = '';
let body: string = '';

const validation = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Validation class name',
    placeHolder: 'E.g. UserValidation, AuthValidation...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  filename = '/app/Validation/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default validation;
