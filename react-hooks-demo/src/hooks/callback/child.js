import React, { memo } from 'react'

// export default function CallbackChild(props) {
//   console.log('CallbackChild render:', props.count)
//   return <button onClick={props.click}>{props.children}</button>
// }

export default memo(function CallbackChild(props) {
  console.log('CallbackChild render:', props.count)
  return <button onClick={props.click}>{props.children}</button>
})