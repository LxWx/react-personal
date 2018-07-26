import views from 'bundle-loader?lazy!./views/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/queryLog',
        comp: views,
        isBundle: true
    }],
    menuList: [{
        name: 'QueryLog',
        key: '/queryLog',
        iconFont: '',
        isMenu: true,
    }],
    models: [{
        action,
        reducer: {
            queryLog: reducer
        },
        sagas
    }]
};