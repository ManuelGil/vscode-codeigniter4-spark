import { execute } from '../files/functions';

const key = async (vscode: any) => {
  execute(vscode, 'key generate', 'php spark key:generate', true);
};

export default key;
