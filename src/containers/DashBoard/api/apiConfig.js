module.exports = {
    api: {
        searchQueryTaskInstance: '/api/queryTask/searchQueryTaskInstance', // 我的查询
        searchQueryTaskInstanceByPage: '/api/queryTask/searchQueryTaskInstanceByPage', // 查看全部
        deleteTemplate: '/api/template/deleteTemplate', // 删除- 我的模板
        searchTimedQueryTask: '/api/queryTask/searchTimedQueryTask', //  获取我的定时任务
        searchTimedQueryTaskByPage: '/api/queryTask/searchTimedQueryTaskByPage', // 我的定时任务-查看全部
        searchQueryTaskById: '/api/queryTask/searchQueryTaskById', //我的定时任务-查看
        deleteQueryTask: '/api/queryTask/deleteQueryTask', // 我的定时任务-删除
        searchQueryTemplate: '/api/template/searchQueryTemplate', // 我的模板
        searchQueryTemplateByPage: '/api/template/searchQueryTemplateByPage', // 我的模板-查看全部  
        submitTimedQueryTaskByTemplateId: '/api/template/submitTimedQueryTaskByTemplateId', //  我的模板-定时
        submitQueryTaskByTemplateId: '/api/template/submitQueryTaskByTemplateId', // 我的模板-执行   
        deleteQueryTaskInstanceResult: '/api/queryTask/deleteQueryTaskInstanceResult', //我的查询-废弃结果
        searchLatestQueryTaskInstance: '/api/queryTask/searchLatestQueryTaskInstance', //我的查询-废弃结果
        saveQueryTaskInstanceToTemplate: '/api/queryTask/saveQueryTaskInstanceToTemplate'
    }
};