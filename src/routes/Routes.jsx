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
import * as Acts from 'commonStore/storeRedux/actions';
import { LocaleProvider } from 'antd';
import antdEn from 'antd/lib/locale-provider/en_US';
import loacalDataEn from 'react-intl/locale-data/en';
import loacalDataZh from 'react-intl/locale-data/zh';
import enMessages from '../locales/en.json';
import antdZh from 'antd/lib/locale-provider/zh_CN';
import zhMessages from '../locales/zh.json';
import { addLocaleData, IntlProvider } from 'react-intl';
import intl from 'intl';
// if (!window.Intl) {
//     require('intl');
// }
@connect((state, props) => ({
    user: state.login
}))
class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locales: true
        };
    }
    componentDidMount() {
        const {user} = this.props;
        // 登录跳转
        if (user.ownerCode) {
            const {dispatch} = this.props;
            dispatch(Act.userLoggedIn(user.ownerCode));
        }
    }
    getComponent(n, c) {
        return n && Bundle.create(c) || c;
    }
    show = (v) => {
        if (this.state.locales != v) {
            this.setState({
                locales: v
            });
            this.props.dispatch(Acts.changeLocales(v));
        }
    }
    render() {
        let appLocale = null;
        if (this.state.locales) {
            appLocale = {
                messages: {
                    ...zhMessages,
                },
                antd: antdZh,
                locale: 'zh-Hans-CN',
                data: loacalDataZh,
            };
        } else {
            appLocale = {
                messages: {
                    ...enMessages,
                },
                antd: antdEn,
                locale: 'en-US',
                data: loacalDataEn,
            };
        }
        addLocaleData(appLocale.data);
        return (
            <LocaleProvider locale={appLocale.antd}>
                <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
                    <Router history={webHistory}>
                        <Switch>
                            <Route path='/login' component={withRouter(Bundle.create(Login))} />
                            <Route path='/' exact component={withRouter(Bundle.create(Login))} />
                            <Main show={this.show} user={this.props.user}>
                                <Switch>
                                    {
                                        config.routeList.map((item, i) => {
                                            return <Route key={i} path={item.path} component={Auth.userIsAuthenticatedRedir(this.getComponent(item.isBundle, item.comp))} />;
                                        })
                                    }
                                    <Route component={Auth.userIsAuthenticatedRedir(NoMatch)} />
                                </Switch>
                            </Main>
                        </Switch>
                    </Router>
                </IntlProvider>
            </LocaleProvider>

        );
    }
}

export default Routes;