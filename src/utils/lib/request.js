import axios from 'axios';
import {CloneDeep, getStorage} from 'common';
import pathToRegexp from 'path-to-regexp';
import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
} from './loading';
const encodeParam = (data = {}) => {
    let formBody = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
};

const $ = axios.create({
    timeout: 15000
});

// 请求拦截器
$.interceptors.request.use((config) => {
    if (config.showLoading) {
        showFullScreenLoading();
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 响应拦截器
$.interceptors.response.use((response) => {
    if (response.config.showLoading) {
        tryHideFullScreenLoading();
    }
    return response;
}, (error) => {
    tryHideFullScreenLoading();
    return Promise.reject(error);
});

const defaultConfig = { showLoading: true };

const fetch = (options) => {
    let {
        method = 'get',
        data,
        url
    } = options;
    data.ownerCode = getStorage('ownerCode') || '1001';
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
        return $.get(url, {
            params: cloneData,
            ...defaultConfig
        });
    case 'delete':
        return $.delete(url, {
            params: cloneData,
            ...defaultConfig
        });
    case 'post':
        return $.post(url, {...cloneData, ...defaultConfig});
    case 'put':
        return $.put(url, {...cloneData, ...defaultConfig});
    case 'patch':
        return $.patch(url, {...cloneData, ...defaultConfig});
    default:
        return axios(options);
    }
};

export default function request(options) {
    return fetch(options)
        .then((response) => {
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
                ...jsonResult,
                ...data
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