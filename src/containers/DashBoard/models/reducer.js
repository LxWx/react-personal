import {combineReducers} from 'redux';
import {CloneDeep} from 'common';
import * as Act from './actions';

let initState = {
    name: 'scy',
    age: '18'

};

export default function nav1Reducer(state = initState, action) {
    let newState = CloneDeep(state);

    switch (action.type) {
    case Act.ADDNUM:
        newState = Object.assign({}, state, {age: action.data});
        return newState;
    default:
        return state;
    }
}