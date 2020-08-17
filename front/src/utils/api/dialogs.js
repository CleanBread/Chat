import { axios } from 'core'

export default {
    getAll: () => axios.get('dialogs'),
    create: (obj) => axios.post('dialogs', obj)
}