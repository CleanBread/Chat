import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { socket } from 'core';
import { dialogsActions } from 'redux/actions'
import { Dialogs as BaseDialog } from 'components'

const Dialogs = ({ fetchDialogs, setCurrentDialogId, currentDialogId, items, userId }) => {
    const [inputValue, setInputValue] = useState('');
    const [filtred, setFiltredItems] = useState(Array.from(items));

    const onChangeInput = value => {
        setFiltredItems(items.filter(dialog => dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0))
        setInputValue(value)
    }

    useEffect(() => {
        if (!items.length) {
            fetchDialogs()
        } else {
            setFiltredItems(items)
        }
    }, [items])

    useEffect(() => {

        socket.on('SERVER:DIALOG_CREATED', data => {
            fetchDialogs()
        })
        socket.on('SERVER:NEW_MESSAGE', data => {
            fetchDialogs()
        })
    }, [])


    return <BaseDialog userId={userId} items={filtred} onSearch={onChangeInput} inputValue={inputValue} onSelectDialog={setCurrentDialogId} currentDialogId={currentDialogId} />
};


export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);