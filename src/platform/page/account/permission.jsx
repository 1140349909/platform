import React from 'react';
import PageBase from 'common/base/PageBase';
import {message,Button,Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as accountAction from '../../store/account/action';
import AccountPermissionList from './component/AccountPermissionList';
import AccountPermissionForm from './component/AccountPermissionForm';

@connect(
    state => ({
        operation: state.operation,
        account:state.account.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...accountAction
        }, dispatch)
    })
)
export default class PermissionIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        list:{},
        info:{},
        viewParam: null,
        viewData:null
    };

    componentDidMount() {
        this.list(0);
        this.getModuleInfo({});
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case accountAction.GET_MODULE_INFO_SUCCESS:
                this.setState({
                    info: nextProps.account.info
                });
                break;
            case accountAction.GET_ACCOUNT_TYPE_LIST_SUCCESS:
                this.setState({
                    list: nextProps.account.list
                });
                break;
            case accountAction.GET_ACCOUNT_TYPE_SUCCESS:
                this.setState({
                    viewData: nextProps.account.item
                });
                break;
            case accountAction.ADD_ACCOUNT_TYPE_SUCCESS:
                message.success('添加成功！');
                this.list(0);
                this.reset();
                break;
            case accountAction.UPDATE_ACCOUNT_TYPE_SUCCESS:
                message.success('修改成功！');
                this.list(0);
                this.reset();
                break;
            case accountAction.COPY_ACCOUNT_TYPE_SUCCESS:
                message.success('复制成功！');
                this.list(0);
                break;
            case accountAction.SWITCH_ACCOUNT_TYPE_STATUS_SUCCESS:
                message.success('操作成功！');
                this.list(0);
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
        this.getAccountType(id);
    };

    list=(page,size)=>{
        this.getAccountTypeList({
            page,
            size
        });
    };

    getModuleInfo = (params)=>{
        this.props.actions.getModuleInfo(params);
    };

    getAccountTypeList = (params)=>{
        this.props.actions.getAccountTypeList(params);
    };

    getAccountType = (id)=>{
        this.props.actions.getAccountType(id);
    };

    addAccountType = (data)=>{
        this.props.actions.addAccountType(data);
    };

    updateAccountType = (params)=>{
        this.props.actions.updateAccountType(params);
    };

    copyAccountType = (params)=>{
        this.props.actions.copyAccountType(params);
    };

    switchAccountTypeStatus = (params)=>{

        let ruleStatus = {
            'false':true,
            'true':false
        };

        let data = {
            id:params.id,
            disabled:ruleStatus[params.disabled]
        };

        this.props.actions.switchAccountTypeStatus(data);

    };



    render() {

        const {operation} = this.props;

        const {list,info,viewParam,viewData} = this.state;

        const extra = (<Button type="primary" icon="plus" onClick={this.add}>新增</Button>);

        let isListLoading = operation.type == accountAction.GET_ACCOUNT_TYPE_LIST_PENDING;

        // 是否显示form
        const isShowPermissionForm = this.isShowView('form');

        return (
            <div className="app-page">
                <Card title="默认权限" extra={extra}>
                    <AccountPermissionList
                        data={list}
                        loading={isListLoading}
                        list={this.list}
                        edit={this.edit}
                        switchAccountTypeStatus={this.switchAccountTypeStatus}
                        copyAccountType={this.copyAccountType}
                    />
                    {
                        isShowPermissionForm && <AccountPermissionForm
                            info={info}
                            visible={isShowPermissionForm}
                            reset={this.reset}
                            param={viewParam}
                            data={viewData}
                            addAccountType={this.addAccountType}
                            updateAccountType={this.updateAccountType}
                        />
                    }
                </Card>
            </div>
        );
    }
}




