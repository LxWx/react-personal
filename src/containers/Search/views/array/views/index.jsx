import React from 'react';
import { PureComponent } from 'components';
import { Transfer, Form, Input, Button, Checkbox,Row, Col, Radio, DatePicker, message} from 'antd';
import { connect } from 'react-redux';
import styles from './index.less';
import update from 'immutability-helper';
import * as Act from '../models/actions';
import moment from 'moment';
import {webHistory} from 'utils';
import { FormattedMessage } from 'react-intl';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const options = [
    { label: 'ProductGroup', value: 'productGroups' },
    { label: 'ProductId', value: 'productIds' },
    { label: 'OwnerCode', value: 'ownerCodes' },
    { label: 'EQPType', value: 'EQPTypes' },
    { label: 'ProcessIds', value: 'ProcessIds' },
    { label: 'EQPId', value: 'EQPIds' }
];
const columnOptions = [
    { label: 'Only the last data if glass passed the process multiple times', value: 'one' },
    { label: 'Only the MainEQP data', value: 'two' },
    { label: 'Only the MainUnit/MainChamber data', value: 'three' }
];
const columnOptionsZh = [
    { label: '同一站点过多次只选取最后一次', value: 'one' },
    { label: '只选取MainEQP的记录', value: 'two' },
    { label: '只选取MainUnit/MainChamber的记录', value: 'three' }
];

