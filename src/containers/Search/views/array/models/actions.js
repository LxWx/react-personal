import {
    createAction,
} from 'redux-actions';

export const setSearchCache = createAction('setSearchCache');
export const getSearchCache = createAction('getSearchCache');

export const setSearchOwnerTemplate = createAction('setSearchOwnerTemplate');
export const getSearchOwnerTemplate = createAction('getSearchOwnerTemplate');

export const setSearchQueryFields = createAction('setSearchQueryFields');
export const getSearchQueryFields = createAction('getSearchQueryFields');

export const setSearchById = createAction('setSearchById');
export const getSearchById = createAction('getSearchById');

export const getSubmitQueryTask = createAction('getSubmitQueryTask');

export const setSearchByRunId = createAction('setSearchByRunId');
export const getSearchByRunId = createAction('getSearchByRunId');

export const setSearchQueryTask = createAction('setSearchQueryTask');
export const getSearchQueryTask = createAction('getSearchQueryTask');
