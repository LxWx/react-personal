import views from 'bundle-loader?lazy!./views/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/charts',
        comp: views,
        isBundle: true
    }],
    menuList: [{
        name: 'Charts',
        key: '/charts',
        iconFont: '',
        isMenu: true,
    }],
    models: [{
        action,
        reducer: {
            charts: reducer
        },
        sagas
    }]
};