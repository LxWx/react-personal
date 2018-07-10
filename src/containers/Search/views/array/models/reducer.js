import {combineReducers} from 'redux';
import {CloneDeep} from 'common';
import * as Act from './actions';

let initState = {
    dataType: [
        {
            name: '制程历史',
            value: 1
        },
        {
            name: '检测数据',
            value: 2
        },
        {
            name: '量测数据',
            value: 3
        },
        {
            name: '工程数据',
            value: 4
        }
    ],
    method: [
        {
            name: '时间范围查询',
            value: 1
        },
        {
            name: '指定Glass查询',
            value: 2
        },
        {
            name: '指定Lot查询',
            value: 3
        }
    ]

};

export default function nav1Reducer(state = initState, action) {
    let newState = CloneDeep(state);
    switch (action.type) {
    case Act.ADDNUM:
        newState = Object.assign({}, state, {age: action.data});
        return newState;
    default:
        return state;
    }
}