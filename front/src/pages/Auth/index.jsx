import React from 'react';
import { Route } from 'react-router-dom'

import { LoginForm, RegisterForm } from 'modules'
import { CheckVerification } from 'pages'

import './Auth.scss'

const Auth = () => (
    <section className="auth">
        <div className="auth__content">
            <Route exact path={["/", "/login"]} component={LoginForm} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/verify" component={CheckVerification} />
        </div>
    </section>
)

export default Auth;