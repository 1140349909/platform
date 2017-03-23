import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Layout from 'common/layout/layout3';
import Header from 'common/component/Header';
import Sidebar from 'common/component/Sidebar';
import Footer from 'common/component/Footer';
import * as authAction from 'common/store/auth/action';
import {platform} from 'common/config/menu';
@connect(
    state => ({
        auth: state.auth.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            getUserInfo: authAction.getUserInfo,
            logout: authAction.logout
        }, dispatch)
    })
)
export default class Dashboard extends React.Component {

    logout = ()=> {
        this.props.actions.logout(true);
    }

    render() {
        let {info, permissions} = this.props.auth;
        return (
            <Layout header={<Header info={info} permissions={permissions} logout={this.logout}/>}
                    sidebar={<Sidebar menu={platform}/>}
                    footer={<Footer/>}>
                {this.props.children}
            </Layout>
        );
    }
}

