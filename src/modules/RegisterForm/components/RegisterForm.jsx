import React from 'react';
import { Form, Input } from 'antd'
import { Button, Block } from 'components'
import { UserOutlined, LockOutlined, MailOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'


const success = false

const RegisterForm = props => {
    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {!success ? (
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            hasFeedback
                            name="email"
                            validateStatus={
                                !touched.normal_login_email ? "" : errors.email ? "error" : "success"
                            }
                            help={!touched.normal_login_email ? false : errors.email}
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
                            name="nickname"
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Ваше имя" size="large" />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            name="password"
                            validateStatus={
                                !touched.normal_login_password ? "" : errors.password ? "error" : "success"
                            }
                            help={!touched.normal_login_password ? false : errors.password}
                        >
                            <Input
                                id="password"
                                type="password"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Пароль"
                                size="large"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            name="confirm"
                            validateStatus={
                                !touched.normal_login_confirm ? "" : errors.confirm ? "error" : "success"
                            }
                            help={!touched.normal_login_confirm ? false : errors.confirm}
                        >
                            <Input
                                id="confirm"
                                type="password"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Повторить пароль"
                                size="large"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit" onClick={handleSubmit}>
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
    )
}

export default RegisterForm;
