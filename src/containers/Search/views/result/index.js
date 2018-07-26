import views from 'bundle-loader?lazy!./views/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/result',
        comp: views,
        isBundle: true
    }],
    menuList: [{
        name: 'Result',
        key: '/result',
        iconFont: '',
        isMenu: false,
        pid: '/array'
    }],
    models: [{
        action,
        reducer: {
            queryLog: reducer
        },
        sagas
    }]
};