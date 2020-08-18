import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import { Status } from 'components'

import './DialogHeader.scss'

const DialogHeader = ({ partner }) => {
    return (

        <div className="dialog-header">
            {
                Object.keys(partner).length ?
                    <>

                        <b className="dialog-header__username">
                            {
                                partner.fullname
                            }
                        </b>
                        <div className="dialog-header__status">
                            <Status online={partner.isOnline} />
                        </div>
                        <EllipsisOutlined className="dialog-header__icon" />
                    </> : ''
            }
        </div>
    );
}

export default DialogHeader;
