import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { UploadField } from '@navjobs/upload'
import { useDispatch } from 'react-redux';
import { Picker } from 'emoji-mart'

import './ChatInput.scss'

const ChatInput = ({ onSendMessage }) => {
    const dispatch = useDispatch()
    const emojiBlockRef = useRef()
    const inputBlockRef = useRef()

    const [text, setText] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible)
    }

    const handleSendMessage = () => {
        if (text) {

            dispatch(onSendMessage(text))
            setText('')
        }
    }

    const addEmoji = ({ native }) => {
        setText((text + ' ' + native).trim())
        inputBlockRef.current.focus()
    }

    const outsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(emojiBlockRef.current)) {
            setEmojiPickerVisible(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', outsideClick)
        return () => {
            document.body.removeEventListener('click', outsideClick)
        };
    }, []);

    return (
        <div className="ch-input">
            <div className="ch-input__smile-btn">
                {emojiPickerVisible && <div className="ch-input__emoji" ref={emojiBlockRef}>
                    <Picker set="apple" onSelect={(emojiTag) => addEmoji(emojiTag)} onLeave={(a, b) => console.log(a, b)} enableFrequentEmojiSort={true} />
                </div>}
                <SmileOutlined className="ch-input__icon" onClick={toggleEmojiPicker} />
            </div>
            <Input ref={inputBlockRef} value={text} onChange={e => setText(e.target.value)} onKeyUp={e => e.keyCode === 13 && handleSendMessage()} size="large" className="ch-input__input" placeholder="Введите текст сообщения" />
            <div className="ch-input__actions">
                <UploadField onFiles={files => console.log(files)} containerProps={{ className: 'ch-input__files' }} uploadProps={{ accept: '.jpg, .jpeg, .png, .gif, .bmp', multiple: 'multiple' }} >
                    <CameraOutlined className="ch-input__icon" />
                </UploadField>
                {text ? <SendOutlined className="ch-input__icon ch-input__icon-send" onClick={handleSendMessage} /> : <AudioOutlined className="ch-input__icon ch-input__icon-send" />}
            </div>
        </div >
    );
};

ChatInput.propTypes = {
    classNmae: PropTypes.string
}

export default ChatInput;