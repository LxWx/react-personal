import views from './views/index';
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
        isBundle: false
    }],
    models: [{
        action,
        reducer: {
            array: reducer
        },
        sagas
    }]
};