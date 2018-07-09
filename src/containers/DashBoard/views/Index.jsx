import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../models/actions';
// import styles from './index.less';
import { PureComponent, ToolTipText, Loading } from 'components';
import MyQueryTable from './myQueryTable';
import MyQuery from './myQuery';
import { Row, Col, Button } from 'antd';
// import update from 'immutability-helper';
// import PropTypes from 'prop-types';
// import {createTimer, clearTimer} from 'common';

class Home extends PureComponent {
    constructor(props) {
        super(props);
    }
    aa = () => {
        this.props.dispatch(Act.addNum());
    }
    render() {
        return <div onClick={this.aa}>
            <Row gutter={20}>
                <Col span={16}>
                    <MyQueryTable
                        title='我的查询'
                        columns={
                            [{
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                                render: text => <a href="javascript:;">{text}</a>,
                            }, {
                                title: 'Age',
                                dataIndex: 'age',
                                key: 'age',
                            }, {
                                title: 'Address',
                                dataIndex: 'address',
                                key: 'address',
                            }, {
                                title: 'Title',
                                dataIndex: 'title',
                                key: 'title',
                            }, {
                                title: 'Action',
                                dataIndex: 'action',
                                key: 'action',
                                render: (text, record, index) => {
                                    return (
                                        <div>
                                            {
                                                text == 1 ? <div>
                                                    <Button>
                                                        分享
                                                    </Button>
                                                    <Button>
                                                        查看
                                                    </Button>
                                                    <Button>
                                                        废弃
                                                    </Button>
                                                </div> : text == 2 ? <div>
                                                    <Button>
                                                        取消
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
                        data={
                            [{
                                key: '1',
                                name: 'John Brown',
                                age: 32,
                                address: 'New York No. 1 Lake Park',
                                title: '2',
                                action: 1
                            }, {
                                key: '2',
                                name: 'Jim Green',
                                age: 42,
                                address: 'London No. 1 Lake Park',
                                title: '2',
                                action: 2
                            }, {
                                key: '3',
                                name: 'Joe Black',
                                age: 32,
                                address: 'Sidney No. 1 Lake Park',
                                title: '2',
                                action: 3
                            }]
                        }
                    />
                    <MyQueryTable
                        title='查询模板'
                    />
                    <MyQueryTable
                        title='我的定时任务'
                    />
                </Col>
                <Col span={8}>
                    <MyQuery />
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