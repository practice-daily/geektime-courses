import React from "react";
import useCount from "./useCount";

export default function Counter() {
  const { count, increment, decrement, reset } = useCount()
  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
      {count}
    </div>
  )
}