import {takeEvery, put} from 'redux-saga/effects';
import * as fetch from '../api';
import {callFetch} from 'common';


function* fetchUser() {
    yield takeEvery('addNum', _fetchUser);
}

function* _fetchUser(action) {
    let res = yield callFetch(fetch.addNum, {});
    console.log(res, 'res');
}

export default function* root() {
    yield [
        fetchUser()
    ];
}