/*
 *  开发环境单独配置项
 * */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const DEV_SERVER_CONF = require('./src/config/config.dev').proxy;


module.exports = merge(common, {
    devtool: 'source-map', // 可以将源文件的错误对应出来
    devServer: DEV_SERVER_CONF, // 服务配置参考src/config/config.dev
    plugins: [

    ]
});