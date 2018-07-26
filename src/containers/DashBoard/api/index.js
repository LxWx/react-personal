import {request} from '../../../utils/index';
import {api} from './apiConfig';

// 我的查询
export async function searchQueryTaskInstance(data) {
    return request({
        url: api.searchQueryTaskInstance,
        method: 'get',
        data: data
    });
}
// 我的查询-查看全部
export async function searchQueryTaskInstanceByPage(data) {
    return request({
        url: api.searchQueryTaskInstanceByPage,
        method: 'get',
        data: data
    });
}
// 模板化
export async function saveQueryTaskInstanceToTemplate(data) {
    return request({
        url: api.saveQueryTaskInstanceToTemplate,
        method: 'get',
        data: data
    });
}

// 我的查询- 查看
export async function searchQueryTaskResult(data) {
    return request({
        url: api.searchQueryTaskResult,
        method: 'get',
        data: data
    });
}

// 删除- 我的模板
export async function deleteTemplate(data) {
    return request({
        url: api.deleteTemplate,
        method: 'delete',
        data: data
    });
}

// 获取我的定时任务
export async function searchTimedQueryTask(data) {
    return request({
        url: api.searchTimedQueryTask,
        method: 'get',
        data: data
    });
}

// 我的定时任务-查看全部
export async function searchTimedQueryTaskByPage(data) {
    return request({
        url: api.searchTimedQueryTaskByPage,
        method: 'get',
        data: data
    });
}

// 我的定时任务-查看
export async function searchQueryTaskById(data) {
    return request({
        url: api.searchQueryTaskById,
        method: 'get',
        data: data
    });
}

// 我的定时任务-删除
export async function deleteQueryTask(data) {
    return request({
        url: api.deleteQueryTask,
        method: 'delete',
        data: data
    });
}

// 我的模板
export async function searchQueryTemplate(data) {
    return request({
        url: api.searchQueryTemplate,
        method: 'get',
        data: data
    });
}

// 我的模板-查看全部
export async function searchQueryTemplateByPage(data) {
    return request({
        url: api.searchQueryTemplateByPage,
        method: 'get',
        data: data
    });
}

// 我的模板-定时
export async function submitTimedQueryTaskByTemplateId(data) {
    return request({
        url: api.submitTimedQueryTaskByTemplateId,
        method: 'get',
        data: data
    });
}

// 我的模板-执行   
export async function submitQueryTaskByTemplateId(data) {
    return request({
        url: api.submitQueryTaskByTemplateId,
        method: 'get',
        data: data
    });
}

// 我的查询-废弃结果  
export async function deleteQueryTaskInstanceResult(data) {
    return request({
        url: api.deleteQueryTaskInstanceResult,
        method: 'delete',
        data: data
    });
}

// 最近的查询 
export async function searchLatestQueryTaskInstance(data) {
    return request({
        url: api.searchLatestQueryTaskInstance,
        method: 'get',
        data: data
    });
}


