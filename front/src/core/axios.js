import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3333'
axios.defaults.headers.common['token'] = window.localStorage.token

window.axios = axios

export default axios