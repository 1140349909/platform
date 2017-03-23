import React from 'react';
import PageBase from 'common/base/PageBase';
import {Modal, Button, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  ManagerList from './component/ManagerList';
import * as accountAction from '../../store/account/action';
import  * as userAction from '../../store/user/action';
import * as ledouAction from '../../store/ledou/action';
import * as versionAction from '../../store/version/action';
import * as authAction from 'common/store/auth/action';
import config from 'common/config';
import * as module from 'common/config/module';
import * as right from 'common/config/right';
import AuthModule from 'common/component/AuthModule';
import  './list.less';
@connect(
    state => ({
        operation: state.operation,
        user: state.user.toJS(),
        auth: state.auth.toJS(),
        account: state.account.toJS(),
        ledou: state.ledou.toJS(),
        version: state.version.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...userAction,
            ...accountAction,
            ...ledouAction,
            ...versionAction,
            ...authAction
        }, dispatch)
    })
)
export default class AdminList extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null,
        size: 20,
        sendEmail: '', // 发送激活邮件的邮箱，用于在成功提示弹框中回显
    };

    componentDidMount() {
        this.getUserList({
            page: 0,
            size: this.state.size
        });
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case userAction.SEND_ACCOUNT_MAIL_SUCCESS :
                Modal.success({
                    title: '发送成功',
                    content: '邮件已发送至' + this.state.sendEmail + '用户的信箱了,请及时通知该用户确认',
                    onOk: () => {
                        this.reset();
                    }
                });
                this.getUserList({
                    page: 0,
                    size: this.state.size
                });
                break;
            case userAction.SEND_ACCOUNT_MAIL_FAILURE :
                message.warn(nextProps.user.itemStatus.errMsg);
                break;
            case userAction.UPDATE_USER_STATUS_SUCCESS :
                message.success('操作成功！');
                this.getUserList({page: 0, size: this.state.size});
                break;
            case ledouAction.TRADE_LEDOU_SERVICES_SUCCESS :
                this.reset();
                message.success('购买成功！');
                this.getLedouAmount();
                this.props.actions.getUinVersionInfo();
                break;
            case ledouAction.TRADE_LEDOU_SERVICES_FAILURE :
                message.error(operation.result.errMsg);
                break;
        }
    }

    //购买子账号
    showAdminBuyChildAccountModal = () => {
        this.purchaseServices({
            type: right.SUBACCOUNT_AMOUNT,
            usedValue: this.props.user.userList.totalElements
        }).then(() => {
            this.props.actions.getUinVersionInfo();
        });
    };
    //账号列表
    getUserList = ({page, size}) => {
        this.props.actions.getUserList({
            page, size
        });
    };
    //发送激活邮件
    sendAccountMail = (id, email) => {
        this.setState({sendEmail: email});
        const url = config.SSO_ORIGIN + '/#/resetPwd';
        this.props.actions.sendAccountMail({
            id, url
        })
        ;
    };
    //禁用和启用账户
    updateUserStatus = (status, id) => {
        this.props.actions.updateUserStatus(status, id);
    };
    //添加账号
    linkAdminModifyPage = (id) => {
        this.anyWhereModule(module.PLATFORM_ACCOUNT_CREATE).then(() => {
            this.props.router.push('/admin/edit/' + id);
        });
    }

    //账号类型
    getAccountTypeList = (params) => {
        this.props.actions.getAccountTypeList(params);
    }
    list = (page, size) => {
        this.getAccountTypeList({
            page,
            size
        });
    };
    //获取乐豆数量
    getLedouAmount = () => {
        this.props.actions.getLedouAmount();
    }
    //获取操作人员权限信息
    getVersionInfo = (versionId) => {
        this.props.actions.getVersionInfo(versionId);
    };
    //购买子账号
    tradeLeDouServices = (params) => {
        this.props.actions.tradeLeDouServices(params);
    }
    //最多可添加{item.maxValue}个子账号
    renderBuyAccount = () => {
        const {SUBACCOUNT_AMOUNT} = this.props.auth.rights;
        const {userList} = this.props.user;
        const num = userList && parseInt(SUBACCOUNT_AMOUNT.value) - parseInt(userList.totalElements);
        return (<div className='account-desc-container'>
            <label
                className='account-desc'>还可添加{num > 0 ? SUBACCOUNT_AMOUNT.value - userList.totalElements : 0}个成员。
                <AuthModule type={module.PLATFORM_ACCOUNT_CREATE}>
                    <span>点此<a className='account-buy' onClick={this.showAdminBuyChildAccountModal}>购买更多成员名额</a></span>
                </AuthModule>
            </label>
        </div>);
    }

    render() {
        const {userList} = this.props.user;
        const {info} = this.props.auth;
        const {item} = this.props.account;
        const {SUBACCOUNT_AMOUNT} = this.props.auth.rights;
        return (
            <div className='app-page app-page-account-list'>
                <div className='account-container'>
                    <div className='account-sideBar'>
                        <p className='title'>成员管理</p>
                        <AuthModule type={module.PLATFORM_ACCOUNT_CREATE}>
                            <Button className='account-add-btn' type='primary'
                                    disabled={userList && userList.totalElements >= SUBACCOUNT_AMOUNT ? parseInt(SUBACCOUNT_AMOUNT.value) : 0 ? true : false}
                                    onClick={() => this.linkAdminModifyPage('add')}>添加成员</Button>
                        </AuthModule>
                    </div>
                    <div className='account-info'>
                        {this.renderBuyAccount()}
                        {
                            info &&
                            <ManagerList className='account-info-list-table' data={this.props.user.userList}
                                         sendAccountMail={this.sendAccountMail}
                                         accountTypes={item}
                                         updateUserStatus={this.updateUserStatus}
                                         linkAdminModifyPage={this.linkAdminModifyPage}
                                         email={info.email}
                                         list={this.getUserList}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}


