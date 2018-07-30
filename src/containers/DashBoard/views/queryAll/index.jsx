import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../../models/actions';
import styles from './index.less';
import { PureComponent, ToolTipText, Tables } from 'components';
import { Row, Col, Button, message} from 'antd';
import {webHistory} from 'utils';
// import update from 'immutability-helper';
// import PropTypes from 'prop-types';
@connect((state, props) => ({
    newData: state.dashBoard
}))
class Home extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.query();
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
    render() {
        const {myQuery} = this.props.newData;
        return <div className={styles.main}>
            <Row gutter={20}>
                <Col span={24}>
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
                                width: 255,
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
                        all={false}
                    />
                </Col>
                <Col span={24}>
                    <Tables
                        title='Shared query records'
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
                                width: 255,
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
                        all={false}
                        showQuery
                        dataType=''
                        dispatch={this.props.dispatch}
                        dataType={Act.getSearchQueryTaskInstance}
                    />
                </Col>
            </Row>

        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    };
};

export default connect(mapStateToProps)(Home);