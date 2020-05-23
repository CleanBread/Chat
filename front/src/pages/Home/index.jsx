import React from 'react';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Status, ChatInput } from 'components'
import { Dialogs, Messages } from 'containers'

import './Home.scss'

const Home = (props) => {
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
                        userId={0}
                    />
                </div>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <b className="chat__dialog-header-username">Федор Достаевский</b>
                        <div className="chat__dialog-header-status">
                            <Status online />
                        </div>
                        <EllipsisOutlined className="chat__dialog-header-icon" />
                    </div>
                    <Messages />
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
                </div>
            </div>
            {/*
            <Message
                avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                date={'Fri May 15 2020 01:57:24'}
                isMe={false}
                audio='https://notificationsounds.com/soundfiles/069059b7ef840f0c74a814ec9237b6ec/file-de_vuvuzela-power-down.mp3'
            /> */}
        </section>
    );
};

export default Home;