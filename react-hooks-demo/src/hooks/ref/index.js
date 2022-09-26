import React, { useState, useRef, useCallback } from "react";

export default function IntervalRef() {
  const [time, setTime] = useState(0)
  const timer = useRef(null)
  const inputEl = useRef(null)

  const handleStart = useCallback(() => {
    if (timer.current) return
    timer.current = setInterval(() => {
      console.log('start', time);
      // setTime(time + 1)
      setTime(time => time + 1)
    }, 1000)
  }, [])

  const handlePause = useCallback(() => {
    console.log('pause');
    clearInterval(timer.current)
    timer.current = null
  }, [])

  function focusInput() {
    const el = inputEl.current
    console.dir(el)
    el.focus()
  }

  return <div>
    计时器: {time}
    <button onClick={handleStart}>开始</button>
    <button onClick={handlePause}>暂停</button>

    <input type="text" ref={inputEl} />
    <button onClick={focusInput}>Focus the input</button>
  </div>
}
