import React from 'react';
import PageBase from 'common/base/PageBase';
import {withRouter} from 'react-router';
import {message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal} from 'antd';
import UpdateMobileForm from './component/UpdateMobileForm';
import BindMobileForm from './component/BindMobileForm';
import BindEmailForm from './component/BindEmailForm';
import UpdateEmailForm from './component/UpdateEmailForm';
import UpdateUserPassword from './component/UpdateUserPassword';
import UserBasicInfo from './component/UserBasicInfo';
import UserSecurSetting from './component/UserSecurSetting';
import {getRole} from 'common/config/constants';
import * as userAction from '../../store/user/action';
import * as smsAction from '../../store/sms/action';
import * as authAction from 'common/store/auth/action';
import * as versionAction from '../../store/version/action';
import config from 'common/config';
import {getThirdpartyUrl} from 'common/util/url';
import {redirect} from 'common/util';
import  './info.less';
@connect(
    state => ({
        operation: state.operation,
        auth: state.auth.toJS(),
        user: state.user.toJS(),
        sms: state.sms.toJS(),
        unbindInfo: state.user.toJS().unbindInfo,
        version: state.version.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...userAction,
            ...authAction,
            ...smsAction,
            ...versionAction,
        }, dispatch)
    })
)
@withRouter
export default class Info extends PageBase {
    constructor(props) {
        super(props);
    }

    // 获取第三方授权结果
    getOAuth = () => {
        var oauth = this.props.location.query.oauth;
        if (oauth) {
            try {
                return JSON.parse(decodeURIComponent(oauth));
            } catch (ex) {
                return null;
            }
        } else {
            return null;
        }
    }

    checkBindStatus = () => {
        const oauth = this.getOAuth();
        if (oauth) {
            const {operation, status} = oauth;
            if (operation === 'bind' && (status === 'done' || status === 'occupied' || status === 'failed')) {
                switch (status) {
                    case 'done':
                        message.success('绑定成功');
                        break;
                    case 'occupied':
                        message.error('绑定失败，已经绑定过其他营销管家账号');
                        break;
                    case 'failed':
                        message.error('绑定失败');
                        break;
                }
            }
            this.props.router.replace('/user/info');
        }
    }

    state = {
        viewType: '',
        viewParam: {},
        viewData: {},
        userMobile: {
            mobile: '',
            code: '',
            smsCode: '',
            title: '修改手机号',
            flag: null,//0代表原手机验证，1代表新手机绑定
            password: '',
        },
        isAvailableMobile: null,
        mobileValidateStatus: null,
        emailValidateStatus: null,
        userEmail: {
            email: '',
            code: '',
            verifyCode: '',
            emailFlag: null,//0代表原邮箱验证，1代表新邮箱绑定
        },
        pwdParams: {
            oldPassWord: '',
            password: ''
        },
        versionId: null,
        emailCodeStatus: null,//邮箱验证码是否发送成功
    }

