import views from 'bundle-loader?lazy!./views/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/array',
        comp: views
    }],
    menuList: [{
        name: 'Array',
        key: '/array',
        iconFont: '',
        isMenu: true,
    }],
    models: [{
        action,
        reducer: {
            array: reducer
        },
        sagas
    }]
};