import {takeEvery, call} from 'redux-saga/effects';
import * as Act from './actions';
import * as fetch from '../api';

function* callFetch(fetch, params) {
    return yield call(fetch, params);
}

function* fetchUser() {
    yield takeEvery(Act.ADDNUM, _fetchUser);
}

function* _fetchUser(action) {
    console.log(123456);
    let res = yield callFetch(fetch.addNum, {});
    console.log(res);
}

export default function* root() {
    yield [
        fetchUser()
    ]
}