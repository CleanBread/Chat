import { messagesApi } from 'utils/api'

const actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    removeMessageById: (id) => dispatch => {
        messagesApi.removeById(id).then(() => {
            dispatch({
                type: 'MESSAGES:REMOVE_MESSAGE',
                payload: id
            })
        })
    },
    sendMessage: (text, files = []) => (dispatch, getState) => {
        const { dialogs } = getState()
        messagesApi.sendMessage({
            dialog_id: dialogs.currentDialogId,
            text,
            files
        })
    },
    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState()
        const { currentDialogId } = dialogs
        if (currentDialogId === message.dialog._id) {
            dispatch({
                type: 'MESSAGES:ADD_MESSAGE',
                payload: message
            })
        }
    },
    fetchMessages: (dialogId) => dispatch => {
        dispatch(actions.setIsLoading(true))
        messagesApi.getAllByDialogId(dialogId).then(({ data }) => {
            dispatch(actions.setMessages(data))
        })
            .catch(() => {
                dispatch(actions.setIsLoading(false))
            })
    },
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    })
}

export default actions