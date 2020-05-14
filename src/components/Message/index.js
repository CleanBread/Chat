import PropTypes from 'prop-types'
import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import classNames from 'classnames'
import ruLocale from 'date-fns/locale/ru'
import checkedSvg from 'assets/img/checked.png'
import deliveredSvg from 'assets/img/delivered.png'

import './Message.scss'

const Message = ({ avatar, user, text, date, isMe, isReaded, attachments, isTyping }) => {
    return (
        <div className={classNames('message', { 'message--isme': isMe }, { 'message--is--typing': isTyping })}>
            <div className="message__avatar">
                <img src={avatar} alt={`Avatar ${user.fullname}`} />
            </div>
            <div className="message__content">
                {attachments ?
                    <div className="message__attachments">
                        {attachments.map((item, i) => (
                            <div className="message__attachments-item" key={i}>
                                <img src={item.url} alt={item.filename} />
                            </div>
                        ))}
                    </div> : ''
                }
                <div className="message__bubble">
                    {isMe ? isReaded ? <img src={checkedSvg} alt="checked icon" /> : <img src={deliveredSvg} alt="delivered icon" /> : ''}
                    {text && <p className="message__text">{text}</p>}
                    {isTyping && <div className="message__typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>}
                </div>
                {date && <span className="message__date">{formatDistanceToNow(date, { addSuffix: true, locale: ruLocale })}</span>}
            </div>
        </div>
    );
};

Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    avatar: PropTypes.string,
    user: PropTypes.object,
    text: PropTypes.string,
    date: PropTypes.object,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool
}

export default Message;