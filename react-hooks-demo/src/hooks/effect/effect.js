import React, { useEffect, useState } from "react";

function EffectSub(props) {
  const [count, setCount] = useState(0)

  // useEffect(() => {
  //   console.log('EffectSub:', props)
  //   return () => {
  //     console.log('EffectSub Unmount:', props)
  //   }
  // }, [])

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log('EffectSub setInterval count:', count)
  //     setCount(count + 1)
  //   }, 1000)
  //   console.log('EffectSub setInterval id:', id)
  //   return () => clearInterval(id)
  // }, [count])

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     console.log('EffectSub setTimeout count:', count)
  //     setCount(count + 1)
  //   }, 1000)
  //   console.log('EffectSub setTimeout id:', id)
  //   // return () => clearTimeout(id)
  // }, [count])

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     console.log('EffectSub setInterval count:', count)
  //     // setState 的函数式更新形式
  //     setCount(c => c + 1)
  //   }, 1000)
  //   console.log('EffectSub setTimeout id:', id)
  //   return () => clearInterval(id)
  // }, [])

  // React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。
  // 如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。
  // 这是一个刚开始使用 Hooks 时很容易导致 Bug 的地方。
  const todos = [{ text: 'Learn hooks.' }] // todos 变量是在函数内创建的，实际上每次都产生了一个新数组。所以在作为依赖项的时候进行引用的比较，实际上被认为是发生了变化的。
  useEffect(() => {
    console.log('Todos changed')
  }, todos)

  useEffect(() => {
    // console.log(props)
    console.log(props.count1, props.count2, props.count3, props.count4)
  }, [props.count1])

  console.log('EffectSub render...')

  return <div>
    <p>EffectSub state count: {count}</p>
    {/* <p>EffectSub props count1: {props.count1}</p>
    <p>EffectSub props count2: {props.count2}</p> */}
  </div>
}

export default EffectSub

// export default React.memo(EffectSub, (prevProp, nextProp) => {
//   console.log('memo:', prevProp, nextProp)
//   return prevProp.count1 === nextProp.count1
// })
