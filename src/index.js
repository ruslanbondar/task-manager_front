import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import reducer from './store/reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
