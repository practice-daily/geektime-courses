import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HookDemo from './hooks/demo'
import ClassDemo from './class/demo'

import EffectIndex from './hooks/effect';
// import RequestDemo from './hooks/axios'

import ReducerIndex from './hooks/reducer';
import ReducerLazyInit from './hooks/reducer/lazyInit';

import Callback from './hooks/callback';
import Memo from './hooks/memo.js';

import IntervalRef from './hooks/ref';

import ContextIndex from './hooks/context'

import Counter from './hooks/custom/counter';
import UserList from './hooks/custom/userList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App>
      <div className='section-panel'>
        <div className='panel-title'>HookDemo & ClassDemo</div>
        <HookDemo />
        <ClassDemo />
      </div>

      <div className='section-panel'>
        <div className='panel-title'>EffectIndex</div>
        <EffectIndex />
      </div>
      {/* <RequestDemo /> */}

      <div className='section-panel'>
        <div className='panel-title'>ReducerIndex & ReducerLazyInit</div>
        <ReducerIndex></ReducerIndex>
        <ReducerLazyInit></ReducerLazyInit>
      </div>

      <div className='section-panel'>
        <div className='panel-title'>useCallback 缓存回调函数</div>
        <Callback></Callback>
      </div>

      <div className='section-panel'>
        <div className='panel-title'>useMemo 缓存计算结果</div>
        <Memo></Memo>
      </div>

      <div className='section-panel'>
        <div className='panel-title'>useRef 在多次渲染之间共享数据</div>
        <IntervalRef></IntervalRef>
      </div>

      <div className='section-panel'>
        <div className='panel-title'>useContext 定义全局状态</div>
        <ContextIndex></ContextIndex>
      </div>

      <div className='section-panel'>
        <div className='panel-title'>自定义 Hook</div>
        <Counter></Counter>
        <UserList></UserList>
      </div>
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
