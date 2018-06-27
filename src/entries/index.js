import React from 'react';
import ReactDom from 'react-dom';
import Routes from '../routes/Routes.jsx';
import 'resources/style/base.less'
let render = () => {
    document.title = 'scy-webpack-react-antd';
    let root = document.getElementById('root');
    ReactDom.render( < Routes/ > , root);

};
render();
if (module.hot) {
    module.hot.accept();
}