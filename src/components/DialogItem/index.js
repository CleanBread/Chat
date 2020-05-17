import React from 'react';
import classNames from 'classnames'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'

import { IconReaded } from 'components'

import './DialogItem.scss'

const getMessageTime = created_at => {
    if(isToday(new Date(created_at))) {
        return format(new Date(created_at), "HH:mm")
    } else {
        return format(new Date(created_at), "dd.MM.yyyy")
    }
}

const getAvatar = avatar => {
    if (avatar) {
        return <img src={avatar} alt='user' />
    } else {
        // make avatar
    }
}

const DialogItem = ({ user, unreadedCount, isMe, isOnline, text, created_at }) => {
    return (
        <div className={classNames('dialogs__item', {
            'dialogs__item--online': isOnline
        })}>
            <div className="dialogs__item-avatar">
                {/* <img src={user.avatar} alt={`${user.fullname} avatar`} /> */}
                {getAvatar(user.avatar)}
                <div className="dialogs__item-avatar-online"></div>
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>{user.fullname}</b>
                    <span>
                        {getMessageTime(created_at)}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>{text}</p>
                    <IconReaded isMe={isMe} isReaded={false} />
                    {unreadedCount > 0 && <div className="dialogs__item-info-count">{unreadedCount > 99 ? '99+' : unreadedCount}</div>}
                </div>
            </div>
        </div>
    );
};

DialogItem.propTypes ={
    classNmae: PropTypes.string
}

export default DialogItem;