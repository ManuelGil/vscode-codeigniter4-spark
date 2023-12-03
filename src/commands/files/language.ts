import { save } from './functions';

const content = `<?php

return [
    //
];
`;

let folder: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const language = async (vscode: any, fs: any, path: any) => {
  folder = await vscode.window.showInputBox({
    prompt: 'Folder name',
    placeHolder: 'Name without path delimeter. E.g. en, fr-CA, zh-cn...',
    validateInput: (text: string) => {
      if (!/^[A-Za-z][\w\s\/-]+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = await vscode.window.showInputBox({
    prompt: 'File name',
    placeHolder: 'Name without extension. E.g. Validation, Profile...',
    validateInput: (text: string) => {
      if (!/^[A-Za-z]{3,}$/.test(text)) {
        return 'Invalid format! 3 or more characters (only letters)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  folder = folder.endsWith('/') ? folder : folder + '/';
  filename = '/app/Language/' + folder + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default language;
