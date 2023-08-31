import { save } from './functions';

const content = `<?php

namespace App\\Models;

use CodeIgniter\\Model;

class {className} extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = '{tableName}';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];
}

`;

let name: string = '';
let filename: string = '';
let table: string = '';
let body: string = '';

const model = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Model class name',
    placeHolder: 'E.g. UserModel, GroupModel...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  filename = '/app/Models/' + name + '.php';

  table = name.toLowerCase();
  table = table.endsWith('y') ? table.slice(0, -1) + 'ies' : table;
  table = table.endsWith('s') ? table : table + 's';

  body = content.replace('{className}', name).replace('{tableName}', table);

  save(vscode, fs, path, filename, body);
};

export default model;
