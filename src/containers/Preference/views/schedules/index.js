import views from 'bundle-loader?lazy!./views/index';
import Add from 'bundle-loader?lazy!./views/add';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [{
        path: '/schedules',
        comp: views,
        isBundle: true
    },
    {
        path: '/schedulesAdd',
        comp: Add,
        isBundle: true
    }],
    menuList: [{
        name: 'Schedules',
        key: '/schedules',
        iconFont: '',
        isMenu: true,
    },
    {
        name: 'add',
        key: '/schedulesAdd',
        iconFont: '',
        isMenu: false,
        pid: '/schedules'
    }],
    models: [{
        action,
        reducer: {
            schedules: reducer
        },
        sagas
    }]
};