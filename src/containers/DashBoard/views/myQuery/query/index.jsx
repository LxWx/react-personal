import React from 'react';
import {PureComponent} from 'components';
import PropTypes from 'prop-types';
import {Button, Row, Col} from 'antd';
import styles from './index.less';

class Query extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {title, content, result} = this.props;
        return (
            <div className={styles.query}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.textContent}>
                    <p>
                    具体描述 ： 
                    </p>
                    <p>
                        {content}
                    </p>
                </div>
                <div className={styles.result}>
                    <Row gutter={20}>
                        <Col span={12}>
                        <span className={styles.text}>
                            {result}
                        </span>
                    
                        </Col>
                        <Col span={12}>
                        <div className={styles.btnGroup}>
                        <Button className={styles.btn} size="small" type="primary">
                            帮助
                        </Button>
                        <Button className={styles.btn} size="small" type="primary">
                            提交工单
                        </Button> 
                        </div>
                        </Col>
                    </Row>
                
                </div>
            </div>
        )     
    }
}

Query.propTypes = {
    
}
Query.defaultProps = {
    title: '查询TEG量测结果并绘制TEG图像',
    content: '输入TEG量测的GLASSID，即可查询对应量测数据，并绘制出TEG的特性图像。',
    result: 'xxxxx'
}
export default Query;