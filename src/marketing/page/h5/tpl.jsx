import React from 'react';
import {Tabs, message, Modal} from 'antd';
import config from 'common/config';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import TabHeader from '../../component/TabHeader';
import H5HotTemplateList from './component/H5HotTemplateList';
import MyH5HotTemplateList from './component/MyH5HotTemplateList';
import TemplatePreviewShow from 'common/component/TemplatePreviewShow';
import * as tplAction from '../../store/tpl/action';
import * as tagAction from '../../store/tag/action';
import * as resourcesAction from '../../store/resources/action';
import {redirect} from 'common/util';
import './tpl.less';
import _ from 'lodash';
const TabPane = Tabs.TabPane;
@connect(
    state => ({
        operation: state.operation,
        tpl: state.tpl.toJS(),
        tag: state.tag.toJS(),
        app: state.app.toJS(),
        ledou: state.ledou.toJS(),
        activeKey: '/h5/tpl/all/',
        resources: state.resources.toJS(),
        auth: state.auth.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            getTplList: tplAction.getTplList,
            getTplData: tplAction.getTplData,
            getUserTagsList: tagAction.getUserTagsList,
            favTpl: tplAction.favTpl,
            cancelFavTpl: tplAction.cancelFavTpl,
            deleteUserTemplate: tplAction.deleteUserTemplate,
            applyAuditResources: resourcesAction.applyAuditResources,
        }, dispatch)
    })
)
export default class TplIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        type: 'platform',
        sort: 'createdDate',
        order: 'desc',
        auditStatus: '',
        appType: '',
        tag: [],
        data: [],
        defaultSelectedKeys: [],
    };

    componentDidMount() {
        let type = this.props.params.key;
        this.getTplList({
            categorytype: type,
            size: type == 'platform' ? config.SIZE - 1 : config.SIZE,
            sort: type == 'platform' ? 'openedDate' : null,
            order: 'desc',
            appType: type == 'platform' ? 'M' : null
        });
        this.getTags();
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case tplAction.FAVORITE_TPL_SUCCESS:
                message.success('收藏成功');
                this.reset();
                this.refreshTplList();
                break;
            case tplAction.CANCEL_FAV_TPL_SUCCESS:
                message.success('取消成功');
                this.reset();
                this.refreshTplList();
                break;
            case tagAction.GET_USER_TAG_LIST_SUCCESS:
                let tagData = this._renderTag();
                this.setState({
                    data: tagData[0],
                    defaultSelectedKeys: tagData[1]
                });
                break;
            case tplAction.DELETE_USER_TEMPLATE_SUCCESS:
                message.success('删除成功');
                this.reset();
                this.getTplList({categorytype: this.props.params.key});
                break;
            case resourcesAction.APPLY_AUDIT_RESOURCES_SUCCESS:
                message.success('提交审核成功');
                this.reset();
                this.getTplList({
                    categorytype: this.props.params.key,
                    appType: this.state.appType,
                    auditStatus: this.state.auditStatus
                });
                break;
            case tplAction.GET_TPL_DATA_SUCCESS:
                this.setState({
                    viewData: nextProps.tpl.item
                });
                break;
        }
    }

    //图文列表
    getTplList = ({
        categorytype,
        tags,
        minLedou,
        maxLedou,
        auditStatus,
        appType,
        page = 0,
        size = this.state.size,
        sort,
        order = 'desc'
    }) => {
        this.setState({
            auditStatus: auditStatus,
            appType: appType
        }, () => {
            this.props.actions.getTplList({
                categorytype,
                tags,
                minLedou,
                maxLedou,
                auditStatus,
                appType,
                page,
                size,
                sort,
                order
            });
        })
    };
    refreshTplList = () => {
        let type = this.props.params.key;
        this.getTplList({
            page: this.state.page,
            size: config.SIZE,
            categorytype: this.state.type,
            tags: this.state.tag,
            sort: type == 'platform' ? 'openedDate' : this.state.sort,
            order: 'desc',
            appType: type == 'platform' ? 'M' : null
        });
    }
    //作品列表
    getAppDataList = (params, page = 0, categorytype = this.state.type) => {
        this.props.actions.getAppTemplateList({
            page,
            size: this.state.size,
            categorytype,
            ...params
        });
    }
    getTags = () => {
        this.props.actions.getUserTagsList('app');
    };
    getTplData = (id) => {
        this.props.actions.getTplData(id);
    }

    onTabChange = (key) => {
        this.props.router.push('/h5/tpl/all/' + key);
        this.setState({type: key});
        this.getTplList({
            categorytype: key,
            appType: key == 'platform' ? 'M' : null,
            sort: key == 'platform' ? 'openedDate' : null,
            order: 'desc',
        });
    };

    //收藏模板
    favTpl = (id) => {
        this.props.actions.favTpl(id);
    };
    //取消收藏
    cancelFavTpl = (id) => {
        this.props.actions.cancelFavTpl(id);
    };
    //删除模板操作事件
    deleteH5Template = (id) => {
        this.props.actions.deleteUserTemplate(id);
    }

    //购买模板
    buyH5Template = (id, ledou, title) => {
        this.purchaseH5Tpl({
            id: id,
            name: title,
            ledou: ledou
        }, false).then(() => {
            this.reset();
            this.refreshTplList();
        });
    }
    //模板提交审核事件
    submitCheck = (resId) => {
        this.props.actions.applyAuditResources({
            resType: 'h5Tpl',
            resId: resId,
        });
    }
    // 编辑模板事件
    editH5Template = (id) => {
        Modal.confirm({
            title: '确定要修改该模板吗？',
            content: '您可以修改模板的内容，也可以重新设置封面、标题与分类',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                redirect('h5.html#/edit/tpl/' + id);
            }
        });
    }
    //渲染筛选标签
    _renderTag = () => {
        const {userTagList} = this.props.tag;
        let data = [];
        let defaultSelectedKeys = [];
        _.map(userTagList, (tag, index) => {
            let tagObj = {
                title: tag.name,
                key: tag.id,
                children: [{
                    title: '全部',
                    key: index.toString()
                }]
            };
            defaultSelectedKeys.push(index.toString());
            _.map(tag.tags, (item) => {
                let detailTag = {
                    title: item.name,
                    key: item.tagId,
                    type: item.type
                };
                tagObj.children.push(detailTag);
            });
            data.push(tagObj);
        });
        return [data, defaultSelectedKeys];
    }

    _renderH5TemplateList = (type) => {
        const {activityList} = this.props.tpl;
        return (<H5HotTemplateList tagList={this.state.data}
                                   defaultSelectedKeys={this.state.defaultSelectedKeys}
                                   data={activityList}
                                   type={type}
                                   h5Type={'/h5/tpl/all/' + this.props.params.key}
                                   categorytype={this.state.type}
                                   list={this.getTplList}
                                   favTpl={this.favTpl}
                                   cancelFavTpl={this.cancelFavTpl}
                                   buyH5Template={this.buyH5Template}
                                   _saveFilterConditions={this._saveFilterConditions}
                                   onPreview={this.onPreview}
            />
        );
    }

    // 预览回调
    onPreview = (content, i) => {
        this.showView('templatePreviewShow', {
            contentList: content,
            index: i
        }, null);

        this.getTplData(content[i].id);

    };

    //使用模板
    useH5Template = (item) => {
        const id = item ? '/' + item.id : '';
        redirect('h5.html#/add' + id, '_blank');
    };

    //收藏/取消模板
    collectTemplate = (item) => {
        if (item.faved) {
            this.cancelFavTpl(item.id);
        } else {
            this.favTpl(item.id);
        }
    }
    //保存筛选条件
    _saveFilterConditions = (params) => {
        this.setState({
            sort: params.sort,
            order: params.order,
            tag: params.tag
        });
    }

    render() {
        const {activityList} = this.props.tpl;
        const type = this.props.params.key;
        const isShowTemplatePreviewShow = this.isShowView('templatePreviewShow');
        const {info} = this.props.auth;
        return (
            <div className='app-page h5Page h5-tpl'>
                <TabHeader activeKey={this.props.activeKey + this.props.params.key} tabKey='h5'
                           h5CheckKeys='published'
                           tplCheckKeys={this.props.params.key}/>
                <div className='h5tpl-container'>
                    <Tabs defaultActiveKey={this.props.params.key}
                          className='h5-detail-tabs'
                          animated={false}
                          onChange={this.onTabChange}>
                        <TabPane tab='热门模板' key='platform'>
                            {type === 'platform' &&
                            this._renderH5TemplateList('hot')
                            }
                        </TabPane>
                        <TabPane tab='已收藏' key='favorite'>
                            {type === 'favorite' &&
                            this._renderH5TemplateList('favord')
                            }
                        </TabPane>
                        <TabPane tab='已购买' key='bought'>
                            {type === 'bought' &&
                            this._renderH5TemplateList('bought')
                            }
                        </TabPane>
                        {
                            info.isVuser &&
                            <TabPane tab='我生成的模板' key='my'>
                                {
                                    type === 'my' &&
                                    <MyH5HotTemplateList data={activityList}
                                                         h5Type={'/h5/tpl/all/' + this.props.params.key}
                                                         categorytype={this.props.params.key}
                                                         list={this.getTplList}
                                                         appType={this.state.appType}
                                                         auditStatus={this.state.auditStatus}
                                                         deleteH5Template={this.deleteH5Template}
                                                         submitCheck={this.submitCheck}
                                                         onPreview={this.onPreview}
                                    />
                                }
                            </TabPane>
                        }
                    </Tabs>
                </div>
                {
                    isShowTemplatePreviewShow &&
                    <TemplatePreviewShow
                        visible={isShowTemplatePreviewShow}
                        contentList={this.state.viewParam.contentList}
                        index={this.state.viewParam.index}
                        tplData={this.state.viewData}
                        reset={this.reset}
                        type={this.state.type}
                        getTplData={this.getTplData}
                        useH5Template={this.useH5Template}
                        collectTemplate={this.collectTemplate}
                        buyH5Template={this.buyH5Template}
                        editH5Template={this.editH5Template}
                        submitCheck={this.submitCheck}
                        deleteH5Template={this.deleteH5Template}
                    />
                }
            </div>
        );
    }
}


