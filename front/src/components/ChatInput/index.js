import React, { useState } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import './ChatInput.scss'

const ChatInput = (props) => {

    const [value, setValue] = useState('');

    return (
        <div className="ch-input">
            <div className="ch-input__smile-btn">
                <SmileOutlined className="ch-input__icon" />
            </div>
            <Input onChange={e => setValue(e.target.value)} size="large" className="ch-input__input" placeholder="Введите текст сообщения" />
            <div className="ch-input__actions">
                <CameraOutlined className="ch-input__icon" />
                {value ? <SendOutlined className="ch-input__icon ch-input__icon-send" /> : <AudioOutlined className="ch-input__icon ch-input__icon-send" />}
            </div>
        </div>
    );
};

ChatInput.propTypes = {
    classNmae: PropTypes.string
}

export default ChatInput;