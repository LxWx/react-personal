const nav1 = require('../containers/DashBoard/api/apiConfig');
let fetchData = [
    nav1
];

let mergeFetch = (configs = []) => {
    return configs.reduce((prevValue, currValue) => {
        let {api = {}} = currValue;
        for (let key in api) {
            prevValue[`${api[key]}*`] = `/${key}`;
        }
        return prevValue;
    }, {});
};
let newMerge = mergeFetch(fetchData);
module.exports = newMerge;