import React, {Component} from 'react';
import {Radio} from 'antd';
import ReactEcharts from 'echarts-for-react';
import {moneyFormat} from 'common/util';
import Img from 'common/component/Img';
import './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class DataStatistics extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        key: 'fans'
    };

    /*callback = (key)=> {
     console.log(key);
     };*/

    getOption = (data) => {

        let legendName = ['粉丝数'],
            seriesData = [];

        let xAxisData = [];

        data.map((item) => {
            xAxisData.push(item.year + '-' + item.month + '-' + item.day);
            seriesData.push(item.total);
        });

        return {
            title: {
                text: '近7日新增粉丝'
            },
            legend: {
                data: legendName,
                align: 'left',
                right: 0
            },
            series: [
                {
                    name: legendName,
                    type: 'line',
                    data: seriesData,
                    label: {
                        normal: {
                            position: 'top',
                            show: true
                        }
                    }
                }
            ],
            xAxis: {
                name: '时间',
                data: xAxisData,
            },
            yAxis: {
                name: '人数',
                minInterval: 1
            },
        };
    };


    render() {

        let {data, vsiteTotal, visitors, onChange, value} = this.props;
        let number = visitors.uv + visitors.buv;

        let tradeData = {
            visitors: {
                uv: visitors.uv + visitors.buv,
                pv: visitors.pv + visitors.bpv,
                rate: number != 0 ? (( vsiteTotal.opdata.preTradeData.peoples / number) * 100).toFixed(2) + '%' : 0 + '%'
            },
            orders: {
                peoples: vsiteTotal.opdata.preTradeData.peoples,
                orders: vsiteTotal.opdata.preTradeData.orders,
                salesAmount: moneyFormat(vsiteTotal.opdata.preTradeData.salesAmount),
                rate: vsiteTotal.opdata.tradeData.peoples != 0 ?
                (( vsiteTotal.opdata.tradeData.peoples / number) * 100).toFixed(2) + '%' : 0 + '%'
            },
            pay: {
                peoples: vsiteTotal.opdata.tradeData.peoples,
                orders: vsiteTotal.opdata.tradeData.orders,
                salesAmount: moneyFormat(vsiteTotal.opdata.tradeData.salesAmount),
                rate: vsiteTotal.opdata.tradeData.peoples != 0 ?
                ((vsiteTotal.opdata.tradeData.peoples / vsiteTotal.opdata.preTradeData.peoples) * 100 ).toFixed(2) + '%' : 0 + '%',
                kPrice: vsiteTotal.opdata.tradeData.orders != 0 ? '￥' + (vsiteTotal.opdata.tradeData.salesAmount / (vsiteTotal.opdata.tradeData.orders*100)).toFixed(2) : '￥0'
            }
        };
        let RadioButtonList = [
            {
                name: '粉丝',
                value: 'fans',
            }, {
                name: '交易',
                value: 'trade',
            }
        ];

        let RadioList = [];

        RadioButtonList.map((item) => {
            let RadioButtonItem = (
                <RadioButton key={item.value}
                             disabled={item.disabled}
                             value={item.value}>
                    {item.name}
                </RadioButton>
            );

            RadioList.push(RadioButtonItem);

        });

        let RadioContentList = {
            fans: (
                <div style={{'height': '250px'}}>
                    {data.length != 0 ? <ReactEcharts option={this.getOption(data)}/> :
                        <div style={{'textAlign': 'center', 'paddingTop': '42px'}}>
                            <Img src={require('./img/default.png')} alt=""
                                 style={{'width': '100px', 'height': 'auto'}}/>
                            <p className="home-data-default">当前还没有产生数据！</p>
                        </div>
                    }
                </div>
            ),
            trade: (<div style={{'height': '250px', 'position': 'relative'}}>
                <Img src={require('./img/trade.png')} alt="" style={{'height': 'auto'}}/>
                <div style={{'position': 'absolute', 'top': '0', 'left': '0'}}>
                    <table className="home-data-table">
                        <tbody>
                        <tr>
                            <td>
                                <p className="visitors">访客人数(UV)</p>
                                <p className="default">{tradeData.visitors.uv}</p>
                            </td>
                            <td>
                                <p className="order">访问次数(PV)</p>
                                <p className="default">{tradeData.visitors.pv}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="order">下单人数</p>
                                <p className="default">{tradeData.orders.peoples}</p>
                            </td>
                            <td>
                                <p className="order">下单单数</p>
                                <p className="default">{tradeData.orders.orders}</p>
                            </td>
                            <td>
                                <p className="pay">下单金额</p>
                                <p className="default">{tradeData.orders.salesAmount}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="order">成交人数</p>
                                <p className="default">{tradeData.pay.peoples}</p>
                            </td>
                            <td>
                                <p className="order">成交单数</p>
                                <p className="default">{tradeData.pay.orders}</p>
                            </td>
                            <td>
                                <p className="pay">成交总额</p>
                                <p className="default">{tradeData.pay.salesAmount}</p>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan="2">
                                <p className="pay">客单价:{tradeData.pay.kPrice}</p>
                                <p className="default" style={{'color': '#ccc'}}>说明：客单价=成交总额/成交单数</p>
                            </td>

                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{'position': 'absolute', 'top': '45px', 'left': '395px'}}>
                    <p id="visitors">下单人数/访客人数</p>
                    <p className="default">{tradeData.visitors.rate}</p>
                </div>
                <div style={{'position': 'absolute', 'top': '140px', 'left': '375px'}}>
                    <p id="pay">成交人数/下单人数</p>
                    <p className="default">{tradeData.pay.rate}</p>
                </div>
                <div style={{'position': 'absolute', 'top': '95px', 'right': '0'}}>
                    <p id="visitors">成交人数/访客人数</p>
                    <p className="default">{tradeData.orders.rate}</p>
                </div>
            </div>)
        };

        return (
            <div>
                <div className="ant-radio-group-grey">
                    <RadioGroup defaultValue={value} onChange={onChange}>
                        {RadioList}
                    </RadioGroup>
                </div>
                <div style={{'margin': '30px auto 0'}}>
                    {RadioContentList[value]}
                </div>
            </div>
        );
    }
}
