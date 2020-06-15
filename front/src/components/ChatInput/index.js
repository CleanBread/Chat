import React, { useState } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { UploadField } from '@navjobs/upload'
import { Picker } from 'emoji-mart'

import './ChatInput.scss'

const ChatInput = (props) => {

    const [value, setValue] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible)
    }

    return (
        <div className="ch-input">
            <div className="ch-input__smile-btn">
                {emojiPickerVisible && <div className="ch-input__emoji">
                    <Picker set="apple" onSelect={(emoji) => console.log(emoji)} enableFrequentEmojiSort={true} />
                </div>}
                <SmileOutlined className="ch-input__icon" onClick={toggleEmojiPicker} />
            </div>
            <Input onChange={e => setValue(e.target.value)} size="large" className="ch-input__input" placeholder="Введите текст сообщения" />
            <div className="ch-input__actions">
                <UploadField onFiles={files => console.log(files)} containerProps={{ className: 'ch-input__files' }} uploadProps={{ accept: '.jpg, .jpeg, .png, .gif, .bmp', multiple: 'multiple' }} >
                    <CameraOutlined className="ch-input__icon" />
                </UploadField>
                {value ? <SendOutlined className="ch-input__icon ch-input__icon-send" /> : <AudioOutlined className="ch-input__icon ch-input__icon-send" />}
            </div>
        </div >
    );
};

ChatInput.propTypes = {
    classNmae: PropTypes.string
}

export default ChatInput;