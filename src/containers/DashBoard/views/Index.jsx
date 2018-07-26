import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../models/actions';
import styles from './index.less';
import { PureComponent, ToolTipText, Tables } from 'components';
import MyQuery from './myQuery';
import { Row, Col, Button, message, Modal, Form, Checkbox, Select, Input} from 'antd';
import {webHistory} from 'utils';
import WebSocketClient from 'utils/WebSocketClient';
// import update from 'immutability-helper';
// import PropTypes from 'prop-types';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
@Form.create()

@connect((state, props) => ({
    newData: state.dashBoard
}))
class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        };
    }
    componentDidMount() {
        this.query();
        this.queryTask();
        this.queryTemplate();
        // this.ws = new WebSocketClient('ws://192.168.54.108:8080/csot-eda-web/socket/text');
        // this.ws.connect(() => {
        //     this.ws.emit('', {
        //         page: '',
        //         search: '',
        //         pageId: '',
        //         control: false
        //     });
        // });
        // this.ws.onMessage = (msg) => {
        //     console.log(msg, 'msg');
        // };
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
                runId: 'cc3db074d566432fac2e1aacb1e0d5e1'
            },
            callback: (data) => {
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
    templateDelete = () => {
        const {dispatch} = this.props;
        dispatch(Act.deleteQueryTask({
            data: {
                templateId: v.templateId
            },
            callback: (res) => {
                if (res.statusCode == 0) {
                    this.queryTask();
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
    onCancel = () => {

    }
    onOk = () => {

    }
    typeGroupChange = () => {

    }
    onChangeBox = () => {

    }
    render() {
        const {myQuery, myTask, myTemplate, latelyData} = this.props.newData;
        const { getFieldDecorator } = this.props.form;
        return <div className={styles.main}>
            <Row gutter={20}>
                <Col span={16}>
                    <Tables
                        title='我的查询'
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
                        title='我的查询模板'
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
                                            <Button>
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
                        title='我的定时任务'
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
                            <Checkbox onChange={this.onChangeBox.bind(this, 1)}>每月：</Checkbox>
                        </Col>
                        <Col span={16}>
                            <Select style={{width: '100%'}}></Select>
                        </Col>
                    </Col>
                    <Col className='center-32' span={8}>
                        <Col span={8}>
                            <Checkbox onChange={this.onChangeBox.bind(this, 2)}>每月：</Checkbox>
                        </Col>
                        <Col span={16}>
                            <Select style={{width: '100%'}}></Select>
                        </Col>
                    </Col>
                    <Col className='center-32' span={8}>
                        <Checkbox onChange={this.onChangeBox.bind(this, 3)}>每月：</Checkbox>
                    </Col>
                </Row>
                <Row className='center-32'>
                    <Col span={4}>
                        开始执行时间：
                    </Col>
                    <Col span={4}>
                        <Input />
                    </Col>
                </Row>

            </Modal>

        </div>;
    }
}
export default Home;