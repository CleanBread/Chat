import React from 'react';

import { Dialogs, Message } from 'components'

import './Home.scss'

const Home = (props) => {
    return (
        <section className="home">
            <Dialogs 
                userId={0}
                items={[
                    {
                        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime perferendis numquam assumenda voluptatibus eius corrupti natus expedita aperiam! Tenetur minima accusantium et provident eos architecto autem eaque reiciendis suscipit distinctio?',
                        created_at: 'Sat May 16 2020 20:36:13',
                        user: {
                            _id: 0,
                            fullname: 'Федор Достаевский',
                            avatar: 'https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3'
                        },
                        isOnline: true
                    },
                    {
                        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime perferendis numquam assumenda voluptatibus eius corrupti natus expedita aperiam! Tenetur minima accusantium et provident eos architecto autem eaque reiciendis suscipit distinctio?',
                        created_at: 'Sat May 17 2020 20:36:13',
                        user: {
                            _id: 1,
                            fullname: 'Федор Достаевский',
                            avatar: 'https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3'
                        },
                        isOnline: true
                    }
                ]}
            />
            <Message
                avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                date={'Fri May 15 2020 01:57:24'}
                isMe={false}
                audio='https://notificationsounds.com/soundfiles/069059b7ef840f0c74a814ec9237b6ec/file-de_vuvuzela-power-down.mp3'
            />
            
            {/* <Message
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
            /> */}
        </section>
    );
};

export default Home;