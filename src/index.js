import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import TabBarExample from './App';
import EchartsTest from './EchartDemo';
// import FlexExample from './FlexExample';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
  	<EchartsTest/>
  </React.StrictMode>,
  document.getElementById('root')
);
//<TabBarExample/>
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();