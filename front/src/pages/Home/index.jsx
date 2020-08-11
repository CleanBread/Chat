import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Status, ChatInput } from 'components'
import { Dialogs, Messages } from 'containers'
import { userActions } from 'redux/actions';

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


    return (
        <section className="home">
            <div className="chat">
                <div className="chat__sidebar">
                    <div className="chat__sidebar-header">
                        <div className="chat__sidebar-header-box">
                            <TeamOutlined className="chat__sidebar-header-icon" />
                            <span>Список диалогов</span>
                        </div>
                        <FormOutlined className="chat__sidebar-header-icon" />
                    </div>
                    <Dialogs
                        userId={userId}
                    />
                </div>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <b className="chat__dialog-header-username">
                            {
                                dialogs.map(item => item._id === currentDialogId ? item.author.fullname : '')
                            }
                        </b>
                        <div className="chat__dialog-header-status">
                            <Status online={true} />
                        </div>
                        <EllipsisOutlined className="chat__dialog-header-icon" />
                    </div>
                    <Messages userId={userId} />
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;