import React, { Component } from 'react';
import {
    Icon,
    Card,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import { moneyFormat } from 'common/util';
import './index.less';

export default class EarningsDetail extends Component {

    constructor(props) {
        super(props);
    }

    getOtion = (data) => {
        let legendName = ['首席代言','钻石代言','金牌代言'],
            seriesData = [
                {value:data.lv0 / 100, name:'首席代言'},
                {value:data.lv1 / 100, name:'钻石代言'},
                {value:data.lv2 / 100, name:'金牌代言'},
            ];

        for (let i  in data) {
            switch (i) {
                case 'lv0':
                    if (data[i] == 0) {
                        legendName.splice(1, 3);
                        seriesData.splice(1, 3);
                    }
                    break;
                case 'lv1':
                    if (data[i] == 0) {
                        legendName.splice(2, 2);
                        seriesData.splice(2, 2);
                    }
                    break;
                case 'lv2':
                    if (data[i] == 0) {
                        legendName.splice(3, 1);
                        seriesData.splice(3, 1);
                    }
                    break;
            }
        }

        return  {
            tooltip : {
                trigger: 'item',
                top:0,
                formatter: '{a} <br/>{b} : (￥{c}) ({d}%)'
            },
            legend: {
                top:0,
                data: legendName,
            },
            series : [
                {
                    name:'详细数据',
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '63%'],
                    data: seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal:{
                            label:{
                                show: true,
                                formatter: '{b}(￥{c})\n({d}%)'
                            },
                            labelLine :{
                                show:true
                            }
                        }
                    }
                }
            ]
        };
    }

    render() {
        const data = this.props.data || null;
        let profit = null;

        if (data !== null) {
            profit = typeof this.props.data.profit == 'undefined' ? null : this.props.data.profit;
        }

        return (
            <Card
                title="代言酬劳详情"
                className="tker-fenrun-details">
                {(data == null ||  profit == null) &&
                    <span className="tker-fenrun-text">
                        <Icon type="pie-chart" />
                        <br/>
                        暂无数据
                    </span>
                }
                {profit !== null&&
                    <div>
                            <div className="tker-fenrun-details-tip">
                                <span>
                                    参与代言商品：{data.totalAmount}
                                </span>
                                <span>
                                    参与代言会员：{data.tkers}
                                </span>
                                <span>
                                    代言支出总额(元)：{moneyFormat(profit.total)}
                                </span>
                            </div>
                        <ReactEcharts
                        option={this.getOtion(profit)}/>
                    </div>
                }
            </Card>
        );
    }
}








