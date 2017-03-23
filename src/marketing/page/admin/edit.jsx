import React from 'react';
import PageBase from 'common/base/PageBase';
import {Breadcrumb} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {message} from 'antd';
import  JobInfoForm from './component/JobInfoForm';
import  * as userAction from '../../store/user/action';
import * as accountAction from '../../store/account/action';
import  * as  versionAction from '../../store/version/action';
import  './edit.less';
import _ from 'lodash';
@connect(
    state => ({
        operation: state.operation,
        user: state.user.toJS(),
        auth: state.auth.toJS(),
        account: state.account.toJS(),
        version: state.version.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...userAction,
            ...accountAction,
            ...versionAction,
        }, dispatch)
    })
)
@withRouter
export default class ModifyAdmin extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null,
        title: '关联账号',
        versionData: null,//存储修改用户默认的权限
        isEdit: false,
        editId: null,//编辑账户的ID
        versionInfo: null,
        flag: false, //是否添加失败的标识  true 代表添加失败
    };

    componentDidMount() {
        const id = this.props.params.id;
        if (id != 'add') {
            this.setState({
                title: '修改账号',
                isEdit: true,
                editId: id
            });
            this.getAdminUserInfo(id);
        }
        this.list(false, 0);
    }


    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case versionAction.GET_VERSION_INFO_SUCCESS:
                this.setState({
                    versionData: operation.result.data.moduleIds
                });
                break;
            case userAction.ADD_ADMIN_USER_INFO_SUCCESS:
                message.success('账户关联成功！');
                this.linkToAdminListPage();
                break;
            case userAction.ADD_ADMIN_USER_INFO_FAILURE :
                this.setState({
                    flag: true
                });
                if (operation.result.errCode == '40004') {
                    message.error('该账户在Iloka平台不存在,不能进行账号关联操作');
                } else if (operation.result.errCode == '41002') {
                    message.error(operation.result.errMsg);
                } else {
                    message.error('账户关联失败，请联系Iloka运营人员了解详情');
                }
                break;
            case userAction.UPDATE_ADMIN_USERINFO_SUCCESS:
                message.success('账户修改成功！');
                this.linkToAdminListPage();
                break;
            case userAction.GET_ADMIN_USERINFO_SUCCESS:
                this.setState({
                    versionData: operation.result.data.moduleIds
                });
                break;
        }
    }

    linkToAdminListPage = () => {
        this.props.router.push('/admin');
    }

    //账号类型
    getAccountTypeList = (params) => {
        this.props.actions.getAccountTypeList(params);
    }

    list = (disabled, page, size) => {
        this.getAccountTypeList({
            page,
            size,
            disabled
        });
    };

    //操作人员详情
    getAdminUserInfo = (id) => {
        this.props.actions.getAdminUserInfo(id);
    }
    //获取操作人员权限信息
    getVersionInfo = (versionId) => {
        this.props.actions.getVersionInfo(versionId);
    };

    saveAdminUserInfo = (params) => {
        this.props.actions.saveAdminUserInfo(params);
    }

    render() {
        const accountType = this.props.account.item;
        const {userInfo} = this.props.user;
        if (this.state.editId != null && !this.state.flag) {
            this.data = userInfo;
        } else if (this.state.editId == null && this.state.flag) {
            this.data = userInfo;
        } else {
            this.data = {};
        }
        return (
            <div className='app-page app-page-admin-modify'>
                <div className='account-container'>
                    <div className='account-sideBar'>
                        <Breadcrumb className='title'>
                            <Breadcrumb.Item style={{'fontSize': 16}}><a onClick={this.linkToAdminListPage}>
                                账号管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item style={{'fontSize': 16}}><a
                                href='javascript:void(0);'>{this.state.title}</a></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className='account-info'>
                        {
                            !(_.isEmpty(this.data)) && this.state.editId &&
                            <JobInfoForm data={this.data}
                                         editId={this.state.editId}
                                         accountType={accountType.content}
                                         menu={this.props.auth.menu}
                                         saveAdminUserInfo={this.saveAdminUserInfo}
                            />
                        }
                        {
                            !this.state.isEdit &&
                            <JobInfoForm data={this.data}
                                         editId={this.state.editId}
                                         accountType={accountType.content}
                                         menu={this.props.auth.menu}
                                         saveAdminUserInfo={this.saveAdminUserInfo}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}


