import React, { useState, useEffect } from 'react'


export default function Demo() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState(false)

  useEffect(() => {
    console.log('useEffect')
  }, [count, status])

  console.log('hooks Demo: function render', this)


  return <div>
    <p>You clicked {count} times. {status.toString()}</p>
    <button onClick={() => setCount(count + 1)}>count</button>
    <button onClick={() => setStatus(!status)}>status</button>
  </div>
}