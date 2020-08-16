import React from 'react';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Modal, Select } from 'antd';


import { Dialogs } from 'containers'

import './SideBar.scss'

const { Option } = Select;

const SideBar = ({ userId }) => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [users, setUsers] = React.useState([])

    const onClose = () => setModalVisible(false)

    const onChangeSearch = (value) => setSearchValue(value)

    const onSearch = () => { }

    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);

    return (
        <>
            <div className="sidebar">
                <div className="sidebar__header">
                    <div className="sidebar__header-box">
                        <TeamOutlined className="sidebar__header-icon" />
                        <span>Список диалогов</span>
                    </div>
                    <FormOutlined className="sidebar__header-icon" onClick={() => setModalVisible(true)} />
                </div>
                <Dialogs
                    userId={userId}
                />
            </div>
            <Modal
                title="Создать диалог"
                visible={modalVisible}
                onOk={onClose}
                onCancel={onClose}
            >
                <Select
                    showSearch
                    value={searchValue}
                    placeholder={'Введите имя или почту пользователя'}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={onSearch}
                    onChange={onChangeSearch}
                    notFoundContent={null}
                    className="sidebar__modal-input"
                >
                    {options}
                </Select>
            </Modal>
        </>
    );
};

export default SideBar;