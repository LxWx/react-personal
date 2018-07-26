import { handleActions } from 'redux-actions';

const initState = {
    locales: false
};

export const storeRedux = handleActions({
    'changeLocales'(state, action) {
        return { ...state, locales: action.payload };
    }
}, initState); 