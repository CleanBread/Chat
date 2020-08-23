import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';

import { ChatInput, SideBar, DialogHeader } from 'components'
import { Messages } from 'containers'
import { userActions, messagesActions, dialogsActions } from 'redux/actions';

import './Home.scss'

const Home = (props) => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(userActions.fetchUserData())
    }, [])

    const { userId, currentDialogId, dialogs } = useSelector(({ user, dialogs }) => {
        if (user.data) {
            return {
                userId: user.data._id,
                currentDialogId: dialogs.currentDialogId,
                dialogs: dialogs.items
            }
        }
        return {
            userId: 0,
            currentDialogId: dialogs.currentDialogId,
            dialogs: dialogs.items
        }
    })

    const [partner, setPartner] = React.useState({})

    React.useEffect(() => {
        dialogs.map(item => {
            if (item._id === currentDialogId) {
                userId === item.author._id ? setPartner(item.partner) : setPartner(item.author)
            }
        })
    }, [currentDialogId, dialogs])

    React.useEffect(() => {
        const dialogId = props.location.pathname.split('/').pop() === 'dialogs' ? '' : props.location.pathname.split('/').pop();
        dispatch(dialogsActions.setCurrentDialogId(dialogId))
    }, [props.location])


    return (
        <section className="home">
            <div className="chat">
                <SideBar userId={userId} />

                <div className="chat__dialog">
                    <DialogHeader partner={partner} currentDialogId={currentDialogId} />
                    <Messages userId={userId} />
                    <div className="chat__dialog-input">
                        <ChatInput currentDialogId={currentDialogId} onSendMessage={messagesActions.sendMessage} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Home);