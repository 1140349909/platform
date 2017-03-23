import React from 'react';
import PageBase from 'common/base/PageBase';
import {message, Tabs,Card} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SiteForm from './component/SiteForm';
import PermissionForm from './component/PermissionForm';

import SettingCard from './component/SettingCard';
import SettingMallModifyForm from '../../component/SettingModifyForm/MallModifyForm';
import SettingCusModifyForm from '../../component/SettingModifyForm/CusModifyForm';
import SettingWechatModifyForm from '../../component/SettingModifyForm/WechatModifyForm';

import * as mallAction from '../../store/mall/action';
import * as vsiteAction from '../../store/vsite/action';
import * as customerAction from '../../store/customer/action';

const TabPane = Tabs.TabPane;

// TODO:[anyWhereModule: PLATFORM_MICSITE_MODULE]

@connect(
    state => ({
        mall: state.mall.toJS(),
        customer: state.customer.toJS(),
        auth: state.auth.toJS(),
        vsite: state.vsite.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...mallAction,
            ...customerAction,
            ...vsiteAction,
        }, dispatch)
    })
)

export default class SiteIndex extends PageBase {
    constructor(props) {
        super(props);

        this.state = {
            mallBasic: null,
            menu: props.auth.menu,
            uin: props.auth.info.uin,
            customerInfo:null,
            type:null,
            currentData:null
        };
    }

    componentDidMount() {
        this.getAdminCustomer();
        this.getVSiteConfig();
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            // 获取获取客户信息
            case customerAction.GET_ADMIN_CUSTOMER_SUCCESS:
                this.setState({
                    type: 'loaded',
                    customerInfo: nextProps.customer.customerInfo
                });
                break;
            case vsiteAction.GET_VSITE_CONFIG_SUCCESS:
                this.setState({
                    type: 'loaded',
                    mallBasic: nextProps.vsite.mallBasic
                });
                break;
            case vsiteAction.ADD_VSITE_CONFIG_SUCCESS:
                message.success('保存成功！');
                this.reset();
                this.getVSiteConfig();
                break;
            case vsiteAction.ADD_VSITE_CONFIG_AUTH_SUCCESS:
                message.success('提交成功！');
                this.reset();
                this.getVSiteConfig();
                break;
            // 修改商城基本信息
            case vsiteAction.ADD_VSITE_BASIC_SUCCESS:
                message.success('提交成功！');
                this.getVSiteConfig();
                break;
            // 修改客服
            case vsiteAction.ADD_VSITE_CUS_SUCCESS:
                message.success('修改成功！');
                this.reset();
                this.getVSiteConfig();
                break;
            // 修改客户
            case customerAction.UPDATE_ADMIN_CUSTOMER_SUCCESS:
                message.success('修改成功！');
                this.reset();
                this.getAdminCustomer();
                break;
            // 修改微信
            case customerAction.UPDATE_CUSTOMER_WECHAT_SUCCESS:
                message.success('修改成功！');
                this.reset();
                this.getAdminCustomer();
                break;
        }
    }

    // 修改微信
    updateWechat = (para) => {

        this.props.actions.updateCustomerWechat(
            this.state.customerInfo.id,
            para
        );
    };

    getAdminCustomer = ()=>{
        this.props.actions.getAdminCustomer();
    };

    // 显示商城基本设置修改弹出层
    showMallModify = (data) => {
        this.setState({
            type: 'showMallModify',
            currentData: data,
        });
    };

    // 显示客服基本设置修改弹出层
    showCusModify = (data) => {
        this.setState({
            type: 'showCusModify',
            currentData: data,
        });
    };

    // 显示客户基本设置修改弹出层
    showCustomerModify = (data) => {
        this.setState({
            type: 'showCustomerModify',
            currentData: data,
        });
    };

    // 修改商城基本信息
    mallModify = (data) => {
        this.props.actions.addVSiteBasic(data);
    };

    // 修改客户基本信息
    cusModify = (data) => {
        this.props.actions.addVSiteCus(data);
    };

    //暂时保留内置reset
    // 重置type
    reset = () => {
        this.setState({
            type: 'init'
        });
    };

    addVSiteConfig = (data) => {

        this.props.actions.addVSiteConfig(data);
    };

    //获取商城信息
    getVSiteConfig = () => {

        this.props.actions.getVSiteConfig();
    };

    //更新商城权限配置
    addVSiteConfigAuth = (data) => {

        this.props.actions.addVSiteConfigAuth(data);
    };


    render() {

        let {mallBasic, menu, uin,customerInfo,type,currentData} = this.state;

        return (
            <div className="app-page" style={{'height':'100%'}}>
                <Card title="微站设置" style={{'height':'100%','overflowY':'scroll'}}>
                    <Tabs type="card"
                          animated={false}>
                        <TabPane tab="基本信息" key="0">
                            {
                                customerInfo && mallBasic && <SettingCard
                                    reset={this.reset}
                                    data={customerInfo}
                                    dataMall={mallBasic}
                                    showMallModify={this.showMallModify}
                                    showCusModify={this.showCusModify}
                                    showCustomerModify={this.showCustomerModify}
                                    mallModify={this.mallModify}
                                />
                            }
                            <SettingMallModifyForm
                                type={type}
                                data={mallBasic}
                                currentData={currentData}
                                reset={this.reset}
                                mallModify={this.mallModify}/>


                            <SettingWechatModifyForm
                                type={type}
                                data={customerInfo}
                                currentData={currentData}
                                reset={this.reset}
                                updateWechat={this.updateWechat}/>

                            <SettingCusModifyForm
                                type={type}
                                data={mallBasic}
                                currentData={currentData}
                                reset={this.reset}
                                cusModify={this.cusModify}/>
                        </TabPane>
                        <TabPane tab="微站模块" key="1">
                            <PermissionForm
                                uin={uin}
                                menu={menu}
                                mallAuth={this.addVSiteConfigAuth}
                                data={mallBasic}/>
                        </TabPane>
                        <TabPane tab="微站布局" key="2">
                            <SiteForm
                                data={mallBasic}
                                updateSiteConfig={this.addVSiteConfig}
                            />
                        </TabPane>
                    </Tabs>
                </Card>

            </div>
        );
    }
}
