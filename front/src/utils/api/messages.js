import { axios } from 'core'

export default {
    getAllByDialogId: (id) => axios.get(`/messages?dialog=${id}`),
    sendMessage: (obj) => axios.post(`/messages`, obj)
}