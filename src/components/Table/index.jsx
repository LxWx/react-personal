import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Table, Button, Form, Select, Input, Row, Col} from 'antd';
import styles from './index.less';
const FormItem = Form.Item;
@Form.create()
class Tables extends PureComponent {
    constructor(props) {
        super(props);
    }
    allTo = () => {
        this.props.allTo();
    }
    submit = () => {
        const {dispatch, dataType} = this.props;
        console.log(dataType, 'dataType');
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values, 'values');
                dispatch(dataType({
                    data: {
                        ownerCode: '1001',
                        size: 5
                    }
                }));
            }
        });
    }
    render() {
        const {columns, data, title, all, showHeader, showQuery} = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.queryContent}>
                {
                    title && <div className={styles.title + ' clearfix'}>
                        <span className={'left'}>
                            {title}
                        </span>
                        {all && <Button onClick={this.allTo} className={styles.btn + ' right'} size="small" type="primary">查看全部</Button> || null}
                    </div>
                }
                {
                    showQuery && <Form>
                        <Row gutter={20}>
                            <Col className={styles.colNew} span={6}>
                                <FormItem
                                >
                                    <div className={styles.labels}>
                                    科室：
                                    </div>
                                    <div className={styles.value}>
                                        {getFieldDecorator('department', {
                                            rules: []
                                        })(
                                            <Select>
                                            </Select>
                                        )}
                                    </div>

                                </FormItem>
                            </Col>
                            <Col className={styles.colNew} span={6}>
                                <FormItem
                                >
                                    <div className={styles.labels}>
                                    工号：
                                    </div>
                                    <div className={styles.value}>
                                        {getFieldDecorator('number', {
                                            rules: []
                                        })(
                                            <Input />
                                        )}
                                    </div>

                                </FormItem>
                            </Col>
                            <Col className={styles.colNew} span={6}>
                                <FormItem
                                >
                                    <div className={styles.labels}>
                                    工号：
                                    </div>
                                    <div className={styles.value}>
                                        {getFieldDecorator('keyword', {
                                            rules: []
                                        })(
                                            <Input />
                                        )}
                                    </div>

                                </FormItem>
                            </Col>
                            <Col className={styles.colNew1} span={6}>
                                <Button onClick={this.submit} className={styles.btn} size="small" type="primary">查找</Button>
                            </Col>
                        </Row>
                    </Form> || null
                }
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    showHeader={showHeader}
                    pagination={false}
                />
            </div>
        );
    }
}

Tables.propTypes = {
    columns: PropTypes.array,
    title: PropTypes.string,
    showHeader: PropTypes.bool,
    data: PropTypes.array,
    all: PropTypes.bool,
    showQuery: PropTypes.bool,
    dispatch: PropTypes.func,
    dataType: PropTypes.func
};
Tables.defaultProps = {
    title: '11111',
    showHeader: false,
    columns: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
            </span>
        ),
    }],
    data: [],
    all: true,
    showQuery: false,
    dispatch: () => {

    },
    dataType: () => {

    }
};
export default Tables;