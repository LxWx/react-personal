import React from 'react';
import { PureComponent } from 'components';
import { Form, Icon, Input, Button, Checkbox, Select, Tooltip, Cascader, Row, Col, Radio, DatePicker} from 'antd';
import { connect } from 'react-redux';
import styles from './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class Arrays extends PureComponent {
  state = {
      confirmDirty: false,
      dataType: 1
  };
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              console.log('Received values of form: ', values);
          }
      });
  }
  handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
      } else {
          callback();
      }
  }
  validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
      }
      callback();
  }
  render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
          labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
          },
          wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
          },
      };
      const tailFormItemLayout = {
          wrapperCol: {
              xs: {
                  span: 24,
                  offset: 0,
              },
              sm: {
                  span: 16,
                  offset: 8,
              },
          },
      };
      return (
          <Form onSubmit={this.handleSubmit}>
              <FormItem
                  {...formItemLayout}
                  label="数据类型："
              >
                  {getFieldDecorator('dataType', {
                      rules: [],
                  })(
                      <RadioGroup value={this.state.dataType}>
                          <Radio value={1}>A</Radio>
                          <Radio value={2}>B</Radio>
                          <Radio value={3}>C</Radio>
                          <Radio value={4}>D</Radio>
                      </RadioGroup>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="查询描述："
              >
                  {getFieldDecorator('describe', {
                      rules: [{
                          required: true, message: 'Please input your password!',
                      }, {
                          validator: this.validateToNextPassword,
                      }],
                  })(
                      <Input type="text" />
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="Confirm Password"
              >
                  {getFieldDecorator('confirm', {
                      rules: [{
                          required: true, message: 'Please confirm your password!',
                      }, {
                          validator: this.compareToFirstPassword,
                      }],
                  })(
                      <RadioGroup value={this.state.dataType}>
                          <Radio value={1}>A</Radio>
                          <Radio value={2}>B</Radio>
                          <Radio value={3}>C</Radio>
                          <Radio value={4}>D</Radio>
                      </RadioGroup>
                  )}
              </FormItem>
              <FormItem
                  {...formItemLayout}
                  label="time"
              >
                  {getFieldDecorator('time', {
                      rules: [],
                  })(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
              </FormItem>
          </Form>
      );
  }
}
Arrays.propTypes = {

};
Arrays.defaultProps = {
    title: '创建新查询'
};
const WrappedNormalLoginForm = Form.create()(Arrays);

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    };
};
export default connect(mapStateToProps)(WrappedNormalLoginForm);
