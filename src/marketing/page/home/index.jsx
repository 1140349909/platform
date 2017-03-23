import React from 'react';
import PageBase from 'common/base/PageBase';
import {Row, Col, Card, Button, Progress, Icon} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  * as juheAction from '../../store/juhe/action';
import  * as ledouAction from '../../store/ledou/action';
import  * as merchantAction from '../../store/merchant/action';
import  * as customerAction from '../../store/customer/action';
import  * as dataAggAction from '../../store/dataAgg/action';
import  * as statAction from '../../store/stat/action';
import zhCN from 'moment/locale/zh-cn';
import moment from 'moment';
import GetCNDate from 'common/util/lunar';
import './index.less';
import Img from 'common/component/Img';
import LKTooltip from 'common/component/Tooltip';
import {WelcomeModal, WelcomeIconList} from './component/HomeWelcomeShow';
import CalendarModal from './component/HomeCalendarShow';
import {EntranceModal, EntranceIconList} from './component/HomeEntranceShow';
import DataStatistics from './component/HomeDataStatistics';
import AuthModule from 'common/component/AuthModule';
import {redirect} from 'common/util';
import * as module from 'common/config/module';

@connect(
    state => ({
        auth: state.auth.toJS(),
        operation: state.operation,
        juhe: state.juhe.toJS(),
        ledou: state.ledou.toJS(),
        merchant: state.merchant.toJS(),
        customer: state.customer.toJS(),
        dataAgg: state.dataAgg.toJS(),
        stat: state.stat.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...juheAction,
            ...ledouAction,
            ...merchantAction,
            ...customerAction,
            ...dataAggAction,
            ...statAction
        }, dispatch)
    })
)

// 用户工作台
export default class Home extends PageBase {

    constructor(props) {
        super(props);
        moment.locale('zh-cn', zhCN);
    }

    state = {
        key: 'fans',
        type: 'welcome',
        welcome: false,
        visible: null,
        configInfo: {},
        percent: 0,
        money: 0,
        ledouAmount: 0,
        juHeHistoryList: null,
        itemList: [],
        number: 123456789,
        fans: [],
        visitors: {
            pv: 0,
            uv: 0,
            bpv: 0,
            buv: 0
        },
        vsiteTotal: {
            opdata: {
                preTradeData: {
                    peoples: 0,
                    orders: 0,
                    amount: 0,
                    salesAmount: 0
                },
                tradeData: {
                    peoples: 0,
                    orders: 0,
                    amount: 0,
                    salesAmount: 0
                }
            }
        },
    };

    componentDidMount() {
        this.getJuheHistoryTodayList();
        this.getLedouAmount();
        this.getMerchantAccount();
        this.getCustomerConfigInfo();
        this.getDataAggFansDay();

    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;

        switch (operation.type) {
            case statAction.GET_DATA_VSITE_BUY_TOTAL_SUCCESS:

                this.setState({
                    vsiteTotal: nextProps.stat.vsiteTotal
                });
                break;
            case dataAggAction.GET_DATA_AGG_FANS_DAY_SUCCESS:
                this.setState({
                    fans: nextProps.dataAgg.fans
                });
                break;
            case dataAggAction.GET_DATA_AGG_VISITOR_TOTAL_SUCCESS:
                this.setState({
                    visitors: nextProps.dataAgg.visitors
                });
                break;
            case customerAction.GET_CUSTOMER_CONFIG_INFO_SUCCESS:

                let {type} = this.state;

                let visible = false;

                switch (type) {
                    case 'welcome':
                        if (nextProps.auth.info.platLoginInfo) {
                            visible = !(nextProps.auth.info.platLoginInfo.times > 1);
                        } else {
                            visible = true;
                        }
                        break;
                    case 'entrance':
                        visible = true;
                        break;
                }

                let itemList = [];

                if (!nextProps.customer.configInfo.shortcut || nextProps.customer.configInfo.shortcut.length == 0) {
                    nextProps.customer.configInfo.shortcut = ['CONTENT_RICHTEXT'];
                }

                nextProps.auth.menu.map((item) => {

                    item.tags.map((tag) => {
                        nextProps.customer.configInfo.shortcut.map((shortcut) => {
                            if (tag.key == shortcut) {
                                itemList.push(tag);
                            }

                        });
                    });
                });

                this.setState({
                    visible: visible,
                    // visible:true,
                    percent: nextProps.customer.percent,
                    configInfo: nextProps.customer.configInfo,
                    itemList: itemList
                });

                break;
            case customerAction.UPDATE_CUSTOMER_CONFIG_SHORTCUT_SUCCESS:
                this.getCustomerConfigInfo();
                break;
            case customerAction.DELETE_CUSTOMER_CONFIG_SHORTCUT_SUCCESS:
                this.getCustomerConfigInfo();
                break;
            case merchantAction.GET_MERCHANT_ACCOUNT_SUCCESS:
                this.setState({
                    money: nextProps.merchant.money.opdata.uinAccountData.platformMoney
                });
                break;
            case ledouAction.GET_LEDOU_AMOUNT_SUCCESS:
                this.setState({
                    ledouAmount: nextProps.ledou.ledouAmount
                });
                break;
            case juheAction.GET_JUHE_HISTORY_TODAY_LIST_SUCCESS:

                nextProps.juhe.juHeHistoryList.result.reverse();

                this.setState({
                    juHeHistoryList: nextProps.juhe.juHeHistoryList
                });
                break;

        }

    }

