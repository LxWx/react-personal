import React from 'react';
import {PureComponent} from 'components';
import PropTypes from 'prop-types';
import {Table, Button} from 'antd';
import styles from './index.less';

class myQueryTable extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {columns, data, title} = this.props;
        return (
            <div className={styles.queryContent}>
                <div className={styles.title + ' clearfix'}>
                    <span>
                        {title}
                    </span>
                    <Button className={styles.btn} size="small" type="primary">查看全部</Button>
                </div>
                <Table showHeader={false} columns={columns} dataSource={data} bordered />
            </div>
        );
    }
}

myQueryTable.propTypes = {

};
myQueryTable.defaultProps = {
    title: '',
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
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
            </span>
        ),
    }],
    data: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        title: '2'
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        title: '2'
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        title: '2'
    }]
};
export default myQueryTable;