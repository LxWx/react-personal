import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import ReactDOM from 'react-dom';
const uuid = require('uuid/v4');
class Loading extends PureComponent {
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
    loading: PropTypes.bool,
};
Loading.defaultProps = {
    loading: true
};
export default Loading;

Loading.newInstance = function newNotificationInstance(properties) {
    let div = document.createElement('div');
    div.className = 'newDiv';
    document.getElementById('main').appendChild(div);
    let notification = ReactDOM.render(React.createElement(Loading, properties), div);
    return {
        destroy() {
            try {
                let newDiv = document.querySelector('.newDiv');
                ReactDOM.unmountComponentAtNode(newDiv);
                document.getElementById('main').removeChild(newDiv);
            } catch (error) {
                console.log(error);
            }
        },
    };
};