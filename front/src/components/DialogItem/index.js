import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import { Link } from 'react-router-dom';
import { Emoji } from 'emoji-mart'
import reactStringReplace from 'react-string-replace';

import { IconReaded, Avatar } from 'components'

import './DialogItem.scss'

const getMessageTime = created_at => {
    if (isToday(new Date(created_at))) {
        return format(new Date(created_at), "HH:mm")
    } else {
        return format(new Date(created_at), "dd.MM.yyyy")
    }
}

const DialogItem = ({ _id, user, unreadedCount, isMe, lastMessage, currentDialogId }) => {


    return (
        <Link to={`/dialogs/${_id}`}>
            <div className={classNames('dialogs__item', {
                'dialogs__item--online': user.isOnline,
                'active': _id === currentDialogId
            })}
            >
                <div className="dialogs__item-avatar">
                    <Avatar user={user} />
                    <div className="dialogs__item-avatar-online"></div>
                </div>
                <div className="dialogs__item-info">
                    <div className="dialogs__item-info-top">
                        <b>{user.fullname}</b>
                        <span>
                            {getMessageTime(lastMessage.createdAt)}
                        </span>
                    </div>
                    <div className="dialogs__item-info-bottom">
                        <p>{
                            reactStringReplace(lastMessage.text, /:(.+?):/g, (match, i) => {
                                return <Emoji key={i} emoji={match} set="apple" size={22} />
                            })
                        }</p>
                        <IconReaded isMe={isMe} isReaded={false} />
                        {unreadedCount > 0 && <div className="dialogs__item-info-count">{unreadedCount > 99 ? '99+' : unreadedCount}</div>}
                    </div>
                </div>
            </div>
        </Link>
    );
};

DialogItem.propTypes = {
    classNmae: PropTypes.string
}

export default DialogItem;