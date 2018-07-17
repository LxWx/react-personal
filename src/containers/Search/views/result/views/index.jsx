import React from 'react';
import { connect } from 'react-redux';
// import * as Act from '../../models/actions';
import styles from './index.less';
import { PureComponent, Charts, Tables} from 'components';
import { Button } from 'antd';
import CordinateModals from './coordinateModals';
import TraceModals from './traceModals';
import StatisticsModals from './statisticsModals';
import ScreenModals from './screenModals';

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
    render() {
        const {columns, data} = this.props;
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
                <Tables title={false} showHeader={true} columns={columns} data={data}/>
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

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    };
};

export default connect(mapStateToProps)(QueryLog);