const vm = require('node:vm')

// const user = { name: 'cicada' }
// const template = '<h2><%= user.name ></h2>'
// ejs.render(template, user)

/**
 * 使用 ES6 模板字符串实现模板引擎
 * 
 * 通过 vm 模块编译 JavaScript 形成函数
 * 1. xss 过滤、模板 helper 函数
 * 2. include 子模板
 */

// const ret = vm.runInNewContext(
//   '_(`<script>alert(${name} + ${helper.dateTime()})</script>`)',
//   {
//     name: 'Hello Node.js',
//     // xss
//     _: function(markup) {
//       if (!markup) return ''
//       return String(markup)
//         .replace(/&/g, '&amp;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&lt;')
//         .replace(/'/g, '&#39;')
//         .replace(/"/g, '&quot;')
//     },
//     helper: {
//       dateTime(time) {
//         if (!time) return Date.now()
//         return new Date(time).getTime()
//       }
//     }
//   }
// )
// console.log(ret)


// ----------------------------------
// const templateMap = {
//   templateA: '`<h1>${include("templateB")}</h1>`',
//   templateB: '`<p>Hello Node.js! ${name}</p>`',
// }

// const context = {
//   name: 'cicada',
//   include(name) {
//     const code = templateMap[name]
//     return vm .runInNewContext(code, context)
//   },
// }

// const ret = vm.runInNewContext(
//   '`${include("templateA")}`',
//   context
// )

// console.log(ret)


// ----------------------------------
// const templateMap = {
//   templateA: '`<h1>${include("templateB")}</h1>`',
//   templateB: '`<p>Hello Node.js! ${name}</p>`',
// }

// const context = {
//   name: 'squirrel',
//   include(name) {
//     return templateMap[name]()
//   }
// }

// Object.keys(templateMap).forEach(key => {
//   const code = templateMap[key]
//   templateMap[key] = function compile() {
//     return vm.runInNewContext(code, context)
//   }
// })

// const ret = vm.runInNewContext(
//   '`${include("templateA")}`',
//   context
// )

// console.log(ret)


// ----------------------------------
const templateMap = {
  templateA: '`<h1>${include("templateB")}</h1>`',
  templateB: '`<p>Hello Node.js! ${name}</p>`',
}

const context = {
  name: 'squirrel',
  include(name) {
    return templateMap[name]()
  }
}

Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key]
  templateMap[key] = vm.runInNewContext(`(function () {return ${temp}})`, context)
})

console.log(templateMap['templateA']())
