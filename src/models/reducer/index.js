import {combineReducers} from 'redux';
// import {CloneDeep} from 'common';
import {models} from '../../config/config';
import CommonStore from 'commonStore';
let extractReducer = (configs = []) => {
    return configs.reduce((previousValue, currentValue) => {
        let {reducer} = currentValue;
        return {
            ...reducer,
            ...previousValue

        };
    }, {});
};

let reducer = extractReducer(models);
export default combineReducers({
    ...reducer,
    ...CommonStore
});