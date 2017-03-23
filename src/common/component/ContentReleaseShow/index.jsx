import React, {Component} from 'react';
import AuthComponentBase from 'common/base/AuthComponentBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Modal, Checkbox, Radio, Form, Button, Row, Col, Tooltip, Input, message, Icon} from 'antd';
import './index.less';
import {getContentShowUrl, getIlokaContentUrl} from 'common/util/url';
import classNames from 'classnames';
import moment from 'moment';
import Dom from 'common/util/dom';
import {dateFormat} from 'common/util';
import {transformArray} from 'common/util/index';
import {getMediaUrl} from 'common/util/media';
import PullLoad from '../PullLoad';
import AuthModule from '../AuthModule';
import * as module from 'common/config/module';
import LKTooltip from '../Tooltip';
import * as authorizeAction from 'common/store/authorize/action';
import * as distributeAction from 'common/store/distribute/action';
import DatePickerGroup from 'common/component/DatePickerGroup';
import NavTag from 'common/component/NavTag';
import Img from 'common/component/Img';
import {TOUTIAO_LIST} from 'common/config/constants';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
// const TabPane = Tabs.TabPane;

// TODO:[anyWhereModule: CONTENT_RICHTEXT_PUBLISH]

//demo
const SortableItem = SortableElement(({data, index, onMouseOver, onMouseOut, deleteArticle}) =>
    <div className="content-release-multiple" key={index} style={{'padding': '8px'}}
         onMouseOver={onMouseOver}
         onMouseOut={onMouseOut}>
        <div className="content-release-mask">
            <p style={{
                'position': 'absolute',
                'left': '30px',
                'top': '30px',
                'color': 'white',
            }}>长按鼠标左键拖动</p>
            <i className="iconfont icon-shanchu" style={{
                'position': 'absolute',
                'right': '6px',
                'bottom': '6px',
                'color': 'white',
            }} onClick={() => {
                deleteArticle(index);
            }}/>
        </div>
        <Row gutter={8}>
            <Col span={12}>
                <div className='content-release-other'>
                    <span>{data.wx.title ? data.wx.title : '标题未编辑'}</span>
                </div>
            </Col>
            <Col span={12}>
                {data.wx.imgId &&
                <Img src={getMediaUrl(data.wx.imgId)} alt="" style={{'width': '66px', 'height': '66px'}}/>}
                {!data.wx.imgId &&
                <Img src='./img/default.png' alt="" style={{'width': '66px', 'height': '66px'}}/>}
            </Col>
        </Row>
    </div>
);

