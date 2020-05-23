import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { dialogsActions } from 'redux/actions'
import { Dialogs as BaseDialog } from 'components'

const Dialogs = ({ fetchDialogs, setCurrentDialogId, items, userId }) => {

    const [inputValue, setInputValue] = useState('');
    const [filtred, setFiltredItems] = useState(Array.from(items));

    const onChangeInput = value => {
        setFiltredItems(items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0))
        setInputValue(value)
    }

    useEffect(() => {
        if (!items.length) {
            fetchDialogs()
        } else {
            setFiltredItems(items)
        }
    }, [items])

    return <BaseDialog userId={userId} items={filtred} onSearch={onChangeInput} inputValue={inputValue}  onSelectDialog={setCurrentDialogId}/>
};


export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);