import React, {PureComponent} from 'react';
import ReactEcharts from 'echarts-for-react';
import isEqual from 'fast-deep-equal';

export default class barCharts extends PureComponent {
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
        />);
    }
}

barCharts.defaultProps = {
    option: {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    },
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