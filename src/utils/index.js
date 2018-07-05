import webHistory from './lib/history.js';
import request from './lib/request';

let mergeConfig = (configs = []) => {
    return configs.reduce((previousValue, currentValue) => {
        let {routeList, menuList, models} = previousValue;
        return {
            routeList: routeList.concat(currentValue.routeList),
            menuList: menuList.concat(currentValue.menuList),
            models: currentValue.models ? models.concat(currentValue.models) : models
        };
    }, {
        routeList: [],
        menuList: [],
        models: []
    });
};

module.exports = {
    webHistory,
    mergeConfig,
    request
};