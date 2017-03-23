import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from 'common/layout/layout3';
import Header from 'common/component/Header';
import Sidebar from 'common/component/Sidebar';
import Footer from 'common/component/Footer';
import * as authAction from 'common/store/auth/action';
import NotificationBadge from '../component/NotificationBadge';
// import {marketing} from 'common/config/menu';

@connect(
    state => ({
        auth: state.auth.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            getUserInfo: authAction.getUserInfo,
            selectMainMenu: authAction.selectMainMenu,
            logout: authAction.logout
        }, dispatch)
    })
)
export default class Dashboard extends React.Component {

    logout = () => {
        this.props.actions.logout(true);
    }

    render() {
        let {info, permissions, menu, version, uins} = this.props.auth;

        let {pathname} = this.props.location;

        const header = (<Header info={info}
                                permissions={permissions}
                                version={version}
                                uins={uins}
                                logout={this.logout}><NotificationBadge /></Header>);
        return (
            <Layout header={header}
                    sidebar={pathname != '/home' ? <Sidebar menu={menu}/> : null}
                    footer={<Footer/>}>
                {this.props.children}
            </Layout>
        );
    }
}

