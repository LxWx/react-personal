import {mergeConfig} from '../utils/index';
import nav1 from '../containers/DashBoard/index';
import nav2 from '../containers/nav2/index';

let configs = [
    nav1,
    nav2
];

let mergedConfig = mergeConfig(configs);

let config = {
    title: 'title',
    logoText: 'logoText',
    routeList: mergedConfig.routeList,
    menuList: mergedConfig.menuList
};
const models = mergedConfig.models;
module.exports = {
    config,
    models
};