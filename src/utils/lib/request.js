import axios from 'axios';
import {CloneDeep} from 'common';
import pathToRegexp from 'path-to-regexp';
const encodeParam = (data = {}) => {
    let formBody = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
};

const fetch = (options) => {
    let {
        method = 'get',
        data,
        url
    } = options;
    const cloneData = CloneDeep(data);
    try {
        let domin = '';
        if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
            domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
            url = url.slice(domin.length);
        }
        const match = pathToRegexp.parse(url);
        url = pathToRegexp.compile(url)(data);
        for (let item of match) {
            if (item instanceof Object && item.name in cloneData) {
                delete cloneData[item.name];
            }
        }
        url = domin + url;
    } catch (e) {
        console.log(e.message);
    }
    axios.defaults.headers.common.Authorization = '';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    if (options.isForm && method.toLowerCase() == 'post') {
        return axios.create({
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).post(url, encodeParam(cloneData));
    }
    switch (method.toLowerCase()) {
    case 'get':
        return axios.get(url, {
            params: cloneData
        });
    case 'delete':
        return axios.delete(url, {
            data: cloneData
        });
    case 'post':
        return axios.post(url, cloneData);
    case 'put':
        return axios.put(url, cloneData);
    case 'patch':
        return axios.patch(url, cloneData);
    default:
        return axios(options);
    }
};

export default function request(options) {
    return fetch(options)
        .then((response) => {
            console.log(response);
            const {
                statusText,
                status
            } = response;
            let jsonResult = response.jsonResult;
            let data = response.data;
            return {
                success: true,
                message: statusText,
                statusCode: status,
                jsonResult,
                data,
                ...jsonResult
            };
        })
        .catch((error) => {
            const {response} = error;
            let msg;
            let statusCode;
            if (response && response instanceof Object) {
                const {
                    data,
                    statusText
                } = response;
                statusCode = response.status;
                msg = response.message || statusText;
            }
            return {
                success: false,
                statusCode,
                msg,
                code: 1
            };
        });
}