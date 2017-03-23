import React from 'react';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {connect} from 'react-redux';
import {message, Modal} from 'antd';
import config from 'common/config';
import {urlSerialization, redirect} from 'common/util';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import ContentReleaseForm from 'common/component/ContentReleaseForm';
import PacketShow from 'common/component/PacketShow';
import ActivityShow from 'common/component/ActivityShow';
import ShoppingGuide from 'common/component/ShoppingGuide';
import * as appAction from '../../store/app/action';
import * as authAction from 'common/store/auth/action';
import * as h5TplAction from '../../store/h5Tpl/action';
import ContentReleaseShow from 'common/component/ContentReleaseShow';
import ContentPreviewShow from 'common/component/ContentPreviewShow';
import ContentLoading from 'common/component/ContentLoading';
import SingleTpl from './component/SingleTpl';
import FullTpl from './component/FullTpl';
import TipMessage from 'common/component/TipMessage';
import PropertyTabs from './component/PropertyTabs';
import heditor from 'lk-heditor';
import Upload from './component/Upload';
import classNames from 'classnames';
import * as module from 'common/config/module';
import {html2image} from 'common/util/media';
import {MEDIA_DEL_ID} from 'common/config/media';
import _ from 'lodash';
import './index.less';

const PropertyPanel = PropertyTabs.Panel;

const MENU_MODULE_KEYS = {
    'coupon': module.CONTENT_H5_COUPON,
    'activity': module.CONTENT_H5_ACTIVITY,
    'buy-now': module.CONTENT_H5_SALE
};

@connect(
    state => ({
        operation: state.operation,
        app: state.app.toJS(),
        h5Tpl: state.h5Tpl.toJS(),
        contentH5: state.contentH5.toJS(),
        auth: state.auth.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...appAction,
            ...h5TplAction
        }, dispatch)
    })
)

class Editor extends PageBase {

    constructor(props) {
        super(props);

        // menu菜单类型
        this.menuType = {};

        // 判断入口类型
        this.entryType = {};

        // 所选择的单页模板的List
        this.tplPageList = [];

        // 当前页数
        this.pages = [];

        // 判断是不是自己的模板
        this.createTplType = null;

        // 用于多个功能点调用同一个action返回判断类型
        this.callBackType = '';

        // 记录上一次operation
        this.cacheOperation = null;

        // 缓存数据
        this.cacheData = null;

        // 模板数据
        this.cacheTplData = null;

        // 渠道红包存储
        this.channelCoupon = null;

        // 取消绑定存储
        this.resUnBind = {}

        this.messageHide = null;

        // 使用的媒体图片
        this.mediaIds = [];
    }

    componentDidMount() {
        this.init();
    }

    state = {
        viewType: '',
        viewParam: null,
        viewData: null,
        channel: 'wb',


        isLoads: {
            sidebar: false,
            data: false,
            createTpl: false
        },

        pluginStatus: {
            packetStatus: 'disabled',
            activityStatus: 'disabled',
            shoppingStatus: 'disabled'
        },

        // sidebar 伸展收缩
        sidebarVisible: true,

        // 属性面板 伸展收缩
        propertyVisible: true
    }

    static childContextTypes = {
        addText: React.PropTypes.func,
        addImage: React.PropTypes.func,
        delImage: React.PropTypes.func,
        addShape: React.PropTypes.func,
        addForm: React.PropTypes.func,
        setBackgroundImage: React.PropTypes.func,
        updatePage: React.PropTypes.func
    }

    getChildContext() {
        return {
            addText: this.addText,
            addImage: this.addImage,
            delImage: this.delImage,
            addShape: this.addShape,
            addForm: this.addForm,
            setBackgroundImage: this.setBackgroundImage,
            updatePage: this.updatePage
        };
    }

    /**
     * 页面初始化
     *
     * @memberOf Editor
     */
    init = () => {
        const id = this.props.router.params.id;
        this.entryType = this.getEntryType();

        // 创建作品
        if (this.entryType.isAddWorks) {
            this.initHeditor();

            // 使用模板创建作品
        } else if (this.entryType.isAddTpl) {
            this.props.actions.getTplData(id);

            // 编辑作品
        } else if (this.entryType.isEditWorks) {
            this.props.actions.getAppData(id);

            // 编辑模板
        } else if (this.entryType.isEditTpl) {
            this.props.actions.getTplData(id);
        }
    }

