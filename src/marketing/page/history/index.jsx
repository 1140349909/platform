import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Tabs, Tooltip, Icon} from 'antd';
import PageBase from 'common/base/PageBase';
import './index.less';
import PullLoad from 'common/component/PullLoad';
import {getMediaUrl} from 'common/util/media';
import {transformArray, redirect} from 'common/util';
import * as contentAction from '../../store/content/action';
import * as authorizeAction from 'common/store/authorize/action';
import * as distributeAction from 'common/store/distribute/action';
import * as userAction from '../../store/user/action';
import HistoryShow from './component/HistoryShow';
import NavTag from 'common/component/NavTag';
import Img from 'common/component/Img';

const TabPane = Tabs.TabPane;

//需要抽出通用组件

@connect(
    state => ({
        operation: state.operation,
        content: state.content.toJS(),
        authorize: state.authorize.toJS(),
        distribute: state.distribute.toJS(),
        user: state.user.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentAction,
            ...authorizeAction,
            ...distributeAction,
            ...userAction,
        }, dispatch)
    })
)
export default class HistoryIndex extends PageBase {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 4,

            resType: '',

            sort: 'publishedDate,desc',

            idChannel: props.params.type != 'h5' ? 'wx' : 'wb',
            contents: [],
            windowHeight: window.innerHeight,

