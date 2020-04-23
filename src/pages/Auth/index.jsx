import React from 'react';
import { From, Icon, Input, Checkbox } from 'antd'
import { Button, Block } from 'components'

import './Auth.scss'

const Auth = (props) => {
    return (
        <section className="auth">
            <div className="auth__content">
                <div className="auth__top">
                    <h2>Войти в аккаунт</h2>
                    <p>Пожалуйста, войдите в свой аккаунт</p>
                </div>
                <Block>
                    <Button type="primary" size="large">
                        This is Button
                    </Button>
                </Block>
            </div>
        </section>
    );
};

export default Auth;