import React, {Component} from 'react';
import {Router, Route, IndexRoute, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../store/store';
import Home from '../containers/nav1/views/Index.jsx';
import Main from '../containers/layout/Main.jsx';
import {History} from '../utils/index.js';
import {config} from '../config/config';

class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Provider store={store}>
            <Router history={History}>
                <Main>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        {
                            config.routeList.map((item, i) => {
                                return <Route key={i} path={item.path} component={item.comp}/>
                            })
                        }
                    </Switch>
                </Main>
            </Router>
        </Provider>)
    }
}

export default Routes;