    /**
     * 路由离开
     *
     * @memberOf Editor
     */
    routerWillLeave = () => {
        if (this.entryType.isEditTpl) {
            if (!_.isEqual(this.cacheTplData, this.getH5Data())) {
                return '编辑器可能不会保存您所做的更改';
            } else {
                return;
            }
        } else {
            if (!_.isEqual(this.cacheData, this.getH5Data())) {
                return '编辑器可能不会保存您所做的更改';
            } else {
                return;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const {operation, app, auth, h5Tpl} = nextProps;
        if (this.cacheOperation === operation) {
            return;
        }
        this.cacheOperation = operation;

        switch (operation.type) {

            //** 获取作品数据
            case appAction.GET_APP_DATA_SUCCESS:
                this.initHeditor(() => {
                    this.setH5Data(app.data);
                });

                // 记录第三方优惠券
                _.map(app.data.channelRes, (item) => {
                    if (item.type === 'coupon') {
                        this.channelCoupon = item;
                    }
                });

                this.resUnBind.couponId = app.data.couponId;

                if (app.data.mediaIds) {
                    this.mediaIds = app.data.mediaIds;
                }
                
                // 记录绑定的单页模板
                if (_.has(app, 'data.extData.tplPageList')) {
                    this.tplPageList = app.data.extData.tplPageList || [];
                }
                break;

            //** 获取用户信息时触发
            case authAction.GET_UIN_VERSION_INFO_SUCCESS:
            case authAction.GET_USER_INFO_SUCCESS:

                // 设置用户类型
                this.menuType.ln = auth.info.isVuser ? 'valuer' : 'user';

                // 设置编辑类型
                this.menuType.editType = (this.entryType.isEditWorks || this.entryType.isAddWorks || this.entryType.isAddTpl) ?
                    'works' :
                    'tpl';
                break;

            //** 使用单页时，获取单页模板数据
            case h5TplAction.GET_TPL_SINGLE_DATA_SUCCESS:
                this.handelUpdatePage();
                break;

            //** 获取模板数据
            case h5TplAction.GET_TPL_DATA_SUCCESS:
                let h5Data = h5Tpl.data;

                // 通过模板创建
                if (this.entryType.isAddTpl) {
                    h5Data.tplId = h5Data.id;

                    this.initHeditor(() => {

                        // 单页模板id射进对应结构
                        if (h5Data.appType === 'S') {
                            this.tplPageList = [h5Data]
                            this.handelUpdatePage(h5Data);
                            this.saveApp();

                        } else if (h5Data.appType === 'M') {
                            heditor.setModel(h5Data);
                            this.saveApp({
                                tplId: h5Data.id
                            });
                        }

                        this.createTplType = {
                            mySelf: h5Data.mySelf,
                            appType: h5Data.appType
                        };
                        this.callBackType = 'addTpl';
                    });

                    // 修改模板
                } else if (this.entryType.isEditTpl) {
                    this.initHeditor(() => {
                        this.setH5Data(h5Data);
                    });
                }

                if (h5Data.mediaIds) {
                    this.mediaIds = h5Data.mediaIds;
                }

                break;

            //** 更新作品数据
            case appAction.UPDATE_APP_DATA_SUCCESS:
                if (this.props.router.location.pathname.indexOf('add') !== -1) {
                    this.props.router.replace('/edit/works/' + app.data.id + '?' + urlSerialization(this.props.router.location.query));
                }

                // 生成模板保存之后处理
                if (this.callBackType === 'createTpl') {
                    this.getTplVerification(app.data.id);

                    // 发布保存之后处理
                } else if (this.callBackType === 'h5Release') {
                    this.showView('h5Release', null, app.data);

                    // 预览保存之后处理
                } else if (this.callBackType === 'preview') {
                    this.showView('h5Preview', null, app.data);

                    // 通过模板创建作品
                } else if (this.callBackType === 'addTpl'){
                    this.callBackType = '';

                } else {
                    message.success('保存成功');
                }

                this.resUnBind.couponId = app.data.couponId;
                break;

            //** 核实应用是否能生成模板服务
            case h5TplAction.GET_TPL_VERIFICATION_SUCCESS:
                this.handelCreateTplThen(h5Tpl.data);
                break;

            //** 核实应用是否能生成模板服务 失败
            case h5TplAction.GET_TPL_VERIFICATION_FAILURE:
                Modal.warning({
                    title: '当前无法生成模板！',
                    content: '此作品模板正在审核中',
                });
                break;

            //** 同步作品数据
            case appAction.SYNC_APP_DATA:
                setTimeout(() => {
                    this.updatePluginStatus();
                }, 0);
                break;
        }
    }

    /**
     * 初始编辑器
     *
     * @memberOf Editor
     */
    initHeditor = (callBack) => {
        let isLoads = this.state.isLoads;
        isLoads.data = true;
        window.onbeforeunload = this.routerWillLeave;

        this.setState({
            isLoads
        }, () => {
            heditor.init({

                // 编辑器容器
                container: '.h5-container',

                // 菜单容器
                dashboard: '.h5-dashboard',

                // 编辑类型
                mode: this.entryType.isEditTpl ? 'tpl' : 'h5',

                // 环境配置
                env: config.env,

                actions: {
                    // 图片选择,返回图片
                    selectImage: (action) => {
                        this.refs.upload.onUpload((imgId) => {
                            action({imgId});
                        });
                    }
                },
                events: {
                    onModelChange: (widgetModel) => {
                        this.matchingPlugin(widgetModel);
                    },

                    onWidgetFocus: () => {
                        this.updatePluginStatus();
                    },

                    onWidgetBlur: () => {
                        this.disabledPluginStatus();
                    },

                    // 点击添加营销插件
                    onWidgetAddAction: (widgetModel, type) => {
                        this.anyWhereModule(MENU_MODULE_KEYS[type]).then(()=> {
                            switch (type) {
                                case 'coupon':
                                    this.handleAddPacket();
                                    break;

                                case 'activity':
                                    this.handleAddActivity();
                                    break;

                                case 'buy-now':
                                    this.handleAddShopping();
                                    break;
                            }
                        })
                    },

                    // 点击编辑营销插件
                    onWidgetEditAction: (widgetModel, curAction) => {
                        switch (curAction.name) {
                            case 'coupon':
                                this.handleAddPacket(curAction.model);
                                break;

                            case 'activity':
                                this.handleAddActivity(curAction.model);
                                break;

                            case 'buy-now':
                                this.handleAddShopping(curAction.model);
                                break;
                        }
                    },

                    // 营销插件更新后
                    onWidgetUpdateAction: (widgetModel, newAction) => {
                        let data = this.props.app.data;
                        switch (newAction.name) {
                            case 'coupon':
                                if (newAction.model.channel === 'youzan') {
                                    data.couponId = '';
                                    this.channelCoupon = newAction.model;
                                } else {
                                    data.couponId = newAction.model.id;
                                    this.resUnBind.couponId = newAction.model.id;
                                    this.channelCoupon = null
                                }

                                break;

                            case 'buy-now':
                                if (newAction.model.type === 'product') {

                                    if (!data.prodcutIssueIds) {
                                        data.prodcutIssueIds = [];
                                    }
                                    data.prodcutIssueIds.push(newAction.model.id);
                                }
                                break;
                        }
                        this.syncApp({...data});
                        message.success('营销插件添加成功');
                    },

                    // 营销插件删除后
                    onWidgetRemoveAction: (widgetModel, oldAction) => {
                        let data = this.props.app.data;
                        switch (oldAction.name) {
                            case 'coupon':
                                    if (oldAction.model.channel === 'youzan') {
                                        this.channelCoupon = null;
                                    } else {
                                        data.couponId = '';
                                        this.resUnBind.couponId = oldAction.model.couponId;
                                    }
                                break;

                            case 'buy-now':
                                let index = data.prodcutIssueIds.indexOf(oldAction.model.id);
                                if (index !== -1) {
                                    data.prodcutIssueIds.splice(index, 1);
                                }
                                break;
                        }
                        this.syncApp(data);
                        message.success('营销插件删除成功');
                    }
                }
            });
            callBack && callBack();

            // 更新营销插件状态
            this.updatePluginStatus();
        });
    }

    // 匹配营销插件状态
    matchingPlugin = (widgetModel) => {
        let data = this.props.app.data;
        let actions = [];

        _.map(widgetModel.richData.pageList, (pageItem) => {
            _.map(pageItem.model.widgetList, (widgetItem) => {
                if (!_.isEmpty(widgetItem.model.actions)) {
                    actions.push(widgetItem.model.actions)
                }
            })
        })

        // 根据编辑的改变，刷新对应状态
        if (data.couponId || _.findIndex(data.channelRes, (n) => n.type === 'coupon') !== -1) {
            if (_.findIndex(actions, (n) => n.model.type === 'coupon') == -1) {
                data.couponId = '';
                _.remove(data.channelRes, (n) => n.type === 'coupon');
            }
        }
        this.syncApp({...data});
    }

    /**
     * 获取入口类型
     *
     * @memberOf Editor
     */
    getEntryType = () => {
        const path = this.props.route.path;
        return {
            // 创建作品
            isAddWorks: path === 'add',
            // 使用模板创建作品
            isAddTpl: path === 'add/:id',
            // 编辑作品
            isEditWorks: path === 'edit/works/:id',
            // 编辑模板
            isEditTpl: path === 'edit/tpl/:id'
        };
    }

    /**
     * 获取H5编辑器数据
     * @memberOf Editor
     */
    getH5Data = (app = this.entryType.isEditTpl ? this.props.h5Tpl.data : this.props.app.data) => {
        let appModel = heditor.getModel();
        app.richData = appModel.richData || {};
        app.shapeData = appModel.shapeData || {};
        app.shapeImg = appModel.shapeImg || [];
        app.formData = appModel.formData || [];
        app.fontFiles = appModel.fontFiles || [];
        return _.assign({}, app);
    }

    /**
     * 设置H5编辑器数据
     *
     * @memberOf Editor
     */
    setH5Data = (app) => {
        let appModel = {};
        appModel.richData = app.richData || {};
        appModel.shapeData = app.shapeData || {};
        appModel.shapeImg = app.shapeImg || [];
        appModel.formData = app.formData || [];
        appModel.fontFiles = app.fontFiles || [];

        heditor.setModel(appModel);
    }

    /**
     * 保存作品
     * @memberOf Editor
     */
    saveApp = (data = {}) => {

        data = _.defaultsDeep(this.getH5Data(), data, {});

        this.cacheData = data;

        if (!data.extData) {
            data.extData = {};
        }

        if (!data.couponId && this.resUnBind.couponId) {
            data.resUnBind = this.resUnBind;
        } else {
            data.resUnBind = {couponId: ''};
        }

        data.resType = 'h5';
        data.editorType = 'main';
        data.appStatus = 'EDIT';

        const {tplPageList, tplsId} = this.getTplIds();
        data.channelRes = this.getChannelRes();
        data.mediaIds = this.mediaIds;

        data.tplIds = tplsId;
        data.extData.tplPageList = tplPageList;
        data.pages = this.getPages();
        this.props.actions.updateAppData(data);
        this.syncApp(data);
    }

    /**
     * 转换成对应原getChannelRes
     * @memberOf Editor
     */
    getChannelRes = () => {
        let channelRes = this.props.app.data.channelRes || [];

        // 清空coupon数据，重新赋值
        _.remove(channelRes, (n) => {
            return n.type === 'coupon';
        })

        if (this.channelCoupon) {
            channelRes = channelRes.concat(this.channelCoupon);
        }

        return channelRes;
    }

    /**
     * 获取设置并获取pages
     *
     * @memberOf Editor
     */
    getPages = () => {
        let data = this.getH5Data();
        this.pages = _.keys(data.richData.pageList).length;
        return this.pages;
    }

    /**
     * 获取单页模板数据
     *
     * @memberOf Editor
     */
    getTplIds = () => {

        let data = this.getH5Data(),
            tplPageList = [],
            tplsId = [],
            isMySelf = true;

        // 获取设置单页的tplsid集合
        _.map(data.richData.pageList, (item) => {
            if (item.model.tplId) {
                tplsId.push(item.model.tplId);
            }
        });

        tplsId = _.uniq(tplsId);

        // 获取tplsId对应的item；判断tplsId里是否有不是自己创作模板
        _.map(tplsId, (id) => {
            _.map(this.tplPageList, (item) => {
                if (id === item.id) {
                    if (!item.mySelf) {
                        isMySelf = false;
                    }
                    tplPageList.push(item);
                }
            });
        });

        return {tplPageList, tplsId, isMySelf};
    }

    /**
     * 保存模板/作品
     *
     * @memberOf Editor
     */
    onSave = () => {
        this.anyWhereModule(module.CONTENT_H5_SAVE).then(() => {
            if (this.entryType.isEditTpl) {
                this.lock(() => {
                    this.getTplVerification(this.props.h5Tpl.data.appId);
                    this.callBackType = 'createTpl';
                    this.handelCreateTplLoading('正在解析模板...');
                })
            } else {
                this.saveApp();
            }
        });
    }

    /**
     * 打开模板选择的loading
     *
     * @memberOf Editor
     */
    handelCreateTplLoading = (text) => {
        if (text) {
            this.messageHide = message.loading(text, 0);
        } else {
            this.unLock();
            if (_.isFunction(this.messageHide)) {
                this.messageHide();
            }
        }
    }

    /**
     * 预览
     *
     * @memberOf Editor
     */
    onPreview = () => {
        if (this.entryType.isEditTpl) {
            this.getTplVerification(this.props.h5Tpl.data.appId);
            this.callBackType = 'tplPreview';
        } else {
            this.onSave();
            this.callBackType = 'preview';
        }
    }

    /**
     * 返回
     *
     * @memberOf Editor
     */
    onBack = () => {
        const type = this.props.location.query.type;
        let url = 'marketing.html#';

        if (!type || type == 'undefined') {
            url = url + '/h5/tpl/all/platform';
        } else {
            url = url + type;
        }
        
        redirect(url)
    }

    /**
     * 获取可修改模板的数据
     *
     * @memberOf Editor
     */
    getTplVerification = (appId) => {
        this.props.actions.getTplVerification(appId);
        this.getPages();
    }

    /**
     * 点击生成模板处理
     *
     * @memberOf Editor
     */
    onCreateTpl = () => {
        this.lock(() => {

            // 所使用的单页模板，是否包涵所有自己生成的模板
            const isMySelfS = this.getTplIds().isMySelf;

            // 所使用的整套模板，是否包涵所有自己生成的模板
            const isMySelfM = this.createTplType ? this.createTplType.mySelf && this.createTplType.appType === 'M' : true;

            if (!isMySelfS || !isMySelfM) {
                Modal.warning({
                    title: '当前无法生成模板！',
                    content: '您使用了其他作者设计的模板，您的作品必须完全原创才能生成模板！',
                });
                return;
            }
            this.saveApp();
            this.callBackType = 'createTpl';
            this.handelCreateTplLoading('正在解析模板...');
        })
    }

    /**
     * 弹出生成模板选择面板
     *
     * @memberOf Editor
     */
    handelCreateTplThen = (data) => {

        data = this.getH5Data(data);

        // 选择的单页ids
        data.tplsId = this.getTplIds().tplsId;

        // 过滤richData
        data.richData = this.getTplRichData();

        // 获取pages
        if (_.has(data, 'richData.pageList')) {
            data.pages = _.keys(data.richData.pageList).length;
            data.appType = data.pages > 1 ? 'M' : 'S';
        }

        // 保存模板类型与上次不同时，清空标签
        if (this.props.h5Tpl.data.appType !== data.appType) {
            data.tags = null;
        }

        // 让所选择元素失焦
        heditor.blur();
        
        // 显示第一页
        heditor.activatePage(0);

        // 删除图片的
        data.mediaIds = this.mediaIds;

        if (this.pages === 1) {
            // 截图屏图片单页
            html2image(document.querySelectorAll('.edit-page')[0], (result) => {
                data.coverMediaId = result.data;
                this.showView('singleTpl', null, data);
            });

        } else if (this.pages > 1) {
            if (!data.coverMediaId) {
                html2image(document.querySelectorAll('.edit-page')[0], (result) => {
                    data.coverMediaId = result.data;
                    this.showView('fullTpl', null, data);
                });
            } else {
                this.showView('fullTpl', null, data);
            }
        }
    }

    /**
     * 添加图片
     *
     * @memberOf Editor
     */
    addImage = (imgId) => {
        heditor.addImage({imgId});
        this.mediaIds.push(imgId);
        this.mediaIds = _.xor(this.mediaIds);
    }

    /**
     * 删除图片
     *
     * @memberOf Editor
     */
    delImage = (mediaDelIds) => {
        let data = heditor.getModel();
        let newData = _.create(data);
        _.map(data.richData.pageList, (pageItem, pageKey) => {
            _.map(pageItem.model.widgetList, (widgetItem, widgetKey) => {
                if (!_.isEmpty(widgetItem.model.imageMediaId) && mediaDelIds.indexOf(widgetItem.model.imageMediaId) !== -1) {
                    _.remove(this.mediaIds, (n) => {
                        return n === widgetItem.model.imageMediaId
                    })
                    newData.richData.pageList[pageKey].model.widgetList[widgetKey].model.imgId = MEDIA_DEL_ID;
                    newData.richData.pageList[pageKey].model.widgetList[widgetKey].model.imageMediaId = MEDIA_DEL_ID;
                }
            })
        })

        heditor.setModel(newData);
    }

    /**
     * 添加图形
     *
     * @memberOf Editor
     */
    addShape = (type) => {
        heditor.addShape({
            subClass: type
        });
    }

    /**
     * 添加文字
     *
     * @memberOf Editor
     */
    addText = (config) => {
        heditor.addText(config);
    }

    /**
     * 添加表单
     *
     * @memberOf Editor
     */
    addForm = (config) => {
        heditor.addForm(config);
    }

    /**
     * 设置背景
     *
     * @memberOf Editor
     */
    setBackgroundImage = (imgId) => {
        heditor.setBackgroundImage({imgId});
    }

    /**
     * 更新单页
     *
     * @memberOf Editor
     */
    updatePage = (id, item) => {
        this.props.actions.getTplSingleData(id);
        this.callBackType = 'updatePage';

        // 不允许重复单页
        let repeat = _.findIndex(this.tplPageList, (n) => {
            return n.id === id;
        });

        if (repeat !== -1) {
            return;
        }
        this.tplPageList.push(item);
    }

    /**
     * 设置单页数据
     *
     * @memberOf Editor
     */
    handelUpdatePage = (itemData = this.props.h5Tpl.singleData) => {
        const {shapeData, shapeImg, formData} = this.props.app.data;
        let pageData = itemData.richData.pageList[_.keys(itemData.richData.pageList)[0]];
        pageData.model.tplId = itemData.id;
        heditor.replacePage({
            pageData,
            shapeData,
            shapeImg,
            formData
        });
    }

    /**
     * 获取标签
     *
     * @memberOf Editor
     */
    getTagsList = (tagType) => {
        this.props.actions.getTagsList(tagType);
    }

    /**
     * 更新营销插件状态
     * @memberOf Editor
     */
    updatePluginStatus() {
        const activeWidgetModel = heditor.getActiveWidgetModel();
        if (activeWidgetModel) {
            this.enablePluginStatus();
        } else {
            this.disabledPluginStatus();
        }
    }

    /**
     * 不可绑定营销插件处理
     * @memberOf Editor
     */
    disabledPluginStatus = () => {
        const isCoupon = _.isEmpty(this.props.app.data.couponId) || !!this.channelCoupon;
        this.setState({
            pluginStatus: {
                packetStatus: !isCoupon ? 'disabledBind' : 'disabled',
                activityStatus: 'disabled',
                shoppingStatus: 'disabled'
            }
        })
    }

    /**
     * 可绑定销插件处理
     *
     * @memberOf Editor
     */
    enablePluginStatus = () => {
        const isCoupon = _.isEmpty(this.props.app.data.couponId) || !!this.channelCoupon;
        const activeWidgetModel = heditor.getActiveWidgetModel();
        const isAddAction = activeWidgetModel ? activeWidgetModel.canAddAction() : false;
        let packetStatus, activityStatus, shoppingStatus;

        // 判断是否可添加插件
        if (isAddAction) {
            shoppingStatus = activityStatus = 'enable';
            packetStatus = !isCoupon ? 'disabledBind' : 'enable'
        } else {
            const type = activeWidgetModel.model.actions.name;
            packetStatus = type === 'coupon' ? 'enableEdit' : !isCoupon ? 'disabledBind' : 'disabled';
            activityStatus = type === 'activity' ? 'enableEdit' : 'disabled';
            shoppingStatus = type === 'buy-now' ? 'enableEdit' : 'disabled';
        }
        this.setState({
            pluginStatus: {
                packetStatus,
                activityStatus,
                shoppingStatus
            }
        })
    }

    /**
     * 添加优惠券
     *
     * @memberOf Editor
     */
    handleAddPacket = (
            data = this.getActiveWidgetActionsModel()
        ) => {
        this.showView('packet', null, data);
    };

    /**
     * 添加活动
     *
     * @memberOf Editor
     */
    handleAddActivity = (
        data = this.getActiveWidgetActionsModel()
    ) => {
        this.showView('activity', null, data);
    }

    /**
     * 添加导购
     *
     * @memberOf Editor
     */
    handleAddShopping = (
        data = this.getActiveWidgetActionsModel()
    ) => {
        this.showView('shopping', null, data);
    }

    /**
     * 获取组件的actions model
     *
     * @memberOf Editor
     */
    getActiveWidgetActionsModel = () => {
        if (_.keys(heditor.getActiveWidgetModel().model.actions).length === 0) {
            return {}
        } else {
            return heditor.getActiveWidgetModel().model.actions.model
        }
    }

    /**
     * 保存红包
     *
     * @memberOf Editor
     */
    handleSavePacket = (data) => {
        let model = {};
        if (data.channel === 'youzan') {
            model = {
                channel: data.channel,
                name: data.name,
                pid: data.couponId,
                url: data.url
            }
        } else {
            model = data
        }

        model.id = data.couponId;

        heditor.updateAction({
            name: 'coupon',
            event: 'click',
            model: {
                type: 'coupon',
                ...model
            }
        });
    }

    /**
     * 保存活动
     *
     * @memberOf Editor
     */
    handleSaveActivity = (data) => {
        heditor.updateAction({
            name: 'activity',
            event: 'click',
            model: {
                url: data.url,
                ...data.data
            }
        });
        this._reset();
    }

    /**
     * 保存导购
     *
     * @memberOf Editor
     */
    handleSaveShopping = (data) => {
        heditor.updateAction({
            name: 'buy-now',
            event: 'click',
            model: {
                url: data.url,
                ...data.data
            }
        });
        this._reset();
    }

    /**
     * 发布
     *
     * @memberOf Editor
     */
    handleRelease = () => {
        this.saveApp();
        this.callBackType = 'h5Release';
    }

    /**
     * 发布tabs change
     *
     * @memberOf Editor
     */
    handleChangeChannel = (channel) => {
        this.setState({
            channel
        });
    }

    /**
     * 获取生成模板的richDat
     *
     * @memberOf Editor
     */
    getTplRichData = () => {
        return heditor.getModel(true).richData;
    }

    /**
     * 同步作品数据
     *
     * @memberOf Editor
     */
    syncApp = (data) => {
        this.props.actions.syncApp(data);
    }

    /**
     * 同步模板数据
     *
     * @memberOf Editor
     */
    syncTpl = (data) => {
        this.props.actions.syncTpl(data);
    }

    /**
     * sidebar 伸展收缩
     *
     * @memberOf Editor
     */
    handelSidebarArrow = () => {
        this.setState({
            sidebarVisible: !this.state.sidebarVisible
        });
    }

    /**
     * 属性面板 伸展收缩
     *
     * @memberOf Editor
     */
    handelPropertyArrow = () => {
        this.setState({
            propertyVisible: !this.state.propertyVisible
        });
    }

    /**
     * sidebar是否加载完成
     *
     * @memberOf Editor
     */
    onSidebarDone = (state) => {
        let isLoads = this.state.isLoads;
        isLoads.sidebar = true;
        if (state) {
            this.setState({
                isLoads
            });
        }
    }

    /**
     * sidebar是否加载完成
     *
     * @memberOf Editor
     */
    onCreateTplLoad = (createTpl) => {
        this.handelCreateTplLoading();
    }

    /**
     * 模板保存成功
     *
     * @memberOf Editor
     */
    handelTplDone = () => {
        this.reset(() => {
            if (this.callBackType === 'tplPreview') {
                this.callBackType = '';
                this.showView('h5Preview', null, this.props.h5Tpl.data);
            }
        });
        this.cacheTplData = this.getH5Data();
    }

    /**
     * 是否显示生成模板按钮
     *
     * @memberOf Editor
     */
    isVisibleCreateTpl = () => {
        return !_.isEmpty(this.menuType) && this.menuType.ln === 'valuer' && this.menuType.editType === 'works';
    }

    /**
     * 重置状态
     *
     * @memberOf Editor
     */
    _reset = (callBack) => {
        this.reset(callBack);
        this.callBackType = '';
    }

    render() {

        const {app} = this.props;

        const {viewData, pluginStatus, channel, sidebarVisible, propertyVisible, isLoads} = this.state;

        const visibleCreateTpl = this.isVisibleCreateTpl();

        const isShowPacket = this.isShowView('packet');

        const isShowActivity = this.isShowView('activity');

        const isShowShopping = this.isShowView('shopping');

        const isShowSingleTpl = this.isShowView('singleTpl');

        const isShowFullTpl = this.isShowView('fullTpl');

        const isShowH5Release = this.isShowView('h5Release');

        const isShowH5Preview = this.isShowView('h5Preview');

        const isLoad = !isLoads.sidebar || !isLoads.data;

        const classString = classNames({
            'h5-content': isLoad,
            'h5-content-in': !isLoad,
            'h5-hidden-left': !sidebarVisible,
            'h5-hidden-right': !propertyVisible
        });

        return (
            <div className="page-h5">
                <div className={classString}>
                    <Header
                        {...this.state.autoSaveTip}
                        visibleCreateTpl={visibleCreateTpl}
                        onPreview={this.onPreview}
                        onSave={this.onSave}
                        onBack={this.onBack}
                        onCreateTpl={this.onCreateTpl}/>

                    <div className="h5-box">
                        <Sidebar
                            pluginStatus={pluginStatus}
                            menuType={this.menuType}
                            visible={sidebarVisible}
                            onDone={this.onSidebarDone}
                            onArrow={this.handelSidebarArrow}
                            onAddPacket={this.handleAddPacket}
                            onAddActivity={this.handleAddActivity}
                            onAddShopping={this.handleAddShopping}/>

                        <div className="h5-main">
                            <div className="h5-container"></div>
                        </div>

                        {/*属性面板*/}
                        <PropertyTabs
                            className="h5-propertytabs"
                            defaultSelect="property"
                            visible={propertyVisible}
                            onArrow={this.handelPropertyArrow}>

                            {/*编辑菜单*/}
                            <PropertyPanel key="property" title="属性设置" className="h5-dashboard"></PropertyPanel>

                            <PropertyPanel key="release" title="发布设置">
                                {/*发布*/}
                                <ContentReleaseForm
                                    data={app.data}
                                    resType="h5"
                                    enableChannel={['wb', 'vsite']}
                                    handleRelease={this.handleRelease}
                                    changeChannel={this.handleChangeChannel}
                                    onFieldsChange={this.syncApp}/>
                            </PropertyPanel>
                        </PropertyTabs>
                    </div>
                </div>

                {/*预览弹窗*/}
                {isShowH5Preview &&
                <ContentPreviewShow
                    previewType={this.entryType.isEditTpl ? 'previewTpl' : 'previewApp'}
                    resType="h5"
                    display="preview"
                    available={[null]}
                    data={viewData}
                    visible={true}
                    reset={this._reset}/>
                }

                {/*发布弹窗*/}
                {isShowH5Release &&
                <ContentReleaseShow
                    visible={true}
                    resType="h5"
                    channel={channel}
                    onRelease={this.showPublish}
                    data={viewData}
                    reset={this._reset}/>
                }

                {/*添加优惠券弹窗*/}
                {isShowPacket &&
                <PacketShow
                    typeShow='h5'
                    onSavePacket={this.handleSavePacket}
                    channelPacket={this.channelCoupon}
                    data={app.data}
                    reset={this._reset}/>
                }

                {/*添加活动弹窗*/}
                {isShowActivity &&
                <ActivityShow
                    onOk={this.handleSaveActivity}
                    data={viewData}
                    reset={this._reset}/>
                }

                {/*添加导购弹窗*/}
                {isShowShopping &&
                <ShoppingGuide
                    data={viewData}
                    onOk={this.handleSaveShopping}
                    onCancel={this._reset}/>
                }

                {/*生成单页模板弹窗*/}
                {isShowSingleTpl &&
                <SingleTpl
                    isEditTpl={this.entryType.isEditTpl}
                    data={viewData}
                    onLoad={this.onCreateTplLoad}
                    onDone={this.handelTplDone}
                    reset={this._reset}/>
                }

                {/*生成整套模板弹窗*/}
                {isShowFullTpl &&
                <FullTpl
                    isEditTpl={this.entryType.isEditTpl}
                    data={viewData}
                    onLoad={this.onCreateTplLoad}
                    onDone={this.handelTplDone}
                    reset={this._reset}/>
                }

                {isLoad &&
                <ContentLoading text="初始化编辑器中   ..."/>
                }
                <Upload ref="upload"/>
            </div>
        );
    }
}

export default Editor;
