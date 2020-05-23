import React from 'react';
import PropTypes from 'prop-types'
import orderBy from 'lodash/orderBy'
import { Input, Empty } from 'antd';

import { DialogItem } from 'components'
import './Dialogs.scss'

const Dialogs = ({ items, userId, onSearch, inputValue, onSelectDialog }) => {
    return (
        <>
        <div className="dialogs__search">
            <Input.Search value={inputValue} placeholder="Поиск среди контактов" onChange={e => onSearch(e.target.value)} />
        </div>
        <div className="dialogs__wrapper">
            <div className="dialogs">
                {items.length ? orderBy(items, ['created_at'], ['desc']).map(item => (
                    <DialogItem
                        onSelect={onSelectDialog}
                        key={item.user._id}
                        {...item}
                        unreadedCount={0}
                        isMe={item.user._id === userId}
                    />
                )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ничего не найдено" />}
            </div>
        </div>
        </>
    );
};

Dialogs.propTypes = {
    classNmae: PropTypes.string
}

export default Dialogs;