import React, {Component} from 'react';
import {Select} from 'antd';
import  {moneyFormat} from 'common/util';
import {withRouter} from 'react-router';
import  ShoppingEfficiencyComponent from './ShoppingEfficiency';
import  WesiteEfficiency from './WesiteEfficiency';
import DatePickerGroup from 'common/component/DatePickerGroup';
import './index.less';
const Option = Select.Option;
@withRouter
export default class DataStatis extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        dateRange: 'last7days',
        rpValue: ''
    };
    setDefaultVales = (val, flag) => {
        let default_val = val && val > 0 ? val : 0;
        if (flag == 'lv' && default_val != 0) {
            default_val = (default_val * 100).toFixed(2) + '%';
        }
        return default_val;
    };
    handleChange = (dateRange) => {
        this.setState({
            dateRange: dateRange,
            rpValue: [null, null]
        }, () => {
            const {dateRange, rpValue} = this.state;
            if (dateRange === 'selftSet' && !rpValue[0] && !rpValue[1]) {
                return;
            }
            this.getData(dateRange);
        });
    };

    getData = (dateRange, startDate, endDate) => {
        this.props.getDataAgg({dateRange: dateRange, startDate: startDate, endDate: endDate});
    };

    filterByData = (dates, dateStrings) => {
        this.setState({
            dateRange: 'selftSet',
            rpValue: [dates[0], dates[1]]
        });

        this.getData('', dateStrings[0], dateStrings[1]);
    };

    render() {
        const {content, coupon, integral, buy, sites} = this.props.data;
        const type = this.props.type == 'content' ? true : false;
        return (
            <div className="data-stat-container">
                <div className="data-filter">
                    <Select style={{width: 100}}
                            size="large"
                            value={this.state.dateRange} className="filterDate" onChange={this.handleChange}>
                        <Option value="last7days">最近7天</Option>
                        <Option value="currMonth">本月</Option>
                        <Option value="last30days">最近三个月</Option>
                        <Option value="selftSet">自定义</Option>
                    </Select>
                    <DatePickerGroup
                        style={{width: 200}}
                        size="large"
                        format="YYYY-MM-DD"
                        showTime={false}
                        value={this.state.rpValue}
                        onChange={this.filterByData}/>

                </div>
                <div className="data-effect">
                    <div className="read-effect">
                        <div className="data-desc">
                            <i className="iconfont icon-yueduxiaolv" style={{'paddingRight': 5}}/>阅读效率
                        </div>
                        <div className="read-data">
                            <table className="top-table">
                                <tbody>
                                <tr>
                                    <td></td>
                                    <td className="label-desc">{this.setDefaultVales(content.pubTimes)}</td>
                                    <td className="label-desc">{this.setDefaultVales(content.publishs)}</td>
                                    <td className="label-desc">{this.setDefaultVales(content.pubChannels)}</td>
                                    <td className="label-desc">{this.setDefaultVales(content.maxPv)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td className="desc">发布次数</td>
                                    <td className="desc">发布篇数</td>
                                    <td className="desc">渠道数</td>
                                    <td className="desc">最高阅读量</td>
                                </tr>
                                </tbody>
                            </table>
                            {
                                !type &&
                                <table className="bottom-table">
                                    <tbody>
                                    <tr>
                                        <td></td>
                                        <td className="desc" rowSpan="2"><i style={{'fontStyle': 'normal'}}>阅读量</i>
                                        </td>
                                        <td className="label-desc">{this.setDefaultVales(content.maxPv)}</td>
                                        <td className="label-desc">{content.avg && this.setDefaultVales(content.avg.pv)}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="desc">总计</td>
                                        <td className="desc">平均</td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            }
                            {
                                type &&
                                <table className="bottom-table">
                                    <tbody>
                                    <tr className="read-data-bottom">
                                        <td></td>
                                        <td className="desc">阅读量</td>
                                        <td className="desc">点赞数</td>
                                        <td className="desc">打赏额</td>
                                        <td></td>
                                    </tr>
                                    {
                                        content.total &&
                                        <tr>
                                            <td className="desc">总计</td>
                                            <td className="label-desc">{content.total && this.setDefaultVales(content.total.pv)}</td>
                                            <td className="label-desc">{content.total && this.setDefaultVales(content.total.praise)}</td>
                                            <td className="label-desc">{content.total && moneyFormat(content.total.tips, '￥')}</td>
                                            <td></td>
                                        </tr>
                                    }
                                    {
                                        content.avg &&
                                        <tr>
                                            <td className="desc">平均</td>
                                            <td className="label-desc">{content.avg && this.setDefaultVales(content.avg.pv)}</td>
                                            <td className="label-desc">{content.avg && this.setDefaultVales(content.avg.praise)}</td>
                                            <td className="label-desc">{content.avg && moneyFormat(content.avg.tips, '￥')}</td>
                                            <td></td>
                                        </tr>
                                    }

                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                    <div className="sell-effect">
                        <div className="data-desc">
                            <i className="iconfont icon-daogouxiaolv" style={{'paddingRight': 5}}/>导购效率
                        </div>
                        <ShoppingEfficiencyComponent coupon={coupon}
                                                     integral={integral}
                                                     buy={buy}
                                                     setDefaultVales={this.setDefaultVales}/>
                    </div>
                    <div className="website-effect">
                        <div className="data-desc">
                            <i className="iconfont icon-zhandianxiaolv" style={{'paddingRight': 5}}/>站点效率
                        </div>
                        <WesiteEfficiency sites={sites} setDefaultVales={this.setDefaultVales}/>
                    </div>
                </div>
            </div>
        );
    }
}

