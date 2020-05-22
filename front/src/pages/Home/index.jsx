import React from 'react';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Message, Status, ChatInput } from 'components'
import { Dialogs } from 'containers'

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
                        items={
                            [
                            ]
                        }
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
                    <div className="chat__dialog-messages">
                        <Message
                            avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                            text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
                            date={'Fri May 15 2020 01:57:24'}
                            isMe={false}
                            attachments={[
                                {
                                    filename: 'image.jpg',
                                    url: 'https://sun6-19.userapi.com/7C-BtmTtAJzngAWLmj1kgh-9rfotDs49omQC0w/TAB6aVo2DJs.jpg'
                                },
                            ]}
                        />
                        <Message
                            avatar="https://sun9-14.userapi.com/c852228/v852228230/1559aa/1QUIyUSDzH8.jpg?ava=1"
                            text="hello"
                            date={'Fri May 15 2020 01:59:24'}
                            isMe={true}
                            isReaded={true}
                            attachments={[
                                {
                                    filename: 'image.jpg',
                                    url: 'https://sun6-19.userapi.com/7C-BtmTtAJzngAWLmj1kgh-9rfotDs49omQC0w/TAB6aVo2DJs.jpg'
                                },
                                {
                                    filename: 'image.jpg',
                                    url: 'https://sun9-68.userapi.com/c857536/v857536292/90db3/aBYg3cHeB3I.jpg'
                                },
                            ]}
                        />
                        <Message
                            avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                            date={'Fri May 15 2020 01:59:24'}
                            attachments={[
                                {
                                    filename: 'image.jpg',
                                    url: 'https://sun6-19.userapi.com/7C-BtmTtAJzngAWLmj1kgh-9rfotDs49omQC0w/TAB6aVo2DJs.jpg'
                                },
                            ]}
                        />
                        <Message
                            avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                            isTyping
                        />
                    </div>
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