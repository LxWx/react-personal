const Mock = require('mockjs');
const mockData = require('../mockData');
module.exports = function () {
    return Mock.mock({
        [mockData.mockName.string]: mockData.mockVal.string
    });
};

//