import { execute } from './functions';

const routes = async (vscode: any) => {
  execute(vscode, 'routes', 'php spark routes', true);
};

export default routes;
