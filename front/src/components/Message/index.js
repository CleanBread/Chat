import PropTypes from 'prop-types'
import React from 'react';
import { Popover, Button } from 'antd';
import classNames from 'classnames'

import { Time, IconReaded, Avatar } from 'components'
import MessageAudio from './MessageAudio'

import './Message.scss'

const Message = ({ avatar, user, text, date, isMe, isReaded, attachments, isTyping, audio, onRemoveMessage }) => {

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
                    'message--image': attachments && !text && attachments.length === 1,
                    'message--is--audio': !!audio
                })}
            >
                <div className="message__avatar">
                    <Avatar user={user} />
                </div>
                <div className="message__content">
                    {attachments &&
                        <div className="message__attachments">
                            {attachments.map((item, i) => (
                                <div className="message__attachments-item" key={i}>
                                    <img src={item.url} alt={item.filename} />
                                </div>
                            ))}
                        </div>
                    }
                    {(audio || text || isTyping) && <div className="message__bubble">
                        <IconReaded isMe={isMe} isReaded={isReaded} />
                        {text && <p className="message__text">{text}</p>}
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
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    audio: PropTypes.string,
    isReaded: PropTypes.bool
}

export default Message;