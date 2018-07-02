import {takeEvery, put} from 'redux-saga/effects';
import * as Act from './actions';
import * as fetch from '../api';
import {callFetch} from 'common';


function* fetchUser() {
    yield takeEvery(Act.ADDNUM, _fetchUser);
}

function* _fetchUser(action) {
    yield put({type: 'changeLoading', data: {loading: true}});
    let res = yield callFetch(fetch.addNum, {});
    yield put({type: 'changeLoading', data: {loading: false}});
}

export default function* root() {
    yield [
        fetchUser()
    ];
}