import Arrays from './views/array/index';
import QueryLog from './views/queryLog/index';
import Schedules from './views/schedules/index';
import Templates from './views/templates/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [        
        
        ...Arrays.routeList,
        ...QueryLog.routeList,
        ...Templates.routeList,
        ...Schedules.routeList
    ],
    menuList: [{
        name: 'Search',
        key: '/search',
        iconFont: 'question-circle',
        isMenu: true,
        children: [
            ...Arrays.menuList,
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
    }].concat(Arrays.models, QueryLog.models, Templates.models, Schedules.models)
};