            params: {
                userId: '0011',
                dateRange: '0021',
                distributeStatus: '0031',
                idChannel: props.params.type != 'h5' ? 'wx' : 'wb',
            }
        };
    }


    componentDidMount() {
        this.getReleaseHistory(this.props.params.type);
        this.getManagerUserList();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps) {
        let oldType = prevProps.params.type;
        let newType = this.props.params.type;

        if (newType !== oldType) {
            this.getReleaseHistory(newType);
            this.getManagerUserList();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case userAction.GET_MANAGER_USER_LIST_SUCCESS :

                let children = [];

                nextProps.user.list.map((item) => {
                    children.push({
                        title: item.text,
                        key: item.text == '全部' ? '0011' : item.param,
                    });
                });

                let newUser = {
                    title: '发布人员',
                    key: 'userId',
                    type: 'radio',
                    children: children
                };

                const newHistoryData = [
                    {
                        title: '发布时间',
                        key: 'dateRange',
                        type: 'radio',
                        children: [{
                            title: '全部',
                            key: '0021'
                        }, {
                            title: '今天',
                            key: 'today'
                        }, {
                            title: '昨天',
                            key: 'yesterday'
                        }, {
                            title: '最近七天',
                            key: 'last7days'
                        }, {
                            title: '本月',
                            key: 'currMonth'
                        }]
                    }, {
                        title: '发布状态',
                        key: 'distributeStatus',
                        type: 'radio',
                        children: [{
                            title: '全部',
                            key: '0031'
                        }, {
                            title: '发布成功',
                            key: 'success'
                        }, {
                            title: '发布失败',
                            key: 'fail'
                        }]
                    }
                ];


                //这一部分要重构
                let newFilterList = [].concat(newUser, newHistoryData);

                this.setState({
                    newFilterList: newFilterList
                });
                break;
            case distributeAction.GET_DISTRIBUTE_LIST_SUCCESS :
                let {mineList, list} = nextProps.distribute;
                const contents = transformArray(mineList);

                let params = nextProps.distribute.params;

                if (params.userId == '') {
                    params.userId = '0011';
                }

                if (params.dateRange == '') {
                    params.dateRange = '0021';
                }

                if (params.distributeStatus == '') {
                    params.distributeStatus = '0031';
                }

                this.setState({
                    params: params,

                    contents: contents,
                    origin: list,
                    status: 'success'
                });

                if (params.idChannel == 'wx') {
                    this.getChannelList('wechat');
                } else if (params.idChannel == 'wb') {
                    this.getChannelList('weibo');
                } else if (params.idChannel == 'toutiao') {
                    this.getChannelList('toutiao');
                }
                break;
            case authorizeAction.GET_CHANNEL_LIST_SUCCESS:
                this.setState({
                    list: nextProps.authorize.list
                });
                break;
        }
    }

    handleResize = () => {
        this.setState({
            windowHeight: window.innerHeight,
        });
    };

    showModal = (viewParam, viewData) => {
        this.showView('show', viewParam, viewData);
    };

    jumpBack = (type) => {
        redirect('marketing.html#/' + type + '/mine/published');
    };

    getManagerUserList = () => {
        this.props.actions.getManagerUserList();
    };

    getChannelList = (channel, uinIds) => {
        this.props.actions.getChannelList(channel, uinIds);
    };

    getReleaseHistory = (resType) => {
        this.list({
            page: 0,
            resType: resType,
            distributeStatus: this.state.params.distributeStatus,
            sort: this.state.sort
        });
    };

    onLoadMore = () => {

        this.setState({
            status: 'pending'
        }, () => {
            this.list({
                page: ++this.state.page
            });
        });


    };

    list = (params) => {

        this.setState(params,
            () => {
                this.props.actions.getDistributeList({
                    page: this.state.page,
                    resType: this.state.resType,
                    size: this.state.size,
                    userId: this.state.params.userId != '0011' ? this.state.params.userId : '',
                    distributeStatus: this.state.params.distributeStatus != '0031' ? this.state.params.distributeStatus : '',
                    dateRange: this.state.params.dateRange != '0021' ? this.state.params.dateRange : '',
                    idChannel: this.state.params.idChannel,
                    sort: this.state.sort
                });
            });
    };

    onTabChange = (key) => {
        this.setState({
            page: 0,
            status: 'pending',
            contents: [],
            params: {
                idChannel: key,
                userId: '0011',
                dateRange: '0021',
                distributeStatus: '0031',
            }
        }, () => {
            this.list({
                page: this.state.page,
                idChannel: this.state.params.idChannel,
                userId: this.state.params.userId != '0011' ? this.state.params.userId : '',
                dateRange: this.state.params.dateRange != '0021' ? this.state.params.dateRange : '',
                distributeStatus: this.state.params.distributeStatus != '0031' ? this.state.params.distributeStatus : '',
                contents: this.state.contents,
            });
        });
    };

    // 获取封面图片
    getContentImg = (distShare, style) => {

        if (distShare.imgUrl) {
            return <Img src={distShare.imgUrl} alt="" style={style}/>;
        }

        if (distShare.picUrl) {
            return <Img src={distShare.picUrl} alt="" style={style}/>;
        }

        if (distShare.imgId) {
            return <Img src={getMediaUrl(distShare.imgId)} alt="" style={style}/>;
        }

        return <Img src={require('./img/default.png')} alt="" style={style}/>;

    };

    // 统一获取已发布XX
    getContentChannel = (channel, item, list) => {

        if (channel == 'vsite') {
            return null;
        }

        let data = item.channels[channel].uins,
            // results = item.channels[channel].results?item.channels[channel].results:[],
            number = data.length;

        let channelList = {
            wx: {
                text: '已发布公众号',
                data: list && list.wechat ? list.wechat : [],
            },
            wb: {
                text: '已发布微博号',
                data: list && list.weibo ? list.weibo : [],
            },
            toutiao: {
                text: '已发布头条号',
                data: list && list.toutiao ? list.toutiao : [],
            }
        };

        let commonList = [];

        // 统一化
        channelList[channel].data.map((item, index) => {

            let idList = {
                wx: {
                    id: item.authorizer_appid,
                    name: item.authorizerInfo ? item.authorizerInfo.nick_name : '匿名',
                    img: item.authorizerInfo ? item.authorizerInfo.head_img : '',
                    service: item.authorizerInfo && item.authorizerInfo.service_type_info ? (item.authorizerInfo.service_type_info.id < 2 ? '订阅号：' : '服务号：') : '未知',
                    template: (
                        <p>
                            <span>{item.authorizerInfo && item.authorizerInfo.service_type_info ? (item.authorizerInfo.service_type_info.id < 2 ? '订阅号：' : '服务号：') : '未知'}</span>
                            <span>{item.authorizerInfo ? item.authorizerInfo.nick_name : '匿名'}</span>
                            <span>{item.authorizerInfo ? '（' + item.authorizerInfo.alias + '）' : '（匿名）'}</span>
                        </p>
                    )
                },
                wb: {
                    id: item.uid,
                    name: item.authorizerInfo ? item.authorizerInfo.name : '匿名',
                    img: item.authorizerInfo ? item.authorizerInfo.profile_image_url : '',
                    service: '',
                    template: (
                        <p>
                            <span>微博昵称：{item.authorizerInfo ? item.authorizerInfo.name : '匿名'}</span>
                        </p>
                    )
                },
                toutiao: {
                    id: item.uid,
                    name: item.authorizerInfo ? item.authorizerInfo.screen_name : '匿名',
                    img: item.authorizerInfo ? item.authorizerInfo.avatar_url : '',
                    service: '',
                    template: (
                        <p>
                            <span>头条号：{item.authorizerInfo ? item.authorizerInfo.screen_name : '匿名'}</span>
                        </p>
                    )
                }
            };

            commonList.push({
                index: index,
                id: idList[channel].id,
                name: idList[channel].name,
                img: idList[channel].img,
                service: idList[channel].service,
                template: idList[channel].template,
            });
        });

        return (
            <div>
                <span className="content-history-other">{channelList[channel].text}（{number}）：</span>
                {data.map((id, index1) => (
                    <div key={index1} style={{'display': 'inline'}}>
                        {list && commonList.map((item, index2) => (
                            index2 < 10 && item.id == id &&
                            <Tooltip title={(
                                <div>
                                    {item.template}
                                </div>
                            )} arrowPointAtCenter key={index2}>
                                <div style={{
                                    'width': '20px',
                                    'height': '20px',
                                    'marginRight': '12px',
                                    'display': 'inline-block',
                                    'position': 'relative'
                                }}>
                                    <Img
                                        src={item.img}
                                        alt="暂无"
                                        style={{
                                            'width': '20px',
                                            'borderRadius': '2px',
                                            'verticalAlign': 'text-bottom'
                                        }}/>
                                    {false && <Icon type="exclamation-circle" style={{
                                        'right': '4px',
                                        'position': 'absolute',
                                        'top': '4px',
                                        'color': 'red'
                                    }}/>}
                                </div>
                            </Tooltip>
                        ))}
                        {list && channelList[channel].data.length >= 10 &&
                        <a onClick={() => this.showModal(channel, {
                            uins: data,
                            list: channelList[channel].data
                        })}>
                            <span style={{'color': '#009dfc'}}>查看更多</span>
                        </a>}
                    </div>
                ))}
            </div>
        );
    };

    // 新版navTag
    handelSelect = (checkedKeys, objectCheckedKeys) => {

        let {params} = this.state;

        objectCheckedKeys.map((item) => {
            params[item.key] = item.children[0].title != '全部' ? item.children[0].key : '';
        });

        this.list(params);
    };

    render() {
        const {type} = this.props.params;

        const isShowHistoryShow = this.isShowView('show');

        let {contents, params, list, origin} = this.state;

        let idChannel = params.idChannel;

        if (!origin) {
            return null;
        }

        let contentsList = [];

        contents.map((data, index1) => {
            contentsList.push(
                <div key={index1} style={{'width': '972px', 'margin': '0 auto'}}>
                    <p style={{'marginBottom': '16px'}}><span className="content-history-label">{data.time}</span></p>
                    {
                        data && data.response.map((item, index2) => (

                            <div key={index2}>
                                {item.channels[idChannel].articles && item.channels[idChannel].articles.length != 0 &&
                                <div style={{'marginBottom': '16px'}}>
                                    <div className="content-history-multiple">
                                        <div style={{'float': 'left', 'width': '12%'}}>
                                            <p>
                                                <span style={{
                                                    fontSize: '18px',
                                                    color: '#444444'
                                                }}>
                                                    多图文（{item.channels[idChannel].articles.length + 1}）</span>
                                            </p>
                                        </div>
                                        <div style={{'float': 'left', 'width': '88%', 'position': 'relative'}}>
                                            <span>发布人：<span style={{
                                                'color': '#009dfc',
                                                'marginRight': '26px'
                                            }}>{item.createdUser ?
                                                item.createdUser : '管理员'}</span>
                                            发布时间：<span style={{'color': '#009dfc'}}>{item.dateArray.createdDate}</span></span>
                                            <div style={{'position': 'absolute', 'bottom': '0', 'right': '0'}}>
                                                {this.getContentChannel(idChannel, item, list)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-history-container" style={{'marginBottom': '0'}}>
                                        <div style={{'float': 'left', 'paddingRight': '16px', 'width': '12%'}}>
                                            {this.getContentImg(item.channels[idChannel].distShare, {
                                                'width': '98px',
                                                'height': '98px'
                                            })}
                                        </div>
                                        <div
                                            style={{
                                                'height': '98px',
                                                'float': 'left',
                                                'width': '88%',
                                                'position': 'relative'
                                            }}>
                                            <p className="content-history-title">
                                                {idChannel == 'wb' ? item.channels[idChannel].distShare.desc : item.channels[idChannel].distShare.title}
                                            </p>
                                            <p className="content-history-desc">
                                                {item.channels[idChannel].distShare.desc ? item.channels[idChannel].distShare.desc : '摘要未编辑'}
                                            </p>
                                        </div>
                                    </div>
                                    {item.channels[idChannel].articles.map((article, index4) => (
                                        <div className="content-history-container" style={{'marginBottom': '0'}}
                                             key={index4}>
                                            <div style={{'float': 'left', 'paddingRight': '16px', 'width': '12%'}}>
                                                {this.getContentImg(article, {
                                                    'width': '98px',
                                                    'height': '98px'
                                                })}
                                            </div>

                                            <div
                                                style={{
                                                    'height': '98px',
                                                    'float': 'left',
                                                    'width': '88%',
                                                    'position': 'relative'
                                                }}>
                                                <p className="content-history-title">
                                                    {idChannel == 'wb' ? article.description : article.title}
                                                </p>
                                                <p className="content-history-desc">
                                                    {article.description ? article.description : '摘要未编辑'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                                {(!item.channels[idChannel].articles || item.channels[idChannel].articles.length == 0 ) &&
                                <div className="content-history-container">
                                    <div style={{'float': 'left', 'paddingRight': '16px', 'width': '12%'}}>
                                        {this.getContentImg(item.channels[idChannel].distShare, {
                                            'width': '98px',
                                            'height': '98px'
                                        })}
                                    </div>
                                    <div
                                        style={{
                                            'height': '98px',
                                            'float': 'left',
                                            'width': '88%',
                                            'position': 'relative'
                                        }}>
                                        <p className="content-history-title">
                                            {idChannel == 'wb' ? item.channels[idChannel].distShare.desc : item.channels[idChannel].distShare.title}
                                        </p>

                                        <p className="content-history-desc">
                                            {item.channels[idChannel].distShare.desc ? item.channels[idChannel].distShare.desc : '摘要未编辑'}
                                        </p>
                                        <p className="content-history-other"
                                           style={{'position': 'absolute', 'bottom': '0'}}>
                                            发布人：
                                            <span style={{'color': '#009dfc', 'marginRight': '26px'}}>
                                                {item.createdUser ? item.createdUser : '管理员'}
                                            </span>
                                            发布时间：<span style={{'color': '#009dfc'}}>{item.dateArray.createdDate}</span>
                                        </p>
                                        <div style={{'position': 'absolute', 'bottom': '0', 'right': '0'}}>
                                            {this.getContentChannel(idChannel, item, list)}
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        ))
                    }
                </div>
            );
        });

        // console.log(params)

        let commonPage = (
            <div className="mine-container" style={{'background': '#eff2f7', 'minHeight': '100%', 'padding': '16px 0'}}>

                {<div style={{
                    'background': ' #ffffff',
                    'width': '975px',
                    'margin': '0 auto'
                }}>
                    {this.state.newFilterList && <NavTag data={this.state.newFilterList}
                             defaultSelectedKeys={[
                                 this.state.params.userId,
                                 this.state.params.dateRange,
                                 this.state.params.distributeStatus,
                             ]}
                             onSelect={this.handelSelect}
                    />}

                </div>}


                {contentsList.length == 0 &&
                <div style={{'marginTop': 150, 'textAlign': 'center', 'color': '#999999', 'fontSize': 18}}>
                    暂无数据
                </div>}
                {contentsList.length != 0 && <div style={{
                    'position': 'relative',
                    'marginTop': '16px',
                    'height': this.state.windowHeight * 0.7 + 'px'
                }}>
                    <PullLoad
                        id="pullload"
                        first={false}
                        status={this.state.status}
                        last={origin.last}
                        onLoadMore={this.onLoadMore}>
                        {contentsList}
                    </PullLoad>
                </div>}
            </div>
        );


        return (
            <div className="contentPage" style={{'background': '#eff2f7', 'minHeight': '100%'}}>

                <div className="content-history-return" onClick={() => this.jumpBack(type)}>
                    <p>
                        <i className="iconfont icon-fanhui1"/>
                        <span style={{'marginLeft': '12px'}}>返回</span>
                    </p>
                </div>

                <Tabs onChange={this.onTabChange}
                      animated={false}
                      className="content-history-navbar">
                    {type != 'h5' && <TabPane tab="微信" key="wx">
                        {
                            idChannel == 'wx' && commonPage
                        }
                    </TabPane>}
                    <TabPane tab="微博" key="wb">
                        {
                            idChannel == 'wb' && commonPage
                        }
                    </TabPane>
                    {type != 'h5' && <TabPane tab="今日头条" key="toutiao">
                        {
                            idChannel == 'toutiao' && commonPage
                        }
                    </TabPane>}
                    <TabPane tab="微站" key="vsite">
                        {
                            idChannel == 'vsite' && commonPage
                        }
                    </TabPane>
                </Tabs>
                {isShowHistoryShow && <HistoryShow
                    visible={isShowHistoryShow}
                    data={this.state.viewData}
                    param={this.state.viewParam}
                    reset={this.reset}
                />}
            </div>
        );
    }
}


