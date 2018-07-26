import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduces from '../models/reducer';
import rootSaga from '../models/sagas/index';
import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware(rootSaga);
let middleware = [sagaMiddleware];
if (PRODUCTION) {
    middleware.push(logger);
}

const store = createStore(
    reduces,
    applyMiddleware(...middleware)
);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../models/reducer', () => {
        const nextRootReducer = require('../models/reducer');
        store.replaceReducer(nextRootReducer);
    });
    module.hot.accept('../models/sagas', () => {
        const nextRootReducer = require('../models/sagas');
        store.replaceReducer(nextRootReducer);
    });
}
sagaMiddleware.run(rootSaga);
export default store;