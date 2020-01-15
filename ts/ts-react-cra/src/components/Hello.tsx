import React from 'react'
import { Button } from 'antd'

interface Greeting {
  name: string;
  firstName: string;
  lastName: string;
}

const Hello = (props: Greeting) => <Button>Hello {props.name}</Button>

// const Hello: React.FC<Greeting> = ({
//   name,
//   firstName,
//   lastName,
//   children
// }) => <Button>Hello {name}</Button>

// React.FC 组件的默认属性必须为可选
Hello.defaultProps = {
  firstName: '',
  lastName: ''
}

export default Hello
