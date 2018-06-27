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