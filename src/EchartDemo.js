import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/graph';
import {fetch as fetchPolyfill} from 'whatwg-fetch'

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
 
class EchartsTest extends Component {

 	constructor(props) {
      super(props);
      this.state = {};
  	}
    
    async req(){
        const params = { 
            'method':'GET', 
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };
        const url = 'http://localhost:8102/form/config/relation/json';

        await fetch(url, params).then(function(response){
            return response.json();
        }).then(this.buildOption);        
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main'));
        this.setState({chat:myChart});
        this.req();
    }

    buildOption = response=>{
        // console.log('123',response)
        const data = response.data;
        data.nodes.forEach(function (node,idx) {
            // node.id=idx+'';
            node.category=0;
            node.modularity_class=node.value%10;
            node.itemStyle = null;
            node.value = node.value;
            node.symbolSize = node.value>0?node.value*5:1;
            node.label = {
                normal: {
                    show: node.value > 0
                }
            };
            node.category = node.value%10;
        });
        const categories=[];
        for (var i = 0; i < 9; i++) {
            categories[i] = {
                name: data.nodes[i].name
            };
        }
        const option = {
            title: {
                text: '表单引用关系图',
                subtext: 'Circular layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            legend: [{
                data: categories.map(function (a) {
                    return a.name;
                })
            }],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: '表单：',
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    data: data.nodes,
                    links: data.links,
                    categories: categories,
                    roam: true,
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    }
                }
            ]
        };

        this.state.chat.setOption(option);
        // this.state.chat.setOption({
        //     title: {
        //         text: 'ECharts 入门示例'
        //     },
        //     tooltip: {},
        //     xAxis: {
        //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // });
    }

    render() {
        return (
            <div id="main" style={{ width: 1800, height: 1000 }}></div>
        );
    }
}

export default EchartsTest;