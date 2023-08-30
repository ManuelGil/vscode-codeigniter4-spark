import save from './functions';

const content = `<?php

namespace App\\Filters;

use CodeIgniter\\Filters\\FilterInterface;
use CodeIgniter\\HTTP\\RequestInterface;
use CodeIgniter\\HTTP\\ResponseInterface;

class {className} implements FilterInterface
{
    /**
     * Do whatever processing this filter needs to do.
     * By default it should not return anything during
     * normal execution. However, when an abnormal state
     * is found, it should return an instance of
     * CodeIgniter\\HTTP\\Response. If it does, script
     * execution will end and that Response will be
     * sent back to the client, allowing for error pages,
     * redirects, etc.
     *
     * @param RequestInterface $request
     * @param array|null       $arguments
     *
     * @return mixed
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        //
    }

    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return mixed
     */
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}

`;

let name: string = '';
let filename: string = '';
let body: string = '';

const filter = async (vscode: any, fs: any, path: any) => {
  name = await vscode.window.showInputBox({
    prompt: 'Filter class name',
    placeHolder: 'E.g. AuthFilter, RoleFilter...',
    validateInput: (text: string) => {
      if (!/^[A-Z][A-Za-z]{2,}$/.test(text)) {
        return 'Invalid format! Class names MUST be declared in StudlyCaps / PascalCase (psr-1)';
      }
    },
  });

  if (name.length === 0) {
    return;
  }

  filename = '/app/Filters/' + name + '.php';

  body = content.replace('{className}', name);

  save(vscode, fs, path, filename, body);
};

export default filter;
