import React from 'react'
import useWindowSize from '../hooks/effect/useWindowSize'

export default function withWindowSize(Comp) {
  return (props) => {
    const windowSize = useWindowSize()
    return <Comp {...props} windowSize={windowSize}></Comp>
  }
}
