import React from 'react';
import {Modal, message} from 'antd';
import _ from 'lodash';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as module from 'common/config/module';
import * as contentAction from '../../store/content/action';
import * as contentHotAction from '../../store/contentHot/action';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import PacketResult from './component/PacketResult';
import PluginResult from './component/PluginResult';
import ContentReleaseForm from 'common/component/ContentReleaseForm';
import ContentReleaseShow from 'common/component/ContentReleaseShow';
import ContentPreviewShow from 'common/component/ContentPreviewShow';
import ContentLoading from 'common/component/ContentLoading';
import PacketShow from 'common/component/PacketShow';
import ShoppingGuide from 'common/component/ShoppingGuide';
import ActivityShow from 'common/component/ActivityShow';
import {PublishSelectShow} from 'common/component/PublishSelectShow';
import {urlSerialization, parseParam, dateFormat, redirect} from 'common/util';
import {Panel as ColorPickerPanel} from 'rc-color-picker';
import {color2color} from 'common/util/color2color';
import {replaceColor} from 'common/util/bulkManager';
import './index.less';
const confirm = Modal.confirm;

import XUeditor from 'common/component/XUeditor';

const MENU_MODULE_KEYS = {
    'activity': module.CONTENT_MARKETING_ACTIVITY,
    'shopping': module.CONTENT_MARKETING_SALE,
};

@connect(
    state => ({
        operation: state.operation,
        content: state.content.toJS(),
        contentHot: state.contentHot.toJS(),
        auth: state.auth.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentAction,
            ...contentHotAction,
        }, dispatch)
    })
)
@withRouter
export default class extends PageBase {
    // 页面载入初始化、Loading
    // 数据重置(OK)
    // 自动保存的判断机制
    // 离开提示
    // 素材|版式|热门资讯 滚动加载
    constructor(props) {

        super(props);

        // 富文本编辑器实例
        this.editor = {};

        // 自动适应屏幕计时器
        this.autoResizeTimer = null;

        // 自动保存计时器
        this.autoSaveTimer = null;

        this.resUnBind = {};

        // 上一次保存的Item
        this.cacheItem = {};

        this.isSaved = false;

        this.isLockSave = false;

        this.curSectionTarget = null;

        // 渠道红包存储
        this.channelPacket = null;
    }

    state = {
        viewType: '',
        viewParam: null,
        viewData: null,
        pageLoaded: false,
        autoSaveTip: {
            status: '',
            text: ''
        },
        pickerVisible: false,
        pickerColor: '',
        channel: 'wx',
    };

    componentWillMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        );
    }

    // 页面加载
    componentDidMount() {
        this._initContentMenu(true);
        this._initData();
        this._initEditor();
    }

    // 页面卸载
    componentWillUnmount() {
        this._destroyEditor();
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation, contentHot, content} = nextProps;
        switch (operation.type) {
            case contentAction.ADD_CONTENT_FAILURE:
            case contentAction.UPDATE_CONTENT_FAILURE:
                let errMsg;
                if (operation.result.errCode == 42004) {
                    errMsg = '保存失败，内容中存在未购买的付费素材';
                } else {
                    errMsg = '保存失败';
                }

                message.error(errMsg);
                this.setState({
                    autoSaveTip: {
                        status: operation.status,
                        text: errMsg
                    }
                });
                break;
            // 从热门资讯创建资讯
            case contentHotAction.GET_CONTENT_HOT_SUCCESS:
                const contentHotItem = contentHot.item;
                const shareInfo = {
                    title: contentHotItem.title,
                    author: contentHotItem.author || contentHotItem.gzhName,
                    desc: contentHotItem.desc,
                    imgId: '',
                    imgUrl: contentHotItem.articleThumUrl
                };

                this.syncContent({
                    hotConentId: contentHotItem.id,
                    content: contentHotItem.content,
                    vsite: shareInfo,
                    wb: shareInfo,
                    wx: shareInfo,
                    toutiao: shareInfo
                });

                this.setContent(contentHotItem.content);
                break;

            // 获取资讯信息
            case contentAction.GET_CONTENT_SUCCESS:
                this.resUnBind = {
                    couponId: content.item.couponId,
                    integralId: content.item.integralId
                };

                this.setContent(content.item.content);
                this.setState({
                    viewData: content.item
                });
                this.cacheItem = content.item;

                _.map(content.item.channelRes, (item) => {
                    if (item.type === 'coupon') {
                        this.channelPacket = item;
                    }
                });
                break;

            // 修改资讯中
            case contentAction.ADD_CONTENT_PENDING:
            case contentAction.UPDATE_CONTENT_PENDING:
                this.setState({
                    autoSaveTip: {
                        status: operation.status,
                        text: '正在为你保存资讯中'
                    }
                });
                break;

            // 添加资讯成功
            case contentAction.ADD_CONTENT_SUCCESS:
                this.setState({
                    autoSaveTip: {
                        status: operation.status,
                        text: '资讯已保存于' + dateFormat(Date.now(), 'hh:mm:ss')
                    }
                });
                this.isSaved = true;
                this.cacheItem = content.item;
                this.props.router.replace('/edit/' + content.item.id);
                break;

            // 修改资讯成功
            case contentAction.UPDATE_CONTENT_SUCCESS:
            case contentAction.UPDATE_TOUTIAO_CONTENT_SUCCESS:
                this.setState({
                    autoSaveTip: {
                        status: operation.status,
                        text: '资讯已保存于' + dateFormat(Date.now(), 'hh:mm:ss')
                    }
                });

                this.resUnBind = {
                    couponId: content.item.couponId,
                    integralId: content.item.integralId
                };

                this.setState({
                    viewData: content.item
                });

                this.cacheItem = content.item;
                break;
            // 重置资讯
            case contentAction.RESET_CONTENT:
                this.setContent(content.item.content);
                break;

            case contentAction.SYNC_MEDIA:
                this.setContent(content.item.content);
                break;
        }
    }

    // 跟踪路由
    componentDidUpdate(prevProps) {
        const {route, params, location} = this.props;
        const prevLocation = prevProps.location;

        var href = location.pathname + location.search;
        var prevHref = prevLocation.pathname + prevLocation.search;

        if (href != prevHref) {
            this._initContentMenu(false);
        }

        // 路由切换后初始化数据
        if (route.path != prevProps.route.path || params.id != prevProps.params.id) {
            this._initData();
        }
    }

    _initContentMenu(isInit) {
        const {tab} = this.props.location.query;
        if (tab) {
            const [type, cate, scope = 'all', tag = ''] = tab.split('-');
            this.props.actions[isInit ? 'initContentMenu' : 'selectContentMenu']({
                type,
                cate,
                scope,
                tag
            });
        }
    }

    // 切换路由,初始化数据
    _initData() {
        const {route, params} = this.props;
        switch (route.path) {
            // 从热门模板导入资讯
            case 'add(/:id)':
                if (params.id) {
                    // 从热门模板导入
                    this.props.actions.getContentHot(params.id);
                } else {
                    this.props.actions.resetContent();
                }
                break;
            // 编辑资讯作品
            case 'edit/:id':
                this.props.actions.getContent(params.id);
                break;
        }
    }

    // 初始化编辑器
    _initEditor() {
        this.editor = UE.getEditor('ueditor', {
            enableLinkto: true
        });

        this.editor.ready(() => {
            this.autoResize();

            this.setState({
                pageLoaded: true
            });

            this.editor.addListener('contentChange', () => {
                this.syncContent({
                    content: this.getContent()
                });
            });

            this.editor.addListener('changeColor', (eventName, target) => {
                this.showColorPicker(target);
            });

            // 编辑导购产品
            this.editor.addListener('onEditLinkto', (eventName, mode) => {
                this.anyWhereModule(MENU_MODULE_KEYS[mode]).then(()=> {
                    var link = this.editor.queryCommandValue('link');
                    var data = link ? parseParam(link.getAttribute('data')) : null;
                    if (data) {
                        this.editLinkto(data);
                    } else {
                        this.addLinkto(mode);
                    }
                });
            });

            // 替换图片
            this.editor.addListener('onEditImg', (eventName, next) => {
                this.anyWhereLogin().then(() => {
                    next();
                })
            })

            // onToolBar 点击事件
            this.editor.addListener('onToolBar', (eventNamev, mode, next) => {
                
                // 插入图片、音乐、视频必须登录 
                if (mode === 'insertimage' || mode === 'music' || mode === 'insertvideo') {
                    this.anyWhereLogin().then(() => {
                        next();
                    })
                } else {
                    next();
                }
            })

            this.editor.addListener('isImage', () => {
                this.handleImgSelect();
            });
        });

        // 初始化页面事件
        window.onresize = this.autoResize;
        window.onbeforeunload = this.routerWillLeave;
        document.body.oncontextmenu = () => {
            return false;
        };
    }


    // 销毁编辑器
    _destroyEditor() {
        // 销毁编辑器
        window.onresize = null;
        window.onbeforeunload = null;
        this.editor.destroy();
    }

    // 路由离开
    routerWillLeave = () => {

        if (!this.checkLogin()) {
            return;
        }

        const isSaved = this.isSaved || _.isEqual(this.cacheItem, this.props.content.item);
        if (isSaved) {
            this.isSaved = false;
            return;
        } else {
            return '系统可能不会保存您所做的更改.';
        }
    }

    getOffsetHeight(eleId) {
        const ele = document.getElementById(eleId);
        // 10px为间距
        return ele ? ele.offsetHeight + 10 : 0;
    }

    // 自动适应屏幕
    autoResize = () => {

        clearTimeout(this.autoResizeTimer);

        if (this.editor.ui && this.editor.ui.isFullScreen()) {
            return;
        }

        this.autoResizeTimer = setTimeout(() => {

            // 页头高度
            let headerH = 50;

            // 编辑器顶部距离
            let editorT = 14;

            // 编辑器底部距离
            let editorB = 10;

            // 营销插件高度
            let resultH = this.getOffsetHeight('editor-packet-result') + this.getOffsetHeight('editor-plugin-result');

            // 额外的固定高度
            let fixedH = 77;

            // 编辑器的高度
            let editorH = window.innerHeight - headerH - editorT - editorB - resultH - fixedH;


            this.editor.setHeight(editorH);
        }, 20);
    };

    // 执行命令
    execCommand(cmd, params) {
        this.editor.execCommand(cmd, params);
    }

    // 获取编辑器正文
    getContent() {
        return this.editor.getContent();
    }

    // 设置编辑器正文
    setContent = (content, isAppend) => {
        this.editor.ready(() => {
            this.editor.setContent(content, isAppend);
        });
    };

    // 插入版式
    insertHtml(html) {
        this.editor.execCommand('inserthtml', html);
    }

    // 插入图片
    insertImage(src, resType) {
        const id = src.split('/').pop();
        this.execCommand('insertimage', {
            src: src,
            _src: src,
            alt: `${resType}_${id}`
        });
    }

    shoppingGuide = () => {
        this.showView('shoppingGuide', {}, {});
    }

    editLinkto = (data) => {
        if (data.mode == 'activity') {
            this.showView('activityShow', {}, data);
        } else {
            this.showView('shoppingGuide', {}, data);
        }
    }

    addLinkto = (mode) => {
        if (mode == 'activity') {
            this.showView('activityShow', {}, {});
        } else {
            this.showView('shoppingGuide', {}, {});
        }
    }

    // 导购|商城|一元购|活动|自定义
    updateLink = ({data, url}) => {
        data = {
            'data': urlSerialization(data),
            'href': url,
            'title': data.name || '自定义链接',
            'textValue': data.name || '自定义链接',
            'className': 'lk-linkto-' + data.type + (data.mode ? ' lk-linkto-' + data.mode : ''),
            'data-id': data.id || url,
        };

        if (data) {
            let className = 'lk-linkto ';
            let img = this.editor.selection.getRange().getClosedNode();
            if (img && img.tagName == 'IMG') {
                className += 'lk-linkto-media ';
            }
            if (data.className) {
                className += data.className;
                delete data.className;
            }
            data['class'] = className;
            this.editor.execCommand('link', data);
        }
        this.reset();
    }


    // 同步数据
    syncContent = (params) => {
        this.props.actions.syncContent(params);
        // 自动保存
        this.autoSave();
        // 自适应
        this.autoResize();
    }

    syncMedia = (ids) => {
        this.props.actions.syncMedia(ids);
    }

    // 获取商品Id
    _getProdcutIssueIds(content) {

        let ids = [];

        let contentTemp = document.createElement('div');

        contentTemp.innerHTML = content;

        const collect = (name) => {
            let elements = contentTemp.getElementsByClassName(name);

            _.each(elements, (ele) => {
                const dataId = ele.getAttribute('data-id');
                if (dataId) {
                    ids.push(dataId);
                }
            });
        };

        collect('lk-linkto-product');
        // 兼容老的写法
        collect('lk-product-product');

        return _.union(ids);
    }

    //TODO: 获取第三方渠道 绑定的商品|优惠券等 by iris
    _getChannelRes(content) {
        let channelRes = [];
        // 获取第三方渠道绑定的优惠券  this.channelPacket
        let contentTemp = document.createElement('div');
        contentTemp.innerHTML = content;
        //获取第三方渠道绑定的商品
        const collect = (name) => {
            let elements = contentTemp.getElementsByClassName(name);
            _.each(elements, (ele) => {
                const dataId = ele.getAttribute('data-id');
                const data = parseParam(ele.getAttribute('data'));
                const url = ele.getAttribute('href');
                if (data.buyType == 'youzan') {
                    let channels = {
                        'channel': 'youzan',
                        'name': data.name,
                        'pid': dataId,
                        'url': url,
                        'type': 'product'
                    };
                    let flag = false;
                    _.map(channelRes, (channles) => {
                        if (channles.pid == dataId) {
                            flag = true;
                            return flag;
                        }
                    });
                    if (!flag) {
                        channelRes.push(channels);
                    }
                }
            });
        };
        collect('lk-linkto-product');
        // 兼容老的写法
        collect('lk-product-product');
        if (this.channelPacket) {
            channelRes = channelRes.concat(this.channelPacket);
        }
        return channelRes;
    }

    // 促发自动保存
    autoSave = () => {
        if (!this.checkLogin()) {
            return;
        }

        if (!this.checkModule(module.CONTENT_RICHTEXT_SAVE).enable) {
            return;
        }

        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => {
            this.saveContent();
        }, 10 * 1000);
    }

    // 验证资讯是否可以保存
    _validateSaveContent = (slient) => {
        const item = this.props.content.item;
        if (!item || !item.content) {
            if (!slient) {
                message.info('请先填写内容');
                this.editor.focus();
            }
            return false;
        }

        return true;
    }

    handleSave = () => {
        // 保存资讯
        if (this._validateSaveContent(false)) {
            this.saveContent();
        }
    }

    // 保存
    saveContent = () => {

        this.anyWhereModule(module.CONTENT_RICHTEXT_SAVE).then(() => {
            // 保存资讯
            if (!this._validateSaveContent(true)) {
                return;
            }
            const {item} = this.props.content;
            item.resUnBind = this.resUnBind;
            item.content = this.getContent();
            item.prodcutIssueIds = this._getProdcutIssueIds(item.content);
            item.channelRes = this._getChannelRes(item.content);

            // 清除未发出的自动保存
            clearTimeout(this.autoSaveTimer);
            if (!this.isLockSave) {
                this.props.actions.saveContent(item);
            }
        });
    };

    // 预览回调
    handlePreview = () => {

        if (!this._validateSaveContent()) {
            return;
        }

        this.showView('contentPreviewShow', {
            channel: 'vsite',
            display: 'list'
        });

        this.saveContent();
    };

    // 发布回调
    handleRelease = () => {

        let {channel} = this.state;

        this.anyWhereModule(module.CONTENT_RICHTEXT_PUBLISH).then(() => {
            if (!this._validateSaveContent()) {
                return;
            }

            if (channel != 'toutiao') {
                this.showView('contentReleaseShow');
            } else {
                redirect('editor.html#/toutiao/' + this.props.content.item.id + '?loop=true')
            }

            this.saveContent();
        });
    };

    // 返回回调
    handleBack = () => {
        redirect('marketing.html#/content/mine/edit')
    };

    // 添加红包
    handlePacketAdd = () => {
        this.showView('plugin-packet', null, {});
    };

    // 添加活动
    handelActivityAdd = () => {
        this.showView('activityShow', null, {});
    }

    handleEditPacket = () => {
        this.showView('plugin-packet', null, this.props.content.item);
    }

    handleDelPacket = () => {
        confirm({
            title: '提示',
            content: '确认要移除红包吗?',
            onOk: () => {

                this.channelPacket = null;

                this.syncContent({
                    couponId: '',
                    integralId: ''
                });
            }
        });
    };

    handleSavePacket = (packet) => {

        // 如果是第三接入第三方
        if (packet.channel === 'youzan') {
            this.channelPacket = {
                channel: packet.channel,
                name: packet.name,
                type: 'coupon',
                pid: packet.couponId || packet.integralId,
                url: packet.url
            };

            packet.integralId = packet.couponId = '';
        }
        else {
            if (packet.couponId) {
                packet.integralId = '';
            } else if (packet.integralId) {
                packet.couponId = '';
            }
            this.channelPacket = null;
        }

        this.syncContent(packet);
    };

    // 添加导购
    handleShoppingAdd = () => {
        this.shoppingGuide();
    }

    // 侧栏设置:留言,点赞,打赏
    handleSwitchChange = ({type, cate, checked}) => {
        if (type == 'plugin') {
            switch (cate) {
                case 'praise':
                    // 点赞
                    this.syncContent({
                        actions: {
                            enablePraise: checked
                        }
                    });
                    break;
                case 'tips':
                    // 打赏
                    this.syncContent({
                        actions: {
                            enableTips: checked <Uedit
                        }
                    });
                    break;
                case 'opinion':
                    // 留言
                    this.syncContent({
                        actions: {
                            enableOpinion: checked
                        }
                    });
                    break;
            }
        }
    };

    // 禁用:留言,点赞,打赏
    handleDisableAction = (type) => {
        this.syncContent({
            actions: {
                [type]: false
            }
        });
    };

    // 获取营销插件状态
    getContentPluginStatus() {
        const {actions = {}, couponId, integralId, prodcutIssueIds} = this.props.content.item || {};
        return {
            // 是否启用红包
            hasPacket: !_.isEmpty(couponId || integralId) || !!this.channelPacket,
            // 是否启用一键导购
            hasShopping: !_.isEmpty(prodcutIssueIds),
            // 是否启用点赞
            enablePraise: actions.enablePraise,
            // 是否启用打赏
            enableTips: actions.enableTips,
            // 是否启用留言
            enableOpinion: actions.enableOpinion
        };
    }

    // 导入热门资讯
    handleExportPost = (id) => {
        confirm({
            title: '提示',
            content: '您的操作将覆盖当前编辑内容',
            onOk: () => {
                this.props.actions.getContentHot(id);
            }
        });
        // this.props.router.push('add/' + id);
    };

    // 导入版式
    handleExportBulk = (content, item) => {
        this.insertHtml(content);
        if (!_.isEmpty(item) && _.has(item, 'style.effect')) {
            this.syncContent({
                style: item.style
            });
        }
    };

    // 导入图片
    handleExportMedia = (src, resType) => {
        this.insertImage(src, resType);
    };

    // 图片选中自动切换到图片
    handleImgSelect = () => {
        // this.props.actions.selectContentMenu({type: 'media', cate: 'img', scope: 'upload'});
    }

    showColorPicker = (target) => {
        var pickerColor = target.getAttribute('data-color');

        if (pickerColor) {
            pickerColor = color2color(pickerColor, 'hex').text;
        }

        this.setState({
            pickerVisible: true,
            pickerColor
        });
        this.curSectionTarget = target;
    }

    hideColorPicker = () => {
        this.setState({
            pickerVisible: false
        });
    }

    handleChangeColorPicker = (colors) => {

        this.setState({
            pickerColor: colors.color
        });

        replaceColor(this.curSectionTarget, colors.color);
    }

    handleChannel = (channel) => {

        this.setState({
            channel,
        }, () => {
            if (channel == 'toutiao') {
                this.saveContent();
            }
        });
    }


    handleCropperChange = (isShow) => {
        this.isLockSave = isShow;
    }

    // 接入红人点点
    showPublish = () => {
        this.showView('publishSelectShow');
        this._initData();
    };


    render() {


        const item = this.props.content.item;

        const {pageLoaded, viewParam, viewData, autoSaveTip, pickerVisible, pickerColor, channel} = this.state;

        const isShowContentPreviewShow = this.isShowView('contentPreviewShow');

        const isShowContentReleaseShow = this.isShowView('contentReleaseShow');

        const isShowPublishSelectShow = this.isShowView('publishSelectShow');

        const isShoppingGuide = this.isShowView('shoppingGuide');

        const isShowPacketShow = this.isShowView('plugin-packet');

        const isShowActivityShow = this.isShowView('activityShow');

        const pluginStatus = this.getContentPluginStatus();

        return (
            <div className='page-content'>
                <div style={{display: pageLoaded ? '' : 'none'}}>
                    <Header
                        {...autoSaveTip}
                        onSave={this.handleSave}
                        onPreview={this.handlePreview}
                        onBack={this.handleBack}/>
                    <section className='content'>
                        <Sidebar
                            data={pluginStatus}
                            syncMedia={this.syncMedia}
                            onPacketAdd={this.handlePacketAdd}
                            onActivityAdd={this.handelActivityAdd}
                            onShoppingAdd={this.handleShoppingAdd}
                            onSwitchChange={this.handleSwitchChange}
                            onExportPost={this.handleExportPost}
                            onExportBulk={this.handleExportBulk}
                            onExportMedia={this.handleExportMedia}/>

                        <div className='content-editor'>

                            <textarea id='ueditor' className='content-editor-textarea'></textarea>

                            { pluginStatus.hasPacket &&
                            <PacketResult data={item}
                                          channelPacket={this.channelPacket}
                                          onEdit={this.handleEditPacket}
                                          onDel={this.handleDelPacket}/>
                            }
                            <PluginResult {...pluginStatus}
                                          onDisableAction={this.handleDisableAction}/>
                            {
                                pickerVisible &&
                                <div className='content-colorPicker'>
                                    <ColorPickerPanel
                                        animation='slide-up'
                                        placement='bottomLeft'
                                        color={pickerColor}
                                        onBlur={this.hideColorPicker}
                                        onChange={this.handleChangeColorPicker}/>
                                </div>
                            }
                        </div>

                        <ContentReleaseForm
                            resType="content"
                            data={item}
                            handleRelease={this.handleRelease}
                            changeChannel={this.handleChannel}
                            onFieldsChange={this.syncContent}
                            onCropperChange={this.handleCropperChange}/>
                    </section>
                </div>

                { isShowContentPreviewShow &&
                <ContentPreviewShow
                    resType='content'
                    channel={viewParam.channel}
                    display={viewParam.display}
                    data={viewData}
                    visible={isShowContentPreviewShow}
                    reset={this.reset}/>
                }

                {/*接入红人点点*/}
                { isShowContentReleaseShow &&
                <ContentReleaseShow
                    visible={isShowContentReleaseShow}
                    resType='content'
                    channel={channel}
                    onRelease={this.showPublish}
                    data={viewData}
                    reset={this.reset}/>
                }

                {/*红人点点弹框*/}
                {isShowPublishSelectShow &&
                <PublishSelectShow
                    resType='content'
                    visible={isShowPublishSelectShow}
                    data={viewData}
                    reset={this.reset}
                />}

                { isShoppingGuide &&
                <ShoppingGuide
                    version='2.1.0'
                    data={viewData}
                    visible={isShoppingGuide}
                    onOk={this.updateLink}
                    onCancel={this.reset}/>
                }

                { isShowPacketShow &&
                <PacketShow
                    onSavePacket={this.handleSavePacket}
                    data={item}
                    channelPacket={this.channelPacket}
                    reset={this.reset}/>
                }

                {isShowActivityShow &&
                <ActivityShow
                    onOk={this.updateLink}
                    data={viewData}
                    reset={this.reset}/>
                }

                {!pageLoaded && <ContentLoading text='初始编辑器中...'/>}
            </div>);
    }
}

// 图片
// 删除 替换 自适应 添加活动 添加导购
// 删除 替换 自适应 修改活动 删除活动
// 删除 替换 自适应 修改导购 删除导购

// 修改活动 删除活动
// 修改导购 删除导购
