import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Hello from './components/Hello'
import HelloClass from './components/HelloClass'
import HelloHOC from './components/HelloHOC'
import HelloHooks from './components/HelloHooks'

ReactDOM.render(<div>
  <Hello name="TypeScript~" />
  <HelloClass name="Class Component" />
  <HelloHOC name="HOC" loading={true} />
  <HelloHooks name="Hooks" />
</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
