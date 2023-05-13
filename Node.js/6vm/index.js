// ejs

const vm = require('node:vm')

// const contextObject = {
//   animal: 'cat',
//   count: 2,
// }

// const ret = vm.runInNewContext(
//   `count += 1; name = "hello"`,
//   contextObject
// )
// console.log(ret)
// console.log(contextObject)

// 使用 ES6 模板字符串实现模板引擎
// const ret = vm.runInNewContext(
//   '_(`<h1>${name} ${helper.dateTime()}</h1>`)',
//   {
//     name: 'Hello Node.js',
//     _: function(markup) {
//       console.log('markup:', markup)
//       if (!markup) return ''
//       if (markup === '<') return '&lt;'
//       if (markup === '>') return '&gt;'
//       if (markup === '/') return '&hh;'
//       return markup
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
  const code = templateMap[key]
  templateMap[key] = function compile() {
    return vm.runInNewContext(code, context)
  }
})

const ret = vm.runInNewContext(
  '`${include("templateA")}`',
  context
)

console.log(ret)