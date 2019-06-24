import axios from 'axios'

export const baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:9000/' : 'https://api.paywei.io/'

export const getApi = () => {
    const token = localStorage.getItem('authToken');
    const headers = token ? { 'Authorization': "Bearer " + token } : null
    return axios.create({
        baseURL, headers
    })
}
