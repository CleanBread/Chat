import React from 'react';
import PropTypes from 'prop-types'

import { generateAvatar } from 'utils/helpers'

const Avatar = ({user}) => {
        if (user.avatar) {
            return <img src={user.avatar} alt='user' />
        } else {
            const colors = generateAvatar(user._id)
            const firstChar = user.fullname[0].toUpperCase()
            console.log(colors)
            return <div style={{background: `linear-gradient(135deg, ${colors.color} 0%, ${colors.colorLighten} 96.52%)`}} className="dialogs__item-avatar--empty">{firstChar}</div>
        }
}

Avatar.propTypes ={
    classNmae: PropTypes.string
}

export default Avatar;