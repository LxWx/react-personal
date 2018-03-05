import view from './views/Index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/index',
        comp: view
    }],
    menuList: [{
        name: 'nav1',
        key: 'nav1/index',
        iconFont: '',
        isMenu: true,
        children: [{
            name: 'children1',
            key: '/index',
            iconFont: '',
            isMenu: true,
        }]
    }],
    models: [{
        action,
        reducer: {
            nav1: reducer
        },
        sagas
    }]
};