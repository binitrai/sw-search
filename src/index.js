import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';

import './index.css';
import App from './App';

import {Provider} from "react-redux";
import reducer from "./store/reducers";

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter> 
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));