import { handleActions } from 'redux-actions';

let initState = {
    name: 'scy',
    age: '18'

};

export const newState = handleActions({
    'addNum'(state, action) {
        return { ...state, age: action.payload };
    }
}, initState); 