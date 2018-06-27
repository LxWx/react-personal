import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import isEqual from 'fast-deep-equal'; 

export default class barCharts extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(isEqual(this.props.option, nextProps.option))
        if (isEqual(this.props.option, nextProps.option)) {
            return false;
        } else {
            return true;
        }
    }
    
    
    render() {
        let {option, style, className, onEvents, loadingOption, showLoading, opts, notMerge, lazyUpdate, theme, onChartReady, shouldSetOption} = this.props;
        return (<ReactEcharts
            option={option}
            style={style}
            opts={this.props.opts}
            className={className}
            loadingOption={loadingOption} 
            onEvents={onEvents}
            showLoading={showLoading}
            notMerge={notMerge}
            lazyUpdate={lazyUpdate}
            theme={theme}
            onChartReady={onChartReady}
            shouldSetOption={shouldSetOption}
            />)
    }
}

barCharts.defaultProps = {
    option: {},
    echarts: {},
    notMerge: false,
    lazyUpdate: false,
    style: {},
    className: '',
    theme: null,
    onChartReady: () => {},
    showLoading: false,
    loadingOption: null,
    onEvents: {},
    opts: {},
    shouldSetOption: () => true,
  };

// {
//     option (required, object)   配置项
//     notMerge (optional, object)    http://echarts.baidu.com/api.html#echartsInstance.setOption.
//     lazyUpdate (optional, object)  http://echarts.baidu.com/api.html#echartsInstance.setOption.
//     style (optional, object)  样式
//     className (optional, string)  class
//     theme (optional, string)  风格
//     onChartReady (optional, function)   图表渲染完成的回调
//     loadingOption (optional, object)  loading 配置
//     showLoading (optional, bool, default: false)   是否显示loading
//     onEvents (optional, array(string=>function) )  绑定事件
//     opts (optional, object) // 渲染方式
// }