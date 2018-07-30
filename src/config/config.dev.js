module.exports = {
    proxy: {
        historyApiFallback: true, //spa应用 任意的跳转或404响应可以指向 index.html 页面；
        contentBase: './', // 本地服务器在哪个目录搭建页面
        hot: true,
        inline: true, //用来支持dev-server自动刷新的配置
        progress: true, // 显示打包进度
        //host: '0.0.0.0',
        port: 8999, //端口号
        proxy: {

            '/mock/*': {
                target: 'http://127.0.0.1:3000',
                secure: true,
                changeOrigin: true
            },
            '/api/*': {
                target: 'http://192.168.54.113:8080/csot-eda-web',
                secure: true,
                changeOrigin: true
            }
        }
    }
};