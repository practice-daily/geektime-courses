/**
 * async/await
 * 1. async function 是 Promise 的语法糖封装, async function 等同于一个返回 Promise 的普通函数
 * 2. 异步编程的终极方案 - 以同步的方式写异步
 *   2.1 await 关键字可以“暂停” async function 的执行
 *   2.2 await 关键字可以以同步的写法获取 Promise 的执行结果 (promise 是 reject 的情况下 await 会马上抛错并且中断代码执行)
 *   2.3 try-catch 可以获取 await 所得到的错误
 */

function interview(company, round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        console.log(`✅${company}第${round}轮面试通过`)
        resolve('success')
      } else {
        console.log(`❌${company}第${round}轮面试失败`)
        const error = new Error('fail')
        error.company = company
        error.round = round
        reject(error)
      }
    }, 100)
  })
}

async function three_interview(company) {
  try {
    await interview(company, 1)
    await interview(company, 2)
    await interview(company, 3)
    console.log(`${company}三轮面试已通过✅`)
    return company
  } catch (err) {
    console.error(`${company}面试失败，at round ${err.round}`)
    throw err
  }
}

const promise1 = three_interview('阿里')
const promise2 = three_interview('腾讯')

const rets = []
const errs = []
const promise = Promise.all([
  promise1.then(res => {
    rets[0] = res
    return res
  }).catch(err => {
    errs[0] = err
  }),
  promise2.then(res => {
    rets[1] = res
    return res
  }).catch(err => {
    errs[1] = err
  }),
]).then(res => {
  console.warn('====== 并发控制 START ======')
  console.log('res:', res)
  console.log('rets:', rets)
  console.log('errs:', errs)
  if (errs.length > 0) {
    console.warn(`❌有公司面试失败：`)
    errs.forEach(err => {
      console.warn(`${err.company}第${err.round}轮面试失败`)
    })
  } else {
    console.log('✅两家公司均已通过面试', rets)
  }
  console.warn('====== 并发控制 END ======')
})

setTimeout(() => {
  console.log(promise1)
  console.log(promise2)
  console.log(promise)
}, 1000)
