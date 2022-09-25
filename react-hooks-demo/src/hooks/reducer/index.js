import React, { useReducer } from "react";

const initialState = {
  count: -1
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      }      
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state
  }
}

export default function ReducerIndex() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      count: { state.count }
      <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
    </div>
  )
}