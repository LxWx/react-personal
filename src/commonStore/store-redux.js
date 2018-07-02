import {CloneDeep} from 'common';
import * as Act from './actions';

let initState = {
    loading: false
};

export default function nav1Reducer(state = initState, action) {
    let newState = null;
    console.log(action, 'action');
    switch (action.type) {
    case Act.CHANGE_LOADING:
        newState = Object.assign({}, state, {...action.data});
        return newState;
    default:
        return state;
    }
}