import Arrays from './views/array/index';
import Result from './views/result/index';
// import Schedules from './views/schedules/index';
// import Templates from './views/templates/index';
import * as action from './models/actions';
import reducer from './models/reducer';
import sagas from './models/sagas';

module.exports = {
    routeList: [        
        
        ...Arrays.routeList,
        ...Result.routeList,
        // ...Templates.routeList,
        // ...Schedules.routeList
    ],
    menuList: [{
        name: 'Search',
        key: '/search',
        iconFont: 'question-circle',
        isMenu: true,
        children: [
            ...Arrays.menuList,
            // ...Templates.menuList,
            // ...Schedules.menuList,
            ...Result.menuList,
            
        ]
    }],
    models: [{
        action,
        reducer: {
            Preference: reducer
        },
        sagas
    }].concat(Arrays.models, 
        Result.models, 
        // Templates.models, Schedules.models
    )
};