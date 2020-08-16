import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'

import { messagesActions } from 'redux/actions'
import { Messages as BaseMassages } from 'components'
import { socket } from 'core';


const Messages = ({ isLoading, currentDialogId, addMessage, fetchMessages, items, userId }) => {
    const messagesRef = useRef(null)

    const onNewMessage = data => {
        if (data.dialog._id === window.location.pathname.split('/dialogs/')[1]) {
            addMessage(data)
        }
    }

    useEffect(() => {
        if (currentDialogId !== null) {
            fetchMessages(currentDialogId)
        }
    }, [currentDialogId])

    useEffect(() => {

        socket.on('SERVER:NEW_MESSAGE', onNewMessage)

        return () => {
            socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
        }
    }, [])

    useEffect(() => {
        messagesRef.current.scrollTo(0, 9999)
    }, [items])



    return <BaseMassages blockRef={messagesRef} isLoading={isLoading} items={items} userId={userId} />
};


export default connect(({ dialogs, messages }) => ({ dialogs, items: messages.items, currentDialogId: dialogs.currentDialogId, isLoading: messages.isLoading }), messagesActions)(Messages);