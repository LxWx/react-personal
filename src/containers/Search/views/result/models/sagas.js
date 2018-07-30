import {put, call, takeEvery} from 'redux-saga/effects';
import * as Act from './actions';
import * as fetch from '../api';
// 我的查询查看
function* searchQueryTaskResult() {
    yield takeEvery(Act.searchQueryTaskResult, _searchQueryTaskResult);
}

function* _searchQueryTaskResult(action) {
    let res = yield call(fetch.searchQueryTaskResult, action.payload.data);
    yield put(Act.setSearchQueryTaskResult({
        data: res.data
    }));
    action.payload.callback && action.payload.callback(res);
}


export default function* root() {
    yield [
        searchQueryTaskResult(),
    ];
}