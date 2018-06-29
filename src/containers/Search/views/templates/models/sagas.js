import {takeEvery} from 'redux-saga/effects';
import * as Act from './actions';
import * as fetch from '../api';
import {callFetch} from 'common';


function* fetchUser() {
    yield takeEvery(Act.ADDNUM, _fetchUser);
}

function* _fetchUser(action) {
    let res = yield callFetch(fetch.addNum, {});
    console.log(res);
}

export default function* root() {
    yield [
        fetchUser()
    ]
}