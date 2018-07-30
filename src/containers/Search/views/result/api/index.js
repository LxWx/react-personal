import {request} from 'utils/index';
import {api} from './apiConfig';


// 我的查询- 查看
export async function searchQueryTaskResult(data) {
    return request({
        url: api.searchQueryTaskResult,
        method: 'get',
        data: data
    });
}