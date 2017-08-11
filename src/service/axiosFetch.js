import CommonConfig from '../config/commonConfig';
import axios from 'axios';

export default async (url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase();
    url = CommonConfig.apiUrl + url;
    if (type == 'GET') {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data
            }).then(function (response) {
                if (typeof response !== 'object') {
                    response = JSON.parse(response);
                }
                resolve(response.data);
            }).catch(function (error) {
                console.log(error)
                reject(error);
            });
        });
    }
    else {
        return new Promise((resolve, reject) => {
            axios.post(url, data).then(function (response) {
                if (typeof response !== 'object') {
                    response = JSON.parse(response);
                }
                resolve(response.data);
            }).catch(function (error) {
                reject(requestObj);
            });
        });
    }
}