import React from 'react';
import { connect } from 'react-redux';
// import * as Act from '../../models/actions';
import styles from './index.less';
import { PureComponent} from 'components';
class Add extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.main}>
                11111
            </div>
        );
    }
}

Add.propTypes = {

};
Add.defaultProps = {

};

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    };
};

export default connect(mapStateToProps)(Add);