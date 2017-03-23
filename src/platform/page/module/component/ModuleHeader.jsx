import React from 'react';
import {Tabs} from 'antd';
import {withRouter} from 'react-router';
const TabPane = Tabs.TabPane;

@withRouter
export default class extends React.Component {

    handleChange = (key)=> {
        this.props.router.push(key);
    }

    render() {

        return (
            <Tabs type="card"
                  tabBarExtraContent={this.props.tabBarExtraContent}
                  activeKey={this.props.activeKey}
                  onChange={this.handleChange}>
                <TabPane tab="产品配置" key="/module/config"></TabPane>
                <TabPane tab="功能管理" key="/module/list"></TabPane>
                {/*<TabPane tab="业务角色管理" key="/module/role"></TabPane>*/}
            </Tabs>
        );
    }
}
