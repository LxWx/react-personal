import { handleActions } from 'redux-actions';

let initState = {
    resultData: []
};

export const newState = handleActions({
    'setSearchQueryTaskResult'(state, action) {
        return { ...state, resultData: action.payload.data};
    },
}, initState);