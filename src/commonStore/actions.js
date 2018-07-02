export const CHANGE_LOADING = 'changeLoading';

export function changeLoading(data) {
    return {
        type: CHANGE_LOADING,
        data
    };
}