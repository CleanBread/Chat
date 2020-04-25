import React, { Component } from 'react';
import { Form, Input } from 'antd'
import { Button, Block } from 'components'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

class LoginForm extends Component {
    render() {
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
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            hasFeedback
                            name="username"
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" size="large" />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            name="password"
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit">
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
}

export default LoginForm;