    onChange = (e) => {
        this.setState({
            key: e.target.value
        }, () => {
            switch (this.state.key) {
                case 'fans':
                    this.getDataAggFansDay();
                    break;
                case 'trade':
                    this.getDataAggVistorTotal();
                    this.getDataVsiteBuyTotal();
                    break;
            }
        });
    };

    getDataVsiteBuyTotal = () => {
        this.props.actions.getDataVsiteBuyTotal();
    };

    getDataAggFansDay = () => {
        this.props.actions.getDataAggFansDay();
    };

    getDataAggVistorTotal = () => {
        this.props.actions.getDataAggVistorTotal();
    };

    getCustomerConfigInfo = () => {
        this.props.actions.getCustomerConfigInfo();
    };

    getJuheHistoryTodayList = () => {
        this.props.actions.getJuheHistoryTodayList({});
    };

    getLedouAmount = () => {
        this.props.actions.getLedouAmount();
    };

    getMerchantAccount = () => {
        this.props.actions.getMerchantAccount();
    };

    updateCustomerConfigShortcut = (shortcut) => {
        this.props.actions.updateCustomerConfigShortcut(shortcut);
    };

    deleteCustomerConfigShortcut = (shortcut) => {
        this.props.actions.deleteCustomerConfigShortcut(shortcut);
    };

    handleOk = (type) => {
        this.setState({
            type: type,
            visible: true
        });
    };

    handleCancel = (type) => {
        this.setState({
            type: type,
            visible: false
        });
    };

    //毫秒数换算成天
    convert = (value1, value2) => {

        let value = Math.floor(Math.abs((parseInt(value1) - parseInt(value2))) / (1000 * 60 * 60 * 24)) + 1;

        if (value == 0) {
            value = 1;
        }

        return value;
    };

    setItemValue = (item) => {

        let {itemList} = this.state;

        let tmpList = {};

        itemList.map((item) => {
            tmpList[item.tagId] = item;
        });

        if (tmpList[item.tagId]) {
            delete tmpList[item.tagId];
            this.deleteCustomerConfigShortcut(item.key);
        } else {
            tmpList[item.tagId] = item;
            this.updateCustomerConfigShortcut(item.key);
        }

        let tmpList2 = [];

        for (let i in tmpList) {
            if (tmpList.hasOwnProperty(i)) {
                tmpList2.push(tmpList[i]);
            }
        }

        this.setState({
            itemList: tmpList2
        });
    };

    handleWelcome = () => {

        let {welcome} = this.state;

        this.setState({
            welcome: !welcome
        });
    };

    // 使用产品功能
    useModule = (type, url) => {
        this.anyWhereModule(type)
            .then(() => {
                redirect(url, '_blank');
            });

    };

