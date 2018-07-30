import {
    createAction,
} from 'redux-actions';

export const getSearchQueryTaskInstance = createAction('getSearchQueryTaskInstance'); // 获取我的查询
export const setSearchQueryTaskInstance = createAction('setSearchQueryTaskInstance');

export const getSearchQueryTaskInstanceByPage = createAction('getSearchQueryTaskInstanceByPage');  // 我的查询全部
export const setSearchQueryTaskInstanceByPage = createAction('setSearchQueryTaskInstanceByPage');

export const saveQueryTaskInstanceToTemplate = createAction('saveQueryTaskInstanceToTemplate'); // 模板化

export const deleteTemplate = createAction('deleteTemplate'); // 删除- 我的模板

export const getSearchTimedQueryTask = createAction('getSearchTimedQueryTask'); // 获取我的定时任务
export const setSearchTimedQueryTask = createAction('setSearchTimedQueryTask'); // 获取我的定时任务

export const getSearchTimedQueryTaskByPage = createAction('getSearchTimedQueryTaskByPage'); // 我的定时任务-查看全部
export const setSearchTimedQueryTaskByPage = createAction('setSearchTimedQueryTaskByPage'); // 我的定时任务-查看全部

export const searchQueryTaskById = createAction('searchQueryTaskById'); // 我的定时任务-查看

export const deleteQueryTask = createAction('deleteQueryTask'); // 我的定时任务-删除

export const getSearchQueryTemplate = createAction('getSearchQueryTemplate'); // 我的模板
export const setSearchQueryTemplate = createAction('setSearchQueryTemplate'); // 我的模板

export const getSearchQueryTemplateByPage = createAction('getSearchQueryTemplateByPage'); // 我的模板-查看全部
export const setSearchQueryTemplateByPage = createAction('setSearchQueryTemplateByPage'); // 我的模板-查看全部

export const submitTimedQueryTaskByTemplateId = createAction('submitTimedQueryTaskByTemplateId'); // 我的模板-定时
export const submitQueryTaskByTemplateId = createAction('submitQueryTaskByTemplateId'); // 我的模板-执行 
export const deleteQueryTaskInstanceResult = createAction('deleteQueryTaskInstanceResult'); // 我的查询-废弃结果 

export const getSearchLatestQueryTaskInstance = createAction('getSearchLatestQueryTaskInstance'); // 最近的查询
export const setSearchLatestQueryTaskInstance = createAction('setSearchLatestQueryTaskInstance'); // 最近的查询