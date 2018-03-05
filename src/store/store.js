import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import reduces from '../models/reducer';
import rootSaga from '../models/sagas/index';

const sagaMiddleware = createSagaMiddleware(rootSaga);
const store = createStore(
    reduces,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;