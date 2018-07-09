import React from 'react';
import { PureComponent } from 'components';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import { connect } from 'react-redux';
import * as Act from 'commonStore/login/actions';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {webHistory} from 'utils';
import update from 'immutability-helper';
// import {deleteStorage} from 'common';
const locationHelper = locationHelperBuilder({});
const FormItem = Form.Item;
@connect((state, props) => ({
    user: state.login
}))
@Form.create()
export default class NormalLoginForm extends PureComponent {
    constructor(props) {
        super(props);
        // const initialArray = [1, 2, 3];
        // const newArray = update(initialArray, {$set: [4]}); // => [1, 2, 3, 4]
        // console.log(initialArray, 'initialArray');
        // console.log(newArray, 'newArray');
    }
    handleSubmit = (e) => {
        const {dispatch} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                dispatch(Act.userLoggedIn(values['userName']));
                const url = locationHelper.getRedirectQueryParam(this.props);
                webHistory.replace(url || '/dashBoard');
            }
        });
    }
    componentWillMount() {
        const {user} = this.props;
        if (user.user) {
            const url = locationHelper.getRedirectQueryParam(this.props);
            // webHistory.push(url || '/dashBoard');
            webHistory.replace(url || '/dashBoard');
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
