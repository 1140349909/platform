import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Menu, Breadcrumb} from 'antd';
import './index.less';
import {getUserInfo, logout} from '../../store/auth/action';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {}

    componentDidMount() {
        this.props.actions.getUserInfo();
    }

    render() {
        return (
            <div className="ant-layout-top">
                <div className="ant-layout-header">
                    <div className="ant-layout-wrapper">
                        <div className="ant-layout-logo"></div>
                        <Menu theme="dark" mode="horizontal"
                              defaultSelectedKeys={['2']} style={{lineHeight: '64px'}}>
                            <Menu.Item key="1">导航一</Menu.Item>
                            <Menu.Item key="2">导航二</Menu.Item>
                            <Menu.Item key="3">导航三</Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="ant-layout-subheader">
                    <div className="ant-layout-wrapper">
                        <Menu mode="horizontal"
                              defaultSelectedKeys={['1']} style={{marginLeft: 124}}>
                            <Menu.Item key="1">二级导航</Menu.Item>
                            <Menu.Item key="2">二级导航</Menu.Item>
                            <Menu.Item key="3">二级导航</Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="ant-layout-wrapper">
                    <div className="ant-layout-breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                            <Breadcrumb.Item>某应用</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="ant-layout-container">
                        {this.props.children}
                    </div>
                </div>
                <div className="ant-layout-footer">
                    Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
                </div>
            </div>
        );
    }
}


// 默认属性
Dashboard.defaultProps = {
    auth: {},
    children: null
};

const mapStateToProps = (state) => {
    const {auth} = state;
    return {
        auth: auth ? auth : null,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getUserInfo,
            logout
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

