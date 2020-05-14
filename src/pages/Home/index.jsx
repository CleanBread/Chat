import React from 'react';

import { Message } from 'components'
import './Home.scss'

const Home = (props) => {
    return (
        <section className="home">
            <Message
                avatar="https://sun9-58.userapi.com/impf/c846321/v846321478/134728/NqBjZKEFHBo.jpg?size=200x0&quality=90&sign=a92aee3712533892a7c08c761b6cdff3"
                text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
                date={new Date()}
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
                date={new Date()}
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
                isTyping
            />
        </section>
    );
};

export default Home;