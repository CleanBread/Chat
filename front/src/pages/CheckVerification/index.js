import React from 'react'
import { ExclamationCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import { Block, Button } from 'components'
import { userApi } from 'utils/api';

import './CheckVerification.scss'

const CheckVerification = ({ location }) => {

    const [verified, setVerified] = React.useState(false)

    React.useEffect(() => {
        const hash = location ? location.search.split('hash=')[1] : '';

        if (hash) {
            userApi.verifyHash(hash).then(({ data }) => {
                setVerified(data.status)
            }).catch(() => {
                setVerified('error')
            })
        }
    }, [])

    return (
        <Block>
            <div className="ch-verify__success-block">
                {
                    verified === false ?
                        (
                            <>
                                <ExclamationCircleOutlined className="ch-verify__success-icon" />
                                <h2>Подтвердите свой аккаунт</h2>
                                <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                            </>
                        ) : verified === 'success' ?
                            (
                                <>
                                    <CheckCircleOutlined className="ch-verify__success-icon" />
                                    <h2>Ваш аккаунт подтвержден</h2>
                                    <Link to="/login">
                                        <Button type="primary">Войти в аккаунт</Button>
                                    </Link>
                                </>
                            ) :
                            (
                                <>
                                    <WarningOutlined className="ch-verify__success-icon ch-verify__success-icon--error" />
                                    <h2>Ошибка при подтверждении аккаунта</h2>
                                    <p>(неверный адрес подтверждения)</p>
                                </>
                            )
                }
            </div>
        </Block>
    );
}

export default CheckVerification;
