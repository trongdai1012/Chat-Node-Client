import React from 'react';
import ReactDOM from 'react-dom';
import store, { persistor } from '../src/store/store'

import App from './App';

const { PUBLIC_URL } = process.env;

ReactDOM.render(<App store={store} persistor={persistor} basename={PUBLIC_URL} />, document.querySelector('#root'));