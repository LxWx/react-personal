import {mergeConfig} from '../utils/index';
import DashBoard from '../containers/DashBoard/index';
import Preference from '../containers/Preference/index';
import Search from '../containers/Search/index';
// import nav2 from '../containers/nav2/index';

let configs = [
    DashBoard,
    Preference,
    Search
    // nav2
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