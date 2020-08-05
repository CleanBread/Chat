import { userApi } from 'utils/api'
import { openNotification } from 'utils/helpers'

const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data))
        })
    },
    fetchUserLogin: (postData) => dispatch => {
        return userApi.login(postData).then(({ data }) => {
            const { status, token } = data

            if (status === 'error') {
                openNotification({
                    text: 'Неверный логин или пароль',
                    type: 'error'
                })
            } else if (status === 'success') {
                openNotification({
                    text: 'Вход прошел успешно!',
                    type: 'success'
                })
                window.axios.defaults.headers.common["token"] = token
                window.localStorage['token'] = token

                dispatch(actions.fetchUserData())
            }
            return data
        })
    }
}

export default actions