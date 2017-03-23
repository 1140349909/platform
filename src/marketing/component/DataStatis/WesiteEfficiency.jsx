import React, {Component} from 'react';
import {withRouter} from 'react-router';
@withRouter
export default class WesiteEfficiency extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sites = this.props.sites;
        return (
            <div className="website-data">
                <table className="top-table">
                    <tbody>
                    <tr>
                        <td></td>
                        <td className="label-desc">{this.props.setDefaultVales(sites.sites)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(sites.pv)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(sites.receive)}</td>
                        <td className="label-desc">{this.props.setDefaultVales(sites.cashs)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="desc">站点总数</td>
                        <td className="desc">阅读量最高</td>
                        <td className="desc">领取量最高</td>
                        <td className="desc">兑换量最高</td>
                    </tr>
                    </tbody>
                </table>
                <table className="bottom-table">
                    <tbody>
                    <tr>
                        <td></td>
                        <td className="desc">领取数</td>
                        <td className="desc">兑换数</td>
                        <td className="desc">会员效率</td>
                        <td className="desc">销售转化率</td>
                    </tr>
                    <tr style={{'lineHeight': '45px'}}>
                        <td className="desc">总计</td>
                        <td className="label-desc">{sites.total && this.props.setDefaultVales(sites.total.receive)}</td>
                        <td className="label-desc">{sites.total && this.props.setDefaultVales(sites.total.cashs)}</td>
                        <td className="label-desc">{sites.total && this.props.setDefaultVales(sites.total.member, 'lv')}</td>
                        <td className="label-desc">{sites.total && this.props.setDefaultVales(sites.total.sale, 'lv')}</td>
                    </tr>
                    <tr>
                        <td className="desc">平均</td>
                        <td className="label-desc">{sites.avg && this.props.setDefaultVales(sites.avg.receive)}</td>
                        <td className="label-desc">{sites.avg && this.props.setDefaultVales(sites.avg.cashs)}</td>
                        <td className="label-desc">{sites.avg && this.props.setDefaultVales(sites.avg.member, 'lv')}</td>
                        <td className="label-desc">{sites.avg && this.props.setDefaultVales(sites.avg.sale, 'lv')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

