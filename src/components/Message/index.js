import PropTypes from 'prop-types'
import React, { useState } from 'react';
import classNames from 'classnames'

import { Time, IconReaded } from 'components'

import './Message.scss'

import waveSvg from 'assets/img/wave.svg'
import playSvg from 'assets/img/play.svg'
import pauseSvg from 'assets/img/pause.svg'

const Message = ({ avatar, user, text, date, isMe, isReaded, attachments, isTyping, audio }) => {

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div 
            className={classNames('message', { 
                'message--isme': isMe,
                'message--is--typing': isTyping,
                'message--image': attachments && !text && attachments.length === 1,
                'message--is--audio': !!audio
            })}
        >
            <div className="message__avatar">
                <img src={avatar} alt={`Avatar ${user.fullname}`} />
            </div>
            <div className="message__content">
                {attachments &&
                    <div className="message__attachments">
                        {attachments.map((item, i) => (
                            <div className="message__attachments-item" key={i}>
                                <img src={item.url} alt={item.filename} />
                            </div>
                        ))}
                    </div>
                }
                {(audio || text || isTyping) && <div className="message__bubble">
                    <IconReaded isMe={isMe} isReaded={isReaded} />
                    {text && <p className="message__text">{text}</p>}
                    {isTyping && <div className="message__typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>}
                    {audio &&
                        <div className="message__audio">
                            <div className="message__audio-progress" style={{width: '50%'}}></div>
                            <div className="message__audio-info">
                                <div className="message__audio-btn">
                                    {isPlaying ? 
                                        <img src={pauseSvg} alt=""/> : <img src={playSvg} alt=""/>
                                    }
                                </div>
                                <div className="message__audio-wave">
                                    <img src={waveSvg} alt="audio"/>
                                </div>
                                <span className="message__audio-duration">00:19</span>
                            </div>
                        </div>
                    }
                </div>}
                <div className="message__date">
                    {date && <Time date={date} />}
                </div>
            </div>
        </div>
    );
};

Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    avatar: PropTypes.string,
    user: PropTypes.object,
    text: PropTypes.string,
    date: PropTypes.string,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    audio: PropTypes.string,
    isReaded: PropTypes.bool
}

export default Message;