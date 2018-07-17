import views from 'bundle-loader?lazy!./views/index';
import * as action from './models/actions';
import {newState} from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/array',
        comp: views,
        isBundle: true
    }],
    menuList: [{
        name: 'Array',
        key: '/array',
        iconFont: '',
        isMenu: true
    }],
    models: [{
        action,
        reducer: {
            array: newState
        },
        sagas
    }]
};