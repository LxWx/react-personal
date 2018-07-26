
import { handleActions } from 'redux-actions';
let initState = {
    dataType: [
        {
            name: 'MES History',
            value: 'ARRAY_MAIN'
        },
        {
            name: 'Defect Data',
            value: 'ARRAY_DEFECT'
        },
        {
            name: 'Measurement Data',
            value: 'ARRAY_MEASUREMENT'
        },
        {
            name: 'PDS Data',
            value: 'ARRAY_EDC'
        }
    ],
    method: [
        {
            name: 'Time Range',
            value: 'time'
        },
        {
            name: 'Given GlassID',
            value: 'glassIds'
        },
        {
            name: 'Given LotID',
            value: 'lotIds'
        }
    ],
    screenData: {
    },
    template: null,
    searchQueryFields: null,
    detail: null
    // {
    //     ownerCode:'1001',
    //     templateId:'1001',
    //     templateName:'查询ARRAY',
    //     items: {
    //         productGroups: 'AD01,AD02',
    //         productIds: '1,2',
    //         ownerCodes: '1,2',
    //         EQPTypes: '1,2',
    //         ProcessIds: '1,2',
    //         EQPIds: '1,2',
    //         queryFields:'a,b,c',
    //         startTime: '',
    //         endTime: '',
    //         glassIds: '',
    //         lotIds: '',
    //         nowTime: '',
    //         timeInterval: ''
    //     },
    // }
};

export const newState = handleActions({
    'setSearchCache'(state, action) {
        return { ...state, screenData: {...state.screenData, ...action.payload}};
    },
    'setSearchOwnerTemplate'(state, action) {
        return { ...state, template: action.payload.data};
    },
    'setSearchQueryFields'(state, action) {
        return { ...state, searchQueryFields: action.payload.data};
    },
    'setSearchById'(state, action) {
        return { ...state, detail: action.payload.data};
    }

}, initState);