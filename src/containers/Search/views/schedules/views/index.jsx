import React from 'react';
import { connect } from 'react-redux';
// import * as Act from '../../../models/actions';
import styles from './index.less';
import { PureComponent, Charts, Table} from 'components';
import { Row, Col, Checkbox } from 'antd';
class Schedules extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { title } = this.props;
        return (
            <div className={styles.main}>
                <Table />
                <Table />
            </div>
        )
    }
}

Schedules.propTypes = {

}
Schedules.defaultProps = {
}

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    }
};

export default connect(mapStateToProps)(Schedules);