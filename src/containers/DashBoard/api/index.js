import {request} from '../../../utils/index';
import {api} from './apiConfig';

export async function addNum(data) {
    return request({
        url: api.getList,
        method: 'post',
        data: data
    });
}