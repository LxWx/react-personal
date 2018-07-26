import {put, call, takeEvery} from 'redux-saga/effects';
import * as Act from './actions';
import * as fetch from '../api';

// 获取我的查询
function* getSearchQueryTaskInstance() {
    yield takeEvery(Act.getSearchQueryTaskInstance, _getSearchQueryTaskInstance);
}

function* _getSearchQueryTaskInstance(action) {
    let res = yield call(fetch.searchQueryTaskInstance, action.payload.data);
    yield put(Act.setSearchQueryTaskInstance({
        data: res.data
    }));
}
// 模板化
function* saveQueryTaskInstanceToTemplate() {
    yield takeEvery(Act.saveQueryTaskInstanceToTemplate, _saveQueryTaskInstanceToTemplate);
}

function* _saveQueryTaskInstanceToTemplate(action) {
    let res = yield call(fetch.saveQueryTaskInstanceToTemplate, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 我的查询全部
function* getSearchQueryTaskInstanceByPage() {
    yield takeEvery(Act.getSearchQueryTaskInstanceByPage, _getSearchQueryTaskInstanceByPage);
}

function* _getSearchQueryTaskInstanceByPage(action) {
    let res = yield call(fetch.searchQueryTaskInstanceByPage, action.payload.data);
    yield put(Act.setSearchQueryTaskInstanceByPage({
        data: res.data
    }));
}

// 我的查询查看
function* searchQueryTaskResult() {
    yield takeEvery(Act.searchQueryTaskResult, _searchQueryTaskResult);
}

function* _searchQueryTaskResult(action) {
    let res = yield call(fetch.searchQueryTaskResult, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 删除- 我的模板
function* deleteTemplate() {
    yield takeEvery(Act.deleteTemplate, _deleteTemplate);
}

function* _deleteTemplate(action) {
    let res = yield call(fetch.deleteTemplate, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 获取我的定时任务
function* getSearchTimedQueryTask() {
    yield takeEvery(Act.getSearchTimedQueryTask, _getSearchTimedQueryTask);
}

function* _getSearchTimedQueryTask(action) {
    let res = yield call(fetch.searchTimedQueryTask, action.payload.data);
    yield put(Act.setSearchTimedQueryTask({
        data: res.data
    }));
}

// 我的定时任务-查看全部
function* getSearchTimedQueryTaskByPage() {
    yield takeEvery(Act.getSearchTimedQueryTaskByPage, _getSearchTimedQueryTaskByPage);
}

function* _getSearchTimedQueryTaskByPage(action) {
    let res = yield call(fetch.searchTimedQueryTaskByPage, action.payload.data);
    yield put(Act.setSearchTimedQueryTaskByPage({
        data: res.data
    }));
}

//  我的定时任务-查看
function* searchQueryTaskById() {
    yield takeEvery(Act.searchQueryTaskById, _searchQueryTaskById);
}

function* _searchQueryTaskById(action) {
    let res = yield call(fetch.searchQueryTaskById, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 我的定时任务-删除
function* deleteQueryTask() {
    yield takeEvery(Act.deleteQueryTask, _deleteQueryTask);
}

function* _deleteQueryTask(action) {
    let res = yield call(fetch.deleteQueryTask, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 我的模板
function* getSearchQueryTemplate() {
    yield takeEvery(Act.getSearchQueryTemplate, _getSearchQueryTemplate);
}

function* _getSearchQueryTemplate(action) {
    let res = yield call(fetch.searchQueryTemplate, action.payload.data);
    yield put(Act.setSearchQueryTemplate({
        data: res.data
    }));
}

// 我的模板-查看全部
function* getSearchQueryTemplateByPage() {
    yield takeEvery(Act.getSearchQueryTemplateByPage, _getSearchQueryTemplateByPage);
}

function* _getSearchQueryTemplateByPage(action) {
    let res = yield call(fetch.searchQueryTemplateByPage, action.payload.data);
    yield put(Act.setSearchQueryTemplateByPage({
        data: res.data
    }));
}

// 我的模板-定时
function* submitTimedQueryTaskByTemplateId() {
    yield takeEvery(Act.submitTimedQueryTaskByTemplateId, _submitTimedQueryTaskByTemplateId);
}

function* _submitTimedQueryTaskByTemplateId(action) {
    let res = yield call(fetch.submitTimedQueryTaskByTemplateId, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 我的模板-执行 
function* submitQueryTaskByTemplateId() {
    yield takeEvery(Act.submitQueryTaskByTemplateId, _submitQueryTaskByTemplateId);
}

function* _submitQueryTaskByTemplateId(action) {
    let res = yield call(fetch.submitQueryTaskByTemplateId, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 我的查询-废弃结果
function* deleteQueryTaskInstanceResult() {
    yield takeEvery(Act.deleteQueryTaskInstanceResult, _deleteQueryTaskInstanceResult);
}

function* _deleteQueryTaskInstanceResult(action) {
    let res = yield call(fetch.deleteQueryTaskInstanceResult, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

// 我的查询-废弃结果
function* getSearchLatestQueryTaskInstance() {
    yield takeEvery(Act.getSearchLatestQueryTaskInstance, _getSearchLatestQueryTaskInstance);
}

function* _getSearchLatestQueryTaskInstance(action) {
    let res = yield call(fetch.searchLatestQueryTaskInstance, action.payload.data);
    yield put(Act.setSearchLatestQueryTaskInstance({
        data: res.data
    }));
}

export default function* root() {
    yield [
        getSearchQueryTaskInstance(),
        saveQueryTaskInstanceToTemplate(),
        deleteQueryTaskInstanceResult(),
        submitQueryTaskByTemplateId(),
        submitTimedQueryTaskByTemplateId(),
        getSearchQueryTemplateByPage(),
        getSearchQueryTemplate(),
        deleteQueryTask(),
        searchQueryTaskById(),
        getSearchTimedQueryTaskByPage(),
        getSearchTimedQueryTask(),
        deleteTemplate(),
        searchQueryTaskResult(),
        getSearchQueryTaskInstanceByPage(),
        getSearchLatestQueryTaskInstance(),
    ];
}