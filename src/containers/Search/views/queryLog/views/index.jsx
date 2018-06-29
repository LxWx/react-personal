import React from 'react';
import { connect } from 'react-redux';
// import * as Act from '../../models/actions';
import styles from './index.less';
import { PureComponent, Charts, Table} from 'components';
import { Row, Col, Checkbox } from 'antd';

class QueryLog extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.main}>
                <Table />
                <Table />
            </div>
        )
    }
}

QueryLog.propTypes = {

}
QueryLog.defaultProps = {

}

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    }
};

export default connect(mapStateToProps)(QueryLog);