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

/**
 * 执行 then 和 catch 会返回一个新 Promise, 该 Promise 最终状态根据 then 和 catch 的回调函数的执行结果决定
 * 1. 如果回调函数最终是 return, 该 Promise 是 resolved 状态
 * 2. 如果回调函数最终是 throw, 该 Promise 是 rejected 状态
 * 3. 但如果回调函数最终 return 了一个 Promise, 该 Promise 会和回调函数 return 的 Promise 状态保持一致
 */

function three_interview(company) {
  return interview(company, 1).then(() => {
    return interview(company, 2)
  }).then(() => {
    return interview(company, 3)
  }).then(() => {
    console.log(`${company}三轮面试已通过✅`)
    return company
  }).catch(err => {
    console.error(`${company}面试失败，at round ${err.round}`)
    throw err
  })
}

const promise1 = three_interview('阿里')
const promise2 = three_interview('腾讯')

// const promise = Promise.all([
//   promise1,
//   promise2,
// ]).then(res => {
//   console.warn('并发控制，两家公司均已通过面试：', res)
// }).catch(err => {
//   // 只能知道第一个失败的promise
//   console.warn(`并发控制，${err.company}第${err.round}轮面试失败：`, err)
// })

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
