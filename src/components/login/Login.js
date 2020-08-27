import React, { useState, useRef } from 'react';
import './Login.css';
import { login } from '../../crud/auth.crud';
import { connect } from 'react-redux';
import * as auth from "../../store/ducks/auth.duck";
import store from '../../store/store';

const Login = (props) => {
    const [user, setUser] = useState({ email: '', password: '' });
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();

    const onChangeValue = (e, key, value) => {
        e.preventDefault();

        setUser({
            ...user,
            [key]: value
        })
    }

    const onClickHandleLogin = (e) => {
        e.preventDefault();
        if (!user.email) {
            inputEmailRef.current.focus();
            return alert('Email không được bỏ trống');
        }

        if (!user.password) {
            inputEmailRef.current.focus();
            return alert('Mật khẩu không được bỏ trống');
        }

        login(user.email, user.password).then(({ data }) => {
            if (data.signal) {
                props.login(data.data.token);
            } else {

            }
        }).catch(err => {
            console.log('errrrrr', err)
        })
    }

    return <div id="logreg-forms">
        <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center' }}> Sign in</h1>
            <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f" /> Sign in with Facebook</span> </button>
                <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g" /> Sign in with Google+</span> </button>
            </div>
            <p style={{ textAlign: 'center' }}> OR</p>
            <input type="email" value={user.email} ref={inputEmailRef} onChange={e => onChangeValue(e, 'email', e.target.value)} className="form-control" placeholder="Email hoặc số điện thoại..." autoFocus />
            <input type="password" value={user.password} ref={inputPasswordRef} onChange={e => { onChangeValue(e, 'password', e.target.value) }} className="form-control" placeholder="Mật khẩu..." />
            <button className="btn btn-success btn-block" onClick={onClickHandleLogin}><i className="fas fa-sign-in-alt" /> Sign in</button>
            <a href="#" id="forgot_pswd">Forgot password?</a>
            <hr />
            <p>Don't have an account!</p>
            <button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fas fa-user-plus" /> Sign up New Account</button>
        </form>
    </div>
}

export default connect(
    null,
    auth.actions
)(Login);

