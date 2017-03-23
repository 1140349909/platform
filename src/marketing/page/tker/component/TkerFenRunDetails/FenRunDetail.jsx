import React, { Component } from 'react';
import {
    Icon,
    Button,
    Card,
} from 'antd';
import ReactEcharts from 'echarts-for-react';
import './index.less';

export default class FenRunDetail extends Component {

    constructor(props) {
        super(props);
    }

    getOption = (data) => {

        let legendName = ['首席代言','钻石代言','金牌代言'],
            seriesData = [
                    {value:data.lv0ProfitRate, name:'首席代言'},
                    {value:data.lv1ProfitRate, name:'钻石代言'},
                    {value:data.lv2ProfitRate, name:'金牌代言'},
            ];

        switch (data.level) {
            case 0:
                legendName.splice(1, 3);
                seriesData.splice(1, 3);
                break;

            case 1:
                legendName.splice(2, 2);
                seriesData.splice(2, 2);
                break;

            case 2:
                legendName.splice(3, 1);
                seriesData.splice(3, 1);
                break;
        }
        legendName.push('毛利');
        seriesData.push({value:100 - ((data.lv0ProfitRate || 0) + (data.lv1ProfitRate || 0) + (data.lv2ProfitRate || 0)), name:'毛利'});

        return {
            tooltip : {
                trigger: 'item',
                formatter: '{a} <br/>{b} : ({d}%)'
            },
            legend: {
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
                                formatter: '{b} : ({d}%)'
                            },
                            labelLine :{show:true}
                        }
                    }
                }
            ]
        };
    }

    render() {

        const btnText = this.props.model == 'show' ? '重设代言' : '代言设置';

        const extra = (
            <div>
                <span>根据商品毛利润（售价-成本价）进行代言设置&nbsp;&nbsp;&nbsp;</span>
                <Button
                    type="primary"
                    onClick={this.props.onSetting}
                    className="tker-fenrun-extra-button">{btnText}</Button>
            </div>
        );

        const data = this.props.data || null;

        return (
            <Card
                title="商品代言酬劳设置"
                className="tker-fenrun-details"
                extra={extra}>
                {data == null &&

                    <span className="tker-fenrun-text">
                        <Icon type="edit" />
                        <br/>
                        快去进行代言设置
                    </span>
                }

                {data !== null &&
                    <ReactEcharts
                        option={this.getOption(data)}/>
                }
            </Card>
        );
    }
}








