import PropTypes from 'prop-types'
import React from 'react';
import { Popover, Button } from 'antd';
import classNames from 'classnames'
import { Emoji } from 'emoji-mart'
import reactStringReplace from 'react-string-replace';

import { Time, IconReaded, Avatar } from 'components'
import MessageAudio from './MessageAudio'

import './Message.scss'

const Message = ({ avatar, user, text, date, isMe, isReaded, files, isTyping, audio, onRemoveMessage, readed }) => {

    return (
        <Popover
            content={
                <Button type="primary" onClick={onRemoveMessage}>Удалить сообщение</Button>
            }
            trigger={isMe ? 'hover' : ''}
            placement={isMe ? 'left' : 'right'}
        >
            <div
                className={classNames('message', {
                    'message--isme': isMe,
                    'message--is--typing': isTyping,
                    'message--image': files && !text && files.length === 1,
                    'message--is--audio': !!audio
                })}
            >
                <div className="message__avatar">
                    <Avatar user={user} />
                </div>
                <div className="message__content">
                    {files &&
                        <div className="message__attachments">
                            {files.map((item, i) => (
                                <div className="message__attachments-item" key={i}>
                                    <img src={item.url} alt={item.filename} />
                                </div>
                            ))}
                        </div>
                    }
                    {(audio || text || isTyping) && <div className="message__bubble">
                        <IconReaded isMe={isMe} isReaded={readed} />
                        {text && (<p className="message__text">
                            {
                                reactStringReplace(text, /:(.+?):/g, (match, i) => {
                                    return <Emoji key={i} emoji={match} set="apple" size={22} />
                                })
                            }
                        </p>)}
                        {isTyping && <div className="message__typing">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>}
                        {audio &&
                            <MessageAudio audio={audio} />
                        }
                    </div>}
                    <div className="message__date">
                        {date && <Time date={date} />}
                    </div>
                </div>
            </div>
        </Popover>
    );
};

Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    avatar: PropTypes.string,
    user: PropTypes.object,
    text: PropTypes.string,
    date: PropTypes.string,
    filse: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    audio: PropTypes.string,
    isReaded: PropTypes.bool
}

export default Message;