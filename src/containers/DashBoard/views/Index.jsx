import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../models/actions';
// import styles from './index.less';
import { PureComponent, ToolTipText, Loading } from 'components';
import MyQueryTable from './myQueryTable';
import MyQuery from './myQuery';
import { Row, Col } from 'antd';
// import update from 'immutability-helper';
// import PropTypes from 'prop-types';
// import {createTimer, clearTimer} from 'common';

class Home extends PureComponent {
    constructor(props) {
        super(props);
    }
    aa = () => {
        this.props.dispatch(Act.addNumAct());
    }
    render() {
        return <div>
            <div onClick={this.aa} style={{ width: 100 }}>
                <ToolTipText />
            </div>
            <Row gutter={20}>
                <Col span={16}>
                    <MyQueryTable
                        title='我的查询'
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