import React, { useReducer } from "react";

function init(initialState) {
  return { count: initialState }
}
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'reset':
      return { ...state, count: action.payload }
    default:
      return state
  }
}

function ReducerLazy(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  console.log('ReducerLazy state:', state)
  return <div>
    count: {state.count}
    count lazyInit
    <button onClick={() => dispatch({ type: 'increment' })}>incremnet</button>
    <button onClick={() => dispatch({ type: 'decrement' })}>decremnet</button>
    <button onClick={() => dispatch({ type: 'reset', payload: initialState })}>reset</button>
  </div>
}

export default function ReducerLazyInit() {
  return ReducerLazy(120)
}