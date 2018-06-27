import React from 'react';
import {connect} from 'react-redux';
import * as Act from '../models/actions';
import styles from './Index.less';   
import {PureComponent, Charts} from 'components';
// import {createTimer, clearTimer} from 'common';


class Home extends PureComponent {
    constructor(props) {
        super(props);
    }
    getOption = () => ({
        title: {
            text: '3333'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }) 
    render() {
        let {age} = this.props.nav1;
        let onEvents = {
            'click': () => {alert(1)}
          }
        return (<div>
            nav1<i className='iconfont icon-guanli'></i>
            <div>年龄：{age}</div>
            <p className={styles.aa}><a onClick={this.changeAge.bind(this, '+')}>增加 </a></p>
            <p><a onClick={this.changeAge.bind(this, '-')}> 减少</a></p>
            <Charts 
                option={this.getOption()}
                // onEvents={onEvents}
            />
        </div>)     
    }

    changeAge = (type) => {
        
        // this.timer1 = createTimer(() => {
        //     console.log(2)
        // }, 1000)
        
        let {age} = this.props.nav1;
        if (type == '+') {
            // console.log(this.timer)
            // clearTimer(this.timer)
            this.props.dispatch(Act.addNumAct(++age));
        } else {
            // this.timer = createTimer(() => {
            //     console.log(1)
            // }, 1000)
            // console.log(this.timer, this.timer1)
            // this.props.dispatch(Act.addNumAct(--age));
        }

    }
}

const mapStateToProps = (state) => {
    return {
        nav1: state.nav1
    }
};

export default connect(mapStateToProps)(Home);