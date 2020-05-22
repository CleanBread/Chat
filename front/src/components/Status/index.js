import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Status.scss'

const Status = ({online}) => {
    return (
        <div className={classNames('status', {
            'status--online': online
        })}>
            <span>{online ? 'онлайн' : 'офлайн'}</span>
        </div >
    );
};

Status.propTypes = {
    online: PropTypes.bool
}

export default Status;