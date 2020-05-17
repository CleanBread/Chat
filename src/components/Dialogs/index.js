import React from 'react';
import PropTypes from 'prop-types'
import orderBy from 'lodash/orderBy'

import { DialogItem } from 'components'
import './Dialogs.scss'

const Dialogs = ({items, userId}) => {
    return (
        <div className="dialogs">
            {/* {items &&
                items.map(item => (
                    <DialogItem
                        key={item._id}
                        user={item.user}
                        message={item}
                        unreadedCount={0}
                        isMe={item.user._id === userId}
                    />
                ))
            } */}
            {orderBy(items, ['created_at'], ['desc']).map(item => (
                    <DialogItem
                        key={item.user._id}
                        {...item}
                        unreadedCount={0}
                        isMe={item.user._id === userId}
                    />
                ))}
        </div>
    );
};

Dialogs.propTypes ={
    classNmae: PropTypes.string
}

export default Dialogs;