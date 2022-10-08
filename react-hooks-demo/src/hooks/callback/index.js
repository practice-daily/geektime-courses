// import React, { useState, useCallback, useMemo } from "react";
// import CallbackChild from './child'

// export default function Callback() {
//   const [count1, setCount1] = useState(0)
//   const [count2, setCount2] = useState(0)

//   // const handleIncrement1 = () => {
//   //   console.log('increment1')
//   //   setCount1(count1 + 1)
//   // }

//   // const handleIncrement1 = useCallback(() => {
//   //   console.log('increment1')
//   //   setCount1(count1 + 1)
//   // }, [count1])

//   const handleIncrement1 = useCallback(() => {
//     console.log('increment1')
//     setCount1(count => count + 1)
//   }, [])

//   // const handleIncrement2 = useCallback(() => {
//   //   console.log('increment2')
//   //   setCount2(count2 + 2)
//   // }, [count2])

//   // useCallback 的功能其实是可以用 useMemo 来实现的: useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
//   // const handleIncrement2 = useMemo(() => {
//   //   return () => {
//   //     console.log('increment2')
//   //     setCount2(count2 + 2)
//   //   }
//   // }, [count2])

//   const handleIncrement2 = useMemo(() => () => {
//     console.log('increment2')
//     setCount2(count => count + 2)
//   }, [])

//   console.log('Callback render')

//   return <div>
//     <CallbackChild count={1} click={handleIncrement1}>+1</CallbackChild>
//     {count1}

//     <br />

//     <CallbackChild count={2} click={handleIncrement2}>+2</CallbackChild>
//     {count2}
//   </div>
// }



import React, {
  useCallback,
  useRef,
  useReducer,
} from 'react';

const initialState = {time: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {time: state.time + 1};
    default:
      throw new Error();
  }
}

export default function Timer() {
  console.log('--render--')

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const timer = useRef(null);

  const setIntervalCallback = useCallback( () => {
    dispatch({type: 'increment'});
    console.log('setinterval time:', state.time)  //为什么这里的state.time不变？
  }, [state.time]);//这里的state.time变化被监听到了

  const handleStart = useCallback(() => {
    console.log('handlestart')
    timer.current = window.setInterval(setIntervalCallback, 1000);
  }, [timer, setIntervalCallback]);
  
  const handlePause = useCallback(() => {
    console.log('handlePause')
    window.clearInterval(timer.current);
    timer.current = null;    
  }, [timer]);
  
  return(
    <div>
      {state.time} seconds.
      <MyStartBtn handleStart={handleStart}/>
      <MyPauseBtn handlePause={handlePause}/>
    </div>
  );
}

function StartButton({handleStart}){
  console.log('startButton render --')
  return <button onClick={handleStart}>Start</button>;
}
const MyStartBtn = React.memo(StartButton, (prevProps, nextProps) => {
  return prevProps.handleStart === nextProps.handleStart;
});

function PauseButton({handlePause}){
  console.log('pauseButton render --')
  return <button onClick={handlePause}>Pause</button>;
}
const MyPauseBtn = React.memo( PauseButton, (prev, next) => {
  return prev.handlePause === next.handlePause;
})