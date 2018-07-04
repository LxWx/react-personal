import React from 'react';
import { PureComponent } from 'components';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import { connect } from 'react-redux';
import * as Act from 'commonStore/login/actions';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {History} from 'utils';
// import {deleteStorage} from 'common';
const locationHelper = locationHelperBuilder({});
const FormItem = Form.Item;
@connect((state, props) => ({
    user: state.login
}))
@Form.create()
export default class NormalLoginForm extends PureComponent {
    handleSubmit = (e) => {
        const {dispatch} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                dispatch(Act.userLoggedIn(values['userName']));
                const url = locationHelper.getRedirectQueryParam(this.props);
                History.push(url || '/dashBoard');
            }
        });
    }
    componentWillMount() {
        const {user} = this.props;
        if (user.user) {
            const url = locationHelper.getRedirectQueryParam(this.props);
            History.push(url);
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.fromMain}>
                <Form className={styles.from}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSubmit} className={styles.btn}>
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
