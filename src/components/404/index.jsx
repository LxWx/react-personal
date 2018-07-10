import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
import styles from './index.less';
import {webHistory} from '../../utils';
const uuid = require('uuid/v4');
class Not extends PureComponent {
    constructor(props) {
        super(props);
    }
    goHome = () => {
        webHistory.push('/dashBoard');
    }
    render() {
        console.log(1);
        return (
            <div className={styles.main}>

                <div className={styles.text}>
                404
                </div>
                <div className={styles.btnMain}>
                    <Button onClick={this.goHome} className={styles.btn}>
                    go Home
                    </Button>
                </div>
            </div>
        );
    }
}

Not.propTypes = {

};
Not.defaultProps = {

};
export default Not;