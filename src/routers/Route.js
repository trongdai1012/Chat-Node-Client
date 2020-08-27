import React from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Login from '../components/login/Login';
import Chat from '../components/chat/Chat';

export const Routes = withRouter(({ history }) => {
    const { isAuthorized } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.user != null
        }),
        shallowEqual
    );

    return (
        /* Create `LayoutContext` from current `history` and `menuConfig`. */
        <Switch>
            {!isAuthorized ? (
                /* Redirect to `/auth` when user is not authorized */
                <Redirect to="/" />
            ) : (
                    <Redirect to="/chat" />
                )}
        </Switch>
    );
});
