import { userApi } from 'utils/api'
import { openNotification } from 'utils/helpers'

const actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data
    }),
    setIsAuth: bool => ({
        type: 'USER:SET_IS_AUTH',
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data))
        }).catch(({ response }) => {
            if (response.status === 403) {
                dispatch(actions.setIsAuth(false))
                delete window.localStorage.token
            }
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
                dispatch(actions.setUserData(data.user))
                dispatch(actions.setIsAuth(true))
            }
            return data
        })
    },
    userRegistration: (postData) => dispatch => {
        return userApi.registration(postData).then(({ data }) => {
            return data
        })
    }
}

export default actions