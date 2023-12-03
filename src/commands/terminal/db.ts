import { execute } from '../files/functions';

const dbCreate = async (vscode: any) => {
  execute(vscode, 'db create', 'php spark db:create', true);
};

const dbSeed = async (vscode: any) => {
  execute(vscode, 'db seed', 'php spark db:seed', true);
};

const dbTable = async (vscode: any) => {
  execute(vscode, 'db table', 'php spark db:table', true);
};

export { dbCreate, dbSeed, dbTable };
