import React from 'react';
import { connect } from 'react-redux';
// import * as Act from '../../models/actions';
import styles from './index.less';
import { PureComponent, Charts, Tables } from 'components';
import { Button, Table} from 'antd';

class Templates extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { columns1, data1, columns2, data2, title1} = this.props;
        return (
            <div className={styles.main}>
                <Tables
                    title='My template'
                    columns={columns1}
                    data={data1}
                    all={false}
                />
                <div className={styles.queryContent}>
                    <div className={styles.title + ' clearfix'}>
                        <span className={'left'}>
                            {title1}
                        </span>
                    </div>
                    <div className={styles.search}>
                        <div>
                            <span>科室：</span>
                            <span></span>
                        </div>
                    </div>
                    <Table
                        columns={columns2}
                        dataSource={data2}
                        bordered
                        showHeader={false}
                    />
                </div>
            </div>
        );
    }
}

Templates.propTypes = {

};
Templates.defaultProps = {
    title1: '查找模板',
    columns1: [{
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
        title: 'Date',
        key: 'date',
        dataIndex: 'date'
    }, {
        title: 'yy',
        dataIndex: 'yy'
    }, {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
            return (
                <div>
                    <Button>
                    定时
                    </Button>
                    <Button>
                    执行
                    </Button>
                    <Button>
                    分享
                    </Button>
                    <Button>
                    删除
                    </Button>
                </div>
            );
        },
    }],
    data1: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        date: 111,
        yy: 222
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
    }],
    columns2: [{
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
        title: 'Date',
        key: 'date',
        dataIndex: 'date'
    }, {
        title: 'yy',
        dataIndex: 'yy'
    }, {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
            return (
                <div>
                    <Button>
                    定时
                    </Button>
                    <Button>
                    执行
                    </Button>
                    <Button>
                    分享
                    </Button>
                    <Button>
                    删除
                    </Button>
                </div>
            );
        },
    }],
    data2: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        date: 111,
        yy: 222
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

const mapStateToProps = (state) => {
    return {
        newData: state.DashBoard
    };
};

export default connect(mapStateToProps)(Templates);