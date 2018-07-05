# start


## 开始   2018/3/2

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本 

```
git clone https://github.com/LxWx/start.git  

cd start

npm install

先运行npm run vendors 加载优化dll

npm run start

npm run build



```

项目目录架构


common // 公共方法
commonStore // 公共reducer
components    // 公共组件
config  // 配置
containers  //路由组件
entries // html
mock // 本地mock服务
resources   // 静态文件
routes //路由
store // store
utils // 工具函数


mock 服务规则 

接口使用以mock开头




import isEqual from 'fast-deep-equal';  // 判断对象引用关系

import PropTypes from 'prop-types';  // 属性判断

import update from 'immutability-helper';

immutability-helper 使用方法

# 为什么要使用immutability-helper

# 避免数据污染导致的数组混乱，减少render渲染，使数据是不可变的

# 使用方法 https://www.npmjs.com/package/immutability-helper

# 例子

// array push
const initialArray = [1, 2, 3];
const newArray = update(initialArray, {$push: [4]}); // => [1, 2, 3, 4]

// splice = arr.splice (index, len , add)
const collection = [1, 2, {a: [12, 17, 15]}];
const newCollection = update(collection, {2: {a: {$splice: [[1, 1, 13, 14]]}}});
// => [1, 2, {a: [12, 13, 14, 15]}]


使用 redux-actions  来减少样板代码带来的影响

1. action: 
​createAction(type)​

​createAction(type, payloadCreator)​

​createAction(type, payloadCreator, metaCreator)​

​createActions(actionMap)​

​createActions(actionMap, ...identityActions)​


2.reducer: 


​handleAction(type, reducer, defaultState)​

​handleAction(type, reducerMap, defaultState)​

​handleActions(reducerMap, defaultState)​

3.​combineActions​

​combineActions(...types)​