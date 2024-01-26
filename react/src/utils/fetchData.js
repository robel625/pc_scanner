import axios from 'axios'
import {BASE_URL}  from './config'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`,
    {headers: {'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token}}
    )
    
    return res;
}

export const postloginAPI = async (url, post, token) => {
    const res = await axios.post(`${BASE_URL }/api/${url}`, post, {headers: {'Content-Type': 'multipart/form-data'}
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${BASE_URL }/api/${url}`, post, {headers: {'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${BASE_URL }/api/${url}`, post, 
    {headers: {'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + token}}
    )
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${BASE_URL }/api/${url}`, post, 
    {headers: {'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token}}
        )
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${BASE_URL }/api/${url}`, 
    {headers: {'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + token}}
              )
    return res;
}