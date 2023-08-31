import { save } from './functions';

const content = `<?php

`;

let name: string = '';
let filename: string = '';

const helper = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Helper name',
    placeHolder: 'E.g. custom_mailer, media...',
    validateInput: (text: string) => {
      if (!/^[a-z][a-z_]{2,}$/.test(text)) {
        return 'Invalid format! 3 or more characters (lower-case letters or underscores)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  filename = '/app/Helpers/' + name + '_helper.php';

  save(vscode, fs, path, filename, content);
};

export default helper;
