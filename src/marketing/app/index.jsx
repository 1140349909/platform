import React from 'react';
import AppBase from 'common/base/AppBase';
import AppLoading from 'common/component/AppLoading';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as authAction from 'common/store/auth/action';
import {ROLE} from 'common/config/constants';
import AuthComponentBase from 'common/base/AuthComponentBase';

@connect(
    state => ({
        operation: state.operation,
        auth: state.auth.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            getUserInfo: authAction.getUserInfo,
            getUinVersionInfo: authAction.getUinVersionInfo,
            logout: authAction.logout
        }, dispatch)
    })
)
@withRouter
export default class App extends AppBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // 初始化用户信息
        this.props.actions.getUserInfo();

        // 初始化产品信息
        this.props.actions.getUinVersionInfo();
    }

    componentWillReceiveProps(nextProps) {
        const {operation, auth} = nextProps;

        if (operation.type == authAction.GET_USER_INFO_SUCCESS) {
            // 最大角色小于manager, 注销登录
            if (auth.info.role < ROLE.MANAGER) {
                return this.props.actions.logout(true);
            }
            AuthComponentBase.USER = auth.info;
            AuthComponentBase.PERMISSIONS = auth.permissions;
        }

        if (operation.type == authAction.GET_UIN_VERSION_INFO_SUCCESS) {
            // 产品版本信息
            AuthComponentBase.VERSION = auth.version;
            // 把权限配置注入到ComponentBase中
            AuthComponentBase.MODULES = auth.modules;
            // 把权益配置注入到ComponentBase中
            AuthComponentBase.RIGHTS = auth.rights;
        }

        if (operation.type == authAction.GET_USER_INFO_FAILURE ||
            operation.type == authAction.GET_UIN_VERSION_INFO_FAILURE) {
            // 初始化失败, 注销登录
            return this.props.actions.logout(true);
        }
    }


    render() {
        // TODO:此处待优化为可支持游客版本

        const {info, version, isLoaded} = this.props.auth;

        if (!isLoaded || !info || !version) {
            return (<AppLoading />);
        }

        // 最大角色小于manager, 注销登录
        if (info.role < ROLE.MANAGER) {
            return null;
        }

        return (<div className="app">{this.props.children}</div>);
    }
}
