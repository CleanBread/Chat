import React from 'react';
import { Form, Input } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import { Button, Block } from 'components'
import { validateField } from 'utils/helpers'

const LoginForm = props => {
    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props;
    return (
        <>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        hasFeedback
                        name="email"
                        validateStatus={validateField('email', touched, errors)}
                        help={!touched.email ? false : errors.email}
                    >
                        <Input
                            id="email"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="E-mail"
                            size="large"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="password"
                        validateStatus={validateField('password', touched, errors)}
                        help={!touched.password ? false : errors.password}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            id="password"
                            placeholder="Password"
                            size="large"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={isSubmitting} onClick={handleSubmit} type="primary" size="large" htmlType="submit">
                            ВОЙТИ В АККАУНТ
                            </Button>
                    </Form.Item>
                    <Link className="auth__register-link" to="/register">
                        Зарегистрироваться
                        </Link>
                </Form>
            </Block>
        </>
    );
}


export default LoginForm;
