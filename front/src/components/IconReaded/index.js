import React from 'react';
import PropTypes from 'prop-types';

import checkedSvg from 'assets/img/checked.png'
import deliveredSvg from 'assets/img/delivered.png'


const IconReaded = ({isMe, isReaded}) => isMe ? isReaded ? <img src={checkedSvg} alt="checked icon" /> : <img src={deliveredSvg} alt="delivered icon" /> : ''

IconReaded.propTypes ={
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool
}

export default IconReaded;