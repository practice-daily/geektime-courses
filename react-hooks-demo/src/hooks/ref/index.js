// import React, { useState, useRef, useCallback } from "react";

// export default function IntervalRef() {
//   const [time, setTime] = useState(0)
//   const timer = useRef(null) // 在多次渲染之间共享数据
//   const inputEl = useRef(null) // 保存某个 DOM 节点的引用

//   const handleStart = useCallback(() => {
//     if (timer.current) return
//     timer.current = setInterval(() => {
//       console.log('start', time);
//       // setTime(time + 1)
//       setTime(time => time + 1)
//     }, 1000)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const handlePause = useCallback(() => {
//     console.log('pause');
//     clearInterval(timer.current)
//     timer.current = null
//   }, [])

//   function focusInput() {
//     const el = inputEl.current
//     console.dir(el)
//     el.focus()
//   }

//   function handleEl(node) {
//     console.log('handleEl node:', node)
//   }

//   return <div>
//     计时器: {time}
//     <button onClick={handleStart}>开始</button>
//     <button onClick={handlePause}>暂停</button>

//     <input type="text" ref={inputEl} />
//     <input type="text" ref={(node) => handleEl(node)} />
//     <button onClick={focusInput}>Focus the input</button>
//   </div>
// }


import React, { useState, useCallback, useRef } from 'react'

// let timer2 = null

export default function Timer() {
  const [time, setTime] = useState(0)
  // const timer = useRef(null)

  let timer2 = null

  const handleStart = useCallback(() => {
    timer2 = window.setInterval(() => {
      // 这里是个闭包，每次拿到的time值是0，所以要这样写手动去更新time的值
      console.log('Timer setInterval')
      setTime((time) => time + 1)
    }, 1000)
    console.log('Timer handleStart', timer2)
  }, [time])

  const handleStop = useCallback(() => {
    console.log('Timer handleStop', timer2)
    window.clearInterval(timer2)
    // timer2 = null
  }, [])

  console.log('Timer render')

  return (
    <div>
      {time} seconds.
      <br/>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  )
}