    render() {

        let {auth} = this.props;

        let {
            visible, juHeHistoryList,
            percent, ledouAmount, configInfo,
            money, type, itemList,
            number, vsiteTotal, visitors, fans, welcome
        } = this.state;

        let day = this.convert(new Date().getTime(), auth.info.createdDate);

        let contentList = [];

        if (juHeHistoryList) {

            let result = juHeHistoryList.result;

            result.map((item, index) => {

                if (index < 4) {
                    contentList.push(
                        <a href={'marketing.html#/juHeDetail/' + item._id} target="_blank" key={item._id}>
                            <p
                                style={{'marginBottom': '14px'}}>
                        <span className="home-content"
                              style={{'display': 'inline-block', 'width': '60%', 'paddingRight': '15px'}}>
                            <Img src={require('./img/circle-content.png')} alt=""
                                 style={{'verticalAlign': 'baseline', 'marginRight': '10px'}}/>
                            {item.title}
                        </span>
                                <span className="home-history-date" style={{
                                    'display': 'inline-block',
                                    'width': '15%'
                                }}>{item.year + '-' + item.month + '-' + item.day}</span>
                                <span className="home-history-date" style={{
                                    'display': 'inline-block',
                                    'width': '25%',
                                    'textAlign': 'right'
                                }}>{item.lunar}</span>
                            </p>
                        </a>
                    );
                }
            });
        }

        let accountInfoList = [
            {
                key: 'PAYMENT_ACCOUNT',
                title: '账户余额',
                value: ledouAmount,
                unit: '乐豆',
                operation: {
                    text: '充值',
                    href: 'marketing.html#/charge/list'
                },
                module: module.PAYMENT_ACCOUNT_CHARGE
            }, {
                key: 'PAYMENT_WITHDRAW',
                title: '可提现金额',
                value: (money / 100),
                unit: '元',
                operation: {
                    text: '提现',
                    href: 'marketing.html#/profit/summary'
                },
                module: module.PAYMENT_WITHDRAW_WITHDRAW
            }, {
                key: 'PAYMENT_BILL',
                title: '发票管理',
                value: '',
                operation: {
                    text: '设置',
                    href: 'marketing.html#/invoice/add'
                },
                module: module.PAYMENT_BILL_MANAGEMENT

            }
        ];

        if (auth.version.version == 200) {
            accountInfoList.push(
                {
                    key: 'ACCOUNT_ACCOUNT',
                    title: '账号升级',
                    value: '',
                    operation: {
                        text: '升级',
                        href: 'marketing.html#/user/upgrade'
                    },
                    module: module.ACCOUNT_ACCOUNT
                }
            );
        }

        let accountInfo = [];

        accountInfoList.map((item, index) => {

            accountInfo.push(
                <div key={index}>
                    <Row>
                        <Col span={8} className="home-account-title">
                            {item.title}
                        </Col>
                        <Col span={8} className="home-account-title">
                            <span className="home-account-value">{item.value}</span>{item.unit}
                        </Col>
                        <Col span={8}>
                            <AuthModule type={item.module}>
                                <Button className="home-account-button"
                                        onClick={() => this.useModule(item.module, item.operation.href)}>
                                    <span>{item.operation.text}</span>
                                </Button>
                            </AuthModule>
                        </Col>
                    </Row>
                    <br/>
                </div>
            );

        });

        let itemInfo = [];

        itemInfo.push(
            <div key="richtext">
                <Col span={6}>
                    <a href={'marketing.html#/content/tpl/hotArticle'} target="_blank">
                        <div style={{'padding': '24px', 'textAlign': 'center'}}>
                            <Img src={EntranceIconList['CONTENT_RICHTEXT']} alt=""
                                 style={{'width': '100%', 'height': 'auto'}}/>
                            <span className="home-entrance-item">资讯图文</span>
                        </div>
                    </a>
                </Col>
            </div>
        );

        itemList.map((item, index) => {

            if (item.key != 'CONTENT_RICHTEXT') {
                itemInfo.push(
                    <div key={index}>
                        <Col span={6}>
                            <a href={'marketing.html#' + item.uri} target="_blank">
                                <div style={{'padding': '24px', 'textAlign': 'center'}}>
                                    <Img
                                        src={EntranceIconList[item.key] ? EntranceIconList[item.key] : require('./img/entrance.png')}
                                        alt=""
                                        style={{'width': '100%', 'height': 'auto'}}/>
                                    <span className="home-entrance-item">{item.name}</span>
                                </div>
                            </a>
                        </Col>
                    </div>
                );
            }
        });

        itemInfo.push(
            <div key="entrance">
                <Col span={6}>
                    <a href="javascript:void(0)" onClick={() => this.handleOk('entrance')}>
                        <div style={{'padding': '24px', 'textAlign': 'center'}}>
                            <Img src={require('./img/entrance.png')} alt=""
                                 style={{'width': '100%', 'height': 'auto'}}/>
                            <span className="home-entrance-item">添加新入口</span>
                        </div>
                    </a>
                </Col>
            </div>
        );

        let marketingList = [
            /*{
             title: '快来领包裹！使用艾乐卡场景模板，轻松走入内容电商时代',
             href: 'content.html#/add'
             }, {
             title: '美妆新品整套模板上线，限时8折',
             href: 'content.html#/add'
             }, */
            {
                title: '只需3步让微信图文添加导购玩出新花样',
                href: 'content.html#/add'
            }
        ];

        let marketingInfo = [];

        marketingList.map((item, index) => {

            marketingInfo.push(
                <div key={index}>
                    <a href={item.href} target="_blank">
                        <p className="home-marketing-title">
                            <Img src={require('./img/circle-marketing.png')} alt=""
                                 style={{'verticalAlign': 'baseline', 'marginRight': '10px'}}/>
                            {item.title}
                        </p>
                    </a>
                    <br/>
                </div>
            );
        });

        let welcomeList = [
            {
                title: '发布授权',
                img: WelcomeIconList.channel,
                href: 'marketing.html#/channel',
                status: configInfo.publish == 'TRUE'
            }, {
                title: '交易设置',
                img: WelcomeIconList.payway,
                href: 'marketing.html#/payway',
                status: configInfo.trade == 'TRUE'
            }, {
                title: '成员管理',
                img: WelcomeIconList.admin,
                href: 'marketing.html#/admin',
                status: configInfo.manager == 'TRUE'
            }, {
                title: '微站设置',
                img: WelcomeIconList.vsite,
                href: 'marketing.html#/content/site',
                status: configInfo.vsite == 'TRUE'
            }
        ];

        let welcomeContent = [];

        welcomeList.map((item, index) => {
            welcomeContent.push(
                <Col span={6} key={index}>
                    <a href={item.href} target="_blank">
                        <div style={{'padding': '24px'}}>
                            <Img src={item.img} alt="" style={{'width': '100%', 'height': 'auto'}}/>
                            <span className="home-welcome-menu">
                                {item.status && <Icon type="check-circle" style={{
                                    'color': '#87d068',
                                    'fontSize': '14px',
                                    'marginRight': '8px'
                                }}/>}
                                {item.title}
                            </span>
                        </div>
                    </a>
                </Col>
            );
        });

        let greeting = '';

        if (auth.info.platLoginInfo && auth.info.platLoginInfo.times > 1) {

            let hour = new Date().getHours();

            if (7 <= hour && hour < 12) {
                greeting = '听说早起用艾乐卡的都是颜值高的，帅哥（美女）你好~';
            } else if (12 <= hour && hour < 18) {
                greeting = '嗝~午饭多吃了一口，现在肚子里全是模板(´°̥̥̥̥̥̥̥̥ω°̥̥̥̥̥̥̥̥｀)';
            } else if (18 <= hour && hour < 21) {
                greeting = '小主！你达达的马蹄声才不是美丽的错误！我不是过客！是傍晚的艾乐卡！';
            } else {
                greeting = '“主子，晚睡对身体不好，早点休息明天陪你看雾霾。”顶着熊猫眼的艾乐卡说。';
            }
        } else {
            greeting = (<span>亲爱的{auth.info.name ? auth.info.name : '用户'}！
                这是您开启内容之旅的第<span style={{'color': '#108ee9'}}>{day}</span>天
            </span>);
        }


        // console.dir(auth.info.platLoginInfo.times);

        return (
            <div style={{'background': '#eff2f7'}}>
                <div style={{'width': '1200px', 'margin': '0 auto'}}>

                    <div className="home-preparation">

                        <div ref="welcome" style={{'display': welcome ? 'block' : 'none'}}>
                            <div style={{'width': '510px', 'margin': '0 auto'}}>
                                <p className="home-welcome-desc">为了帮助您更好的使用艾乐卡，建议您首先完成以下四步运营前准备设置</p>
                                <Row>
                                    {welcomeContent}
                                </Row>
                            </div>
                        </div>

                        <span style={{'marginRight': '24px'}}>运营准备已完成{percent}%</span>
                        <div style={{'display': 'inline-block', 'width': '340px', 'verticalAlign': 'text-bottom'}}>
                            <Progress percent={percent} showInfo={false} status="active" strokeWidth={6}/>
                        </div>

                        <div style={{'marginTop': '33px'}}>
                            <a href="javascript:void(0)" onClick={() => this.handleWelcome()}>
                                <Img src={welcome ? require('./img/up.png') : require('./img/down.png')} alt=""
                                     style={{}}/>
                            </a>
                        </div>
                    </div>
                    <div className="home-welcome">
                        <p>
                            {greeting}
                            {/*亲爱的{auth.info.name ? auth.info.name : '用户'}！这是您开启内容之旅的第
                             <span style={{'color': '#108ee9'}}>{day}</span>天*/}
                        </p>
                        {/*<a href="javascript:void(0)"><p onClick={()=>this.handleOk('welcome')}>{content}</p></a>*/}
                    </div>
                    <div className="home-top">
                        <Row>
                            <Col span={12}>
                                <div className="home-calendar">
                                    <div style={{'display': 'inline-block', 'position': 'relative'}}>
                                        <Img src={require('./img/calendar.png')} alt=""
                                             style={{'width': '140px', 'height': 'auto'}}/>
                                        <div style={{
                                            'position': 'absolute',
                                            'top': '60px',
                                            'left': '50px',
                                            'width': '40px',
                                            'textAlign': 'center'
                                        }}>
                                            <span className="home-calendar-day">{moment().format('D')}</span>
                                        </div>
                                    </div>
                                    <div style={{
                                        'display': 'inline-block',
                                        'marginLeft': '30px',
                                        'verticalAlign': 'top'
                                    }}>
                                        <p className="home-today">
                                            今天是：{moment().format('LL')}&nbsp;{moment().format('dddd')}</p>
                                        <p className="home-festival">农历：{GetCNDate()}</p>
                                        <p>
                                            <Button className="home-calendar-button"
                                                    onClick={() => this.handleOk('calendar')}>
                                                <span>本月营销日</span>
                                            </Button>
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <div className="home-divide-line"></div>
                            <Col span={12}>
                                <div className="home-history">
                                    <span className="home-history-title">历史上的今天</span>
                                    <span style={{'width': '50%', 'display': 'inline-block', 'textAlign': 'right'}}>
                                        <p><a href="marketing.html#/content/tpl/hotArticle" target="_blank">
                                            <span className="home-history-more">查看更多</span>
                                        </a></p>
                                    </span>
                                    {contentList && contentList.length != 0 ? contentList :
                                        <div style={{'textAlign': 'center'}}>
                                            <Img src={require('./img/default.png')} alt=""
                                                 style={{'width': '80px', 'height': 'auto'}}/>
                                            <p style={{'fontSize': '14px', 'color': '#8492a6', 'margin': '8px auto'}}>
                                                暂无数据！</p>
                                        </div>}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="home-center">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card title={
                                    <div>
                                        <span>营销锦囊</span>
                                        <LKTooltip type="home-marketing-idea"
                                                   placement="top"/>
                                    </div>
                                }>
                                    <div className="home-card">
                                        {marketingInfo}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title={
                                    <div>
                                        <span>快捷入口</span>
                                        <LKTooltip type="home-marketing-entrance"
                                                   placement="top"/>
                                    </div>
                                } extra={
                                    <a href="javascript:void(0)" onClick={() => this.handleOk('entrance')}>
                                        <p className="home-entrance-edit">
                                            <Icon type="edit"/><span style={{'marginLeft': '10px'}}>编辑</span>
                                        </p>
                                    </a>
                                }>
                                    <div className="home-card">
                                        {itemInfo}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div className="home-bottom">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card title={
                                    <div>
                                        <span>账户信息</span>
                                        <LKTooltip type="home-account-info"
                                                   placement="top"/>
                                    </div>
                                }>
                                    <div className="home-card">
                                        {accountInfo}
                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title={
                                    <div>
                                        <span>数据概况</span>
                                        <LKTooltip type="home-data-statistics"
                                                   placement="top"/>
                                    </div>
                                }>
                                    <div className="home-card">
                                        <DataStatistics number={number}
                                                        data={fans}
                                                        value={this.state.key}
                                                        onChange={this.onChange}
                                                        vsiteTotal={vsiteTotal}
                                                        visitors={visitors}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
                {type == 'calendar' && <CalendarModal visible={visible}
                                                      month={moment().format('M')}
                                                      handleCancel={() => this.handleCancel(type)}
                />}
                {type == 'welcome' && <WelcomeModal visible={visible}
                                                    percent={percent}
                                                    configInfo={configInfo}
                                                    handleCancel={() => this.handleCancel(type)}
                />}
                {type == 'entrance' && <EntranceModal visible={visible}
                                                      auth={auth}
                                                      setItemValue={this.setItemValue}
                                                      itemList={itemList}
                                                      handleCancel={() => this.handleCancel(type)}
                />}
            </div>
        );
    }
}


