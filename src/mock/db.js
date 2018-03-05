let nav1 = require('./nav1');
// 建立和mock数据的联系
let apiData = [nav1];
let mergeApi = (configs = []) => {
    return configs.reduce((previousValue, currentValue) => {
        for (let key in currentValue) {
            previousValue[key] = currentValue[key];
        }
        return previousValue;
    }, {});
};
let api = mergeApi(apiData);
module.exports = api;