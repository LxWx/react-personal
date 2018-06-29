const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname); // 根目录
const APP_PATH = ROOT_PATH + '/src';

const vendorConfig = require(APP_PATH + '/config/vendorConfig.js') || {};
module.exports = {
    entry: vendorConfig,
    output: {
        path: path.join(__dirname, './src/resources/js/lib'), // 生成的dll.js路径，我是存在/build/dev中
        filename: '[name].js', // 生成的文件名字
        library: '[name]' // 生成文件的一些映射关系，与下面DllPlugin中配置对应
    },
    plugins: [
        // 使用DllPlugin插件编译上面配置的NPM包
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // 用于压缩去log
                drop_debugger: true,
                drop_console: true
            },
            mangle: true // 变量名压缩
        }),
        new webpack.DllPlugin({
            // 会生成一个json文件，里面是关于dll.js的一些配置信息
            path: path.join(__dirname, './src/resources/js/lib/[name]-manifest.json'),
            name: '[name]' // 与上面output中配置对应
        })
    ]
};