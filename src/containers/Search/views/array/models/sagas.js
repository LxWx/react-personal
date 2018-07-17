import {put, call, takeEvery} from 'redux-saga/effects';
import * as Act from './actions';
import * as fetch from '../api';

function* getSearchCache() {
    yield takeEvery(Act.getSearchCache, _getSearchCache);
}

function* _getSearchCache(action) {
    let res = yield call(fetch.searchCache, action.payload);
    yield put(Act.setSearchCache({
        [action.payload.tagName]: res.data
    }));
}

export default function* root() {
    yield [
        getSearchCache()
    ];
}