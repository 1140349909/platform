import React from 'react';
import AppBase from 'common/base/AppBase';
import AppLoading from 'common/component/AppLoading';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
export default class App extends AppBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // 初始化用户信息
        this.props.actions.getUserInfo();
    }

    componentWillReceiveProps() {
        const {operation, auth} = this.props;

        if (operation.type == authAction.GET_USER_INFO_SUCCESS) {
            // 最大角色小于platform, 注销登录
            if (auth.info.role != ROLE.PLATFORM) {
                return this.props.actions.logout(true);
            }
            AuthComponentBase.USER = auth.info;
            AuthComponentBase.PERMISSIONS = auth.permissions;
        }

        if (operation.type == authAction.GET_USER_INFO_FAILURE ||
            operation.type == authAction.GET_UIN_VERSION_INFO_FAILURE) {
            // 初始化失败, 注销登录
            return this.props.actions.logout(true);
        }
    }

    render() {
        const {info} = this.props.auth;

        if (!info) {
            return (<AppLoading />);
        }

        // 无权限访问
        if (info.role != ROLE.PLATFORM) {
            return this.props.actions.logout(true);
        }

        return (<div className="app">{this.props.children}</div>);
    }
}
