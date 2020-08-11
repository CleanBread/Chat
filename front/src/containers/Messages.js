import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'

import { messagesActions } from 'redux/actions'
import { Messages as BaseMassages } from 'components'
import { socket } from 'core';


const Messages = ({ isLoading, currentDialogId, fetchMessages, items, userId }) => {
    const messagesRef = useRef(null)

    useEffect(() => {
        if (currentDialogId !== null) {
            fetchMessages(currentDialogId)
        }
    }, [currentDialogId])

    useEffect(() => {

        socket.on('SERVER:NEW_MESSAGE', data => {
            if (data.dialog._id === currentDialogId) {
                fetchMessages(currentDialogId)
            }
        })
    }, [])

    useEffect(() => {
        messagesRef.current.scrollTo(0, 9999)
    }, [items])



    return <BaseMassages blockRef={messagesRef} isLoading={isLoading} items={items} userId={userId} />
};


export default connect(({ dialogs, messages }) => ({ items: messages.items, currentDialogId: dialogs.currentDialogId, isLoading: messages.isLoading }), messagesActions)(Messages);