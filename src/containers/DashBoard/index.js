import view from 'bundle-loader?lazy!./views/Index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/DashBoard',
        comp: view
    }],
    menuList: [{
        name: 'DashBoard',
        key: '/DashBoard',
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
            nav1: reducer
        },
        sagas
    }]
};