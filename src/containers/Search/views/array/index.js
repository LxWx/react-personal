import views from './views/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/array',
        comp: views,
        isBundle: false
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
            array: reducer
        },
        sagas
    }]
};