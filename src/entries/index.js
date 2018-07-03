import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import Routes from '../routes/Routes.jsx';
import { Provider } from 'react-redux';
import store from '../store/store';
import 'resources/style/base.less';
import 'resources/style/base.css';
let render = () => {
    document.title = 'scy-webpack-react-antd';
    let root = document.getElementById('root');
    ReactDom.render(<Provider store={store}>
        < Routes />
    </Provider>, root);

};
render();
if (module.hot) {
    module.hot.accept();
}