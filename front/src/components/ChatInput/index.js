import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { UploadField } from '@navjobs/upload'
import { useDispatch } from 'react-redux';
import { Picker } from 'emoji-mart'

import { filesApi } from 'utils/api';

import { Files } from 'components';

import './ChatInput.scss'

const { TextArea } = Input

const ChatInput = ({ onSendMessage, currentDialogId }) => {
    const dispatch = useDispatch()
    const emojiBlockRef = useRef()
    const inputBlockRef = useRef()

    const [text, setText] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [files, setFiles] = useState([])

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible)
    }

    const handleSendMessage = () => {
        if (text) {

            dispatch(onSendMessage(text))
            setText('')
        }
    }

    const addEmoji = ({ colons }) => {
        setText((text + ' ' + colons).trim())
        inputBlockRef.current.focus()
    }

    const outsideClick = (e) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(emojiBlockRef.current)) {
            setEmojiPickerVisible(false)
        }
    }

    const onSelectFiles = async files => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: "uploading"
                }
            ];
            setFiles(uploaded);
            // eslint-disable-next-line no-loop-func
            await filesApi.upload(file).then(({ data }) => {
                uploaded = uploaded.map(item => {
                    if (item.uid === uid) {
                        return {
                            status: "done",
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url
                        };
                    }
                    return item;
                });
            });
        }
        setFiles(uploaded);
    };

    useEffect(() => {
        document.body.addEventListener('click', outsideClick)
        return () => {
            document.body.removeEventListener('click', outsideClick)
        };
    }, []);

    return (
        <div className="ch-input">

            {
                currentDialogId ?
                    <>
                        <div className="ch-input__box">
                            <div className="ch-input__smile-btn">
                                {emojiPickerVisible && <div className="ch-input__emoji" ref={emojiBlockRef}>
                                    <Picker set="apple" onSelect={(emojiTag) => addEmoji(emojiTag)} onLeave={(a, b) => console.log(a, b)} enableFrequentEmojiSort={true} />
                                </div>}
                                <SmileOutlined className="ch-input__icon" onClick={toggleEmojiPicker} />
                            </div>
                            <TextArea ref={inputBlockRef} value={text} autoSize={{ minRows: 1, maxRows: 10 }} onChange={e => setText(e.target.value)} onKeyUp={e => e.keyCode === 13 && handleSendMessage()} size="large" className="ch-input__input" placeholder="Введите текст сообщения" />
                            <div className="ch-input__actions">
                                <UploadField onFiles={files => { onSelectFiles(files) }} containerProps={{ className: 'ch-input__files' }} uploadProps={{ accept: '.jpg, .jpeg, .png, .gif, .bmp', multiple: 'multiple' }} >
                                    <CameraOutlined className="ch-input__icon" />
                                </UploadField>
                                {text ? <SendOutlined className="ch-input__icon ch-input__icon-send" onClick={handleSendMessage} /> : <AudioOutlined className="ch-input__icon ch-input__icon-send" />}
                            </div>
                        </div>
                        {
                            files.length ? (
                                <div className="ch-input__box-files">
                                    <Files files={files} />
                                </div>) : ''}
                    </> : ''
            }
        </div >
    );
};

ChatInput.propTypes = {
    classNmae: PropTypes.string
}

export default ChatInput;