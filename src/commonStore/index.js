import {combineReducers} from 'redux';
import StoreRedux from './store-redux'

// 公共reducer
let reducer = {
    StoreRedux
}
export default combineReducers({
    ...reducer
});