import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

interface Greeting {
  name: string;
  firstName: string;
  lastName: string;
}

function HelloHooks(props: Greeting) {
  const [count, setCount] = useState(0)
  const [text, setText] = useState<string | null>(null)
  useEffect(() => {
    console.log('useEffect')
    if (count > 3) {
      setText('休息一下')
    }
  }, [count])
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Hello {props.name} {count}</Button>
      {text}
    </div>
  )
}

HelloHooks.defaultProps = {
  firstName: '',
  lastName: ''
}

export default HelloHooks
