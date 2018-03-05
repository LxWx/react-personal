import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Act from '../models/actions';
import styles from './Index.less';   

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {age} = this.props.nav1;
        return (<div>
            nav1<i className='iconfont icon-guanli'></i>
            <div>年龄：{age}</div>
            <p className={styles.aa}><a onClick={this.changeAge.bind(this, '+')}>增加 </a></p>
            <p><a onClick={this.changeAge.bind(this, '-')}> 减少</a></p>
        </div>)     
    }

    changeAge = (type) => {
        let {age} = this.props.nav1;
        if (type == '+') {
            this.props.dispatch(Act.addNumAct(++age));
        } else {
            this.props.dispatch(Act.addNumAct(--age));
        }

    }
}

const mapStateToProps = (state) => {
    return {
        nav1: state.nav1
    }
};

export default connect(mapStateToProps)(Home);