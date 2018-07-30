import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../models/actions';
import styles from './index.less';
import { PureComponent, Loading} from 'components';
import { Button, Table, message} from 'antd';
import CordinateModals from './coordinateModals';
import TraceModals from './traceModals';
import StatisticsModals from './statisticsModals';
import ScreenModals from './screenModals';
import WebSocketClient from 'utils/WebSocketClient';
import queryString from 'query-string';

@connect((state, props) => ({
    newData: state.result
}))
class QueryLog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cordinateVisible: false,
            traceVisible: false,
            statisticsVisible: false,
            screenVisible: false
        };
    }
    startLoading = () => {
        this.loading = Loading.newInstance();
        return this.loading;
    }
    endLoading = () => {
        this.loading.destroy();
    }
    componentDidMount() {
        this.startLoading();
        const {runId, status} = queryString.parse(this.props.location.search);
        if (status && status == 'new') {
            this.ws = new WebSocketClient('ws://192.168.54.36:8080/csot-eda-web/socket/text');
            this.ws.connect(() => {
                this.ws.emit('register', {
                    runId: runId
                });
            });
            this.ws.onMessage = (msg) => {
                let newMsg = JSON.parse(msg);
                console.log(newMsg, 'newMsg------newMsg');
                if (newMsg && newMsg.runState == 'FAILED') {
                    this.endLoading();
                    this.loading = null;
                    message.error('查询异常');
                    return;
                } else {
                    if (newMsg && newMsg.runId) {
                        this.props.dispatch(Act.searchQueryTaskResult({
                            data: {
                                pageNum: 1,
                                pageSize: 10,
                                runId: newMsg.runId
                            },
                            callback: (res) => {
                                console.log(res, 'res');
                                if (res.statusCode == 0) {
                                    this.endLoading();
                                }
                            }
                        }));
                    }
                }

            };
        } else {
            this.props.dispatch(Act.searchQueryTaskResult({
                data: {
                    pageNum: 1,
                    pageSize: 10,
                    runId: runId
                },
                callback: (res) => {
                    console.log(res, 'res');
                    if (res.statusCode == 0) {
                        this.endLoading();
                    } else {
                        message.error('系统错误');
                        this.endLoading();
                    }
                    this.loading = null;
                }
            }));
        }


    }
    componentWillUnmount() {
        const {runId, status} = queryString.parse(this.props.location.search);
        if (status && status == 'new') {
            this.ws.close();
        }
        if (this.loading ) {
            this.endLoading();
        }
    }


    cordinateCancel = () => {
        this.setState({
            cordinateVisible: false
        });
    }
    cordinateOk = () => {
        this.setState({
            cordinateVisible: false
        });
    }
    traceCancel = () => {
        this.setState({
            traceVisible: false
        });
    }
    traceeOk = () => {
        this.setState({
            traceVisible: false
        });
    }
    statisticsCancel = () => {
        this.setState({
            statisticsVisible: false
        });
    }
    statisticseOk = () => {
        this.setState({
            statisticsVisible: false
        });
    }
    screenCancel = () => {
        this.setState({
            screenVisible: false
        });
    }
    screenOk = () => {
        this.setState({
            screenVisible: false
        });
    }
    changeData = (data) => {
        if (!data) {
            return {};
        }
        let {header=[], body=[], pageNum=1, pageSize= 10, total=0} = data;
        let newHeader = [];
        header.forEach(it => {
            newHeader.push({
                title: it,
                dataIndex: it,
                key: it
            });
        });
        body.map((it, key) => {
            it.rowKey = key;
            return it;
        });
        data.newHeader = newHeader;
        return data;
    }
    render() {
        const {columns, data} = this.props;
        const {resultData} = this.props.newData;
        let newResultData = this.changeData(resultData);
        let {newHeader=[], body=[], pageNum=1, pageSize= 10, total=0} = newResultData;
        return (
            <div className={styles.main}>
                <div className={styles.titleGroup}>
                    <div className={styles.text}>
                    指定GLASS的TDAOI Defect信息
                    </div>
                    <div>
                        <Button type="primary">Charts</Button>
                        <Button onClick={() => {
                            this.setState({
                                cordinateVisible: true
                            });
                        }} type="primary">坐标运算</Button>
                        <Button type="primary">栏位运算</Button>
                        <Button onClick={() => {
                            this.setState({
                                traceVisible: true
                            });
                        }} type="primary">追溯</Button>
                        <Button onClick={() => {
                            this.setState({
                                statisticsVisible: true
                            });
                        }} type="primary">统计分析</Button>
                        <Button onClick={() => {
                            this.setState({
                                screenVisible: true
                            });
                        }} type="primary">筛选</Button>
                        <Button type="primary">下载</Button>
                    </div>
                </div>
                <Table rowKey={record => record.rowKey} bordered showHeader={true} columns={newHeader} dataSource={body}/>
                <CordinateModals
                    visible={this.state.cordinateVisible}
                    onCancel={this.cordinateCancel}
                    onOk={this.cordinateOk}
                />
                <TraceModals
                    visible={this.state.traceVisible}
                    onCancel={this.traceCancel}
                    onOk={this.traceeOk}
                />
                <StatisticsModals
                    visible={this.state.statisticsVisible}
                    onCancel={this.statisticsCancel}
                    onOk={this.statisticseOk}
                />
                <ScreenModals
                    visible={this.state.screenVisible}
                    onCancel={this.screenCancel}
                    onOk={this.screenOk}
                />
            </div>
        );
    }
}

QueryLog.propTypes = {

};
QueryLog.defaultProps = {
    columns: [{
        title: 'GlassId',
        dataIndex: 'GlassId',
        key: 'GlassId'
    }, {
        title: 'ProcessId',
        dataIndex: 'ProcessId',
        key: 'ProcessId',
    }, {
        title: 'EQPId',
        dataIndex: 'EQPId',
        key: 'EQPId',
    }, {
        title: 'ProductGroup',
        dataIndex: 'ProductGroup',
        key: 'ProductGroup',
    },{
        title: 'ProductId',
        dataIndex: 'ProductId',
        key: 'ProductId'
    }, {
        title: 'StartTime',
        dataIndex: 'StartTime',
        key: 'StartTime',
    }, {
        title: 'EndTime',
        dataIndex: 'EndTime',
        key: 'EndTime',
    }, {
        title: 'DefectNo',
        dataIndex: 'DefectNo',
        key: 'DefectNo',
    },{
        title: 'Image',
        dataIndex: 'Image',
        key: 'Image'
    }, {
        title: 'DefectSize',
        dataIndex: 'DefectSize',
        key: 'DefectSize',
    }, {
        title: 'X1',
        dataIndex: 'X1',
        key: 'X1',
    }, {
        title: 'Y1',
        dataIndex: 'Y1',
        key: 'Y1',
    }],
    data: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }],
};

export default QueryLog;