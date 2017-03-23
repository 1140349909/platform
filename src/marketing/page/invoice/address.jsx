import React from 'react';
import PageBase from 'common/base/PageBase';
import {} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  './address.less';
import  InvoiceCard from './component/InvoiceCard';
import  InvoiceManageAddress from  './component/InvoiceManageAddress';
import * as invoiceAction from '../../store/invoice/action';
@connect(
    state => ({
        operation: state.operation,
        invoice: state.invoice.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...invoiceAction
        }, dispatch)
    })
)

export default class Address extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        isLoading:true,
        addressList:[],
        viewType: 'list',
        viewParam: '',
        viewData: null
    };

    // 在完成首次渲染之前调用，此时仍可以修改组件的state。
    componentWillMount() {
        this.getCustomerAddressList();
    }

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {}

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case invoiceAction.GET_CUSTOMER_ADDRESS_SUCCESS:
                this.setState({
                    addressList:nextProps.invoice.addressList,
                    isLoading:false
                });
                break;
            case invoiceAction.ADD_CUSTOMER_ADDRESS_SUCCESS:
                this.getCustomerAddressList();
                break;
            case invoiceAction.DELETE_CUSTOMER_ADDRESS_SUCCESS:
                this.getCustomerAddressList();
                break;
            case invoiceAction.UPDATE_CUSTOMER_ADDRESS_SUCCESS:
                this.getCustomerAddressList();
                break;
        }
    }


    showAddressInf=(type,data)=>{
        if(type==='add'){
            this.showView('showAddressInf', type,{});
        }else if(type==='edit'){
            this.showView('showAddressInf', type,data);
        }
    };

    /*获取地址信息*/
    getDeliveryAddress=()=>{
    };

    handleSelected= (item) => {
        this.setState({
            id: item.id
        });
    };

    //地址操作
    getCustomerAddressList=()=>{
        this.setState({
            isLoading:true,
        });
        let params={
            type: 'trade_invoice',
        };
        this.props.actions.getCustomerAddressList(params);
    };
    addCustomerAddress=(data)=>{
        this.props.actions.addCustomerAddress(data);
    };
    deleteCustomerAddress=(data)=>{
        this.props.actions.deleteCustomerAddress(data.id);
    };

    updateCustomerAddress=(id,data)=>{
        this.props.actions.updateCustomerAddress(id,data);
    };

    render() {
        //是否显示弹窗
        const isShowAddressInf = this.isShowView('showAddressInf');
        return (
            <div className="app-page app-page-invoice-address">
                <InvoiceCard activeKey="/invoice/address">
                    <InvoiceManageAddress
                        isLoading={this.state.isLoading}
                        isShowAddressInf={isShowAddressInf}
                        visible={isShowAddressInf}
                        reset={this.reset}
                        showAddressInf={this.showAddressInf}
                        param={this.state.viewParam}
                        formData={this.state.viewData}
                        entry="address"
                        handleSelected={this.handleSelected}
                        getDeliveryAddress={this.getDeliveryAddress}
                        addressList={this.state.addressList}
                        getCustomerAddressList={this.getCustomerAddressList}
                        addCustomerAddress ={this.addCustomerAddress }
                        deleteCustomerAddress={this.deleteCustomerAddress}
                        updateCustomerAddress={this.updateCustomerAddress}
                    />
                    </InvoiceCard>
            </div>
        );
    }
}


