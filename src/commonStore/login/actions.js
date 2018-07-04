export const USER_LOGGED_IN = 'userLoggedIn';
export const USER_LOGGED_OUT = 'userLoggedOut';

export function userLoggedIn(data) {
    return {
        type: USER_LOGGED_IN,
        data
    };
}

export function userLoggedOut(data) {
    return {
        type: USER_LOGGED_OUT,
        data
    };
}