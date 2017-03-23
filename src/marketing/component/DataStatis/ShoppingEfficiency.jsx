import React, {Component} from 'react';
import {withRouter} from 'react-router';
import  {moneyFormat} from 'common/util/index.js';
import moment from 'moment';
moment.locale('zh-cn');

@withRouter
export default class ShoppingEfficiencyComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const coupon = this.props.coupon;
        const integral = this.props.integral;
        const buy = this.props.buy;
        return (
            <div className="sell-data">
                <table className="yhq-table">
                    <tbody>
                    <tr>
                        <td className="main-desc"><i className="tagBefore"></i><i className="tagdesc">优惠券</i>
                        </td>
                        <td className="label-desc">{this.props.setDefaultVales(coupon.pubTimes)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(coupon.coupons)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(coupon.cashs)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(coupon.maxReceive)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="desc">发起次数</td>
                        <td className="desc">优惠券数</td>
                        <td className="desc">兑换数量</td>
                        <td className="desc">最高领取量</td>
                    </tr>
                    </tbody>
                </table>
                <table className="score-table">
                    <tbody>
                    <tr>
                        <td className="main-desc"><i className="tagBefore"></i><i className="tagdesc">积分</i>
                        </td>
                        <td className="label-desc">{this.props.setDefaultVales(integral.pubTimes)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(integral.integrals)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(integral.members)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(integral.cashs)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="desc">发起次数</td>
                        <td className="desc">积分领取量</td>
                        <td className="desc">会员参与量</td>
                        <td className="desc">总核销量</td>
                    </tr>
                    </tbody>
                </table>
                <table className="sell-table">
                    <tbody>
                    <tr>
                        <td className="main-desc"><i className="tagBefore"></i><i className="tagdesc">一键导购</i>
                        </td>
                        <td className="label-desc">{this.props.setDefaultVales(buy.pubTimes)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(buy.products)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(buy.pv)}</td>
                        <td className="label-desc">{buy.sales && moneyFormat(buy.sales, '￥')}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="desc">发起次数</td>
                        <td className="desc">推荐商品量</td>
                        <td className="desc">总点击量</td>
                        <td className="desc">总销量</td>
                    </tr>
                    </tbody>
                </table>
                <table className="bottom-table">
                    <tbody>
                    <tr>
                        <td className="desc"></td>
                        <td className="desc">点击数</td>
                        <td className="desc">兑换数</td>
                        <td className="desc">新增会员</td>
                        <td className="desc">新增销售</td>
                    </tr>
                    <tr style={{'lineHeight': '70px'}}>
                        <td className="desc">总计</td>
                        <td className="label-desc">{coupon.total && this.props.setDefaultVales(coupon.total.pv)}</td>
                        <td className="label-desc">{coupon.total && this.props.setDefaultVales(coupon.total.cashs)}</td>
                        <td className="label-desc">{coupon.total && this.props.setDefaultVales(coupon.total.members)}</td>
                        <td className="label-desc">{coupon.total && moneyFormat(coupon.total.sales, '￥')}</td>
                    </tr>

                    <tr>
                        <td className="desc">平均</td>
                        <td className="label-desc">{coupon.avg && this.props.setDefaultVales(coupon.avg.pv)}</td>
                        <td className="label-desc">{coupon.avg && this.props.setDefaultVales(coupon.avg.cashs)}</td>
                        <td className="label-desc">{coupon.avg && this.props.setDefaultVales(coupon.avg.members)}</td>
                        <td className="label-desc">{coupon.avg && moneyFormat(coupon.avg.sales, '￥')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