const SortableList = SortableContainer(({items, onMouseOver, onMouseOut, deleteArticle, wxShow}) => {

    return (
        <div style={{'height': '200px'}}>
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`}
                              onMouseOver={onMouseOver}
                              onMouseOut={onMouseOut}
                              deleteArticle={deleteArticle}
                              index={index}
                              data={value}/>
            )}
            {items.length < 7 && <div className="content-release-multiple content-release-upload"
                                      onClick={wxShow}>
                <i className="iconfont icon-tianjia"/>
            </div>}
        </div>
    );
});

@connect(
    state => ({
        auth: state.auth.toJS(),
        operation: state.operation,
        authorize: state.authorize.toJS(),
        distribute: state.distribute.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...authorizeAction,
            ...distributeAction,
        }, dispatch)
    })
)

class ContentReleaseShow extends AuthComponentBase {

    constructor(props) {
        super(props);

        this.state = {
            wxShow: false,
            resId: props.resId ? props.resId : props.data.id,
            channel: 'vsite',
            content: [],
            windowHeight: window.innerHeight,
            datePickerValue: [null, null],
            toutiaoArticleTag: ['news']
        };
    }

    componentDidMount() {
        this.getChannelList('wechat');
        this.getChannelList('weibo');
        this.getChannelList('toutiao');
        this.getDistributeResLatest(this.state.resId);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false);
    }

    // 根据返回的nextProps处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        // console.dir(operation)

        switch (operation.type) {
            // 获取列表
            case authorizeAction.GET_CHANNEL_LIST_SUCCESS:
                this.setState({
                    list: nextProps.authorize.list
                });
                break;
            case distributeAction.GET_DISTRIBUTE_RES_LATEST_SUCCESS:

                let latest = nextProps.distribute.latest;
                let datePickerValue = [null, null];
                if (latest.wx && latest.wx.timeStragety.stragety == 'interval') {
                    datePickerValue[0] = moment(new Date(parseInt(latest.wx.timeStragety.startTime)), 'YYYY-MM-DD HH:mm:ss');
                    datePickerValue[1] = moment(new Date(parseInt(latest.wx.timeStragety.endTime)), 'YYYY-MM-DD HH:mm:ss');
                }

                this.setState({
                    latest: nextProps.distribute.latest,
                    datePickerValue,
                });

                break;
            // 发布资讯成功
            case distributeAction.ADD_DISTRIBUTE_FAILURE:
                this.props.reset();
                message.error(operation.result.errMsg);
                break;
            // 发布资讯成功
            case distributeAction.ADD_DISTRIBUTE_SUCCESS:
                this.props.reset();

                let {resType} = this.props;

                if (resType == 'content') {
                    let content = (
                        <div style={{'display': 'inline-block'}}>
                        <span>
                            发布成功！ 让10万大V来帮你传播，
                            <a href="javascript:void(0)" onClick={() => {
                                message.destroy();
                                this.props.onRelease();
                            }
                            }>去推广</a>
                        </span>
                        </div>
                    );
                    message.success(content, 5);
                } else {
                    message.success('发布成功！');
                }
                break;
            // 微信试推送
            case distributeAction.SEND_WX_DISTRIBUTE_MESSAGE_PENDING:
                this.wxHide();
                message.loading('正在试推送，请稍候...', 0);
                break;
            case distributeAction.SEND_WX_DISTRIBUTE_MESSAGE_SUCCESS:
                message.destroy();
                message.success('微信试推送成功');
                this.getChannelList('wechat');
                // this.getChannelList('weibo');
                break;
            case distributeAction.SEND_WX_DISTRIBUTE_MESSAGE_FAILURE:
                message.destroy();

                // 这个是在上一个试推送请求未处理完成，再试推送会报这个错
                if (operation.result.errCode == 43002) {
                    message.error(operation.result.errMsg);
                } else {
                    message.error('微信试推送失败');
                }

                this.getChannelList('wechat');
                // this.getChannelList('weibo');
                break;
            case distributeAction.GET_CONTENT_LIST_PENDING:
                this.setState({
                    status: 'pending'
                });
                break;
            case distributeAction.GET_CONTENT_LIST_SUCCESS:
                this.setState({
                    status: 'success'
                });
                break;
        }
    }

    handleResize = () => {
        this.setState({
            windowHeight: window.innerHeight,
        });
    };

    // 获取微博和微信公众号列表
    getChannelList = (type) => {
        this.props.actions.getChannelList(type);
    };

    // 新增分发
    addDistribute = (data) => {
        this.props.actions.addDistribute(data);
    };

    // 获取最近一次资源分发配置
    getDistributeResLatest = (resId) => {
        this.props.actions.getDistributeResLatest(resId);
    };

    // 微信试推送
    sendWxDistributeMessage = (params) => {
        this.props.actions.sendWxDistributeMessage(params);
    };

    // 获取资讯图文
    getContentList = (params) => {
        this.props.actions.getContentList(params);
    };

    // 获取资讯图文
    getAppDataList = (params) => {
        this.props.actions.getAppDataList(params);
    };

    wxShow = () => {
        this.setState({
            wxShow: true,
        }, () => {

            switch (this.props.resType) {
                case 'content':
                    this.getContentList({
                        size: 10,
                        resType: 'content',
                        idChannel: 'wx'
                    });
                    break;
                case 'h5':
                    this.getAppDataList({
                        size: 10,
                        categorytype: 'my',
                        resType: 'content',
                        idChannel: 'wx'
                    });
                    break;
            }

        });
    };

    wxHide = () => {
        this.setState({
            wxShow: false
        });
    };

    confirmSubmit = () => {

        let {channel} = this.props;

        let channelDict = {
            'vsite': '微站',
            'wx': '微信',
            'wb': '微博',
            'toutiao': '头条'
        };

        Modal.confirm({
            title: '发布后将无法撤回。确认发布？',
            content: '如果内容未通过' + channelDict[channel] + '的审核，艾乐卡平台将会提醒您。在我的->发布历史记录->发布失败 中查看相关提醒。',
            onOk: () => this.handleSubmit(),
            onCancel() {
            },
        });
    };

    beforeSubmit = (e) => {

        e.preventDefault();

        let {channel} = this.props;

        let {getFieldValue} = this.props.form;

        if (channel == 'wx' && getFieldValue('wxPushWay') == 'interval') {
            this.useModule(module.CONTENT_RICHTEXT_REPLY, this.confirmSubmit);
        } else {
            this.confirmSubmit();
        }
    };

    //提交数据
    handleSubmit = () => {

        let {resType, data, form, channel} = this.props;

        let {list, resId, latest, content} = this.state;

        if (!list || !latest) {
            return null;
        }

        // 此处定义是否已经分发
        // let hasVSITE = false,
        let hasWX = false;
        // hasWB = false;

        let hasVSITE2 = false;
        /*,
         hasWX2 = false,
         hasWB2 = false*/

        // 判断逻辑一：仅根据distributeChannels属性进行判断
        if (data.distributeChannels) {
            hasVSITE2 = data.distributeChannels.indexOf('vsite') != -1;
            /* hasWX2 = data.distributeChannels.indexOf('wx') != -1;
             hasWB2 = data.distributeChannels.indexOf('wb') != -1;*/
        }

        // 判断逻辑二：根据latest节点进行判断
        if (latest) {
            // hasVSITE = latest.vsite ? true : false;
            hasWX = latest.wx ? true : false;
            // hasWB = latest.wb ? true : false;
        }

        // e.preventDefault();

        form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            } else {
                let previewUrl = '';

                // 发布url生成
                switch (resType) {
                    case 'content':
                        // 图文资讯发布地址
                        previewUrl = getContentShowUrl(data.uin, data.id, true);
                        break;
                    case 'h5':
                        // 艾乐卡预览地址
                        // 对普通模板而言没有data.resId，只有data.id
                        // 对活动H5而言有data.resId

                        // 艾乐卡预览地址
                        // 新增previewType=previewApp or previewTpl
                        let {previewType} = this.props;
                        //不传的默认值
                        if (!previewType) {
                            previewType = 'previewTpl';
                        }

                        // 对普通模板而言没有data.resId，只有data.id
                        // 对活动H5而言有data.resId
                        // let id = previewType == 'previewTpl' ? data.id : data.resId;
                        let id =  data.id;



                        previewUrl = getIlokaContentUrl(id, previewType);
                        break;

                }

                // 构建list
                let distributeChannel = [];

                switch (channel) {
                    case 'vsite':
                        // vsite:
                        // 1.没有禁用且已勾选

                        // debug
                        if (!hasVSITE2) {
                            distributeChannel.push({
                                idChannel: 'vsite',
                                picUrl: (data.vsite.imgUrl ? data.vsite.imgUrl : getMediaUrl(data.vsite.imgId)),
                                url: previewUrl
                            });
                        }

                        /* distributeChannel.push({
                         idChannel: 'vsite',
                         picUrl: (data.vsite.imgUrl ? data.vsite.imgUrl : getMediaUrl(data.vsite.imgId)),
                         url: previewUrl
                         });*/


                        break;
                    case 'wx':
                        //获取差集

                        //建模
                        const formData = {
                            wx: {
                                range: {
                                    startTime: this.state.datePickerValue[0],
                                    endTime: this.state.datePickerValue[1]
                                }
                            },
                        };

                        if (!values.wxList || values.wxList.length == 0) {
                            message.warn('请选择公众号！');
                            return null;
                        }

                        if (hasWX && latest.wx.timeStragety.stragety == 'immediately') {
                            for (let i = 0; i < latest.wx.uins.length; i++) {
                                let item = latest.wx.uins[i];
                                if (values.wxList.indexOf(item) != -1) {
                                    values.wxList.splice(values.wxList.indexOf(item), 1);
                                }
                            }
                        }


                        // wx:
                        // 1.必须要有wechat的授权列表
                        // 2.没有禁用且已勾选
                        // 3.允许有分发
                        if (list.wechat.length != 0) {

                            let articles = [];

                            content.map((item) => {
                                articles.push({
                                    description: item.wx.desc,
                                    imgId: item.wx.imgId,
                                    picUrl: item.wx.imgUrl ? item.wx.imgUrl : getMediaUrl(item.wx.imgId),
                                    title: item.wx.title,
                                    resId: item.id,
                                    resType: item.resType,
                                    url: resType == 'content' ?
                                        getContentShowUrl(item.uin, item.id, true) :
                                        getIlokaContentUrl(item.id ? item.id : item.tplId)
                                });
                            });

                            let wxData = {
                                idChannel: 'wx',
                                picUrl: (data.wx.imgUrl ? data.wx.imgUrl : getMediaUrl(data.wx.imgId)),
                                uins: values.wxList,
                                url: previewUrl,
                                timeStragety: {
                                    stragety: values.wxPushWay
                                },
                                //多图文
                                //来源：
                                articles: articles,
                            };

                            if (values.wxPushWay == 'interval') {

                                if (formData.wx.range.startTime == '' || formData.wx.range.endTime == '') {
                                    message.warn('推送时间不能为空！');
                                    return null;
                                }

                                if (formData.wx.range.startTime == formData.wx.range.endTime) {
                                    message.warn('请设定具体的推送时间范围！');
                                    return null;
                                }

                                wxData.timeStragety.endTime = formData.wx.range.endTime;
                                wxData.timeStragety.startTime = formData.wx.range.startTime;


                            }


                            distributeChannel.push(wxData);
                        }
                        break;
                    case 'wb':
                        //获取差集

                        /*if (hasWB) {
                         for (let i = 0; i < latest.wb.uins.length; i++) {
                         let item = latest.wb.uins[i];
                         if (values.wbList.indexOf(item) != -1) {
                         values.wbList.splice(values.wbList.indexOf(item), 1);
                         }
                         }
                         }*/


                        // wb:
                        // 1.必须要有weibo的授权列表
                        // 2.没有禁用且已勾选
                        // 3.允许有分发
                        if (list.weibo.length != 0) {
                            distributeChannel.push({
                                idChannel: 'wb',
                                picUrl: (data.wb.imgUrl ? data.wb.imgUrl : getMediaUrl(data.wb.imgId)),
                                uins: values.wbList,
                                url: previewUrl
                            });

                            if (values.wbList.length == 0) {
                                message.warn('请选择微博号！');
                                return null;
                            }
                        }
                        break;
                    case 'toutiao':
                        //待添加

                        // toutiao:
                        // 1.必须要有toutiao的授权列表
                        // 2.没有禁用且已勾选
                        // 3.允许有分发
                        if (list.toutiao.length != 0) {
                            distributeChannel.push({
                                idChannel: 'toutiao',
                                toutiaoArticleTag: this.state.toutiaoArticleTag.toString(),
                                //谨慎起见暂时设为0
                                //一天只能发布一篇！
                                toutiaoStatus: values.toutiaoStatus ? values.toutiaoStatus : '1',
                                uins: values.toutiaoList,
                            });

                            if (values.toutiaoList.length == 0) {
                                message.warn('请选择头条号！');
                                return null;
                            }
                        }
                        break;
                }

                if (distributeChannel.length == 0) {
                    message.warn('请勾选发布渠道');
                    return null;
                }

                let submitData = {
                    distributeChannel: distributeChannel,
                    resId: resId ? resId : data.id,
                    resType: resType
                };

                this.addDistribute(submitData);
            }
        });
    };

    // 构建选择列表
    getSelectList = (channelList, channel, latest, params, getFieldValue) => {

        let selectList = [];
        let expires_in,
            now_time = new Date().getTime();

        for (let i = 0; i < channelList.length; i++) {

            let item = channelList[i];

            let colData;

            switch (channel) {
                case 'wechat':
                    colData = (
                        <Tooltip title={(
                            <div>
                                <p><span className="content-release-common-text content-release-span2">
                                    {item.authorizerInfo.service_type_info.id < 2 ? '订阅号：' : '服务号：'}
                                    {item.authorizerInfo ? item.authorizerInfo.alias : '匿名'}
                                </span></p>

                                {item.authorizerInfo.verify_type_info.id == -1 && <p>
                                    <span className="content-release-common-text content-release-span2">
                                        注：未认证公众号无法群发消息
                                    </span>
                                </p>}
                            </div>
                        )} arrowPointAtCenter>
                            <div style={{'textAlign': 'center'}} key={item.id}>
                                <div style={{'width': '32px', 'height': '32px', 'margin': '0 auto'}}>
                                    <Img src={item.authorizerInfo ? item.authorizerInfo.head_img : ''} alt="暂无"
                                         style={{'width': '32px', 'borderRadius': '2px', 'border': '1px solid #666'}}/>
                                </div>
                                <div style={{'marginTop': '10px', 'width': '82px',}}>
                                    <p style={{
                                        'textOverflow': 'ellipsis',
                                        'overflow': 'hidden',
                                        'whiteSpace': 'nowrap'
                                    }}>{item.authorizerInfo ? item.authorizerInfo.nick_name : '匿名'}</p>
                                </div>
                            </div>
                        </Tooltip>

                    );

                    let {resType} = this.props;
                    let value = getFieldValue('wxPushWay') == undefined ?
                        (latest.wx ? latest.wx.timeStragety.stragety : (resType != 'h5' ? 'immediately' : 'interval')) : getFieldValue('wxPushWay');


                    // 显示所有列表
                    // 已发布的直推公众号勾选且禁用
                    if (!(item.authorizerInfo.verify_type_info.id == -1 && (value == 'immediately'))) {
                        selectList.push({
                            label: colData,
                            value: item.authorizer_appid,
                            disabled: getFieldValue('wxPushWay') == 'interval' ? false :
                                (latest.wx ? (latest.wx.timeStragety.stragety == 'immediately' ?
                                        (latest.wx.uins.indexOf(item.authorizer_appid) != -1) : false) : false)
                        });
                    }

                    break;
                case 'weibo':

                    expires_in = parseInt(item.accessToken.e);

                    colData = (
                        <Tooltip title={(
                            <div>
                                <p>
                                    <span className="content-release-common-text content-release-span2">
                                        微博号：{item.uid ? item.uid : '匿名'}
                                    </span>
                                </p>
                                {expires_in >= now_time && <p>
                                    <span className="content-release-common-text content-release-span2">
                                        授权有效，可以勾选
                                    </span>
                                </p>}
                                {expires_in < now_time && <p>
                                    <span className="content-release-common-text content-release-span2">
                                        授权到期，
                                        <a href="marketing.html#/channel" target="_blank">
                                        <span style={{'color': '#009dfc'}}>重新授权</span>
                                    </a>
                                    </span>
                                </p>}
                            </div>
                        )} arrowPointAtCenter>
                            <div style={{'textAlign': 'center'}} key={item.id}>
                                <div style={{'width': '32px', 'height': '32px', 'margin': '0 auto'}}>
                                    <Img src={item.authorizerInfo ? item.authorizerInfo.profile_image_url : ''} alt="暂无"
                                         style={{'width': '32px', 'borderRadius': '2px', 'border': '1px solid #666'}}/>
                                </div>
                                <div style={{'marginTop': '10px', 'width': '82px',}}>
                                    <p style={{
                                        'textOverflow': 'ellipsis',
                                        'overflow': 'hidden',
                                        'whiteSpace': 'nowrap'
                                    }}>{item.authorizerInfo ? item.authorizerInfo.name : '匿名'}</p>
                                </div>
                            </div>
                        </Tooltip>

                    );

                    //显示所有列表
                    // 已发布的微博公众号勾选且禁用
                    selectList.push({
                        label: colData,
                        value: item.uid,
                        // disabled: latest.wb ? latest.wb.uins.indexOf(item.uid) != -1 : (params.hasWB || params.disableWB)
                        disabled: expires_in < now_time
                    });
                    /*if (expires_in >= now_time) {
                     selectList.push({
                     label: colData,
                     value: item.uid,
                     disabled: latest.wb ? latest.wb.uins.indexOf(item.uid) != -1 : (params.hasWB || params.disableWB)
                     });
                     }*/
                    break;
                case 'toutiao':

                    expires_in = parseInt(item.accessToken.e);

                    colData = (
                        <Tooltip title={(
                            <div>
                                <p>
                                    <span className="content-release-common-text content-release-span2">
                                        头条号：{item.uid ? item.uid : '匿名'}
                                    </span>
                                </p>
                                {expires_in >= now_time && <p>
                                    <span className="content-release-common-text content-release-span2">
                                        授权有效，可以勾选
                                    </span>
                                </p>}
                                {expires_in < now_time && <p>
                                    <span className="content-release-common-text content-release-span2">
                                        授权到期，
                                        <a href="marketing.html#/channel" target="_blank">
                                        <span style={{'color': '#009dfc'}}>重新授权</span>
                                    </a>
                                    </span>
                                </p>}
                            </div>
                        )} arrowPointAtCenter>
                            <div style={{'textAlign': 'center'}} key={item.id}>
                                <div style={{'width': '32px', 'height': '32px', 'margin': '0 auto'}}>
                                    <Img src={item.authorizerInfo ? item.authorizerInfo.avatar_url : ''} alt="暂无"
                                         style={{'width': '32px', 'borderRadius': '2px', 'border': '1px solid #666'}}/>
                                </div>
                                <div style={{'marginTop': '10px', 'width': '82px',}}>
                                    <p style={{
                                        'textOverflow': 'ellipsis',
                                        'overflow': 'hidden',
                                        'whiteSpace': 'nowrap'
                                    }}>{item.authorizerInfo ? item.authorizerInfo.screen_name : '匿名'}</p>
                                </div>
                            </div>
                        </Tooltip>

                    );

                    //显示所有列表
                    // 已发布的头条号勾选且禁用
                    selectList.push({
                        label: colData,
                        value: item.uid,
                        // disabled: latest.wb ? latest.wb.uins.indexOf(item.uid) != -1 : (params.hasWB || params.disableWB)
                        disabled: expires_in < now_time
                    });
                    /*if (expires_in >= now_time) {
                     selectList.push({
                     label: colData,
                     value: item.uid,
                     disabled: latest.wb ? latest.wb.uins.indexOf(item.uid) != -1 : (params.hasWB || params.disableWB)
                     });
                     }*/
                    break;
            }

        }

        return selectList;
    };

    disabledDate = (value) => {

        let dd = new Date();
        let y = dd.getFullYear();
        let m = dd.getMonth();//获取当前月份的日期
        let d = dd.getDate();

        let ss = new Date(new Date(y, m, d).getTime());
        return value && value.valueOf() < ss.getTime();
    };

    onTabChange = (key) => {
        this.setState({
            channel: key
        });
    };

    //
    saveContentInfo = (data) => {

        if (data.length == 0) {
            message.error('请勾选资讯图文或活动');
            return null;
        }

        let content = this.state.content;

        if (content.length < 7) {
            let newContent = content.concat(data);

            this.setState({
                content: newContent
            });


        } else {
            message.error('最多允许附加7条图文');
        }

        this.wxHide();

        // this.state.content = this.state.content.push(data);
    };

    deleteArticle = (i) => {

        let content = this.state.content;
        content.splice(i, 1);

        this.setState({
            content: content
        });
    };

    showHover = (event) => {
        Dom(event.currentTarget).addClass('content-release-hover');
    };

    hideHover = (event) => {
        Dom(event.currentTarget).removeClass('content-release-hover');
    };

    //demo
    shouldCancelStart = (event) => {

        return event.target.localName == 'i';

    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            content: arrayMove(this.state.content, oldIndex, newIndex)
        });
    };

    // 使用产品功能
    useModule = (type, success, failure) => {
        this.anyWhereModule(type).then(success, failure);
    };

    datePickerChange = (datas) => {
        this.setState({
            datePickerValue: [datas[0], datas[1]]
        });
    }

    handelSelect = (checkedKeys, objectCheckedKeys) => {
        this.setState({
            toutiaoArticleTag: checkedKeys,
            objectCheckedKeys: objectCheckedKeys,
        });
    };

    render = () => {

        const {getFieldDecorator, getFieldValue} = this.props.form;

        //微信公众号列表和微博号列表都需要从props获取
        let {resType, resId, data, reset, visible, channel, auth} = this.props;

        let {list, wxShow, latest, content, datePickerValue} = this.state;

        if (!list || !latest) {
            return null;
        }

        if (!data) {
            return null;
        }

        // 各发布渠道的初次设定
        /*let disableVSite = (data.vsite ? (
         (!data.vsite.imgId || data.vsite.imgId == '') ||
         (!data.vsite.title || data.vsite.title == '') ||
         (!data.vsite.author || data.vsite.author == '') ||
         (!data.vsite.desc || data.vsite.desc == '')) : true);

         let disableWX = (data.wx ? (
         (!data.wx.imgId || data.wx.imgId == '') ||
         (!data.wx.title || data.wx.title == '') ||
         (!data.wx.author || data.wx.author == '') ||
         (!data.wx.desc || data.wx.desc == '')) : true);

         let disableWB = (data.wb ? (
         (!data.wb.imgId || data.wb.imgId == '') ||
         (!data.wb.desc || data.wb.desc == '')
         ) : true);*/

        let disableVSite = false,
            disableWX = false,
            disableWB = false,
            disableTouTiao = false;

        // 此处定义是否已经分发
        // let hasVSITE = false,
        let hasWX = false,
            hasWB = false,
            hasTouTiao = false;

        let hasVSITE2 = false;

        if (data.distributeChannels) {
            hasVSITE2 = data.distributeChannels.indexOf('vsite') != -1;
        }

        /*if (data.distributeChannels) {
         hasVSITE = data.distributeChannels.indexOf('vsite') != -1;
         hasWX = data.distributeChannels.indexOf('wx') != -1;
         hasWB = data.distributeChannels.indexOf('wb') != -1;
         }*/

        // 判断逻辑二：根据latest节点进行判断
        if (latest) {
            // hasVSITE = latest.vsite ? true : false;
            hasWX = latest.wx ? true : false;
            hasWB = latest.wb ? true : false;
        }

        // 此处获取授权列表
        let wechatList = [];
        let weiboList = [];
        let toutiaoList = [];

        // console.log(getFieldValue('wxPushWay'));

        if (list.wechat && list.wechat.length != 0) {
            wechatList = this.getSelectList(list.wechat, 'wechat', latest, {
                disableWX,
                hasWX
            }, getFieldValue);
        }

        if (list.weibo && list.weibo.length != 0) {
            weiboList = this.getSelectList(list.weibo, 'weibo', latest, {
                disableWB,
                hasWB
            }, getFieldValue);
        }

        let toutiaoTagList = [];
        let toutiaoChildren = [];

        if (list.toutiao && list.toutiao.length != 0) {
            toutiaoList = this.getSelectList(list.toutiao, 'toutiao', latest, {
                disableTouTiao,
                hasTouTiao
            }, getFieldValue);

            TOUTIAO_LIST.map((item) => {
                toutiaoChildren.push(
                    {
                        title: item.text,
                        key: item.value
                    }
                    // <Radio value={item.value} key={item.Article_tag}>{item.text}</Radio>
                );
            });

            toutiaoTagList = [
                {
                    title: '分类',
                    visible: false,
                    key: 'title',
                    type: 'radio',
                    children: toutiaoChildren
                }
            ];
        }

        const radioStyle = {
            display: 'block',
            height: '32px',
            lineHeight: '32px',
        };

        const contentRelease = classNames({
            'content-release-checkbox': true,
            'content-release-height': true
        });

        let title = null,
            width = null,
            footer = null,
            maskClosable = false;

        let operations = {
            vsite: '微站',
            wx: '微信',
            wb: '微博',
            toutiao: '头条'
        };

        let previewClassNames = {
            vsite: classNames({
                'content-release-common-bg': true,
                'content-release-preview-vsite': true
            }),
            wx: classNames({
                'content-release-common-bg': true,
                'content-release-preview-wx': true
            }),
            wb: classNames({
                'content-release-common-bg': true,
                'content-release-preview-wb': true
            }),
            multiple: classNames({
                'content-release-common-bg': true,
                'content-preview-multiple': true
            }),
            toutiao: classNames({
                'content-preview-common-bg': true,
                'content-preview-toutiao': true
            }),
        };

        // 可能已被废弃
        // 定义默认页：没有数据的时候
        let defaultPage = (
            <div className="content-release-default">
                <p><i className="iconfont icon-ku" style={{'fontSize': '200px'}}></i></p>
                <p>
                    很抱歉！{operations[channel]}发布的封面、
                    {operations[channel] != '微博' && '标题、'}
                    摘要未编辑！请编辑完成后再发布！
                    <span onClick={reset}>去编辑</span>
                </p>
            </div>
        );

        // 可能已被废弃
        let noListPage = (
            <div className="content-release-default">
                <p><i className="iconfont icon-ku" style={{'fontSize': '200px'}}></i></p>
                <p>
                    很抱歉！您还没有绑定{operations[channel]}
                    {operations[channel] == '微信' && '公众'}号！
                    <a href="marketing.html#/channel" target="_blank">
                        <span>去绑定</span>
                    </a>
                </p>
            </div>
        );

        // 定义微站有数据页
        let vsitePage = () => (disableVSite ? defaultPage : (
                    <div style={{'width': '1440px', 'margin': '0 auto', 'position': 'relative', 'top': '50px'}}>
                        <div style={{'position': 'absolute', 'top': '180px', 'left': '341px'}}>
                            <Img src="./img/article.png" alt=""/>
                        </div>
                        <div style={{'position': 'absolute', 'top': '318px', 'left': '680px', 'textAlign': 'center'}}>
                            <p><i className="iconfont icon-fabudao" style={{
                                'fontSize': '22px',
                                'color': '#009dfc',
                                'textAlign': 'center',
                                'marginBottom': '15px'
                            }}></i></p>
                            <p className="content-release-vsite">
                                {hasVSITE2 && '已'}发布到微站
                            </p>
                        </div>
                        <div style={{'position': 'absolute', 'top': '67px', 'left': '835px'}}>
                            <div className="content-release-mobile">
                                {/*微站的数据页*/}
                                <div className={previewClassNames[channel]}>
                                    <div className="content-preview-vsite-normal"
                                         style={{'cursor': 'normal !important'}}>
                                        <div className="content-preview-vsite-normal-left">
                                            {
                                                !data.vsite.imgId && <Img src='./img/default.png' alt=""/>
                                            }
                                            {
                                                data.vsite.imgId && <Img src={getMediaUrl(data.vsite.imgId)} alt=""/>
                                            }
                                        </div>
                                        <div className="content-preview-vsite-normal-right">
                                            <div className="content-preview-vsite-normal-title">
                                                <span>{data.vsite.title ? data.vsite.title : '标题未设置'}</span>
                                            </div>
                                            <div className="content-preview-vsite-normal-desc">
                                                <span>{data.vsite.desc ? data.vsite.desc : '摘要未设置'}</span>
                                            </div>
                                            <div className="content-preview-vsite-normal-other">
                            <span>
                                {data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'yyyy-MM-dd') : '日期未设置'}
                            </span>
                                                <span style={{'float': 'right'}}>
                                <i className="iconfont icon-yulan" style={{'fontSize': '12px', 'marginRight': '5px'}}/>
                                                    {data.opdata && data.opdata.pv ? data.opdata.pv : 0}
                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div style={{'position': 'absolute', 'top': '660px', 'left': '630px'}}>
                            <AuthModule type={module.CONTENT_RICHTEXT_PUBLISH}>
                                <Button type="primary" className="content-button-release" disabled={hasVSITE2}
                                        onClick={(e) => this.useModule(module.CONTENT_RICHTEXT_PUBLISH, this.beforeSubmit(e))}>
                                    {hasVSITE2 ? '已发布' : '立即发布'}
                                </Button>
                            </AuthModule>
                            {/*debug*/}
                            {/*<AuthModule type={module.CONTENT_RICHTEXT_PUBLISH}>
                             <Button type="primary" className="content-button-release"
                             onClick={(e) => this.useModule(module.CONTENT_RICHTEXT_PUBLISH, this.beforeSubmit(e))}>
                             立即发布
                             </Button>
                             </AuthModule>*/}
                            <Button type="ghost" className="content-button-return"
                                    onClick={reset}>
                                返回
                            </Button>
                        </div>
                    </div>
                )
        );

        // 构造微信多图文项
        let wxPreviewList = [];

        //
        let dataSource = content;

        for (let i = 0; i < dataSource.length; i++) {

            let data = dataSource[i];

            wxPreviewList.push(
                <div key={i}
                     className="content-preview-wx-multiple"
                     style={{
                         'borderBottom': i == dataSource.length - 1 ? '1px solid #dbdbdb' : 'none',
                         'borderRadius': i == dataSource.length - 1 ? '0 0 4px 4px' : 0,
                     }}>
                    <Row gutter={8}>
                        <Col span={20}>
                            <div className='content-release-other'>
                                <span>{data.wx.title ? data.wx.title : '标题未编辑'}</span>
                            </div>
                        </Col>
                        <Col span={4}>
                            {data.wx.imgId &&
                            <Img src={getMediaUrl(data.wx.imgId)} alt="" style={{'width': '28px', 'height': '28px'}}/>}
                            {!data.wx.imgId &&
                            <Img src='./img/default.png' alt="" style={{'width': '28px', 'height': '28px'}}/>}

                        </Col>
                    </Row>
                </div>
            );
        }

        // 定义微信有数据页
        let wxPage = () => (disableWX ? defaultPage : (list.wechat && list.wechat.length != 0 ? (
                        <div style={{'width': '1440px', 'margin': '0 auto', 'position': 'relative', 'top': '50px'}}>
                            <div style={{'position': 'absolute', 'top': '30px', 'left': '148px'}}>
                                <div className="content-release-mobile">
                                    {/*微信的数据页*/}
                                    {content.length == 0 && <div className={previewClassNames[channel]}>
                                        <div className="content-preview-wx-normal content-no-hover">
                                            <div className="content-preview-wx-normal-title">
                                                <span>{data.wx.title ? data.wx.title : '标题未设置'}</span>
                                            </div>
                                            <div className="content-preview-wx-normal-date">
                                                <span>{data.lastModifiedDate ? dateFormat(new Date(parseInt(data.lastModifiedDate)), 'MM月dd日') : '日期未设置'}</span>
                                            </div>
                                            <div className="content-preview-wx-normal-img">
                                                {
                                                    !data.wx.imgId && <Img src='./img/default.png' alt=""/>
                                                }
                                                {
                                                    data.wx.imgId && <Img src={getMediaUrl(data.wx.imgId)} alt=""/>
                                                }
                                            </div>
                                            <div className="content-preview-wx-normal-desc">
                                                <span>{data.wx.desc ? data.wx.desc : '摘要未设置'}</span>
                                            </div>
                                        </div>
                                    </div>}
                                    {content.length != 0 && <div className={previewClassNames['multiple']}>
                                        <div className="content-preview-multiple-normal">
                                            <div style={{
                                                'width': '100%',
                                                'height': '126px',
                                                'background': 'url(' + getMediaUrl(data.wx.imgId) + ')',
                                                'backgroundSize': '100% 100%',
                                                'position': 'relative'
                                            }}>
                                                <div className="content-release-example" style={{
                                                    'height': '24px',
                                                    'lineHeight': '24px'
                                                }}>
                                                    <p><span>{data.wx.title}</span></p>
                                                </div>
                                            </div>
                                            {wxPreviewList}
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <div style={{'position': 'absolute', 'top': '30px', 'left': '554px', 'width': '800px'}}>
                                <p>
                        <span className="content-release-label">
                            {resType == 'content' && '添加资讯图文'}
                            {resType == 'h5' && '添加活动H5'}
                        </span>
                                </p>
                                <div style={{'marginTop': '12px'}}>
                                    <div className="content-release-multiple" style={{
                                        'background': 'url(' + getMediaUrl(data.wx.imgId) + ')',
                                        'backgroundSize': '100% 100%',
                                        'position': 'relative'
                                    }}>
                                        <div className="content-release-example">
                                            <p><span>{data.wx.title}</span></p>
                                        </div>
                                    </div>

                                    <SortableList
                                        onMouseOver={this.showHover}
                                        onMouseOut={this.hideHover}
                                        deleteArticle={this.deleteArticle}
                                        axis="xy"
                                        wxShow={this.wxShow}
                                        pressDelay={0}
                                        helperClass="content-release-move"
                                        items={this.state.content}
                                        shouldCancelStart={this.shouldCancelStart}
                                        onSortEnd={this.onSortEnd}/>
                                </div>
                            </div>
                            <div style={{'position': 'absolute', 'top': '277px', 'left': '554px', 'width': '800px'}}>
                                <div className={contentRelease}>
                                    <Form layout="horizontal">
                                        <p><span className="content-release-label">选择推送方式</span></p>
                                        <FormItem>
                                            <div className="content-release-radio">

                                                {
                                                    getFieldDecorator('wxPushWay', {
                                                        initialValue: latest.wx ? latest.wx.timeStragety.stragety : (resType != 'h5' ? 'immediately' : 'interval'),
                                                        exclusive: true
                                                    })(
                                                        <RadioGroup disabled={disableWX}>
                                                            {resType != 'h5' &&
                                                            <Radio style={radioStyle} value="immediately">
                                                    <span className="content-release-common-text content-release-span3"
                                                          style={{'marginRight': '5px'}}>群发</span>
                                                                <LKTooltip type="content-release-immediately"
                                                                           placement="top"></LKTooltip>
                                                            </Radio>}
                                                            {this.checkModule(module.CONTENT_RICHTEXT_REPLY).visible &&
                                                            <Radio style={radioStyle} value="interval">
                                                        <span style={{'marginRight': '5px'}}
                                                              className="content-release-common-text content-release-span3">
                                                            自动回复
                                                        </span>
                                                                <LKTooltip type="content-release-interval"
                                                                           placement="top"></LKTooltip>
                                                                <div style={{'marginLeft': '24px', 'height': '0'}}>
                                                                    <DatePickerGroup
                                                                        showTime
                                                                        disabledDate={this.disabledDate}
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        value={datePickerValue[0] || datePickerValue[1] ? [datePickerValue[0], datePickerValue[1]] : [null, null]}
                                                                        onChange={this.datePickerChange}
                                                                        disabled={disableWX || getFieldValue('wxPushWay') != 'interval'}/>
                                                                </div>
                                                            </Radio>}
                                                        </RadioGroup>
                                                    )
                                                }
                                            </div>
                                        </FormItem>
                                        <p><span className="content-release-label">选择公众号</span></p>
                                        <FormItem>
                                            {/*添加仅有一个微信号时自动勾选的逻辑*/}
                                            <div className="content-release-checkbox-list">
                                                {
                                                    wechatList.length != 0 &&
                                                    getFieldDecorator('wxList', {
                                                        initialValue: latest.wx ? latest.wx.uins :
                                                            (wechatList.length == 1 ? [wechatList[0].value] : [])
                                                    })(
                                                        <CheckboxGroup options={wechatList}
                                                                       disabled={disableWX}/>
                                                    )
                                                }
                                                {
                                                    wechatList.length == 0 && <div>
                                                        暂无符合要求的公众号供选择
                                                    </div>
                                                }
                                            </div>
                                        </FormItem>
                                    </Form>
                                    {resType != 'h5' && <ContentWxMessageShow
                                        content={content}
                                        resId={resId ? resId : data.id}
                                        wxList={data.wxList?data.wxList:(latest.wx ? latest.wx.uins :
                                                (wechatList.length == 1 ? [wechatList[0].value] : []))}
                                        sendWxDistributeMessage={this.sendWxDistributeMessage}/>}
                                </div>
                            </div>
                            <div style={{'position': 'absolute', 'top': '652px', 'left': '554px'}}>
                                <AuthModule type={module.CONTENT_RICHTEXT_PUBLISH}>
                                    <Button type="primary" className="content-button-release"
                                            onClick={(e) => this.useModule(module.CONTENT_RICHTEXT_PUBLISH, this.beforeSubmit(e))}>
                                        立即发布
                                    </Button>
                                </AuthModule>
                                <Button type="ghost" className="content-button-return"
                                        onClick={reset}>
                                    返回
                                </Button>
                            </div>
                        </div>
                    ) : noListPage)
        );

        // 定义微博有数据页
        let wbPage = () => (disableWB ? defaultPage : (list.weibo && list.weibo.length != 0 ? (
                        <div style={{'width': '1440px', 'margin': '0 auto', 'position': 'relative', 'top': '50px'}}>
                            <div style={{'position': 'absolute', 'top': '71px', 'left': '148px'}}>
                                <div className="content-release-mobile">
                                    {/*微博的数据页*/}
                                    <div className={previewClassNames[channel]}>
                                        <div className="content-preview-wb-normal">
                                            <div style={{'lineHeight': '24px'}}>
                                                <div className="content-preview-wb-normal-headImg">
                                                    <Icon type="user"/>&nbsp;微博号名称
                                                </div>
                                            </div>
                                            <div className="content-preview-wb-normal-desc">
                                                <p>
                                                    <span>{data.wb.desc ? data.wb.desc : '摘要未设置'}</span>
                                                    <span style={{'color': '#eb7350'}}><span>#网页链接</span></span>
                                                </p>
                                            </div>
                                            <div className="content-preview-wb-normal-img">
                                                {
                                                    !data.wb.imgId && <Img src='./img/default.png' alt=""/>
                                                }
                                                {
                                                    data.wb.imgId && <Img src={getMediaUrl(data.wb.imgId)} alt=""/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{'position': 'absolute', 'top': '93px', 'left': '554px'}}>
                                <p><span className="content-release-label">选择微博号</span></p>
                                <div className={contentRelease}>
                                    <Form layout="horizontal">
                                        <FormItem>
                                            <div className="content-release-checkbox-list">
                                                {
                                                    getFieldDecorator('wbList', {
                                                        initialValue: latest.wb ? latest.wb.uins : (
                                                            weiboList.length == 1 && !weiboList[0].disabled ? [
                                                                weiboList[0].value
                                                            ] : [])
                                                    })(
                                                        <CheckboxGroup options={weiboList}
                                                                       disabled={disableWB}/>
                                                    )
                                                }
                                            </div>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                            <div style={{'position': 'absolute', 'top': '220px', 'left': '554px'}}>
                                <AuthModule type={module.CONTENT_RICHTEXT_PUBLISH}>
                                    <Button type="primary" className="content-button-release"
                                            onClick={(e) => this.useModule(module.CONTENT_RICHTEXT_PUBLISH, this.beforeSubmit(e))}>
                                        立即发布
                                    </Button>
                                </AuthModule>
                                <Button type="ghost" className="content-button-return"
                                        onClick={reset}>
                                    返回
                                </Button>
                            </div>
                        </div>
                    ) : noListPage)
        );

        // 定义头条有数据页
        let toutiaoPage = () => (disableTouTiao ? defaultPage : (list.toutiao && list.toutiao.length != 0 ? (
                        <div style={{'width': '1440px', 'margin': '0 auto', 'position': 'relative', 'top': '50px'}}>
                            <div style={{'position': 'absolute', 'top': '50px', 'left': '383px', 'width': '850px'}}>
                                <Form layout="horizontal">
                                    <p><span className="content-release-label">选择今日头条号</span></p>
                                    <div className={contentRelease}>
                                        <FormItem>
                                            <div className="content-release-checkbox-list">
                                                {
                                                    getFieldDecorator('toutiaoList', {
                                                        initialValue: latest.toutiao ? latest.toutiao.uins :
                                                            (toutiaoList.length == 1 && !toutiaoList[0].disabled ? [
                                                                toutiaoList[0].value
                                                            ] : [])
                                                    })(
                                                        <CheckboxGroup options={toutiaoList}
                                                            disabled={disableTouTiao}/>
                                                    )
                                                }
                                            </div>
                                        </FormItem>
                                    </div>
                                    <p><span className="content-release-label">选择分类</span></p>
                                    <br/>
                                    <div>
                                        {/*<RadioGroup>
                                         {toutiaoChildren}
                                         </RadioGroup>*/}
                                        <FormItem>
                                            <NavTag data={toutiaoTagList}
                                                    defaultSelectedKeys={this.state.toutiaoArticleTag}
                                                    onSelect={this.handelSelect}/>
                                        </FormItem>
                                    </div>
                                    {auth.roles.indexOf('PLATFORM') != -1 && <div>
                                        <p><span className="content-release-label">选择发布类型</span></p>
                                        <div>
                                            <FormItem>
                                                {
                                                    getFieldDecorator('toutiaoStatus', {
                                                        initialValue: latest.toutiao ? (latest.toutiao.toutiaoStatus ? latest.toutiao.toutiaoStatus : '0') : '0'
                                                    })(
                                                        <RadioGroup>
                                                            <Radio value='0'>发布到草稿箱</Radio>
                                                            <Radio value='1'>直接发布</Radio>
                                                        </RadioGroup>
                                                    )
                                                }
                                            </FormItem>
                                        </div>
                                    </div>}
                                </Form>

                                <div>
                                    <AuthModule type={module.CONTENT_RICHTEXT_PUBLISH}>
                                        <Button type="primary" className="content-button-release"
                                                onClick={(e) => this.useModule(module.CONTENT_RICHTEXT_PUBLISH, this.beforeSubmit(e))}>
                                            立即发布
                                        </Button>
                                    </AuthModule>
                                    <Button type="ghost" className="content-button-return"
                                            onClick={reset}>
                                        返回
                                    </Button>
                                </div>
                            </div>
                            {/*<div style={{'position': 'absolute', 'top': '580px', 'left': '554px'}}>
                             <AuthModule type={module.CONTENT_RICHTEXT_PUBLISH}>
                             <Button type="primary" className="content-button-release"
                             onClick={(e) => this.useModule(module.CONTENT_RICHTEXT_PUBLISH, this.beforeSubmit(e))}>
                             立即发布
                             </Button>
                             </AuthModule>
                             <Button type="ghost" className="content-button-return"
                             onClick={reset}>
                             返回
                             </Button>
                             </div>*/}
                        </div>
                    ) : noListPage)
        );

        let contentNew = (
            <div style={{'height': this.state.windowHeight + 'px'}}>
                <div className="content-release-return"
                     onClick={reset}>
                    <p>
                        <i className="iconfont icon-fanhui1"/>
                        <span style={{'marginLeft': '12px'}}>返回</span>
                    </p>
                </div>
                {/*<Tabs onChange={this.onTabChange}
                 animated={false}
                 className="content-release-navbar">
                 <TabPane tab="微站" key="vsite">
                 {
                 channel == 'vsite' && vsitePage
                 }
                 </TabPane>
                 <TabPane tab="微信" key="wx">
                 {
                 channel == 'wx' && wxPage
                 }
                 </TabPane>
                 <TabPane tab="微博" key="wb">
                 {
                 channel == 'wb' && wbPage
                 }
                 </TabPane>
                 </Tabs>*/}


                <div className="content-release-navbar" style={{'height': '50px'}}>
                    {
                        channel == 'vsite' && vsitePage()
                    }
                    {
                        channel == 'wx' && wxPage()
                    }
                    {
                        channel == 'wb' && wbPage()
                    }
                    {
                        channel == 'toutiao' && toutiaoPage()
                    }
                </div>
            </div>
        );

        return (
            <div>
                <Modal title={title}
                       className="content-release-container"
                       visible={visible}
                       width={width}
                       footer={footer}
                       maskClosable={maskClosable}
                       onCancel={reset}>
                    {contentNew}
                </Modal>
                {wxShow && <ContentSelectMoreShow visible={wxShow}
                                                  id={data.id}
                                                  resType={resType}
                                                  content={content}
                                                  status={this.state.status}
                                                  getContentList={this.getContentList}
                                                  getAppDataList={this.getAppDataList}
                                                  distribute={this.props.distribute}
                                                  saveContentInfo={this.saveContentInfo}
                                                  reset={this.wxHide}
                />}
            </div>
        );
    };
}

export default Form.create({

    /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key => {

            props.data[key] = fields[key].value;

        });

    }
})(ContentReleaseShow);

// 小模态框
class ContentWxMessageShow extends Component {

    constructor(props) {
        super(props);
    }

    //提交数据
    handleSubmit = (e) => {

        let {resId, form, sendWxDistributeMessage, wxList, content} = this.props;

        e.preventDefault();

        form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            } else {

                /*if(wxList == undefined){
                 wxList = [];
                 }*/

                console.log(wxList);

                if (!wxList || wxList.length == 0) {
                    message.error('请选择试推送用的微信公众号');
                    return null;
                }

                let articles = [];

                content.map((item) => {
                    articles.push({
                        description: item.wx.desc,
                        imgId: item.wx.imgId,
                        picUrl: item.wx.imgUrl ? item.wx.imgUrl : getMediaUrl(item.wx.imgId),
                        title: item.wx.title,
                        resId: item.id,
                        resType: item.resType,
                        url: getContentShowUrl(item.uin, item.id, true)
                    });
                });

                //建模
                const formData = {
                    //默认选第一个
                    wxUin: wxList.length != 0 ? wxList[0] : 'wxb9466d22ba757a54',
                    resId: resId,
                    wxName: values.wxName,
                    resArticles: articles
                };

                sendWxDistributeMessage(formData);
            }

        });
    };

    render = () => {

        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <p><span className="content-release-label" style={{'marginRight': '5px'}}>试推送</span>
                    <LKTooltip type="content-release-send" placement="top"></LKTooltip>
                </p>
                <Form inline>
                    <FormItem>
                        {getFieldDecorator('wxName', {
                            rules: [{required: true, message: '请输入微信号!'}],
                        })(
                            <Input style={{'width': '240px'}}/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="ghost" onClick={this.handleSubmit} className="content-button-send">点击推送</Button>
                    </FormItem>
                </Form>
            </div>

        );
    }
}

ContentWxMessageShow = Form.create({})(ContentWxMessageShow);

// 选择资讯图文或活动H5
class ContentSelectMoreShow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            content: [],
            idList: []
        };
    }

    onSelect = (data) => {

        let disableWX = (data.wx ? (
            (!data.wx.imgId || data.wx.imgId == '') ||
            (!data.wx.title || data.wx.title == '') ||
            (!data.wx.author || data.wx.author == '') ||
            (!data.wx.desc || data.wx.desc == '')) : true);

        if (disableWX) {
            message.error('不可勾选信息不完整的图文或活动！');
            return null;
        }

        let {id} = this.props;

        if (id == data.id) {
            message.error('不可勾选待发布的资讯图文或活动本身！');
            return null;
        }


        let {content, idList} = this.state;

        let oldContent = this.props.content;

        if (idList.indexOf(data.id) != -1) {
            content.splice(content.indexOf(data), 1);
            idList.splice(idList.indexOf(data.id), 1);

        } else {
            content.push(data);
            idList.push(data.id);
        }

        if (content.length + oldContent.length < 8) {

            this.setState({
                content: content
            });
        } else {
            if (idList.indexOf(data.id) != -1) {
                content.splice(content.indexOf(data), 1);
                idList.splice(idList.indexOf(data.id), 1);
            }
            message.error('最多允许附加7条图文或活动');
        }
    };

    handleScroll = () => {

        this.setState({
            page: this.state.page + 1,
        }, () => {

            switch (this.props.resType) {
                case 'content':
                    this.props.getContentList({
                        page: this.state.page,
                        size: 10,
                        resType: 'content',
                        idChannel: 'wx'
                    });
                    break;
                case 'h5':
                    this.props.getAppDataList({
                        page: this.state.page,
                        size: 10,
                        categorytype: 'my',
                        resType: 'content',
                        idChannel: 'wx'
                    });
                    break;
            }

        });
    };

    render = () => {

        let {visible, reset, distribute, saveContentInfo, status, resType} = this.props;

        let {content, idList} = this.state;

        let {contentList, contentMineList} = distribute;

        let contents = transformArray(contentMineList);

        let contentsList = [];

        contents.map((data, index1) => {
            contentsList.push(
                <div key={index1}>
                    <p style={{'lineHeight': ' 16px', 'marginBottom': '16px'}}><span
                        className="content-select-label">{data.time}</span></p>
                    {
                        data.response.map((item, index2) => (
                            <div key={index2} className="content-release-select"
                                 onClick={() => this.onSelect(item)}>
                                {idList.indexOf(item.id) != -1 && <div
                                    style={{
                                        'width': '160px',
                                        'height': '210px',
                                        'position': 'absolute',
                                        'background': 'rgba(0,0,0,0.5)',
                                        'zIndex': '1'
                                    }}>
                                    <div className="content-icon-background">
                                        <i className="iconfont icon-xuanzhong content-icon-select"/>
                                    </div>
                                </div>}
                                <div style={{
                                    'width': '100%',
                                    'height': '160px',
                                    'position': 'relative'
                                }}>
                                    {item.wx.imgId && <Img src={getMediaUrl(item.wx.imgId)} alt="" style={{
                                        'width': '100%',
                                        'height': '160px',
                                    }}/>}
                                    {!item.wx.imgId && <Img src='./img/default.png' alt="" style={{
                                        'width': '100%',
                                        'height': '160px',
                                    }}/>}
                                </div>
                                <div style={{'padding': '6px'}}>
                                    <p style={{
                                        'fontSize': '13px',
                                        'color': '#39404a',
                                        'lineHeight': '18px',
                                        'textOverflow': 'ellipsis',
                                        'overflow': 'hidden',
                                        'height': '18px'
                                    }}>{item.wx.title ? item.wx.title : '标题未编辑'}</p>
                                    <p style={{'fontSize': '12px', 'color': '#999999', 'lineHeight': '18px'}}>
                                        创建于{item.dateArray.createdDate}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>
            );
        });

        let footer = (
            <div>
                <Button className="content-button-cancel" onClick={reset}>取消</Button>
                <Button className="content-button-confirm" type="primary"
                        onClick={() => saveContentInfo(content)}>确定</Button>
            </div>
        );

        // 提供用户获取资讯列表数据服务
        //resType:content
        //status:edit
        //idChannel:wx

        let title = '';

        switch (resType) {
            case 'content':
                title = '选择资讯图文';
                break;
            case 'h5':
                title = '选择活动H5';
                break;
        }

        return (
            <div>
                <Modal
                    title={title}
                    className="content-select-more"
                    width={810}
                    footer={footer}
                    onCancel={reset}
                    visible={visible}>
                    <div style={{'position': 'relative', 'height': '500px'}}>
                        {contentList.totalElements != 0 && <PullLoad
                            id="pullload2"
                            first={false}
                            status={status}
                            last={contentList.last}
                            onLoadMore={this.handleScroll}>
                            {contentsList}
                        </PullLoad>}
                        {
                            contentList.totalElements == 0 &&
                            <div style={{'lineHeight': 25, 'textAlign': 'center', 'color': '#999999', 'fontSize': 18}}>
                                暂无数据
                            </div>
                        }
                    </div>
                </Modal>
            </div>

        );
    }
}


