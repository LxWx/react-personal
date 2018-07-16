import views from 'bundle-loader?lazy!./views/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/templates',
        comp: views,
        isBundle: true
    },],
    menuList: [{
        name: 'Query Templates',
        key: '/templates',
        iconFont: '',
        isMenu: true,
    }],
    models: [{
        action,
        reducer: {
            templates: reducer
        },
        sagas
    }]
};