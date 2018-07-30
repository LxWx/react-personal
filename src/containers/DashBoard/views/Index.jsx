import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../models/actions';
import styles from './index.less';
import { PureComponent, ToolTipText, Tables } from 'components';
import MyQuery from './myQuery';
import { Row, Col, Button, message, Modal, Form, Checkbox, Select, Input, Radio, TimePicker} from 'antd';
import {webHistory} from 'utils';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
// import update from 'immutability-helper';
// import PropTypes from 'prop-types';
const CheckboxGroup = Checkbox.Group;
const initState = {
    radio1: false,
    radio2: false,
    radio3: false,
    dayValue: null,
    monthValue: null,
    timePickerValue: undefined,
};
@connect((state, props) => ({
    newData: state.dashBoard
}))
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            radio1: true,
            radio2: false,
            radio3: false,
            monthArr: [1,2,3,4,5,6,7,8,9,10,11,12],
            dayOfWeekArr: [1,2,3,4,5,6,7],
            dayValue: 1,
            monthValue: 1,
            timePickerValue: undefined,
            templateId: '',
            ownerCode: ''
        };
    }
    clearState = () => {
        this.setState({
            ...initState
        });
    }
    onOk = () => {
        const time = moment(this.state.timePickerValue);
        if (!this.state.timePickerValue) {
            message.error('请选择开始执行时间');
            return;
        }
        let param = {
            templateId: this.state.templateId,
            ownerCode: this.state.ownerCode,
            seconds: time.second(),
            minutes: time.minute(),
            hours: time.hour()
        };
        if (this.state.radio1) {
            param.month = this.state.monthValue;
        }
        if (this.state.radio2) {
            param.dayOfWeek = this.state.dayValue;
        }
        this.props.dispatch(Act.submitTimedQueryTaskByTemplateId({
            data: param,
            callback: (res) => {
                if (res.statusCode == 0) {
                    this.setState({
                        modalShow: false
                    });
                    this.clearState();
                } else {
                    message.error('系统错误');
                }
            }
        }));

    }
    onCancel = () => {
        this.setState({
            modalShow: false
        });
        this.clearState();
    }
    componentDidMount() {
        this.query();
        this.queryTask();
        this.queryTemplate();

    }

    selectChange = (v, a) => {
        this.setState({
            [v]: a
        });
    }
    lates = (text) => {
        const {dispatch} = this.props;
        dispatch(Act.getSearchLatestQueryTaskInstance({
            data: {
                ownerCode: '1001',
                size: 10,
                taskName: text
            }
        }));
    }

    template = (data) => {
        const {dispatch} = this.props;
        dispatch(Act.saveQueryTaskInstanceToTemplate({
            data: {
                ownerCode: data.ownerCode || '1001',
                runId: data.runId || 'cc3db074d566432fac2e1aacb1e0d5e1'
            },
            callback: (data) => {
                console.log(data, 'data');
                if (data.statusCode != 0) {
                    message.error('服务异常');
                } else {
                    this.query();
                }
            }
        }));
    }
    see = (v) => {
        webHistory.push(`/result?runId=${v.runId}`);
    }
    query = () => {
        const {dispatch} = this.props;
        dispatch(Act.getSearchQueryTaskInstance({
            data: {
                ownerCode: '1001',
                size: 5
            }
        }));
    }
    queryTask = () => {
        const {dispatch} = this.props;
        dispatch(Act.getSearchTimedQueryTask({
            data: {
                ownerCode: '1001',
                size: 10
            }
        }));
    }

    queryTemplate = () => {
        const {dispatch} = this.props;
        dispatch(Act.getSearchQueryTemplate({
            data: {
                ownerCode: '1001',
                size: 10
            }
        }));
    }


    delete = (v) => {
        const {dispatch} = this.props;
        dispatch(Act.deleteQueryTaskInstanceResult({
            data: {
                runId: v.runId
            },
            callback: (res) => {
                if (res.statusCode == 0) {
                    this.query();
                } else {
                    message.error('服务异常,废弃失败');
                }
            }
        }));
    }
    templateSubmit = (v) => {
        const {dispatch} = this.props;
        dispatch(Act.submitQueryTaskByTemplateId({
            data: {
                templateId: v.templateId,
                ownerCode: v.ownerCode
            },
            callback: (res) => {
                console.log(res);
            }
        }));
    }
    templateDelete = (v) => {
        const {dispatch} = this.props;
        dispatch(Act.deleteTemplate({
            data: {
                templateId: v.templateId
            },
            callback: (res) => {
                if (res.statusCode == 0) {
                    this.template();
                } else {
                    message.error('服务异常,废弃失败');
                }
            }
        }));
    }
    taskDelete = () => {
        const {dispatch} = this.props;
        dispatch(Act.deleteTemplate({
            data: {
                takId: v.takId
            },
            callback: (res) => {
                if (res.statusCode == 0) {
                    this.queryTemplate();
                } else {
                    message.error('服务异常,废弃失败');
                }
            }
        }));
    }
    queryAllTo = () => {
        webHistory.push('/queryAll');
    }
    taskAllTo = () => {
        webHistory.push('/taskAll');
    }
    templateAllTo = () => {
        webHistory.push('/templateAll');
    }
    typeGroupChange = () => {

    }
    timePickerChange = (time, timeString) => {
        this.setState({
            timePickerValue: time
        });
    }
    onChangeBox = (e) => {
        const arr = ['radio1', 'radio2', 'radio3'];
        arr.forEach(it => {
            if (it == e) {
                this.setState({
                    [it]: true
                });
            } else {
                this.setState({
                    [it]: false
                });
            }
        });
    }
    render() {
        const {myQuery, myTask, myTemplate, latelyData} = this.props.newData;
        return <div className={styles.main}>
            <Row gutter={20}>
                <Col span={16}>
                    <Tables
                        title='My Query'
                        columns={
                            [{
                                title: 'runId',
                                dataIndex: 'runId',
                                key: 'runId',
                                render: text => <ToolTipText text={text}/>,
                            }, {
                                title: 'taskName',
                                dataIndex: 'taskName',
                                key: 'taskName',
                                render: text => <ToolTipText text={text}/>,
                            }, {
                                title: 'runStatus',
                                dataIndex: 'runStatus',
                                key: 'runStatus',
                                render: text => <ToolTipText text={text}/>,
                            }, {
                                title: 'endTime',
                                dataIndex: 'endTime',
                                key: 'endTime',
                                width: 200,
                                render: text => <ToolTipText text={text && text + '前' || text}/>,
                            }, {
                                title: 'action',
                                dataIndex: 'action',
                                key: 'action',
                                width: 270,
                                render: (text, record, index) => {
                                    return (
                                        <div>
                                            {
                                                record.output ? <div className={styles.btnMain}>
                                                    <Button onClick={this.template.bind(this,record)} disabled={!!record.templateId}>
                                                    模板化
                                                    </Button>
                                                    <Button onClick={this.see.bind(this, record)}>
                                                        查看
                                                    </Button>
                                                    <Button onClick={this.delete.bind(this, record)}>
                                                        废弃
                                                    </Button>
                                                </div> : <div>
                                                            结果已自动废弃
                                                </div>
                                            }
                                        </div>
                                    );
                                },
                            }]
                        }
                        data={myQuery}
                        allTo={this.queryAllTo}
                    />
                    <Tables
                        title='My Module'
                        columns={
                            [{
                                title: 'templateId',
                                dataIndex: 'templateId',
                                key: 'templateId',
                                render: text => <ToolTipText text={text}/>,
                            }, {
                                title: 'templateName',
                                dataIndex: 'templateName',
                                key: 'templateName',
                                render: text => <ToolTipText text={text}/>,
                            }, {
                                title: 'ownerCode',
                                dataIndex: 'ownerCode',
                                key: 'ownerCode',
                                render: text => <ToolTipText text={text && 'Owner :' + text || ''}/>,
                            }, {
                                title: 'action',
                                dataIndex: 'action',
                                key: 'action',
                                width: 320,
                                render: (text, record, index) => {
                                    return (
                                        <div className={styles.btnMain}>
                                            <Button onClick={() => {
                                                this.setState({
                                                    modalShow: true,
                                                    templateId: record.templateId,
                                                    ownerCode: record.ownerCode
                                                });
                                            }} >
                                                    定时
                                            </Button>
                                            <Button onClick={this.templateSubmit.bind(this, record)}>
                                                    执行
                                            </Button>
                                            <Button onClick={this.templateDelete.bind(this, record)}>
                                                    删除
                                            </Button>
                                            <Button>
                                                    分享
                                            </Button>
                                        </div>
                                    );
                                },
                            }]
                        }
                        data={myTemplate}
                        allTo={this.templateAllTo}
                    />
                    <Tables
                        title='MY Schedule'
                        columns={
                            [{
                                title: 'taskId',
                                dataIndex: 'taskId',
                                key: 'taskId',
                                render: text => <ToolTipText text={text}/>,
                            }, {
                                title: 'taskName',
                                dataIndex: 'taskName',
                                key: 'taskName',
                                render: text => <ToolTipText text={text}/>,
                            }, {
                                title: 'nextTime',
                                dataIndex: 'nextTime',
                                key: 'nextTime',
                                render: text => <ToolTipText text={'下次执行：' + text}/>,
                            }, {
                                title: 'action',
                                dataIndex: 'action',
                                key: 'action',
                                width: 245 ,
                                render: (text, record, index) => {
                                    return (
                                        <div className={styles.btnMain}>
                                            <Button>
                                                    查看
                                            </Button>
                                            <Button>
                                                    分享
                                            </Button>
                                            <Button onClick={this.taskDelete.bind(this, record)}>
                                                    删除
                                            </Button>
                                        </div>
                                    );
                                },
                            }]
                        }
                        data={myTask}
                        allTo={this.taskAllTo}
                    />
                </Col>
                <Col span={8}>
                    <MyQuery
                        search={this.lates}
                        data={latelyData}
                    />
                </Col>
            </Row>
            <Modal
                visible={this.state.modalShow}
                onCancel={this.onCancel}
                onOk={this.onOk}
                width={800}
            >
                <Row style={{marginBottom: 20}} gutter={20}>
                    <Col className='center-32' span={8}>
                        <Col span={8}>
                            <Radio checked={this.state.radio1} onChange={this.onChangeBox.bind(this, 'radio1')}>每月：</Radio>
                        </Col>
                        <Col span={16}>
                            <Select value={this.state.monthValue} onChange={this.selectChange.bind(this, 'monthValue')} style={{width: '100%'}}>
                                {
                                    this.state.monthArr.map(it => {
                                        return <Option value={it}>{it}</Option >;
                                    })
                                }
                            </Select>
                        </Col>
                    </Col>
                    <Col className='center-32' span={8}>
                        <Col span={8}>
                            <Radio checked={this.state.radio2} onChange={this.onChangeBox.bind(this, 'radio2')}>每周：</Radio>
                        </Col>
                        <Col span={16}>
                            <Select value={this.state.dayValue} onChange={this.selectChange.bind(this, 'dayValue')} style={{width: '100%'}}>
                                {
                                    this.state.dayOfWeekArr.map(it => {
                                        return <Option value={it}>{it}</Option >;
                                    })
                                }
                            </Select>
                        </Col>
                    </Col>
                    <Col className='center-32' span={8}>
                        <Radio checked={this.state.radio3} onChange={this.onChangeBox.bind(this, 'radio3')}>每日</Radio>
                    </Col>
                </Row>
                <Row className='center-32'>
                    <Col span={4}>
                        开始执行时间：
                    </Col>
                    <Col span={4}>
                        <TimePicker value={this.state.timePickerValue} onChange={this.timePickerChange}/>
                    </Col>
                </Row>

            </Modal>

        </div>;
    }
}
export default Home;