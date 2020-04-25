import React, { Component } from 'react';
import { Form, Input } from 'antd'
import { Button, Block } from 'components'
import { UserOutlined, LockOutlined, MailOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

class RegisterForm extends Component {
    render() {
        const success = false
        return (
            <>
                <div className="auth__top">
                    <h2>Регистрация</h2>
                    <p>Для входа в чат, вам нужно зарегистрироваться</p>
                </div>
                <Block>
                    { !success ? (
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                hasFeedback
                                name="email"
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" size="large" />
                            </Form.Item>
                            <Form.Item
                                name="nickname"
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Ваше имя" size="large" />
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                name="password"
                            >
                                <Input
                                    type="password"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Пароль"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                name="confirm"
                            >
                                <Input
                                    type="password"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Повторить пароль"
                                    size="large"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" size="large" htmlType="submit">
                                    ЗАРЕГИСТРИРОВАТЬСЯ
                                </Button>
                            </Form.Item>
                            <Link className="auth__register-link" to="/">
                                Войти в аккаунт
                            </Link>
                        </Form>
                    ) : (
                        <div className="auth__success-block">
                            <ExclamationCircleOutlined className="auth__success-icon" />
                            <h2>Подтвердите свой аккаунт</h2>
                            <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                        </div>)
                    }
                </Block>
            </>
        );
    }
}

export default RegisterForm;
