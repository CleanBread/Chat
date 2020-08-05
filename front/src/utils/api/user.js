import { axios } from 'core'

export default {
    login: (postdata) => axios.post(`user/login`, postdata),
    getMe: () => axios.get(`user/me`)
}