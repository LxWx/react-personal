import {combineReducers} from 'redux';
import {cloneDeep} from 'lodash';
import {models} from '../../config/config';

let extractReducer = (configs = []) => {
    return configs.reduce((previousValue, currentValue) => {
        let {reducer} = currentValue;
        return {
            ...reducer,
            ...previousValue

        }
    }, {})
};
let reducer = extractReducer(models);
export default combineReducers({
    ...reducer
});