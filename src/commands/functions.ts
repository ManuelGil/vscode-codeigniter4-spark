const save = (vscode: any, fs: any, path: any, filename: string, content: string, show: boolean = true) => {
  let folder;

  if (vscode.workspace.workspaceFolders) {
    folder = vscode.workspace.workspaceFolders[0].uri.fsPath;
  } else {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  const pathfile = path.join(folder, filename);

  if (!fs.existsSync(path.dirname(pathfile))) {
    fs.mkdirSync(path.dirname(pathfile), { recursive: true });
  }

  fs.access(pathfile, (err: any) => {
    if (err) {
      fs.open(pathfile, 'w+', (err: any, fd: any) => {
        if (err) {
          throw err;
        }

        fs.writeFileSync(fd, content);

        if (show === true) {
          const openPath = vscode.Uri.file(pathfile);
          vscode.workspace.openTextDocument(openPath).then((filename: string) => {
            vscode.window.showTextDocument(filename);
          });
        }
      });

      vscode.window.showInformationMessage('Successfully created the file!');
    } else {
      vscode.window.showWarningMessage('Name already exist!');
    }
  });
};

const execute = (vscode: any, name: string, command: string, show: boolean = true) => {
  const terminal = vscode.window.createTerminal({ name: name, hideFromUser: !show });
  terminal.sendText(command);
  vscode.window.showInformationMessage(`Running: ${command}`);

  if (show) {
    terminal.show();
  }
};

export { save, execute };
