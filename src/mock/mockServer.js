const obj = require('./db'); //   本地mock数据缓存
const route = require('./route');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(obj);
const middlewares = jsonServer.defaults();
let rewriter = jsonServer.rewriter(route);
server.use(rewriter); // 放在router 之前
server.use((request, res, next) => {
    request.method = 'get';
    next();
});
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// https://github.com/nuysoft/Mock/wiki/Syntax-Specification