/**
 * Created by wey on 2017/2/17.
 */
'use strict';

const fs = require('fs')

export default function (name, filePath,_import = '//@import',  _register = '//@register') {

    let upperName = name.substr(0,1).toUpperCase() + name.substr(1, name.length-1)
    let page = fs.readFileSync(filePath).toString();

    const toImportString = `import ${upperName} from '../pages/${name}/${name}.vue'` + "\n" + _import
    const toRegisterString = `,
    {path: '/${name}',name: '${upperName}',component: ${upperName}}` + _register

    page = page.replace(_import, toImportString)
    page = page.replace(/\/\/\@register/g, toRegisterString)
    console.log(`write ${name} file `);
    fs.writeFileSync(filePath, page)
}