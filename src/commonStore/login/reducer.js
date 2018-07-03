import * as Act from './actions';

const initialState = {
    user: null
};

export default function userUpdate(state = initialState, { type, data }) {
    switch (type) {
    case Act.USER_LOGGED_IN:
        return { data: data};
    case Act.USER_LOGGED_OUT:
        return initialState;
    default:
        return state;
    }
}