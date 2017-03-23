import React from 'react';
import AppBase from 'common/base/AppBase';
import ContentLoading from 'common/component/ContentLoading';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as authAction from 'common/store/auth/action';
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
        this.props.actions.getUserInfo(true);

        // 初始化产品信息
        this.props.actions.getUinVersionInfo();
    }

    componentWillReceiveProps(nextProps) {
        const {operation, auth} = nextProps;

        if (operation.type == authAction.GET_USER_INFO_SUCCESS) {

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
    }


    render() {
        const {version, isLoaded} = this.props.auth;

        if (!isLoaded || !version) {
            return <ContentLoading text="初始化数据中..."/>;
        }

        return (<div className="app">{this.props.children}</div>);
    }
}
