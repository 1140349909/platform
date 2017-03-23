import React from 'react';
import {message} from 'antd';
import PageBase from 'common/base/PageBase';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PaywayCard from './component/PaywayCard';
import SettingWechatForm from './component/SettingWechatForm';
import SettingAliPayForm from './component/SettingAliPayForm';
import SettingMallModifyForm from '../../component/SettingModifyForm/MallModifyForm';
import SettingCusModifyForm from '../../component/SettingModifyForm/CusModifyForm';
import SettingWechatModifyForm from '../../component/SettingModifyForm/WechatModifyForm';

import * as mallAction from '../../store/mall/action';
import * as customerAction from '../../store/customer/action';
import './index.less';


@connect(
    state => ({
        mall: state.mall.toJS(),
        customer: state.customer.toJS(),
        operation: state.operation,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...mallAction,
            ...customerAction,
        }, dispatch)
    })
)

export default class PaywayIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        data: {},
        dataMall: {},
        currentData: {},
        type: 'init',
    };

    componentDidMount() {
        this.props.actions.getAdminCustomer();
        this.props.actions.getMallBasic();
        this.props.actions.getIntegralExchange();
    }

    // 异步请求回调
    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            // 获取商城信息
            case mallAction.GET_MALL_BASIC_SUCCESS:
                this.setState({
                    type: 'loaded',
                    dataMall: nextProps.mall.mallBasic,
                });
                break;

            // 获取获取客户信息
            case customerAction.GET_ADMIN_CUSTOMER_SUCCESS:
                this.setState({
                    type: 'loaded',
                    data: nextProps.customer.customerInfo
                });
                break;

            // 获取客户积分兑换信息
            case customerAction.GET_INTEGRAL_EXCHANGE_SUCCESS:
                this.setState({
                    type: 'integral',
                    dataIntegral: nextProps.customer.integral
                });
                break;

            // 修改商城基本信息
            case mallAction.UPDATE_MALL_BASIC_SUCCESS:
                modifySuccess();
                this.props.actions.getMallBasic();
                break;

            // 修改客服
            case mallAction.UPDATE_MALL_CUSTOMER_SUCCESS:
                modifySuccess();
                this.props.actions.getMallBasic();
                break;

            // 修改客户
            case customerAction.UPDATE_ADMIN_CUSTOMER_SUCCESS:
                modifySuccess();
                this.props.actions.getAdminCustomer();
                break;

            // 修改支付宝
            case customerAction.UPDATE_CUSTOMER_ALIPAY_SUCCESS:
                modifySuccess();
                this.props.actions.getAdminCustomer();
                break;

            // 修改微信
            case customerAction.UPDATE_CUSTOMER_WECHAT_SUCCESS:
                modifySuccess();
                this.props.actions.getAdminCustomer();
                break;

            // 修改银联
            case customerAction.UPDATE_CUSTOMER_UNIONPAY_SUCCESS:
                modifySuccess();
                this.props.actions.getAdminCustomer();
                break;

            // 修改客户积分设置
            case customerAction.UPDATE_INTEGRAL_EXCHANGE_SUCCESS:
                modifySuccess();
                this.setState({
                    type: 'integral',
                    dataIntegral: nextProps.customer.integral
                });
                this.props.actions.getIntegralExchange();
                break;
        }
    }

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

    // 显示支付宝弹出层
    showAliPay = (data) => {
        this.setState({
            type: 'showAliPay',
            currentData: data,
        });
    };

    // 显示微信弹出层
    showWechat = (data) => {
        this.setState({
            type: 'showWechat',
            currentData: data,
        });
    };

    // 显示银联弹出层
    showUnionpay = (data) => {
        this.setState({
            type: 'showUnionpay',
            currentData: data,
        });
    };

    // 修改商城基本信息
    mallModify = (data) => {
        this.props.actions.updateMallBasic(data);
    };

    // 修改客户基本信息
    cusModify = (data) => {
        this.props.actions.updateMallCustomer(data);
    };

    // 修改支付宝
    updateAliPay = (para) => {
        this.props.actions.updateCustomerAlipay(
            this.state.data.id,
            para
        );
    };

    // 修改微信
    updateWechat = (para) => {

        this.props.actions.updateCustomerWechat(
            this.state.data.id,
            para
        );
    };

    // 修改银联
    updateUnionpay = (data) => {
        this.props.actions.updateCustomerUnionpay(data);
    };

    //暂时保留内置reset
    // 重置type
    reset = () => {
        this.setState({
            type: 'init'
        });
    };

    //获取客户积分设置
    getIntegralExchange = ()=> {
        this.props.actions.getIntegralExchange();
    };

    //修改客户积分设置
    updateIntegralExchange = (data)=> {
        const submitData = {
            id: this.state.data.id,
            para: data
        };

        this.props.actions.updateIntegralExchange(submitData);
    };

    render() {
        const {type, data, dataIntegral, dataMall = true} = this.state;

        if (data && dataMall) {
            return (
                <div className="app-page" style={{'height':'100%'}}>
                    <PaywayCard
                        reset={this.reset}
                        data={data}
                        dataMall={dataMall}
                        dataIntegral={dataIntegral}
                        updateAliPay={this.updateAliPay}
                        updateWechat={this.updateWechat}
                        showMallModify={this.showMallModify}
                        showCusModify={this.showCusModify}
                        showCustomerModify={this.showCustomerModify}
                        showAliPay={this.showAliPay}
                        showWechat={this.showWechat}
                        showUnionpay={this.showUnionpay}
                        updateIntegralExchange={this.updateIntegralExchange}
                        mallModify={this.mallModify}/>

                    <SettingMallModifyForm
                        type={this.state.type}
                        data={dataMall}
                        currentData={this.state.currentData}
                        reset={this.reset}
                        mallModify={this.mallModify}/>


                    <SettingWechatModifyForm
                        type={this.state.type}
                        data={data}
                        currentData={this.state.currentData}
                        reset={this.reset}
                        updateWechat={this.updateWechat}/>

                    <SettingCusModifyForm
                        type={this.state.type}
                        data={dataMall}
                        currentData={this.state.currentData}
                        reset={this.reset}
                        cusModify={this.cusModify}/>

                    {type == 'showAliPay' &&
                    <SettingAliPayForm
                        type={this.state.type}
                        data={data}
                        reset={this.reset}
                        updateAliPay={this.updateAliPay}/>
                    }

                    {type == 'showWechat' &&
                    <SettingWechatForm
                        type={this.state.type}
                        data={data}
                        reset={this.reset}
                        updateWechat={this.updateWechat}/>
                    }

                </div>
            );
        } else {
            return null;
        }
    }
}

// 修改成功提示信息
const modifySuccess = function () {
    message.success('修改成功!');
};


