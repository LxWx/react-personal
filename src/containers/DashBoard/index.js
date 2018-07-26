import view from 'bundle-loader?lazy!./views/index';
import queryAll from 'bundle-loader?lazy!./views/queryAll/index';
import taskAll from 'bundle-loader?lazy!./views/taskAll/index';
import templateAll from 'bundle-loader?lazy!./views/templateAll/index';
import * as action from './models/actions';
import {newState} from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/dashBoard',
        comp: view,
        isBundle: true
    }, {
        path: '/queryAll',
        comp: queryAll,
        isBundle: true
    }, {
        path: '/taskAll',
        comp: taskAll,
        isBundle: true
    }, {
        path: '/templateAll',
        comp: templateAll,
        isBundle: true
    }],
    menuList: [{
        name: 'DashBoard',
        key: '/dashBoard',
        iconFont: 'question-circle',
        isMenu: true,       
        children: [{
            name: 'queryAll',
            key: '/queryAll',
            iconFont: '',
            pid: '/dashBoard',
            isMenu: false,
        },{
            name: 'taskAll',
            key: '/taskAll',
            iconFont: '',
            pid: '/dashBoard',
            isMenu: false,
        },{
            name: 'templateAll',
            key: '/templateAll',
            iconFont: '',
            pid: '/dashBoard',
            isMenu: false,
        }]
    }],
    models: [{
        action,
        reducer: {
            dashBoard: newState
        },
        sagas
    }]
};