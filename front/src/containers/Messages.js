import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import { messagesActions } from 'redux/actions'
import { Messages as BaseMassages } from 'components'
import { socket } from 'core';


const Messages = ({ isLoading, currentDialogId, addMessage, fetchMessages, items, userId, removeMessageById, location }) => {
    const messagesRef = useRef(null)

    const onNewMessage = data => {
        if (data.dialog._id === window.location.pathname.split('/dialogs/')[1]) {
            addMessage(data)
        }
    }

    useEffect(() => {
        if (currentDialogId !== null && location.pathname !== '/dialogs') {
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



    return <BaseMassages blockRef={messagesRef} isLoading={isLoading} items={items} userId={userId} currentDialogId={currentDialogId} onRemoveMessage={removeMessageById} />
};


export default withRouter(connect(({ dialogs, messages }) => ({ dialogs, items: messages.items, currentDialogId: dialogs.currentDialogId, isLoading: messages.isLoading }), messagesActions)(Messages))