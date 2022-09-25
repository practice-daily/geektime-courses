import React, { useState } from "react";
import Effect from './effect'
import useWindowSize  from './useWindowSize'

export default function EffectIndex() {
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(2)
  const [count3, setCount3] = useState(3)
  const [count4, setCount4] = useState(4)
  const size = useWindowSize()

  console.log('EffectIndex render...', size)

  return <div>
    <h3>useEffect 是每次组件 render 完后判断依赖并执行</h3>
    <p>You clicked {count1} times.</p>
    <button onClick={() => setCount1(count1 + 1)}>count1</button>

    <p>You clicked {count2} times.</p>
    <button onClick={() => setCount2(count2 + 1)}>count2</button>

    <p>You clicked {count3} times.</p>
    <button onClick={() => setCount3(prevCount => prevCount + 1)}>函数式更新</button>

    <p>You clicked {count4} times.</p>
    <button onClick={() => setCount4(44)}>Object.is 跳过 state 更新</button>

    <Effect count1={count1} count2={count2} count3={count3} count4={count4}></Effect>

    <h2>自定义 hook: {size}</h2>
  </div>
}