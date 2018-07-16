import {request} from 'utils/index';
import {api} from './apiConfig';

export async function addNum() {
    return request({
        url: api.getList,
        method: 'post',
        data: {}
    })
}