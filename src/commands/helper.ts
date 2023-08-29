import save from './functions';

const content = `<?php

`;

let value: string = '';
let name: string = '';
let filename: string = '';

const helper = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Helper name',
    placeHolder: 'Helper name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.replace(/\s/g, '_').toLowerCase();
  filename = '/app/Helpers/' + name + '_helper.php';

  save(vscode, fs, path, filename, content);
};

export default helper;
