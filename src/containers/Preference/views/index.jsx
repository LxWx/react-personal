import React from 'react';
import { connect } from 'react-redux';
import * as Act from '../models/actions';
import styles from './index.less';
import { PureComponent, Charts } from 'components';
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
    render() {
        return (<div>


        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    };
};

export default connect(mapStateToProps)(Home);