import React from 'react';
import PropTypes from 'prop-types';
import {Table, Button} from 'antd';
import styles from './index.less';

class Tables extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {columns, data, title} = this.props;
        return (
            <div className={styles.queryContent}>
                <div className={styles.title + ' clearfix'}>
                    <span className={'left'}>
                        {title}
                    </span>
                    <Button className={styles.btn + ' right'} size="small" type="primary">查看全部</Button>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

Tables.propTypes = {
    columns: PropTypes.array,
    title: PropTypes.string,
};
Tables.defaultProps = {
    title: '11111',
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
    data: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }]
};
export default Tables;