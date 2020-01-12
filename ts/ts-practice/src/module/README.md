# ES模块与commonjs模块

- tsconfig.json 中的 target 默认是 es5
- tsc 命令默认的 target 是 es3 (tsc 中可通过参数 -t 指定 target)
- tsconfig.json 与 tsc 的默认 module 默认值都是 commonjs (tsc 中可通过参数 -m 指定 module)
- tsc 命令后面如果有文件路径，那么会忽略 tsconfig.json 配置文件
- tsc 命令中如果 target为es3或es5，那么module默认为es2015(es6)

## ts编译模块类型module默认为*commonjs*，引出了两种模块的兼容性问题，ts在遇到ES模块的默认导入导出时会做特殊处理
### commonjs 与 ES 模块在处理默认导入导出时是不兼容的
- ES 模块允许一个顶级导出(即默认导出 export default function() {})，同时允许多个次级导出(即 export function a() {})
- commonjs 模块在有一个顶级导出(即 module.exports)后，次级导出(即 exports.a = 1)会被覆盖导致失效

- 如果都使用 ES 模块导入导出是不会出现问题的，因为 ts 在编译为commonjs模块规范时，偷偷地在导出时加上了 default，同时在导入时也加上了 default 进行访问，此过程对于开发人员是无感知的
- 但是如果一个模块使用 ES 模块导出，在使用 *非ES* 模块导入时就会出现问题
  - 比如在Node中导入ES模块(见 src/module/node/c.ts 引入 src/module/es6/a.ts)

### 解决方案
- 最好不要混用 commonjs 与 ES 模块
- ts 提供了 `export =` 进行兼容(见 src/module/es6/d.ts)，这个语法会被编译为 `module.exports =`，就相当于顶级导出