    componentDidMount() {
        this.checkBindStatus();
        this.getUserVersionList({});
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case userAction.UPDATE_USER_INFO_SUCCESS:
                message.success('修改成功');
                this.reset();
                this.props.actions.getUserInfo();
                break;
            case authAction.GET_USER_INFO_SUCCESS :
                this.setState({
                    userInfo: nextProps.auth
                });
                break;
            case userAction.VALIDATE_USER_MOBILE_SUCCESS :
                this.reset();
                this.setState({
                    userMobile: {
                        code: operation.result.data, //原手机验证后的安全码
                        title: '新手机号',
                        flag: 1,
                    }
                });
                this.showSetMobileForm(1);
                break;
            case userAction.VALIDATE_USER_MOBILE_FAILURE :
                this.setState({
                    userMobile: {
                        code: operation.result.params.code,
                        mobile: operation.result.params.mobile,
                        title: '修改手机号',
                        flag: 0,
                    },
                });
                message.error(operation.result.errMsg);
                break;
            case userAction.BIND_USER_MOBILE_SUCCESS:
                const pwd = operation.result.params.password;
                if (pwd) {
                    Modal.success({
                        title: '密码设置成功，去登录',
                        onOk: () => {
                            this.props.actions.logout(true);
                        }
                    });
                } else {
                    message.success('绑定成功');
                    this.getUserInfo();
                }
                this.reset();
                break;
            case userAction.BIND_USER_MOBILE_FAILURE:
                this.setState({
                    userMobile: {
                        smsCode: operation.result.params.code,
                        mobile: operation.result.params.mobile,
                    },
                });
                message.error(operation.result.errMsg);
                break;
            case userAction.AVAILABLE_USER_MOBILE_PENDING:
                this.setState({
                    mobileValidateStatus: 'validating'
                });
                break;
            case userAction.AVAILABLE_USER_MOBILE_SUCCESS:
                const {available} = operation.result.data;
                this.setState({
                    mobileValidateStatus: available ? 'success' : 'error'
                });
                break;
            case userAction.AVAILABLE_USER_EMAIL_PENDING:
                this.setState({
                    emailValidateStatus: 'validating'
                });
                break;
            case userAction.AVAILABLE_USER_EMAIL_SUCCESS:
                const {data} = operation.result;
                this.setState({
                    emailValidateStatus: data.available ? 'success' : 'error',
                    userEmail: {
                        email: data.email,
                        emailFlag: this.state.userEmail.emailFlag,
                        verifyCode: this.state.userEmail.verifyCode
                    }
                });
                break;
            case userAction.AVAILABLE_USER_EMAIL_FAILURE :
                this.setState({
                    emailValidateStatus: 'error',
                    userEmail: {
                        email: operation.result.data.email
                    }
                });
                break;
            case userAction.BIND_USER_EMAIL_SUCCESS:
                this.reset();
                message.success('修改成功');
                this.getUserInfo();
                break;
            case userAction.BIND_USER_EMAIL_FAILURE :
                this.setState({
                    emailValidateStatus: 'error' //发送失败
                });
                message.error(operation.result.errMsg);
                break;
            case userAction.BIND_USER_EMAIL_CODE_FAILURE :
                this.setState({
                    emailCodeStatus: false //发送失败
                });
                message.error(operation.result.errMsg);
                break;
            case userAction.UPDATE_USER_PASSWORD_SUCCESS:
                this.reset();
                break;
            case userAction.UPDATE_USER_UNBIND_SUCCESS:
                message.success('解绑成功');
                this.getUserInfo();
                break;
            case userAction.UPDATE_USER_UNBIND_FAILURE:
                message.error(operation.result.errMsg);
                break;
            case userAction.UPDATE_ACCOUNT_PASSWORD_SUCCESS :
                this.reset();
                this.props.actions.logout(true);
                break;
            case userAction.UPDATE_ACCOUNT_PASSWORD_FAILURE :
                this.setState({
                    pwdParams: {
                        oldPassWord: operation.result.params.oldPassWord,
                        password: operation.result.params.password
                    }
                });
                message.error('密码修改失败，请确认您的密码后再次修改');
                break;
            case versionAction.GET_USER_VERSION_LIST_SUCCESS:
                nextProps.version.list.content.map((item) => {
                    if (item.version == '300') {
                        this.setState({
                            versionId: item.id
                        });
                    }
                });
                break;
            case userAction.ALTER_CODE_TO_USER_EMAIL_FAILURE :
                this.setState({
                    emailCodeStatus: false,
                    userEmail: {
                        email: operation.result.params.email,
                        emailFlag: 0,//0代表原邮箱验证，1代表新邮箱绑定
                    },
                });
                message.error(operation.result.errMsg);
                break;
            case userAction.ALTER_USER_EMAIL_SUCCESS:
                this.reset();
                this.getUserInfo();
                break;
            case userAction.ALTER_USER_EMAIL_FAILURE:
                message.error(operation.result.errMsg);
                break;
            case userAction.ALTER_SURE_USER_EMAIL_SUCCESS:
                this.reset();
                this.setState({
                    userEmail: {
                        emailFlag: 1,//0代表原邮箱验证，1代表新邮箱绑定
                        verifyCode: operation.result.data.verifyCode
                    },
                });
                this.showView('bindEmailForm', null, {});
                break;
            case userAction.ALTER_SURE_USER_EMAIL_FAILURE:
                this.setState({
                    userEmail: {
                        email: operation.result.params.email,
                        code: operation.result.params.code,
                        emailFlag: 0,//0代表原邮箱验证，1代表新邮箱绑定
                    },
                });
                message.error(operation.result.errMsg);
                break;
        }
    }

    //修改用户信息
    updateUserInfo = (params) => {
        this.props.actions.updateUserInfo(params);
    }
    getUserInfo = () => {
        this.props.actions.getUserInfo();
    }
    getRoleName = (roles) => {
        return getRole(roles);
    }

    //修改手机号
    showUpdateMobileForm = (mobile) => {
        this.setState({
            userMobile: {
                mobile: mobile,
                title: '修改手机号',
                flag: 0//0代表原手机验证，1代表新手机绑定
            }
        });
        this.showView('updateMobileForm', null, {});
    }
    //设置新手机号
    showSetMobileForm = (flag) => {
        this.setState({
            userMobile: {
                flag: flag//0代表原手机验证，1代表新手机绑定
            }
        });
        this.showView('bindMobileForm', null, {});
    }
    //发送验证码
    captchaMobile = (mobile) => {
        this.props.actions.captchaMobile(mobile);
    }
    //发送邮件
    bindMobileByEmail = () => {
        this.props.actions.bindMobileByEmail();
    }
    //用户设置手机号码 设置新手机号码
    /*bindMobileSmsCode = (params) => {
     this.props.actions.bindMobileSmsCode(params);
     }*/
    //验证手机号码
    validateMobile = (record) => {
        this.setState({
            mobile: record.mobile,
            code: record.code
        });
        this.props.actions.validateMobile(record);
    }
    //绑定邮箱
    showBindEmailForm = () => {
        const {info}=this.props.auth;
        this.setState({
            userEmail: {
                email: info.email
            }
        });
        this.showView('bindEmailForm', null, {});
    }
    //修改邮箱
    showUpdateEmailForm = () => {
        const {info}=this.props.auth;
        this.setState({
            userEmail: {
                email: info.email,
                emailFlag: 0
            }
        });
        this.showView('updateEmailForm', null, {});
    }
    //设置密码
    setPassword = () => {
        message.error('请先绑定手机号码');
    }
    showUpdateUserPassword = () => {
        this.showView('updateUserPassword', null, {});
    }
    //修改密码
    updateUser = (params) => {
        this.props.actions.updateUser(params);
    }
    bindUserMobile = (params) => {
        this.props.actions.bindUserMobile(params);
    }
    //用户手机号码是否可用
    availableUserMobile = (mobile) => {
        this.props.actions.availableUserMobile(mobile);
    }
    //设置邮件
    bindUserEmail = (params) => {
        this.setState({
            userEmail: {
                email: params.email,
                code: params.code
            }
        });
        this.props.actions.bindUserEmail(params);
    }
    //检测邮件
    availableUserEmail = (email) => {
        this.props.actions.availableUserEmail(email);
    }
    //邮件发送
    bindUserEmailCode = (email) => {
        this.props.actions.bindUserEmailCode(email);
    }
    //获取当前账号的版本信息
    getVersionInfo = () => {
        this.props.actions.getVersionInfo();
    }

    // 绑定第三方
    bindSocialAccount = (channel) => {
        var TYPES = {
            'wx': 'wechat',
            'wb': 'weibo',
            'qq': 'qq'
        };
        var type = TYPES[channel];
        redirect(
            getThirdpartyUrl({
                type,
                operation: 'bind',
                url: config.UPGRADE_CHARGE_URL
            })
        )
    }

    // 解除第三方
    unbindSocialAccount = (channel) => {
        this.props.actions.updateUserUnbind({
            channel
        });
    }

    _reset = () => {
        this.openQQ.payWin && this.openQQ.close();
        this.openWeibo.payWin && this.openWeibo.close();
    }

    //修改密码
    updateUserPassword = (params) => {
        this.props.actions.updateUserPassword(params);
    }

    getUserVersionList = (params) => {
        this.props.actions.getUserVersionList(params);
    };

    /**
     * 修改邮箱
     * 1.发送邮箱验证码  alterCodeToUserEmail
     * 2.验证原邮箱和验证码是否有效和正确  alterSureUserEmail 返回code标识
     * 3.验证新邮箱  availableUserEmail
     * 4.向新邮箱发送邮件 alterCodeToUserEmail
     * 5.确认修改邮箱 alterUserEmail
     * @returns {XML}
     */
    alterCodeToUserEmail = ({email, verifyCode}) => {
        this.props.actions.alterCodeToUserEmail({
            email,
            verifyCode
        });
    }

    alterSureUserEmail = ({email, code}) => {
        this.props.actions.alterSureUserEmail({
            email,
            code
        });
    }

    alterUserEmail = ({email, code, verifyCode}) => {
        this.props.actions.alterUserEmail({
            email, code, verifyCode
        });
    }

    render() {
        const isShowUpdateMobileForm = this.isShowView('updateMobileForm');
        const isShowBindMobileForm = this.isShowView('bindMobileForm');
        const isShowBindEmailForm = this.isShowView('bindEmailForm');
        const isShowUpdateUserPassword = this.isShowView('updateUserPassword');
        const isShowUpdateEmailForm = this.isShowView('updateEmailForm');
        console.log(this.props.auth);
        return (
            <div className='app-page app-page-user-info'>
                <UserBasicInfo info={this.props.auth}
                               version={this.props.auth.version}
                               updateUserInfo={this.updateUserInfo }
                               versionId={this.state.versionId}
                               getRoleName={this.getRoleName}/>
                <UserSecurSetting info={this.props.auth}
                                  reset={this.reset}
                                  bindSocialAccount={this.bindSocialAccount}
                                  unbindSocialAccount={this.unbindSocialAccount}
                                  setPassword={this.setPassword}
                                  showUpdateUserPassword={this.showUpdateUserPassword}
                                  showSetMobileForm={this.showSetMobileForm}
                                  showUpdateMobileForm={this.showUpdateMobileForm}
                                  showUpdateEmailForm={this.showUpdateEmailForm}
                                  showBindEmailForm={this.showBindEmailForm}/>

                {
                    isShowUpdateMobileForm &&
                    <UpdateMobileForm visible={isShowUpdateMobileForm}
                                      reset={this.reset}
                                      captchaMobile={this.captchaMobile}
                                      mobileValidateStatus={this.state.mobileValidateStatus}
                                      availableUserMobile={this.availableUserMobile}
                                      bindUserMobile={this.bindUserMobile}
                                      data={this.state.userMobile}
                                      validateMobile={this.validateMobile}/>
                }
                {
                    isShowBindMobileForm &&
                    <BindMobileForm visible={isShowBindMobileForm} reset={this.reset}
                                    info={this.props.auth}
                                    captchaMobile={this.captchaMobile}
                                    mobileValidateStatus={this.state.mobileValidateStatus}
                                    availableUserMobile={this.availableUserMobile}
                                    bindUserMobile={this.bindUserMobile}
                                    data={this.state.userMobile}/>
                }
                {
                    isShowBindEmailForm &&
                    <BindEmailForm visible={isShowBindEmailForm}
                                   info={this.props.auth.info}
                                   availableUserEmail={this.availableUserEmail}
                                   bindUserEmailCode={this.bindUserEmailCode}
                                   bindUserEmail={this.bindUserEmail}
                                   alterCodeToUserEmail={this.alterCodeToUserEmail}
                                   alterUserEmail={this.alterUserEmail}
                                   emailValidateStatus={this.state.emailValidateStatus}
                                   emailCodeStatus={this.state.emailCodeStatus}
                                   data={this.state.userEmail}
                                   reset={this.reset}/>
                }
                {
                    isShowUpdateEmailForm &&
                    <UpdateEmailForm visible={isShowUpdateEmailForm}
                                     info={this.props.auth.info}
                                     availableUserEmail={this.availableUserEmail}
                                     alterCodeToUserEmail={this.alterCodeToUserEmail}
                                     alterSureUserEmail={this.alterSureUserEmail}
                                     alterUserEmail={this.alterUserEmail}
                                     emailValidateStatus={this.state.emailValidateStatus}
                                     data={this.state.userEmail}
                                     reset={this.reset}
                    />
                }
                {
                    isShowUpdateUserPassword &&
                    <UpdateUserPassword visible={isShowUpdateUserPassword} reset={this.reset}
                                        validateMobile={this.validateMobile}
                                        data={this.state.pwdParams}
                                        updateUserPassword={this.updateUserPassword}/>
                }
            </div>
        );
    }
}



