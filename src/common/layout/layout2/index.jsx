import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import {getUserInfo, logout} from '../../store/auth/action';
import './index.less';
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
            <div className="ant-layout-topaside">
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
                        <aside className="ant-layout-sider">
                            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                                <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
                                    <Menu.Item key="1">选项1</Menu.Item>
                                    <Menu.Item key="2">选项2</Menu.Item>
                                    <Menu.Item key="3">选项3</Menu.Item>
                                    <Menu.Item key="4">选项4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
                                    <Menu.Item key="5">选项5</Menu.Item>
                                    <Menu.Item key="6">选项6</Menu.Item>
                                    <Menu.Item key="7">选项7</Menu.Item>
                                    <Menu.Item key="8">选项8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification" />导航三</span>}>
                                    <Menu.Item key="9">选项9</Menu.Item>
                                    <Menu.Item key="10">选项10</Menu.Item>
                                    <Menu.Item key="11">选项11</Menu.Item>
                                    <Menu.Item key="12">选项12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </aside>
                        <div className="ant-layout-content">
                            <div>
                                <div style={{clear: 'both'}}>
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ant-layout-footer">
                        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
                    </div>
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

