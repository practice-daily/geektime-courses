import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HookDemo from './hooks/demo'
import ClassDemo from './class/demo'

import EffectIndex from './hooks/effect';
// import RequestDemo from './hooks/axios'

import ThemeContext, { themes } from './hooks/context/themeContext';
import ContextIndex from './hooks/context'

import ReducerIndex from './hooks/reducer';
import ReducerLazyInit from './hooks/reducer/lazyInit';

import Callback from './hooks/callback';
import Memo from './hooks/memo.js';

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
        <div className='panel-title'>ThemeContext</div>
        <ThemeContext.Provider value={themes.dark}>
          <ContextIndex></ContextIndex>
        </ThemeContext.Provider>
      </div>

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
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
