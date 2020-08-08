import { axios } from 'core'

export default {
    login: (postData) => axios.post(`user/login`, postData),
    getMe: () => axios.get(`user/me`),
    verifyHash: (hash) => axios.get(`user/verify?hash=${hash}`),
    registration: (postData) => axios.post('user/registration', postData)
}