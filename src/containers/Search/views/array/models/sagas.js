import {put, call, takeEvery} from 'redux-saga/effects';
import * as Act from './actions';
import * as fetch from '../api';

function getScreenData(arr, text) {
    const newArr = [];
    Array.isArray(arr) && arr.length > 0 && arr.forEach((it, n) => {
        newArr.push({
            key: n.toString(),
            value: it
        });
    });
    return newArr;
}

function* getSearchCache() {
    yield takeEvery(Act.getSearchCache, _getSearchCache);
}

function* _getSearchCache(action) {
    let res = yield call(fetch.searchCache, action.payload.data);
    const newData = getScreenData(res.data, action.payload.data.tagName);
    action.payload.callback && action.payload.callback(newData);
    yield put(Act.setSearchCache({
        [action.payload.data.tagName]: newData
    }));
    
}

function* getSearchOwnerTemplate() {
    yield takeEvery(Act.getSearchOwnerTemplate, _getSearchOwnerTemplate);
}

function* _getSearchOwnerTemplate(action) {
    let res = yield call(fetch.searchOwnerTemplate, action.payload.data);
    yield put(Act.setSearchOwnerTemplate({
        data: res.data
    }));
}

function* getSearchQueryFields() {
    yield takeEvery(Act.getSearchQueryFields, _getSearchQueryFields);
}

function* _getSearchQueryFields(action) {
    let res = yield call(fetch.searchQueryFields, action.payload.data);
    yield put(Act.setSearchQueryFields({
        data: getScreenData(res.data, action.payload.data.queryTopic)
    }));
}

function* getSubmitQueryTask() {
    yield takeEvery(Act.getSubmitQueryTask, _getSubmitQueryTask);
}

function* _getSubmitQueryTask(action) {
    let res = yield call(fetch.submitQueryTask, action.payload.data);
    action.payload.callback && action.payload.callback(res);
}

function* getSearchById() {
    yield takeEvery(Act.getSearchById, _getSearchById);
}

function* _getSearchById(action) {
    let res = yield call(fetch.searchById, action.payload.data);
    yield put(Act.setSearchById({
        data: res.data
    }));
    action.payload.callback && action.payload.callback(res.data);
}

export default function* root() {
    yield [
        getSearchCache(),
        getSearchOwnerTemplate(),
        getSearchQueryFields(),
        getSearchById(),
        getSubmitQueryTask()
    ];
}