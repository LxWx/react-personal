import React from 'react';
import { PureComponent } from 'components';
import { Transfer, Form, Icon, Input, Button, Checkbox, Select, Tooltip, Cascader, Row, Col, Radio, DatePicker } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less';
import update from 'immutability-helper';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const options = [
    { label: 'ProductGroup', value: 'ProductGroup' },
    { label: 'ProductId', value: 'ProductId' },
    { label: 'OwnerCode', value: 'OwnerCode' },
    { label: 'EQPType', value: 'EQPType' },
    { label: 'ProcessIds', value: 'ProcessIds' },
    { label: 'EQPId', value: 'EQPId' }
];

@connect((state, props) => ({
    newData: state.array
}))
@Form.create()
class Arrays extends PureComponent {
    constructor(params) {
        super(params);
        this.state = {
            confirmDirty: false,
            dataTypeValue: 1,
            screenArr: null,
            newScreenArr: null,
            mockData: [],
            targetKeys: [],
            transfer: '',
            transferShow: false
        };
    }
    componentDidMount = () => {
        const newArr = this.setScreen(options);
        this.setState({
            screenArr: newArr,
            newScreenArr: newArr
        });
        this.getMock();
    }

    setScreen = (arr) => {
        let obj = {};
        if (Array.isArray(arr)) {
            arr.forEach(it => {
                obj[it.value] = {
                    value: '全部', type: 'text'
                };
            });
        } else {
            return null;
        }
        return obj;
    }
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

    checkChange = (v) => {
        const { screenArr } = this.state;
        let newScreen = update({}, { $set: screenArr });;
        v.map(it => {
            newScreen = update(newScreen, { [it]: { $set: { type: 'input', value: '' } } });
        });
        const merge = update(screenArr, { $merge: newScreen || {} });
        this.setState({
            newScreenArr: merge
        });
    }
    bindChange = () => {

    }
    transferChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }
    inputFocus = (n) => {
        this.setState({
            transferShow: true,
            transfer: n
        });
    }
    inputBlur = () => {
        this.setState({
            transferShow: false
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { dataType, method } = this.props.newData;
        const { dataTypeValue, newScreenArr, transfer, transferShow} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 22 },
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
            <div className={styles.main}>
                <div className={styles.title + ' clearfix'}>
                    <span className={'left'}>

                        创建新查询
                    </span>
                    <Button className={styles.btn + ' right'} size="small" type="primary">查看全部</Button>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="数据类型："
                    >
                        {getFieldDecorator('dataType', {
                            rules: [],
                            initialValue: dataTypeValue
                        })(
                            <RadioGroup>
                                {
                                    dataType.map(it => {
                                        return <Radio value={it.value}>{it.name}</Radio>;
                                    })
                                }
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
                            }],
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="查询方式："
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }],
                        })(
                            <RadioGroup value={this.state.dataType}>
                                {
                                    method.map(it => {
                                        return <Radio value={it.value}>{it.name}</Radio>;
                                    })
                                }
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
                    <Row>

                        <Col className={styles.screenTitle} xs={{ span: 24 }} sm={{ span: 2 }}>
                            筛选条件：
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 3 }}>
                            <FormItem
                            >
                                {getFieldDecorator('screen', {
                                    rules: [],
                                })(
                                    <CheckboxGroup onChange={this.checkChange} className={styles.checkMain} options={options} />
                                )}
                            </FormItem>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                            {
                                newScreenArr && Object.keys(newScreenArr).map(it => {
                                    if (newScreenArr[it].type == 'text') {
                                        return <div className={styles.arrMain}>
                                            {
                                                newScreenArr[it].value
                                            }
                                        </div>;
                                    } else {
                                        return <div className={styles.arrMain}>
                                            <Input onFocus={this.inputFocus.bind(this, it)} onBlur={this.inputBlur} id={it} value={newScreenArr[it].value} />
                                        </div>;
                                    }
                                })
                            }
                        </Col>
                        <Col className={styles.transfer} xs={{ span: 24 }} sm={{ span: 13 }}>
                            {
                                transferShow && <div>
                                    <div>
                                    选择{transfer}
                                    </div>
                                    <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        listStyle={{
                                            width: 250,
                                            height: 300,
                                        }}
                                        targetKeys={this.state.targetKeys}
                                        onChange={this.transferChange}
                                        render={item => `${item.title}-${item.description}`}
                                    />
                                </div> || null
                            }
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
Arrays.propTypes = {

};
Arrays.defaultProps = {
    title: '创建新查询'
};
export default Arrays;
