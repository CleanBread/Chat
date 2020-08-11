import React from 'react';
import { PropTypes } from 'prop-types';
import { Empty, Spin } from 'antd';

import { Message } from '../'
import './Messages.scss'

const Messages = ({ blockRef, isLoading, items, userId }) => {
    // debugger
    return <div className="messages" ref={blockRef}>
        {
            isLoading ? (
                <Spin className="messages__icon" tip="Loading..." />
            ) : items ? items.map(item => <Message key={item._id} {...item} isMe={userId === item.user._id} />)
                    : (
                        <Empty className="messages__icon" description="Откройте диалог" />
                    )
        }
    </div>
}

Messages.propTypes = {
    items: PropTypes.array
}

export default Messages