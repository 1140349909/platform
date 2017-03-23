import React , {Component}from 'react';
import {Row,Col,Button,Modal} from 'antd';
import InvoiceManageAddress from  '../InvoiceManageAddress';

export default class StepTwo extends Component{
    constructor(props){
        super(props);
    }

    /*确认框*/
    handleConfigSave=(obj)=>{
        Modal.confirm({
            title: '提交发票申请',
            content: '确定提交发票申请',
            okText: '确认',
            cancelText: '取消',
            iconType: 'exclamation-circle',
            onOk(){
                obj.props.handleSave();
            },
        });
    };

    render(){
        //组件属性的继承
        let {isShowAddressInf,visible,reset,showAddressInf,invoiceSettingInf,totalPrice,hasSelectedData,isLoading,
            param,formData,id,addressList
            } =this.props;
        /*数据处理*/
        let invocieType;
        if(invoiceSettingInf.invocieType==='normal'){
            invocieType='增值税普通发票';
        }else if(invoiceSettingInf.invocieType==='special'){
            invocieType='增值税专用发票';
        }else{
            invocieType='';
        }

        let issueType;
        if(invoiceSettingInf.issueType==='person'){
            issueType='个人';
        }else if(invoiceSettingInf.issueType==='corp'){
            issueType='企业';
        }else{
            issueType='';
        }
        return(
            <div>
                <div className="add-step2-inf">
                    <div className="inf-top">
                        <p className="top-left">
                            您选取了{this.props.selectedRowKeys.length}条单据开具订单 <span>（若选中多条记录，订单金额将合并开具在一张票据中）</span>
                        </p>
                        <p className="top-right">
                            开票金额合计：<span style={{fontSize:'20px'}}>¥{totalPrice}</span>
                        </p>
                    </div>
                    <div className="inf-bottom">
                        <Row>
                            <Col span={6}>发票抬头：{invoiceSettingInf.title}</Col>
                            <Col span={6}>开具类型：{issueType}</Col>
                            <Col span={6}>发票类型：{invocieType}</Col>
                        </Row>
                    </div>
                </div>
                <InvoiceManageAddress
                    isShowAddressInf={isShowAddressInf}
                    visible={visible}
                    reset={reset}
                    showAddressInf={showAddressInf}
                    hasSelectedData = {hasSelectedData}
                    isLoading={isLoading}
                    param={param}
                    formData={formData}
                    entry={this.props.entry}
                    id={id}
                    addressList={addressList}
                    getDeliveryAddress={this.props.getDeliveryAddress}
                    handleSelected={this.props.handleSelected}
                    getCustomerAddressList={this.props.getCustomerAddressList}
                    addCustomerAddress ={this.props.addCustomerAddress }
                    deleteCustomerAddress={this.props.deleteCustomerAddress}
                    updateCustomerAddress={this.props.updateCustomerAddress}
                />
                <div className="add-step2-operate">
                    <Button type="ghost" size="large" onClick={this.props.handlePreClick}>上一步</Button>
                    <Button type="primary" size="large"  style={{marginLeft:'10px'}} onClick={()=>this.handleConfigSave(this)}>提交</Button>
                </div>
            </div>
        );
    }
}
