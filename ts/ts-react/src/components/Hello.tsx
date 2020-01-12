import React from 'react'

interface IProps {
  name: string;
}

const Hello = (props: IProps) => <h1>Hello {props.name}</h1>

export default Hello
