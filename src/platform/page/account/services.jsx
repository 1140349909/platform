import React from 'react';
import PageBase from 'common/base/PageBase';
import {message, Button, Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as versionAction from '../../store/version/action';
import AccountAuthTable from './component/AccountAuthTable';
import {withRouter} from 'react-router';

@connect(
    state => ({
        operation: state.operation,
        version: state.version.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...versionAction
        }, dispatch)
    })
)
@withRouter

export default class AccountServiceIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        list: {},
        //平台
        platModule: {},
        platModuleInfo: null,
        platAuth: {},
        //当前客户
        version: {},
        auth: {},

        viewParam: this.props.params.id,
        viewData: null,

        formData:{
            modules:[]
        }
    };

    componentDidMount() {
        this.getVersionAuth(this.props.params.id);
        this.getVersionModuleInfo();
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;

        switch (operation.type) {
            case versionAction.GET_VERSION_AUTH_SUCCESS:
                this.setState({
                    viewData: nextProps.version.platAuth,
                    formData:{
                        modules: nextProps.version.platAuth.modules?nextProps.version.platAuth.modules:[]
                    }
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
            case versionAction.ADD_VERSION_AUTH_SUCCESS:
                message.success('保存成功！');

                // this.list(0);
                // this.reset();
                // this.jumpToBack();
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

    getVersionAuth = (id)=> {
        this.props.actions.getVersionAuth(id);
    };

    getVersionModuleInfo = (tagId)=> {
        this.props.actions.getVersionModuleInfo(tagId);
    };

    getVersion = (id)=> {
        this.props.actions.getVersion(id);
    };

    addVersionAuth = (params)=> {
        this.props.actions.addVersionAuth(params);
    };

    jumpToBack = ()=>{
        this.props.router.push('/account/version');
    };

    dataValidate = (item,passed)=>{

        item.children && item.children.map((childItem)=>{
            if(
                item.status == 'hidden' &&
                (childItem.status == 'visible_enable' || childItem.status == 'visible_disabled')
            ){
                message.destroy();
                message.error(childItem.name+' 和 '+item.name+' 状态冲突');
                passed = false;
            }else if(
                item.status == 'visible_disabled' &&
                (childItem.status == 'visible_enable')
            ){
                message.destroy();
                message.error(childItem.name+' 和 '+childItem.name+' 状态冲突');
                passed = false;
            }else{
                passed = this.dataValidate(childItem,passed);
            }
        });

        return passed;
    };

    handleSubmit = ()=>{

        const {viewParam,formData,platModuleInfo} = this.state;

        if(formData.modules.length == 0){
            message.error('设置不能为空');
            return null;
        }

        let passed = true;

        message.config({
            duration: 3,
        });

        platModuleInfo.tags.map((topItem)=>{

            passed = this.dataValidate(topItem,passed);

        });

        if(passed){
            this.addVersionAuth({
                id:viewParam,
                data:formData
            });
        }

        message.config({
            duration: 1.5,
        });

    };

    render() {

        const {operation} = this.props;

        const {platModuleInfo, viewParam, viewData,formData} = this.state;

        const extra = (
            <div>
                <Button type="primary" onClick={this.handleSubmit} style={{'marginRight':'10px'}}>保存</Button>
                <Button onClick={this.jumpToBack}>返回</Button>
            </div>
        );

        let isListLoading = operation.type == versionAction.GET_VERSION_MODULE_INFO_PENDING;

        return (
            <div className="app-page">
                <Card title="开通服务" extra={extra}>
                    {platModuleInfo && <AccountAuthTable
                        platModuleInfo={platModuleInfo}
                        loading={isListLoading}
                        param={viewParam}
                        formData={formData}
                        data={viewData}
                        addVersionAuth={this.addVersionAuth}
                        handleSubmit={this.handleSubmit}
                    />}
                </Card>
            </div>
        );
    }
}




