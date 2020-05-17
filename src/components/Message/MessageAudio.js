import PropTypes from 'prop-types'
import React, { useState, useRef, useEffect } from 'react';

import { convertTime } from 'utils/helpers'

import waveSvg from 'assets/img/wave.svg'
import playSvg from 'assets/img/play.svg'
import pauseSvg from 'assets/img/pause.svg'

const MessageAudio = ({audio}) => {
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioElem = useRef(null)

    const togglePlay = () => {
        audioElem.current.volume = '0.01'
        if(!isPlaying) {
            audioElem.current.play()
        } else {
            audioElem.current.pause()
        }
    }

    const audioPlaying = () => {
        setIsPlaying(true)
    }
    const audioEnded = () => {
        setIsPlaying(false)
        setProgress('0%')
        setCurrentTime(0)
    }
    const audioPause = () => {
        setIsPlaying(false)
    }
    const audioTimeUpdate = () => {
        const duration = audioElem.current.duration
        setCurrentTime(audioElem.current.currentTime)
        setProgress(`${audioElem.current.currentTime / duration * 100}%`)
        setCurrentTime(audioElem.current.currentTime)
    }

    useEffect(() => {
        if(audioElem.current) {
            const audio = audioElem.current
            audio.addEventListener('playing', audioPlaying)
            audio.addEventListener('ended', audioEnded)
            audio.addEventListener('pause', audioPause)
            audio.addEventListener('timeupdate', audioTimeUpdate)

            return function cleanup() {
                audio.removeEventListener('playing', audioPlaying)
                audio.removeEventListener('ended', audioEnded)
                audio.removeEventListener('pause', audioPause)
                audio.removeEventListener('timeupdate', audioTimeUpdate)
            }
        }
    })

    return (
        <div className="message__audio">
        <audio ref={audioElem} src={audio} preload="auto" />
        <div className="message__audio-progress" style={{width: progress}}></div>
        <div className="message__audio-info">
            <div className="message__audio-btn" onClick={togglePlay}>
                {isPlaying ? 
                    <img src={pauseSvg} alt=""/> : <img src={playSvg} alt=""/>
                }
            </div>
            <div className="message__audio-wave">
                <img src={waveSvg} alt="audio"/>
            </div>
            <span className="message__audio-duration">{convertTime(currentTime)}</span>
        </div>
    </div>
    )
}
MessageAudio.propTypes = {
    audio: PropTypes.string,
}
export default MessageAudio;