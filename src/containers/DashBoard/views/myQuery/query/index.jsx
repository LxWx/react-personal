import React from 'react';
import { PureComponent } from 'components';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';
import styles from './index.less';

class Query extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { taskName, runId, templateId, taskId, ownerCode} = this.props.item;
        return (
            <div className={styles.query}>
                <div className={styles.title}>
                    {taskName}
                </div>
                <div className={styles.result}>
                    <div className={styles.text}>
                        {ownerCode}

                    </div>
                    <div className={styles.btnGroup}>
                        <Button className={styles.btn} size="small" type="primary">
                                    收藏
                        </Button>
                        <Button className={styles.btn} size="small" type="primary">
                                    使用
                        </Button>
                    </div>

                </div>

            </div>
        );
    }
}

Query.propTypes = {

};
Query.defaultProps = {

};
export default Query;