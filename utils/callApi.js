import axios from 'axios';
import config from './config';

export default async function callAPI(endpoint, method = 'get', data) {
    const configs = {
        method,
        url: `http://${config.server}:${config.port}${config.baseURL}/${endpoint}`,
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
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