import React from 'react';
import PageBase from 'common/base/PageBase';
import {message,Button,Modal,Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as versionAction from '../../store/version/action';
import AccountVersionList from './component/AccountVersionList';
import AccountVersionForm from './component/AccountVersionForm';
import {booleanToString} from '/common/util';
import {withRouter} from 'react-router';

@connect(
    state => ({
        operation: state.operation,
        version:state.version.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...versionAction
        }, dispatch)
    })
)
@withRouter

export default class VersionIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        list:{},
        //平台
        platModule:{},
        platModuleInfo:null,
        platAuth:{},
        //当前客户
        version:{},
        auth:{},

        viewParam: null,
        viewData:null
    };

    componentDidMount() {
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case versionAction.DELETE_VERSION_SUCCESS:
                message.success('删除成功！');
                this.list(0);
                break;
            case versionAction.GET_VERSION_LIST_SUCCESS:
                this.setState({
                    list: nextProps.version.list
                });
                break;
            case versionAction.GET_VERSION_SUCCESS:
                this.setState({
                    viewData: nextProps.version.item
                });
                break;
            case versionAction.GET_VERSION_MODULE_LIST_SUCCESS:
                this.setState({
                    platModule: nextProps.version.platModule
                });
                break;
            case versionAction.GET_VERSION_AUTH_SUCCESS:
                this.setState({
                    viewData: nextProps.version.platAuth
                });
                break;
            case versionAction.GET_VERSION_INFO_SUCCESS:
                this.setState({
                    version: nextProps.version.version
                });
                break;
            case versionAction.GET_VERSION_AUTH_INFO_SUCCESS:
                this.setState({
                    auth: nextProps.version.auth
                });
                break;
            case versionAction.ADD_VERSION_SUCCESS:
                message.success('添加成功！');
                this.list(0);
                this.reset();
                break;
            case versionAction.UPDATE_VERSION_SUCCESS:
                message.success('修改成功！');
                this.list(0);
                this.reset();
                break;
            case versionAction.COPY_VERSION_SUCCESS:
                message.success('复制成功！');
                this.list(0);
                break;
            case versionAction.SWITCH_VERSION_STATUS_SUCCESS:
                message.success('操作成功！');
                this.list(0);
                break;
            case versionAction.ADD_VERSION_AUTH_SUCCESS:
                message.success('开通成功！');
                this.list(0);
                this.reset();
                break;
            case versionAction.RESET_VERSION_RIGHTS_SUCCESS:
                this.getVersion(operation.result.params.id);
                break;
            case versionAction.GET_VERSION_MODULE_INFO_SUCCESS:
                this.setState({
                    platModuleInfo: nextProps.version.platModuleInfo
                });
                break;
            default:
                break;
        }
    }

    add = () => {
        this.showView('form', null, {});
    };

    edit = (id) => {
        this.showView('form', id);
        this.getVersion(id);
    };

    showSetRights = (id)=>{
        //跳转
        this.props.router.push('/account/rights/'+id);
    };

    showSetAuth = (id)=>{
        //跳转
        this.props.router.push('/account/service/'+id);
    };

    list=(page,size)=>{
        this.getVersionList({
            page,
            size
        });
    };

    deleteVersion=(id)=>{

        Modal.confirm({
            title: '警告',
            content: '你正要删除该版本，确定吗？',
            onOk:()=>this.props.actions.deleteVersion(id),
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });


    };

    getVersionInfo=(versionId)=>{
        this.props.actions.getVersionInfo(versionId);
    };

    getVersionList = (params)=>{
        this.props.actions.getVersionList(params);
    };

    getVersionModuleInfo=(tagId)=>{
        this.props.actions.getVersionModuleInfo(tagId);
    };

    getVersionModuleList=(params)=>{
        this.props.actions.getVersionModuleList(params);
    };

    getVersionAuth=(id)=>{
        this.props.actions.getVersionAuth(id);
    };

    getVersion = (id)=>{
        this.props.actions.getVersion(id);
    };

    getVersionAuthInfo=(versionId)=>{
        this.props.actions.getVersionAuthInfo(versionId);
    };

    addVersionAuth=(params)=>{
        this.props.actions.addVersionAuth(params);
    };

    addVersionRights=(params)=>{
        this.props.actions.addVersionRights(params);
    };

    updateVersion = (params)=>{
        this.props.actions.updateVersion(params);
    };

    addVersion = (data)=>{
        this.props.actions.addVersion(data);
    };

    copyVersion = (params)=>{
        this.props.actions.copyVersion(params);
    };

    resetVersionRights = (id)=>{
        this.props.actions.resetVersionRights(id);
    };

    switchVersionStatus = (params)=>{

        let versionStatus = {
            'true':'false',
            'false':'true'
        };

        let data = {
            id:params.id,
            disabled:versionStatus[booleanToString(params.disabled)]
        };

        this.props.actions.switchVersionStatus(data);

    };

    render() {

        const {operation} = this.props;

        const {list,viewParam,viewData} = this.state;

        const extra = (<Button type="primary" icon="plus" onClick={this.add}>新增</Button>);

        let isListLoading = operation.type == versionAction.GET_VERSION_LIST_PENDING;

        // 是否显示form
        const isShowVersionForm = this.isShowView('form');

        return (
            <div className="app-page">
                <Card title="默认版本" extra={extra}>

                    <AccountVersionList
                        data={list}
                        loading={isListLoading}
                        list={this.list}
                        edit={this.edit}
                        showSetRights={this.showSetRights}
                        showSetAuth={this.showSetAuth}
                        deleteVersion={this.deleteVersion}
                        switchVersionStatus={this.switchVersionStatus}
                        copyVersion={this.copyVersion}
                    />
                    {
                        isShowVersionForm && <AccountVersionForm
                            param={viewParam}
                            data={viewData}
                            visible={isShowVersionForm}
                            addVersion={this.addVersion}
                            updateVersion={this.updateVersion}
                            reset={this.reset}
                        />
                    }
                </Card>
            </div>
        );
    }
}




