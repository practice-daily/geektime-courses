/**
 * Node.js异步编程 - callback
 * 回调规范格式(第一个参数是error，后面的参数才是结果)：
 * 1.error-first callback
 * 2.Node-style callbak
 * 以下为回调函数异步错误处理，error-first大致的发展历程。
 */

// function interview1(callback) {
//   setTimeout(callback, 500)
// }
// interview1(() => {
//   console.log('smile')
// })


/**
 * throw抛出的错误被抛到了Node.js全局，这个全局错误导致Node.js进程挂掉
 * 原因：
 * setTimeout 导致 throw抛出的错误 与 interview函数 不在同一个调用栈(call stack)，所以try catch无法捕获，被抛到了全局。
 * setTimeout是在另外一个事件循环event-loop中，而每一个事件循环都是一个新的调用栈。
 */
// function interview2(callback) {
//   setTimeout(() => {
//     if (Math.random() < 0.5) {
//       callback()
//     } else {
//       throw new Error('fail')
//     }
//   }, 500)
// }
// try {
//   interview2(() => {
//     console.log('smile')
//   })
// } catch (error) {
//   console.log('cry', error)
// }


// function interview3(callback) {
//   setTimeout(() => {
//     if (Math.random() < 0.5) {
//       callback('success')
//     } else {
//       callback(new Error('fail'))
//     }
//   }, 500)
// }
// interview3((res) => {
//   if (res instanceof Error) {
//     return console.log('cry')
//   }
//   console.log('smile')
// })


/**
 * 为了进一步简化，默认第一个参数为错误类型，最终形成统一的error-first回调规范格式
 */
function interview4(callback) {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      callback(null, 'success')
    } else {
      callback(new Error('fail'))
    }
  }, 500)
}
interview4((res) => {
  if (res) {
    return console.log('cry')
  }
  console.log('smile')
})

/**
 * 通过回调函数进行异步编程的缺点：
 * 1.回调地狱
 * 2.异步并发
 * 异步流程控制解决方案：
 * 1.async.js、thunk
 * 2.Promise
 * 3.async await
 */
// 1.回调地狱--3次面试成功才smile
// interview4((res) => {
//   if (res) {
//     return console.log('cry at 1st round')
//   }
//   interview4((res) => {
//     if (res) {
//       return console.log('cry at 2nd round')
//     }
//     interview4((res) => {
//       if (res) {
//         return console.log('cry at 3rd round')
//       }
//       console.log('smile')
//     })
//   })
// })

// 2.异步并发--同时面两家公司，且都成功后才smile(需要引入计数器，比较麻烦)
// let count = 0
// interview4((res) => {
//   if (res) {
//     return console.log('cry at 1st company')
//   }
//   count++
//   if (count === 2) {
//     console.log('smile')
//   }
// })
// interview4((res) => {
//   if (res) {
//     return console.log('cry at 2nd company')
//   }
//   count++
//   if (count === 2) {
//     console.log('smile')
//   }
// })
