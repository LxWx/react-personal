import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '../containers/DashBoard/views/index.jsx';
import Login from '../containers/Login/index.jsx';
import Main from '../containers/layout/Main.jsx';
import { History } from '../utils/index.js';
import { config } from '../config/config';
import Bundle from './Bundle';
import { connect } from 'react-redux';
import { NoMatch } from 'components';
import * as Auth from 'auth';
class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={History}>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <Route path='/' exact component={Login} />
                    <Main user={this.props.user}>
                        <Switch>
                            {
                                config.routeList.map((item, i) => {
                                    return <Route key={i} path={item.path} component={Auth.userIsAuthenticatedRedir(Bundle.create(item.comp))} />;
                                })
                            }
                            <Route component={NoMatch} />
                        </Switch>
                    </Main>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login
});

export default connect(mapStateToProps)(Routes);