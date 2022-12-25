import axios from 'axios';
import config from './config';

export default async function callAPI(endpoint, method = 'get', data) {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const token = sessionStorage.getItem('token')
      }
    const configs = {
        method,
        url: `http://${config.server}:${config.port}${config.baseURL}/${endpoint}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data
    }

    return new Promise((resolve, reject) => {
        axios(configs).then(res => {
            resolve(res.data);
        }).catch(error => {
            console.log(error);
            reject(error)
        })
    })
    // return res.data
}