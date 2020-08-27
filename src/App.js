import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Login from './components/login/Login';
import Chat from './components/chat/Chat';
import { Routes } from './routers/Route';

const App = ({ store, persistor, basename }) => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter basename={basename}>
                <Router>
                    <Route path="/" exact component={Login} />
                    <Route path="/chat" exact component={Chat} />
                </Router>
                <Routes />
            </BrowserRouter>
        </PersistGate>
    </Provider>

)

export default App;