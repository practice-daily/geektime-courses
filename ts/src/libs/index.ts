import $ from 'jquery'

$('.app').css('color', 'red')

// 全局库
// 引入方式为在html文件中手动引入
globalLib({
  x: 'globalLib options'
})
globalLib.doSomething()

// 模块类库
// import moduleLib = require('./module-lib')
import moduleLib from './module-lib'
moduleLib.doSomething()

// umd库
// umd库跟全局库一样支持在html文件中进行全局导入，关闭ts错误提示需配置项"allowUmdGlobalAccess": true
import umdLib from './umd-lib'
umdLib.doSomething()


// 插件
// 1. 模块化插件
// 给外部类库添加自定义方法
import m from 'moment'
declare module 'moment' {
  export function myFunction(): void
}
m.myFunction = () => {}

// 2. 全局插件
// 给globalLib添加自定义方法，但这样会污染命名空间，不推荐使用
declare global {
  namespace globalLib {
    function doAnything(): void
  }
}
globalLib.doAnything = () => {}
