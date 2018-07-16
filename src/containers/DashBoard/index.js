import view from 'bundle-loader?lazy!./views/index';
import * as action from './models/actions';
import {newState} from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/dashBoard',
        comp: view,
        isBundle: true
    }],
    menuList: [{
        name: 'DashBoard',
        key: '/dashBoard',
        iconFont: 'question-circle',
        isMenu: true,
        
        // children: [{
        //     name: 'children1',
        //     key: '/index',
        //     iconFont: '',
        //     isMenu: true,
        // }]
    }],
    models: [{
        action,
        reducer: {
            DashBoard: newState
        },
        sagas
    }]
};