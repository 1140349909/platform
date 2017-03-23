import React, {Component} from 'react';
import {Card,Tabs} from 'antd';
import Tooltip from 'common/component/Tooltip';
const TabPane = Tabs.TabPane;
import {withRouter} from 'react-router';
import './index.less';

@withRouter
export default class InvoiceBody extends  Component{
    constructor(props) {
        super(props);
    }
    onTabChange = (key)=> {
        this.props.router.push(key);
    };
    render(){
        const titleTip =  <h3 className="ant-card-head-title">发票管理<Tooltip type="invoice-add" placement="right"></Tooltip></h3>;
        return(
            <Card title={titleTip} className="app-page-invoice-card">
                <Tabs activeKey={this.props.activeKey} onChange={this.onTabChange} >
                    <TabPane tab="发票索取" key="/invoice/add"></TabPane>
                    <TabPane tab="发票列表" key="/invoice/list"></TabPane>
                    <TabPane tab="收件地址管理" key="/invoice/address"></TabPane>
                    <TabPane tab="发票信息管理" key="/invoice/title"></TabPane>
                </Tabs>
                <div>
                    {this.props.children}
                </div>
            </Card>
        );
    }
}

