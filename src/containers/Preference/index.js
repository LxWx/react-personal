import Charts from './views/charts/index';
import QueryLog from './views/queryLog/index';
import Schedules from './views/schedules/index';
import Templates from './views/templates/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [
        ...Charts.routeList,
        ...QueryLog.routeList,
        ...Templates.routeList,
        ...Schedules.routeList
    ],
    menuList: [{
        name: 'Preference',
        key: '/preference',
        iconFont: 'question-circle',
        isMenu: true,
        children: [
            ...Charts.menuList,
            ...Templates.menuList,
            ...Schedules.menuList,
            ...QueryLog.menuList,

        ]
    }],
    models: [{
        action,
        reducer: {
            Preference: reducer
        },
        sagas
    }].concat(Charts.models, QueryLog.models, Templates.models, Schedules.models)
};