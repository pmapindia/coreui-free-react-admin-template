import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'
import { CookiesProvider } from "react-cookie";


React.icons = icons

ReactDOM.render(
  <Provider store={store}>
    {/* if we put cookiesprovider instead provider then it will give error as
Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
    */}
    {/* <CookiesProvider> */}
    <App/>
    {/* </CookiesProvider>, */}
   </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
