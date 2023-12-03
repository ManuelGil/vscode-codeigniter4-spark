import { execute } from '../files/functions';

const namespaces = async (vscode: any) => {
  execute(vscode, 'namespaces', 'php spark namespaces', true);
};

export default namespaces;
