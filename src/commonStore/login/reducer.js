import { handleActions } from 'redux-actions';

const initState = {
    user: null
};

export const loginState = handleActions({
    'userLoggedIn'(state, action) {
        return { ...state, user: action.payload };
    },
    'userLoggedOut'(state, action) {
        return initialState;
    },
}, initState); 