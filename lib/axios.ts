import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3131/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const get = async (url = '') => {
    try {
        const response = await instance.get(url)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export const post = async (url = '', data = {}) => {
    try {
        console.log(data)
        const response = await instance.post(url, data)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export const put = async (url = '', data = {}) => {
    try {
        const response = await instance.put(url, data)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}
export const del = async (url = '') => {
    try {
        const response = await instance.delete(url)
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}