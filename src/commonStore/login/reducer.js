import { handleActions } from 'redux-actions';

const initState = {
    user: '111'
};

export const loginState = handleActions({
    'userLoggedIn'(state, action) {
        return { ...state, user: action.payload };
    },
    'userLoggedOut'(state, action) {
        return initialState;
    },
}, initState); 