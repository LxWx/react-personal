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
    search = (val) => {
        console.log(val);
        this.props.search(val);
    }
    render() {
        const {data} = this.props;
        return (
            <div className={styles.queryContent}>
                <div className={styles.title}>
                最近查询
                </div>
                <div className={styles.search}>
                    <Search
                        placeholder="input search text"
                        onSearch={this.search}
                        enterButton
                    />
                </div>
                <div>
                    {
                        Array.isArray(data) && data.map(it => {
                            return <Query item={it}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

MyQuery.propTypes = {

};
MyQuery.defaultProps = {

};
export default MyQuery;