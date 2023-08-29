import save from './functions';

const content = `<?php

return [];

`;

let folder: string = '';
let value: string = '';
let name: string = '';
let filename: string = '';
let body: string = '';

const language = async (vscode: any, fs: any, path: any) => {
  folder = await vscode.window.showInputBox({
    prompt: 'Folder name',
    placeHolder: 'Folder name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  value = await vscode.window.showInputBox({
    prompt: 'File name',
    placeHolder: 'File name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  folder = folder.endsWith('/') ? folder : folder + '/';
  filename = '/app/Language/' + folder + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default language;
