import { handleActions } from 'redux-actions';

let initState = {
    myQuery: [],
    myTemplate: [],
    myTask: [],
    latelyData: []
};

export const newState = handleActions({
    'setSearchQueryTaskInstance'(state, action) {
        return { ...state, myQuery: action.payload.data };
    },
    'setSearchTimedQueryTask'(state, action) {
        return { ...state, myTask: action.payload.data };
    },
    'setSearchQueryTemplate'(state, action) {
        return { ...state, myTemplate: action.payload.data };
    },
    'setSearchLatestQueryTaskInstance'(state, action) {
        return { ...state, latelyData: action.payload.data };
    }
}, initState); 