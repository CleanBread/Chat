import React from 'react';
import { PropTypes } from 'prop-types';
import { Empty, Spin } from 'antd';

import { Message } from '../'
import './Messages.scss'

const Messages = ({blockRef, isLoading, items }) => {
    return <div className="messages" ref={blockRef}>
        {
            isLoading ? (
                <Spin className="messages__icon" tip="Loading..." />
            ) : items ? items.map(item => <Message key={item._id} {...item} />)
                    : (
                        <Empty className="messages__icon" description="Откройте диалог" />
                    )
        }
    </div>
    {/* <Message
                avatar="https://sun9-14.userapi.com/c852228/v852228230/1559aa/1QUIyUSDzH8.jpg?ava=1"
                text="hello"
                date={'Fri May 15 2020 01:59:24'}
                isMe={true}
                isReaded={true}
                attachments={[
                    {
                        filename: 'image.jpg',
                        url: 'https://sun6-19.userapi.com/7C-BtmTtAJzngAWLmj1kgh-9rfotDs49omQC0w/TAB6aVo2DJs.jpg'
                    },
                    {
                        filename: 'image.jpg',
                        url: 'https://sun9-68.userapi.com/c857536/v857536292/90db3/aBYg3cHeB3I.jpg'
                    },
                ]}
            />
            <Message
                avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                date={'Fri May 15 2020 01:59:24'}
                attachments={[
                    {
                        filename: 'image.jpg',
                        url: 'https://sun6-19.userapi.com/7C-BtmTtAJzngAWLmj1kgh-9rfotDs49omQC0w/TAB6aVo2DJs.jpg'
                    },
                ]}
            />
            <Message
                avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                isTyping
            /> */}
}

Messages.propTypes = {
    items: PropTypes.array
}

export default Messages