# 前言

大数据后台管理


## 技术栈

react@16.2 + redux@3.7.2 + react-router@4.2.0 + webpack@3.10.0 + axios@0.17.1 + less@2.7.3 + antd@3.6.4
echarts + echarts-for-react + immutability-helper + redux-actions + redux-auth-wrapper + redux-saga



## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，建议使用 node 最新LTS版

```
git clone https://github.com/LxWx/react-personal.git

cd react-personal （进入当前的项目）

npm install  (安装依赖包)

npm run vendors (打包Dll)

npm start (运行本地开发环境)

npm run build (打包)

另开启一个命令窗口 启动node的本地json数据代理服务

npm run mock (对，就是传说中的 mockjs http://highsea90.com/t/mock/)

```
## 说明

>  喜欢的别忘记了可以star一下的噢！ 

>  开发环境 win10  Chrome 63.0.3239.132（正式版本） （32 位） nodejs 8.7.0

>  如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐使用淘宝的注册源，直接运行，

```
npm install -g cnpm --registry=https://registry.npm.taobao.org 

```
## 功能一览
- [√] 路由配置化加载
- [√] redux配置化加载
- [√] saga配置化加载
- [√] 登录
- [√] 权限控制
- [√] redux完整示范
- [√] mockjs模拟后端返回接口
  [√] 其他中间件优化样板代码


## 总结

1. 学习中

## 项目结构

见目录

auth: 权限管理的HOC
common: 公共方法
commonStore: 公共store
components: 公共组件
config: 公共配置
containers: 业务组件
entries: 静态html
mock: mock服务
models: reducer saga
resources: 静态文件
routes： 路由
store： store
utils: 其他配置



