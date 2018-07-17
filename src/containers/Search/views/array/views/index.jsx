import React from 'react';
import { PureComponent } from 'components';
import { Transfer, Form, Input, Button, Checkbox, Select,Row, Col, Radio, DatePicker } from 'antd';
import { connect } from 'react-redux';
import styles from './index.less';
import update from 'immutability-helper';
import * as Act from '../models/actions';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const options = [
    { label: 'ProductGroup', value: 'ProductGroup' },
    { label: 'ProductId', value: 'ProductId' },
    { label: 'OwnerCode', value: 'OwnerCode' },
    { label: 'EQPType', value: 'EQPType' },
    { label: 'ProcessIds', value: 'ProcessIds' },
    { label: 'EQPId', value: 'EQPId' }
];
const columnOptions = [
    { label: '同一站点过多次只显示最后一次', value: 'one' },
    { label: '只显示MainEQP的记录', value: 'two' },
    { label: '只显示MainUnit的记录', value: 'three' }
];

@connect((state, props) => ({
    newData: state.array
}))
@Form.create()
class Arrays extends PureComponent {
    constructor(params) {
        super(params);
        this.state = {
            dataTypeValue: 1,
            screenArr: null,
            newScreenArr: null,
            mockData: [],
            targetKeys: [],
            columKeys: [],
            transfer: '',
            transferShow: false,
            columShow: false,
            columValue: null,
            top: 0,
            confirmValue: 1,
            timeArr: ['07:30', '08:30', '14:30','20:30'],
            dayArr: ['1天','3天','7天','30天'],
            textArr: ['1天','3天','7天','30天'],
            fixedTimeFlag: 0,
            fixedTimeValue: '',
            fixedDayValue: '',
            confirmFlag: true,
            columnOptions: columnOptions,
            textValue: null
        };
    }
    componentDidMount = () => {
        const {dispatch} = this.props;
        dispatch(Act.getSearchCache({tagName: 'ProductId'}));
        dispatch(Act.getSearchCache({tagName: 'ProductId'}));
        dispatch(Act.getSearchCache({tagName: 'ProductId'}));
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

    checkChange = (v) => {
        const { screenArr, newScreenArr } = this.state;
        let newScreen = update({}, { $set: screenArr });
        v.map(it => {
            newScreen = update(newScreen, { [it]: { $set: { targetKeys: newScreenArr[it].targetKeys || '', type: 'input', value: newScreenArr[it].value != '全部' ? newScreenArr[it].value : '' } } });
        });
        const merge = update(screenArr, { $merge: newScreen || {} });
        this.setState({
            newScreenArr: merge
        });
        if (v.length == 0) {
            this.setState({
                transferShow: false,

            });
            return;
        }
    }
    transferChange = (targetKeys, direction, moveKeys) => {
        const { transfer, newScreenArr } = this.state;
        let newScreen = update({}, { $set: newScreenArr });
        if (transfer != '' && transfer) {
            let newArr = update([], { $set: targetKeys }).map(it => {
                return this.state.mockData[it].title;
            });
            newScreen = update(newScreen, { [transfer]: { $set: { targetKeys: targetKeys, type: 'input', value: newArr.join(',') } } });
            this.setState({
                newScreenArr: newScreen
            });
        }
        this.setState({ targetKeys });
    }

    columChange = (targetKeys) => {
        let newArr = update([], { $set: targetKeys }).map(it => {
            return this.state.mockData[it].title;
        });
        this.setState({
            columValue: newArr.join(','),
            columKeys: targetKeys
        });
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }
    inputFocus = (n, e) => {
        const { newScreenArr } = this.state;
        this.setState({
            transferShow: true,
            transfer: n,
            targetKeys: newScreenArr[n].targetKeys || [],
            columShow: false,
            top: e.target.offsetTop - 6
        });
    }
    columnFocus = (e) => {

        this.setState({
            columShow: true,
            transferShow: false
        });
    }
    timeFocus = () => {
        this.setState({
            fixedTimeFlag: 1
        });
    }
    textFocus = () => {
        this.setState({
            fixedTimeFlag: 3
        });
    }
    dayFocus = () => {
        this.setState({
            fixedTimeFlag: 2
        });
    }
    timeBtnClick = (v, t) => {
        if (t == 'timeArr') {
            this.setState({
                fixedTimeValue: v
            });
        } else if (t == 'dayArr'){
            this.setState({
                fixedDayValue: v
            });
        } else {
            this.setState({
                textValue: v
            });
        }

    }
    radioChange = (v) => {
        this.setState({
            confirmFlag: v.target.value == 1
        });
    }
    typeGroupChange = (v) => {
        if (v.target.value != 1) {
            this.setState({
                columnOptions: update(this.state.columnOptions, {$set: [{ label: '同一站点过多次只显示最后一次', value: 'one' }]})
            });
        } else {
            this.setState({
                columnOptions: columnOptions
            });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { dataType, method } = this.props.newData;
        console.log(this.props.newData, 'this.props.newData');
        const { textValue, textArr, columnOptions, confirmFlag, dataTypeValue, newScreenArr, transfer, transferShow, columShow, columValue, top, confirmValue, timeArr, dayArr, fixedTimeFlag, fixedTimeValue, fixedDayValue} = this.state;
        const formItemLayout = {
            labelCol: {
                md: { span: 2 },
                sm: { span: 2 },
            },
            wrapperCol: {
                md: { span: 9 },
                sm: { span: 9 },
            },
        };
        const tailFormItemLayout = {
            labelCol: {
                md: { span: 4 },
                sm: { span: 4 },
            },
            wrapperCol: {
                md: { span: 20 },
                sm: { span: 20 },
            },
        };
        return (
            <div className={styles.main}>
                <div className={styles.title + ' clearfix'}>
                    <span className={'left'}>

                        创建新查询
                    </span>
                    <Button onClick={this.handleSubmit} className={styles.btn + ' right'} size="small" type="primary">提交</Button>
                </div>
                <Form className={styles.formMain}>
                    <Row>
                        <Col span={12}>
                            <FormItem
                            >
                                <div className={styles.labels}>
                                    数据类型：
                                </div>
                                <div className={styles.value}>
                                    {getFieldDecorator('dataType', {
                                        rules: [],
                                        initialValue: dataTypeValue
                                    })(
                                        <RadioGroup onChange={this.typeGroupChange}>
                                            {
                                                dataType.map(it => {
                                                    return <Radio value={it.value}>{it.name}</Radio>;
                                                })
                                            }
                                        </RadioGroup>
                                    )}
                                </div>
                            </FormItem>
                            <FormItem
                            >
                                <div className={styles.labels}>
                                    查询描述：
                                </div>
                                <div className={styles.value}>
                                    <Input onFocus={this.textFocus} value={textValue} type="text" />
                                </div>

                            </FormItem>
                            <FormItem
                            >
                                <div className={styles.labels}>
                                    查询方式：
                                </div>
                                <div className={styles.value}>
                                    {getFieldDecorator('confirm', {
                                        rules: [],
                                        initialValue: confirmValue
                                    })(
                                        <RadioGroup onChange={this.radioChange}>
                                            {
                                                method.map(it => {
                                                    return <Radio value={it.value}>{it.name}</Radio>;
                                                })
                                            }
                                        </RadioGroup>
                                    )}
                                </div>

                            </FormItem>
                            {
                                confirmFlag && <Row>
                                    <Col span={8}>
                                        <FormItem>
                                            {getFieldDecorator('timeType', {
                                                rules: [],
                                                initialValue: 1
                                            })(
                                                <RadioGroup className={styles.timeType}>
                                                    <Radio value={1}></Radio>
                                                    <Radio value={2}></Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={16}>
                                        <FormItem className={styles.timeStyle}>
                                            {getFieldDecorator('time', {
                                                rules: [],
                                            })(
                                                <DatePicker style={{width: 252}} showTime format="YYYY-MM-DD HH:mm" />
                                            )}
                                        </FormItem>
                                        <div className={styles.timeInput}>
                                        从今天
                                            <Input onFocus={this.timeFocus} value={fixedTimeValue}/>
                                        往前
                                            <Input onFocus={this.dayFocus} value={fixedDayValue}/>
                                        范围内
                                        </div>
                                    </Col>
                                </Row> || <Row>
                                    <Col offset={4}>
                                        <TextArea />
                                    </Col>
                                </Row>
                            }
                        </Col>
                        <Col className={styles.transferFixed} span={12}>
                            <Col span={14}>
                                {
                                    fixedTimeFlag != 0 && <div className={styles.timecheck}>
                                        <div>
                                            {
                                                fixedTimeFlag == 1 ? '特定时间' : fixedTimeFlag == 2 ? '时间换算' : '相关模板'
                                            }
                                        </div>
                                        {
                                            fixedTimeFlag == 1 && timeArr.map(it => {
                                                return <div>
                                                    <span>
                                                        {it}
                                                    </span>
                                                    <Button onClick={this.timeBtnClick.bind(this, it, 'timeArr')}>
                                                使用
                                                    </Button>
                                                </div>;
                                            })
                                        }

                                        {
                                            fixedTimeFlag == 2 && dayArr.map(it => {
                                                return <div>
                                                    <span>
                                                        {it}
                                                    </span>
                                                    <Button onClick={this.timeBtnClick.bind(this, it, 'dayArr')}>
                                                使用
                                                    </Button>
                                                </div>;
                                            })
                                        }

                                        {
                                            fixedTimeFlag == 3 && textArr.map(it => {
                                                return <div>
                                                    <span>
                                                        {it}
                                                    </span>
                                                    <Button onClick={this.timeBtnClick.bind(this, it, 'textArr')}>
                                                使用
                                                    </Button>
                                                </div>;
                                            })
                                        }
                                    </div>
                                }

                            </Col>
                        </Col>
                    </Row>
                    <Row>

                        <Col className={styles.screenTitle}>
                            筛选条件：
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <FormItem
                            >
                                {getFieldDecorator('screen', {
                                    rules: [],
                                })(
                                    <CheckboxGroup onChange={this.checkChange} className={styles.checkMain} options={options} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
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
                                            <Input onFocus={this.inputFocus.bind(this, it)} id={it} value={newScreenArr[it].value} />
                                        </div>;
                                    }
                                })
                            }
                        </Col>
                        <Col className={styles.transfer} span={12}>
                            {
                                transferShow && <div style={{ position: 'relative', top: top, zIndex: 10 }}>
                                    <div>
                                        选择{transfer}
                                    </div>
                                    <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        listStyle={{
                                            width: 200,
                                            height: 300,
                                        }}
                                        targetKeys={this.state.targetKeys}
                                        onChange={this.transferChange}
                                        render={item => `${item.title}`}
                                    />
                                </div> || null
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <FormItem
                            >
                                {getFieldDecorator('column', {
                                    rules: [],
                                })(
                                    <CheckboxGroup className={styles.columnMain} options={columnOptions} />
                                )}
                            </FormItem>
                            <FormItem
                                className={styles.columTitle}
                            >
                                <div className={styles.labels}>
                                    选择栏位
                                </div>
                                <div className={styles.value}>
                                    <Input onFocus={this.columnFocus} onBlur={this.columnBlur} value={columValue} />
                                </div>
                            </FormItem>
                        </Col>
                        <Col className={styles.transfer} span={12}>
                            {
                                columShow && <div>
                                    <div>
                                        选择栏位
                                    </div>
                                    <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        listStyle={{
                                            width: 200,
                                            height: 300,
                                        }}
                                        targetKeys={this.state.columKeys}
                                        onChange={this.columChange}
                                        render={item => `${item.title}`}
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
