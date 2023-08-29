import save from './functions';

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

let value: string = '';
let name: string = '';
let filename: string = '';
let table: string = '';
let body: string = '';

const model = async (vscode: any, fs: any, path: any) => {
  value = await vscode.window.showInputBox({
    prompt: 'Model class name',
    placeHolder: 'Model class name',
    validateInput: (text: string) => {
      if (!/^[a-zA-Z]\w+$/.test(text)) {
        return 'Invalid format!';
      }
    },
  });

  name = value.charAt(0).toUpperCase() + value.replace(/\s/g, '').slice(1);
  filename = '/app/Models/' + name + '.php';

  table = value.replace(/\s/g, '_').toLowerCase();
  table = table.endsWith('y') ? table.slice(0, -1) + 'ies' : table;
  table = table.endsWith('s') ? table : table + 's';

  body = content.replace('{className}', name).replace('{tableName}', table);

  save(vscode, fs, path, filename, body);
};

export default model;
