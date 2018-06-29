import React from 'react';
import { PureComponent } from 'components';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import styles from './index.less';
import Query from './query';
import { Input } from 'antd';
const Search = Input.Search;
class MyQuery extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.queryContent}>
                <div className={styles.title}>
                    共享的查询
                </div>
                <div className={styles.search}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        enterButton
                    />
                </div>
                <div>
                    <Query />
                    <Query />
                    <Query />
                </div>
            </div>
        )
    }
}

MyQuery.propTypes = {

}
MyQuery.defaultProps = {

}
export default MyQuery;