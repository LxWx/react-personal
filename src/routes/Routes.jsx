import React, { Component } from 'react';
import { Router, Route, Switch, withRouter} from 'react-router-dom';
import Home from '../containers/DashBoard/views/index.jsx';
import Login from 'bundle-loader?lazy!../containers/Login/index.jsx';
import Main from '../containers/layout/Main.jsx';
import { webHistory } from '../utils/index.js';
import { config } from '../config/config';
import Bundle from './Bundle';
import { connect } from 'react-redux';
import { NoMatch } from 'components';
import * as Auth from 'auth';
import * as Act from 'commonStore/login/actions';
@connect((state, props) => ({
    user: state.login
}))
class Routes extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {user} = this.props;
        // 登录跳转
        if (user.user) {
            const {dispatch} = this.props;
            dispatch(Act.userLoggedIn(user.user));
        }
    }

    render() {
        return (
            <Router history={webHistory}>
                <Switch>
                    <Route path='/login' component={withRouter(Bundle.create(Login))} />
                    <Route path='/' exact component={withRouter(Bundle.create(Login))} />
                    <Main user={this.props.user}>
                        <Switch>
                            {
                                config.routeList.map((item, i) => {
                                    return <Route key={i} path={item.path} component={Auth.userIsAuthenticatedRedir(Bundle.create(item.comp))} />;
                                })
                            }
                            <Route component={Auth.userIsAuthenticatedRedir(NoMatch)} />
                        </Switch>
                    </Main>
                </Switch>
            </Router>
        );
    }
}

export default Routes;