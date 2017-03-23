import React from 'react';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import './upgrade.less';
import IconFont from 'common/component/IconFont';
import {moneyFormat, numberFormat}  from 'common/util';
import * as versionAction from '../../store/version/action';
import _ from 'lodash';
import Tooltip from 'common/component/Tooltip';
import {RIGHT_UNIT} from  'common/config/constants';


@connect(
    state => ({
        operation: state.operation,
        version: state.version.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...versionAction
        }, dispatch)
    })
)

@withRouter
export default class Upgrade extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        versionType: 200,
        versionId: '',
        versionList: {},
        versionInf: {}
    };

    componentDidMount() {
        this.getVersionInfo();
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case versionAction.GET_VERSION_INFO_SUCCESS:
                this.setState({
                    versionType: nextProps.version.versionInfo.version,
                });
                this.getUserVersionList({});
                break;
            case versionAction.GET_USER_VERSION_LIST_SUCCESS:
                this.setState({
                    versionList: nextProps.version.list.content
                });
                //TODO 这里版本暂时只有一个标准版 多个版本时这里要做优化
                nextProps.version.list.content.map((item) => {
                    if (item.version == '300') {
                        this.setState({
                            versionInf: item,
                            versionId: item.id
                        });
                    }
                });
                break;
        }
    }


    /*ACTION*/
    getVersionInfo = (versionId) => {
        this.props.actions.getVersionInfo(versionId);
    };
    getUserVersionList = (params) => {
        this.props.actions.getUserVersionList(params);
    };

    /*HANDLE*/
    goPay = () => {
        this.props.router.push(`charge/payment/upgrade?versionId=${this.state.versionId}`);
    };
    getHtml = () => {
        if (this.state.versionType == 200) {
            return <div>当前版本</div>;
        } else if (this.state.versionType == 300) {
            return <span></span>;
        }
    };
    getOtherHtml = () => {
        if (this.state.versionType == 200) {
            return <div className='active' onClick={this.goPay}>升级</div>;
        } else if (this.state.versionType == 300) {
            return <div className='active' onClick={this.goPay}>续费</div>;
        }
    };
    getExpiry = (expiry) => {
        if (expiry == 1) {
            return '';
        } else {
            return expiry;
        }
    }
    getExpiryUnit = (expiryunit) => {
        if (expiryunit == 'year') {
            return '年';
        } else {
            return '天';
        }
    }

    render() {
        let versionFree, versionStandard;
        if (!_.isEmpty(this.state.versionList)) {
            this.state.versionList.map((item) => {
                if (item.version == '200') {
                    versionFree = item;
                } else if (item.version == '300') {
                    versionStandard = item;
                }
            });
        }

        if (_.isEmpty(this.state.versionId)) {
            return (<div></div>);
        } else {
            return (
                <div className='app-page app-page-user-upgrade'>
                    <div className='upgrade-container'>
                        <div className='upgrade-content-title'>
                            <h3>服务价格<br/><span>选择一款适合自己的方案</span></h3>
                        </div>
                        <div className='upgrade-content-nav-active'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div style={{backgroundColor: '#009DFC'}}></div>
                        </div>
                        <table className='upgrade-content-nav'>
                            <tbody>
                            <tr>
                                <th><h3>服务类型</h3></th>
                                <th><h3>服务内容</h3></th>
                                <th>
                                    <h3>{_.isEmpty(versionFree) ? '' : versionFree.name}<Tooltip
                                        type='user-upgrade-1'></Tooltip></h3>
                                    <p className='upgrade-content-nav-specialP'>
                                        ¥{_.isEmpty(versionFree) ? '' : versionFree.price}/<span>{_.isEmpty(versionFree) ? '' : this.getExpiry(versionFree.expiry)}{_.isEmpty(versionFree) ? '' : this.getExpiryUnit(versionFree.expiryUnit)}</span>
                                    </p>
                                    {this.getHtml()}
                                </th>
                                <th>
                                    <h3>{_.isEmpty(versionStandard) ? '' : versionStandard.name}<Tooltip
                                        type='user-upgrade-2'></Tooltip></h3>
                                    <p className='upgrade-content-nav-specialP'>
                                        ¥{_.isEmpty(this.state.versionInf) ? '' : moneyFormat(this.state.versionInf.price, null)}/<span>{_.isEmpty(versionStandard) ? '' : this.getExpiry(versionStandard.expiry)}{_.isEmpty(versionFree) ? '' : this.getExpiryUnit(versionStandard.expiryUnit)}</span>
                                    </p>
                                    {this.getOtherHtml()}
                                </th>
                            </tr>
                            </tbody>
                        </table>
                        <div className='upgrade-content-title2'>
                            功能及应用
                        </div>
                        <table className='upgrade-content-table'>
                            <tbody>
                            <tr>
                                <td rowSpan='2' className='title'>免费使用图文编辑器<Tooltip type='user-upgrade-3'
                                                                                    color='#009dfc'></Tooltip></td>
                                <td className='specialTd'>使用场景化素材和模板</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td className='specialTd'>提供手机端的微站服务</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td className='title'>图文中使用营销插件<Tooltip type='user-upgrade-4'></Tooltip></td>
                                <td className='specialTd'>吸粉、拉活跃的营销插件</td>
                                <td>基础</td>
                                <td>标准</td>
                            </tr>
                            <tr>
                                <td className='title' rowSpan='2'>免费使用H5编辑器<Tooltip type='user-upgrade-11'></Tooltip>
                                </td>
                                <td className='specialTd'>使用场景化素材和H5模板</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td className='specialTd'>提供手机端的微站服务</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td className='title'>H5中使用营销插件<Tooltip type='user-upgrade-12'></Tooltip></td>
                                <td className='specialTd'>吸粉、拉活跃的营销插件</td>
                                <td>基础</td>
                                <td>标准</td>
                            </tr>
                            <tr>
                                <td className='title'>支持多个运营人员操作<Tooltip type='user-upgrade-5'></Tooltip></td>
                                <td className='specialTd'>运营人员数量</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[2].defaultValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[2].unit]}，可增至{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[2].maxValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[2].unit]}</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[2].defaultValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[2].unit]}，可增至{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[2].maxValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[2].unit]}</td>
                            </tr>
                            <tr>
                                <td rowSpan='4' className='title'>全渠道、多场景分发<Tooltip type='user-upgrade-6'></Tooltip>
                                </td>
                                <td className='specialTd'>多渠道分发(微信、微博、微站等)</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td>可绑定的微信公众号数量</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[3].defaultValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[3].unit]}，可增至{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[3].maxValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[3].unit]}</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[3].defaultValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[3].unit]}，可增至{numberFormat(_.isEmpty(versionStandard) ? 100 : versionStandard.rights[3].maxValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[3].unit]}</td>
                            </tr>
                            <tr>
                                <td className='specialTd'>可授权的微博数量</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[4].defaultValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[4].unit]}，可增至{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[4].maxValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[4].unit]}</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[4].defaultValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[4].unit]}，可增至{numberFormat(_.isEmpty(versionStandard) ? 100 : versionStandard.rights[4].maxValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[4].unit]}</td>
                            </tr>
                            <tr>
                                <td className='specialTd'>微信公众号中自动回复用户</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td rowSpan='3' className='title'>用数据指导如何提高阅读量<br/>/粉丝转化率<Tooltip
                                    type='user-upgrade-7'></Tooltip></td>
                                <td className='specialTd'>阅读效率</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td className='specialTd'>导购效率</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td className='specialTd'>站点效率</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            </tbody>
                        </table>
                        <div className='upgrade-content-title2'>
                            支持及服务
                        </div>
                        <table className='upgrade-content-table'>
                            <tbody>
                            <tr>
                                <td rowSpan='2' className='title'>专业客服指导小白<Tooltip type='user-upgrade-8'></Tooltip></td>
                                <td className='specialTd'>客户客服</td>
                                <td>在线客服<br/>7x12小时</td>
                                <td>在线客服<br/>7x24小时</td>
                            </tr>
                            <tr>
                                <td className='specialTd'>产品使用培训</td>
                                <td>-</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td rowSpan='2' className='title'>数据要漂亮！你懂的<Tooltip type='user-upgrade-9'></Tooltip>
                                </td>
                                <td className='specialTd'>网红投放（即将上线）</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            <tr>
                                <td className='specialTd'>社化媒体精准投放（即将上线）</td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                                <td><IconFont className='yixuan' type='yixuan'/></td>
                            </tr>
                            </tbody>
                        </table>
                        <div className='upgrade-content-title2'>
                            性能及配额
                        </div>
                        <table className='upgrade-content-table'>
                            <tbody>
                            <tr>
                                <td rowSpan='3' className='title'>基础硬件服务到位<Tooltip type='user-upgrade-10'></Tooltip>
                                </td>
                                <td className='specialTd'>流量次数<Tooltip type='user-upgrade-13'></Tooltip></td>
                                <td>
                                    赠{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[5].defaultValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[5].unit]}；<br/>
                                    扩展流量包：每{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[5].minBuyQuantity, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[5].unit]}/{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[5].price, 0)}乐豆
                                </td>
                                <td>
                                    赠{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[5].defaultValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[5].unit]}；<br/>
                                    扩展流量包：每{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[5].minBuyQuantity, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[5].unit]}/{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[5].price, 0)}乐豆
                                </td>
                            </tr>
                            <tr>
                                <td className='specialTd'>可存储资讯的篇数<Tooltip type='user-upgrade-14'></Tooltip></td>
                                <td>{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[6].defaultValue, 0)}</td>
                                <td>{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[6].defaultValue, 0)}</td>
                            </tr>
                            <tr>
                                <td className='specialTd'>可上传保存的图片张数</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[0].defaultValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[0].unit]}，可增至{numberFormat(_.isEmpty(versionFree) ? '' : versionFree.rights[0].maxValue, 0)}{_.isEmpty(versionFree) ? '' : RIGHT_UNIT[versionFree.rights[0].unit]}</td>
                                <td>
                                    默认{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[0].defaultValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[0].unit]}，可增至{numberFormat(_.isEmpty(versionStandard) ? '' : versionStandard.rights[0].maxValue, 0)}{_.isEmpty(versionStandard) ? '' : RIGHT_UNIT[versionStandard.rights[0].unit]}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

    }
}




