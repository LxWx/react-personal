import {request} from 'utils/index';
import {api} from './apiConfig';

export async function searchCache(data) {
    return request({
        url: api.searchCache,
        method: 'get',
        data: data
    });
}

export async function searchOwnerTemplate(data) {
    return request({
        url: api.searchOwnerTemplate,
        method: 'get',
        data: data
    });
}

export async function searchQueryFields(data) {
    return request({
        url: api.searchQueryFields,
        method: 'get',
        data: data
    });
}

export async function submitQueryTask(data) {
    return request({
        url: api.submitQueryTask,
        method: 'post',
        data: data
    });
}

export async function searchByRunId(data) {
    return request({
        url: api.searchByRunId,
        method: 'post',
        data: data
    });
}

export async function searchQueryTask(data) {
    return request({
        url: api.searchQueryTask,
        method: 'post',
        data: data
    });
}
