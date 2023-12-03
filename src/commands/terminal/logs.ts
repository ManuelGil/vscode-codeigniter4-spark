import { execute } from '../files/functions';

const logsClear = async (vscode: any) => {
  execute(vscode, 'logs clear', 'php spark logs:clear', true);
};

export default logsClear;
