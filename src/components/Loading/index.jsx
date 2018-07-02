import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
const uuid = require('uuid/v4');
class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props.loading
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.props) {
            this.setState({
                loading: nextProps.loading
            });
        }
    }
    render() {
        return (
            <div className={styles.main} style={{display: this.state.loading && 'block' || 'none'}}>
                <div className={styles.spinner}>
                    <div className={`${styles.spinnerContainer} ${styles.container1}`}>
                        <div className={styles.circle1}></div>
                        <div className={styles.circle2}></div>
                        <div className={styles.circle3}></div>
                        <div className={styles.circle4}></div>
                    </div>
                    <div className={`${styles.spinnerContainer} ${styles.container2}`}>
                        <div className={styles.circle1}></div>
                        <div className={styles.circle2}></div>
                        <div className={styles.circle3}></div>
                        <div className={styles.circle4}></div>
                    </div>
                    <div className={`${styles.spinnerContainer} ${styles.container3}`}>
                        <div className={styles.circle1}></div>
                        <div className={styles.circle2}></div>
                        <div className={styles.circle3}></div>
                        <div className={styles.circle4}></div>
                    </div>
                </div>
            </div>
        );
    }
}

Loading.propTypes = {

};
Loading.defaultProps = {
    loading: false
};
export default Loading;