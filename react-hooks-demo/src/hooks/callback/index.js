import React, { useState, useCallback, useMemo } from "react";

function Child(props) {
  console.log('child render:', props.count)
  return <button onClick={props.click}>{props.children}</button>
}

export default function Callback() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const handleIncrement1 = () => {
    console.log('increment1')
    setCount1(count1 + 1)
  }

  // const handleIncrement2 = useCallback(() => {
  //   console.log('increment2')
  //   setCount2(count2 + 2)
  // }, [count2])

  // useCallback 的功能其实是可以用 useMemo 来实现的: useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
  const handleIncrement2 = useMemo(() => {
    return () => {
      console.log('increment2')
      setCount2(count2 + 2)
    }
  }, [count2])

  return <div>
    {count1}
    {count2}
    {/* <button onClick={handleIncrement1}>+1</button>
    <button onClick={handleIncrement2}>+2</button> */}

    <Child count={1} click={handleIncrement1}>+1</Child>
    <Child count={2} click={handleIncrement2}>+2</Child>
  </div>
}
