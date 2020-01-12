let cmjA = require('./a')
let cmjB = require('./b')

console.log(cmjA)
console.log(cmjB)

// commonjs 与 ES 的兼容性问题（具体见README.md）
// ts-node ./src/module/node/c.ts
const cmj_es = require('../es6/a')
// cmj_es() // ❌
console.log(cmj_es)
cmj_es.default()

import cmj_es_export = require('../es6/d')
// 如果tsconfig.json中esModuleInterop值为true，那么上述导入方式也可改为：import cmj_es_export from '../es6/d'
cmj_es_export()
