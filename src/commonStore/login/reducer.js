import { handleActions } from 'redux-actions';

const initState = {
    ownerCode: '1001'
};

export const loginState = handleActions({
    'userLoggedIn'(state, action) {
        return { ...state, ownerCode: action.payload };
    },
    'userLoggedOut'(state, action) {
        return initialState;
    },
}, initState); 