@connect((state, props) => ({
    newData: state.array,
    locales: state.commonStore.locales
}))
@Form.create()
class Arrays extends PureComponent {
    constructor(params) {
        super(params);
        this.state = {
            queryTopic: 'ARRAY_MAIN',
            screenArr: null,
            newScreenArr: null,
            targetKeys: [],
            columKeys: [],
            transfer: '',
            transferShow: false,
            columShow: false,
            columValue: null,
            top: 0,
            confirmValue: 'time',
            timeArr: ['07:30', '08:30', '14:30','20:30'],
            dayArr: ['1天','3天','7天','30天'],
            textArr: ['1天','3天','7天','30天'],
            fixedTimeFlag: 0,
            nowTime: '',
            timeInterval: '',
            confirmFlag: true,
            columnOptions: columnOptions,
            textValue: '',
            screenData: [],
            templateId: '',
            defaultTime: undefined,
            glassIds: '',
            lotIds: '',
            type: '',
            defaultScreen: []
        };
    }
    componentDidMount = () => {
        const newArr = this.setScreen(options);
        this.setState({
            screenArr: newArr,
            newScreenArr: newArr
        });
        if (this.props.locales) {
            this.setState({
                columnOptions: columnOptionsZh
            });
        }
    }
    changeDetail = (data) => {
        let timeArr = [];
        let obj = {};
        let arr = [];
        data && Object.keys(data.items).forEach(it => {
            const item = data.items[it];
            if (it == 'queryFields') {
                this.setState({
                    columValue: item
                });
            } else if (it == 'startTime' || it == 'endTime') {
                timeArr.push(item == '' ? undefined : moment(item));
            }else if (it == 'nowTime' || it == 'timeInterval' || it == 'lotIds' || it == 'glassIds' || it == 'queryTopic') {
                this.setState({
                    [it]: item
                });
            } else {
                obj[it] = {
                    value: item, type: 'input'
                };
                arr.push(it);
            }
        });
        this.setState({
            defaultTime: timeArr,
            newScreenArr: obj,
            defaultScreen: arr
        });
    }
    setScreen = (arr) => {
        let obj = {};
        if (Array.isArray(arr)) {
            arr.forEach(it => {
                obj[it.value] = {
                    value: 'All', type: 'text'
                };
            });
        } else {
            return null;
        }
        return obj;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {nowTime, timeInterval, columValue, newScreenArr} = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            let obj = {};
            let filterCondition = {};
            const confirm = values['confirm'];
            if (values.timeType == 2) {
                if (nowTime == '' || timeInterval == '') {
                    message.error('请正确选择时间范围');
                    return;
                }
            } else {
                if (!values['time'] || values['time'].length == 0) {
                    message.error('请正确选择时间范围');
                    return;
                }
            }
            if (!err) {
                obj.queryTopic = values.dataType;
                obj.taskName = this.state.textValue;
                obj.templateId = this.state.templateId;
                if (columValue) {
                    obj.queryFields = columValue;
                }
                Object.keys(newScreenArr).forEach(it => {
                    if (newScreenArr[it].value != 'All' && newScreenArr[it].value != '') {
                        filterCondition[it] = newScreenArr[it].value;
                    }
                });

                if (confirm != 'time') {
                    filterCondition[confirm] = this.state[confirm];
                } else {
                    if (values.timeType == 2) {
                        filterCondition.nowTime = this.state.nowTime;
                        filterCondition.timeInterval = this.state.timeInterval;
                    } else {
                        filterCondition.startTime = values['time'][0].format('YYYY-MM-DD HH:mm');
                        filterCondition.endTime = values['time'][1].format('YYYY-MM-DD HH:mm');
                    }
                }
                obj.filterCondition = filterCondition;
                this.props.dispatch(Act.getSubmitQueryTask({data: obj, callback: (v) => {
                    if (v.statusCode == 0) {
                        webHistory.push('dashBoard');
                    } else {
                        message.error('服务异常');
                    }
                }}));
            }
        });
    }

    checkChange = (v) => {
        const { screenArr, newScreenArr } = this.state;
        let newScreen = update({}, { $set: screenArr });
        console.log(newScreenArr);
        v.map(it => {
            newScreen = update(newScreen, { [it]: { $set: { targetKeys: newScreenArr[it] && newScreenArr[it].targetKeys || '', type: 'input', value: newScreenArr[it] && newScreenArr[it].value != 'All' ? newScreenArr[it].value : '' } } });
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
        const { screenData} = this.props.newData;
        let newScreen = update({}, { $set: newScreenArr });
        if (transfer != '' && transfer) {
            let newArr = update([], { $set: targetKeys }).map(it => {
                return screenData[transfer][it].value;
            });
            newScreen = update(newScreen, { [transfer]: { $set: { targetKeys: targetKeys, type: 'input', value: newArr.join(',') } } });
            this.setState({
                newScreenArr: newScreen
            });
        }
        this.setState({ targetKeys });
    }

    columChange = (targetKeys) => {
        const {searchQueryFields} = this.props.newData;
        let newArr = update([], { $set: targetKeys }).map(it => {
            return searchQueryFields[it].value;
        });
        this.setState({
            columValue: newArr.join(','),
            columKeys: targetKeys
        });
    }
    inputFocus = (n, e) => {
        const { newScreenArr } = this.state;
        const {dispatch} = this.props;
        const { screenData} = this.props.newData;
        let newScreen = update({}, { $set: newScreenArr });
        this.setState({
            transferShow: true,
            transfer: n,
            targetKeys: newScreenArr[n].targetKeys || [],
            columShow: false,
            top: e.target.offsetTop - 6
        }, () => {
            if (!screenData[this.state.transfer]) {
                dispatch(Act.getSearchCache({data: {tagName: n}, callback: (v) => {
                    const val = newScreen[n].value;
                    const valArr = val.split(',');
                    let keys = [];
                    v.forEach(it => {
                        valArr.forEach(item => {
                            if (it.value == item) {
                                keys.push(it.key);
                            }
                        });
                    });
                    newScreen = update(newScreen, { [n]: { $set: { targetKeys: keys, type: newScreen[n].type, value: val } } });
                    this.setState({
                        newScreenArr: newScreen,
                        targetKeys: keys
                    });
                }}));
            }
        });
    }
    columnFocus = (e) => {
        const { searchQueryFields} = this.props.newData;
        if (!searchQueryFields) {
            this.getTask();
        }
        this.setState({
            columShow: true,
            transferShow: false
        });
    }
    getTask = (v) => {
        const {dispatch} = this.props;
        const { getFieldValue } = this.props.form;
        const dataType = getFieldValue('dataType');
        dispatch(Act.getSearchQueryFields({data: {
            queryTopic: v || dataType
        }}));
    }
    timeFocus = () => {
        this.setState({
            fixedTimeFlag: 1
        });
    }
    textFocus = () => {
        const {dispatch} = this.props;
        const {template} = this.props.newData;
        if (!template) {
            dispatch(Act.getSearchOwnerTemplate({data: {
                ownerCode: '1001'
            }}));
        }

        this.setState({
            fixedTimeFlag: 3
        });
    }
    textChange = (v) => {
        this.setState({
            textValue: v.target.value
        });
    }
    dayFocus = () => {
        this.setState({
            fixedTimeFlag: 2
        });
    }
    timeBtnClick = (v, t) => {
        const {dispatch} = this.props;
        if (t == 'timeArr') {
            this.setState({
                nowTime: v
            });
        } else if (t == 'dayArr'){
            this.setState({
                timeInterval: v
            });
        } else {
            this.setState({
                textValue: v.templateName,
                templateId: v.templateId
            }, () => {
                dispatch(Act.getSearchById({data: {
                    templateId: this.state.templateId
                }, callback: (data) => {
                    this.changeDetail(data);
                }}));
            });
        }

    }
    radioChange = (v) => {
        this.setState({
            confirmFlag: v.target.value == 'time',
            type: v.target.value
        });
    }
    textAreaChange = (v) => {
        const {type} = this.state;
        this.setState({
            [type]: v.target.value
        });
    }
    typeGroupChange = (v) => {
        this.getTask(v.target.value);
        if (v.target.value != this.state.queryTopic) {
            this.setState({
                columnOptions: update(this.state.columnOptions, {$set: this.props.locales && [{ label: '同一站点过多次只显示最后一次', value: 'one' }] || [{ label: 'Only the last data if glass passed the process multiple times', value: 'one' }]})
            });
        } else {
            this.setState({
                columnOptions: columnOptions
            });
        }

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { dataType, method, screenData, template, searchQueryFields, detail} = this.props.newData;
        const { textValue, columnOptions, confirmFlag, queryTopic, newScreenArr, transfer, transferShow, columShow, columValue, top, confirmValue, timeArr, dayArr, fixedTimeFlag, nowTime, timeInterval, defaultTime, defaultScreen} = this.state;
        return (
            <div className={styles.main}>
                <div className={styles.title + ' clearfix'}>
                    <span className={'left'}>

                        <FormattedMessage id='New Query'/>
                    </span>
                    <Button onClick={this.handleSubmit} className={styles.btn + ' right'} size="small" type="primary">提交</Button>
                </div>
                <Form className={styles.formMain}>
                    <Row>
                        <Col span={12}>
                            <FormItem

                            >
                                <div className={styles.fromItem}>
                                    <div className={styles.labels}>
                                        <FormattedMessage id='DataType'/>:
                                    </div>
                                    <div className={styles.value}>
                                        {getFieldDecorator('dataType', {
                                            rules: [],
                                            initialValue: queryTopic
                                        })(
                                            <RadioGroup onChange={this.typeGroupChange}>
                                                {
                                                    dataType.map(it => {
                                                        return <Radio value={it.value}><FormattedMessage id={it.name}/></Radio>;
                                                    })
                                                }
                                            </RadioGroup>
                                        )}
                                    </div>
                                </div>
                            </FormItem>
                            <FormItem

                            >
                                <div className={styles.fromItem}>
                                    <div className={styles.labels}>
                                        <FormattedMessage id='Query Descriptioin'/>:
                                    </div>
                                    <div className={styles.value}>
                                        <Input onChange={this.textChange} onFocus={this.textFocus} value={textValue} type="text" />
                                    </div>
                                </div>

                            </FormItem>
                            <FormItem

                            >
                                <div className={styles.fromItem}>
                                    <div className={styles.labels}>
                                        <FormattedMessage id='Qeury By'/>:
                                    </div>
                                    <div className={styles.value}>
                                        {getFieldDecorator('confirm', {
                                            rules: [],
                                            initialValue: confirmValue
                                        })(
                                            <RadioGroup onChange={this.radioChange}>
                                                {
                                                    method.map(it => {
                                                        return <Radio value={it.value}><FormattedMessage id={it.name}/></Radio>;
                                                    })
                                                }
                                            </RadioGroup>
                                        )}
                                    </div>
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
                                                initialValue: defaultTime
                                            })(
                                                <RangePicker showTime format="YYYY-MM-DD HH:mm" />
                                            )}
                                        </FormItem>
                                        <div className={styles.timeInput}>
                                        从今天
                                            <Input onFocus={this.timeFocus} value={nowTime}/>
                                        往前
                                            <Input onFocus={this.dayFocus} value={timeInterval}/>
                                        范围内
                                        </div>
                                    </Col>
                                </Row> || <Row>
                                    <Col offset={4}>
                                        <TextArea onChange={this.textAreaChange} value={this.state[this.state.type]}/>
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
                                            fixedTimeFlag == 3 && template && template.map(it => {
                                                return <div>
                                                    <span>
                                                        {it.templateName}
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
                                    initialValue: defaultScreen
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
                                                <FormattedMessage id={newScreenArr[it].value}/>
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
                                        dataSource={screenData[transfer] || []}
                                        showSearch
                                        listStyle={{
                                            width: 200,
                                            height: 300,
                                        }}
                                        targetKeys={this.state.targetKeys}
                                        onChange={this.transferChange}
                                        render={item => `${item.value}`}
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
                                <div className={styles.fromItem}>
                                    <div className={styles.labels}>
                                        <FormattedMessage id='Columns'/>
                                    </div>
                                    <div className={styles.value}>
                                        <Input onFocus={this.columnFocus} onBlur={this.columnBlur} value={columValue} />
                                    </div>
                                </div>
                            </FormItem>
                        </Col>
                        <Col className={styles.transfer} span={12}>
                            {
                                columShow && <div>
                                    <div>
                                        <FormattedMessage id='Columns'/>
                                    </div>
                                    <Transfer
                                        dataSource={searchQueryFields || []}
                                        showSearch
                                        listStyle={{
                                            width: 200,
                                            height: 300,
                                        }}
                                        targetKeys={this.state.columKeys}
                                        onChange={this.columChange}
                                        render={item => `${item.value}`}
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
