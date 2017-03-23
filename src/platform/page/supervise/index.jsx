import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Tabs, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ResourcesAction from '../../store/resources/action';
import * as TagAction from '../../store/tag/action';
import * as TplAction from '../../store/tpl/action';
import  ReasonModal from './component/ReasonModal';
import  EditSuperviseInfo from './component/EditSuperviseInfo';
import  PreviewSuperviseInfo  from './component/PreviewSuperviseInfo';
import AuditRecord from './component/AuditRecord';
import SuperviseList from './component/SuperviseList';
import SearchInput from 'common/component/SearchInput';
import _ from 'lodash';

const TabPane = Tabs.TabPane;
@connect(
    state => ({
        resources: state.resources.toJS(),
        operation: state.operation,
        tpl: state.tpl.toJS(),
        tag: state.tag.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...ResourcesAction,
            ...TplAction,
            ...TagAction
        }, dispatch)
    })
)
export default class SuperviseIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null,
        auditStatus: 's11',
        auditId: '',
        reasonStatus: '',
        tplBaseInfo: {},
        data: [],
        defaultSelectedKeys: [],
        updatePrice: false,
    };

    componentDidMount() {
        this.list({status: this.state.auditStatus, size: 10});
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case ResourcesAction.AUDIT_RESOURCES_SUCCESS:
                this.list({status: this.state.auditStatus});
                this.reset();
                break;
            case TagAction.GET_TAGS_LIST_SUCCESS:
                let tagType = operation.result.params.tagType;
                let tagData = this._renderTag(tagType);
                this.setState({
                    data: tagData,
                    defaultSelectedKeys: []
                }, () => {
                    this.showView('eidtSuperviseModal', null, {});
                });
                break;
            case  TplAction.UPDATE_TPL_SUCCESS:
                this.reset();
                this.list({status: this.state.auditStatus});
                message.success('修改成功');
                break;
            case TplAction.UPDATE_TPL_LEDOU_SUCCESS :
                this.reset();
                this.list({status: this.state.auditStatus});
                message.success('修改成功');
                break;
            case TplAction.GET_PLAT_TPL_INFO_SUCCESS :
                const {platTplInfo} = this.props.tpl;
                this.showView('previewSuperviseModal', null, {
                    appId: platTplInfo && platTplInfo.appId
                });
                break;
        }
    }

    list = (params) => {
        this.props.actions.getAuditStatusList(params);
    };

    onTabChange = (key) => {
        this.setState({
            auditStatus: key,
        }, () => {
            this.list({status: key != 'all' ? key : null, size: 10});
        });
    };
    _renderTabPane = () => {
        let superViseList = {
            's11': '待审核',
            's26': '待定价',
            's36': '待上架',
            's46': '已上架',
            's49': '已下架',
            's29': '未通过',
            'all': '全部'
        };
        let SUPERVISE_LIST = [];
        for (let i in superViseList) {
            if (superViseList.hasOwnProperty(i)) {
                SUPERVISE_LIST.push(
                    <TabPane tab={[superViseList[i]]} key={i}>
                    </TabPane>
                );
            }
        }
        return SUPERVISE_LIST;
    }
    //审查
    auditResources = (params) => {
        this.props.actions.auditResources(params);
    }
    // 获取模板数据服务
    getTplData = (id) => {
        this.props.actions.getTplData(id);
    }
    //获取模板基本信息
    getTplBaseInfo = (id) => {
        this.props.actions.getTplBaseInfo(id);
    }
    //修改模板
    updateTpl = ({
        id,
        coverMediaId,
        name,
        tags,
        ledou
    }) => {
        let status = '';
        if (this.state.auditStatus == 's11') {
            status = 's21';
        } else {
            status = 's31';
        }
        this.auditResources({
            id: id,
            auditStatus: status,
            content: '修改基本属性',
            extData: {
                coverMediaId,
                name,
                tags,
                ledou
            }
        });
    }
    //修改
    edit = (tplBaseInfo, flag) => {
        this.setState({
            tplBaseInfo: tplBaseInfo,
            updatePrice: flag
        }, () => {
            let appType = tplBaseInfo.resOwner.appType;
            if (appType == 'S') {
                this.getTagsList('h5Tpl');
            } else {
                this.getTagsList('app');
            }
        });
    }

    //详情
    preview = (tplBaseInfo) => {
        this.setState({
            tplBaseInfo: tplBaseInfo
        }, () => {
            this.getPlatTplInfo(tplBaseInfo.resId);
        });
    }
    getTagsList = (tagType) => {
        this.props.actions.getTagsList(tagType);
    }
    //渲染筛选标签
    _renderTag = (tagType) => {
        const {tagList} =this.props.tag;
        let data = [];
        _.map(tagList, (tag) => {
            let tagObj = {
                title: tag.name,
                key: tag.id,
                children: [],
            };
            if (tagType != 'h5Tpl') {
                tagObj.type = 'radioCancel';
            }
            _.map(tag.tags, (item) => {
                let detailTag = {
                    title: item.name,
                    key: item.name,
                    type: item.type
                };
                tagObj.children.push(detailTag);
            });
            data.push(tagObj);
        });
        return data;
    }
    showReasonModal = (params) => {
        this.setState({
            reasonStatus: params.auditStatus,
            auditId: params.id
        });
        this.showView('reasonModal', null, {});
    }
    auditReason = (content) => {
        this.auditResources({
            id: this.state.auditId,
            auditStatus: this.state.reasonStatus,
            content: content
        });
    }
    handleSearch = (keyword) => {
        this.list({
            status: this.state.auditStatus,
            keyword: keyword
        });
    }
    //GET_PLAT_TPL_INFO_SUCCESS
    getPlatTplInfo = (id) => {
        this.props.actions.getPlatTplInfo(id);
    }

    //显示审核记录
    showAuditRecord = (record) => {
        this.setState({
            tplBaseInfo: record
        }, () => {
            this.showView('auditRecordModal', null, {});
        });
    }

    render() {
        const {list} = this.props.resources;
        const isShowReasonModal = this.isShowView('reasonModal');
        const isShowEidtSuperviseModal = this.isShowView('eidtSuperviseModal');
        const isShowPreviewSuperviseModal = this.isShowView('previewSuperviseModal');
        const isShowAuditRecord = this.isShowView('auditRecordModal');
        const searchBar = (
            <span>
                <SearchInput
                    placeholder="请输入作品名称/作者账号"
                    onSearch={this.handleSearch}
                    clearLastValue={true}
                    status={this.state.auditStatus}
                    style={{width: 200}}/>
            </span>
        );
        return (
            <div className="app-page">
                <Card title="监管内容">
                    <Tabs onChange={(key) => this.onTabChange(key)} type="card" animated={false}
                          tabBarExtraContent={searchBar}>
                        {this._renderTabPane()}
                    </Tabs>
                    <SuperviseList data={list}
                                   auditStatus={this.state.auditStatus}
                                   auditResources={this.auditResources}
                                   showReasonModal={this.showReasonModal}
                                   showAuditRecord={this.showAuditRecord}
                                   preview={this.preview}
                                   edit={this.edit}
                                   list={this.list}/>
                </Card>
                {
                    isShowReasonModal &&
                    <ReasonModal reset={this.reset}
                                 auditReason={this.auditReason}
                                 auditStatus={this.state.reasonStatus}
                                 visible={isShowReasonModal}/>
                }
                {
                    isShowEidtSuperviseModal &&
                    <EditSuperviseInfo reset={this.reset}
                                       tplBaseInfo={this.state.tplBaseInfo}
                                       updateTpl={this.updateTpl}
                                       tagList={this.state.data}
                                       auditStatus={this.state.auditStatus}
                                       flag={this.state.updatePrice}
                                       visible={isShowEidtSuperviseModal}/>
                }
                {
                    isShowPreviewSuperviseModal &&
                    <PreviewSuperviseInfo reset={this.reset}
                                          tplBaseInfo={this.state.tplBaseInfo}
                                          handleOk={this.state.handleEvent}
                                          auditStatus={this.state.auditStatus}
                                          viewData={this.state.viewData}
                                          visible={isShowPreviewSuperviseModal}/>
                }
                {
                    isShowAuditRecord &&
                    <AuditRecord data={this.state.tplBaseInfo} reset={this.reset}
                                 visible={isShowAuditRecord}/>
                }
            </div>
        );
    }
}
