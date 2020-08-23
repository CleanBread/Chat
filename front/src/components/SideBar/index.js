import React from 'react';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';
import { Modal, Select, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';

import { dialogsActions } from 'redux/actions';
import { userApi, dialogsApi } from 'utils/api';


import { Dialogs } from 'containers'

import './SideBar.scss'

const { Option } = Select;
const { TextArea } = Input

const SideBar = ({ userId }) => {
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [users, setUsers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [selectedUserId, setSelectedUserId] = React.useState(false)
    const [message, setMessage] = React.useState('')

    const onClose = () => setModalVisible(false)

    const onChangeSearch = (value) => setSearchValue(value)

    const onSearch = (value) => {
        setIsLoading(true)
        userApi.findUsers(value).then(({ data }) => {
            setUsers(data)
            setIsLoading(false)
        }).catch(() => setIsLoading(false))
    }

    const onSelectUser = (userId) => {
        setSelectedUserId(userId)
    }

    const onAddDialog = () => {
        dialogsApi.create({
            partner: selectedUserId,
            text: message
        }).then(({ data }) => {
            if (data.dialogId) {

                dispatch(dialogsActions.setCurrentDialogId(data.dialogId))
            }
            setIsLoading(false)
            onClose()
        }).catch(() => setIsLoading(false))
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

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
                className="sidebar__modal"
                onCancel={onClose}
                footer={[
                    <Button key="back" onClick={onClose}>Закрыть</Button>,
                    <Button type="primary" disabled={message === ''} key="create" loading={isLoading} onClick={onAddDialog}>Создать</Button>
                ]}
            >
                <h2>Введите имя или почту пользователя</h2>
                <Select
                    placeholder='Введите имя или почту пользователя'
                    onSearch={onSearch}
                    onChange={onChangeSearch}
                    value={searchValue}
                    notFoundContent={null}
                    className="sidebar__modal-input"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    showSearch
                    onSelect={onSelectUser}
                    users={users}
                >
                    {options}
                </Select>
                {selectedUserId && <><h2>Введите сообщение</h2>
                    <TextArea value={message} onChange={onChangeMessage} className="sidebar__modal-input" /></>}
            </Modal>
        </>
    );
};


export default SideBar;