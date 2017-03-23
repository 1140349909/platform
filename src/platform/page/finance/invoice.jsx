import React from 'react';
import PageBase from 'common/base/PageBase';
import { Tabs,message } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ExamineAndVerifyInvoiceList from './component/ExamineAndVerifyInvoiceList';
import InvoiceDetail from './component/InvoiceDetail';
import InvoicePostForm from './component/InvoicePostForm';
import * as invoiceAuditingAction from '../../store/finance/action';
import _ from 'lodash';

const TabPane = Tabs.TabPane;
@connect(
    state => ({
        operation: state.operation,
        finance: state.finance.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...invoiceAuditingAction
        }, dispatch)
    })
)
export default class InvoiceIndex extends PageBase {
    constructor(props) {
        super(props);
    }
    state = {
        isShowDetailModal:false,
        data:{},
        viewType: 'list',
        viewParam: null,
        viewData:null,
        invoiceList: [],
        dateRange: '',
        startDate: '',
        endDate: '',
        invocieProcessStatus: '',
        size: 20,
        page: 0,
        totalElements: 0,
        invoiceData:{},
        isLoading:true,
        activeKey:'billing'
    };

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.getInvoiceList(0,{
            invocieProcessStatus:'proessed'
        });
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case invoiceAuditingAction.GET_INVOICE_AUDITING_LIST_SUCCESS:
                this.setState({
                    data:nextProps.finance.invoiceAuditingList,
                    invoiceList:nextProps.finance.invoiceAuditingList.content,
                    totalElements:nextProps.finance.invoiceAuditingList.totalElements,
                    isLoading:false,
                    activeKey:this.state.activeKey
                });
                break;
            case invoiceAuditingAction.CONFIRM_MANAGER_LEDOU_SENT_INVOICE_SUCCESS:
                message.success('发票已邮寄');
                if(this.state.activeKey==='billing'){
                    this.getInvoiceList(this.state.page,{
                        invocieProcessStatus:'proessed'
                    });
                }else{
                    this.getInvoiceList(this.state.page,{
                        invocieProcessStatus:'shipped'
                    });
                }
                break;

        }
    }
    /*HANDLE*/
    viewDetails=(data)=>{
        this.setState({
            isShowDetailModal:true,
            invoiceData:data
        });
    };
    close=()=>{
        this.setState({
            isShowDetailModal:false,
        });
    };
    postInvoice=(inType,record)=>{
        if(inType==='billing'){
            this.showView('postInvoiceForm', record.id, {});
        }else{
            this.showView('postInvoiceForm', record.id, record);
        }

    };
    tabsChange=(activeKey)=>{
        this.setState({
            activeKey:activeKey
        });
        if(activeKey==='billing'){
            this.getInvoiceList(0,{
                invocieProcessStatus:'proessed'
            });
        }else{
            this.getInvoiceList(0,{
                invocieProcessStatus:'shipped'
            });
        }
    };

    getHtml=(inType)=>{
        return (
            <ExamineAndVerifyInvoiceList
                isLoading={this.state.isLoading}
                inType={inType}
                invoiceList={this.state.invoiceList}
                postInvoice={this.postInvoice}
                viewDetails={this.viewDetails}
                getInvoiceList={this.getInvoiceList}
                confirmAddress={this.confirmAddress}
                totalElements={this.state.totalElements}
                page={this.state.page}
                size={this.state.size}
            />
        );
    };

    /*ACTION*/
    //发票地址的填写
    confirmAddress=(id,data)=>{
        this.props.actions.confirmManagerLedouSentInvoice(id,data);
    };
    getInvoiceList = (page, parameter) => {
        this.setState({
            isLoading:true,
        });
        let defaults = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            invocieProcessStatus: this.state.invocieProcessStatus,
            dateRange: this.state.dateRange,
            size: this.state.size,
            page: page
        };

        const params = _.assign(defaults, parameter);
        this.setState(
            params
        );
        this.props.actions.getInvoiceList(params);
    };



    render() {
        const isShowPostInvoiceForm = this.isShowView('postInvoiceForm');
        const isShowDetailModal = this.state.isShowDetailModal;
        return (
            <div className="app-page app-page-finance-invoice  app-page-white">
                <Tabs
                    type="card"
                    animated={false}
                    onChange={this.tabsChange}
                    activeKey={this.state.activeKey}>
                    <TabPane key='billing' tab='待开票'>
                        {this.getHtml('billing')}
                    </TabPane>
                    <TabPane key='posted' tab='已邮寄'>
                        {this.getHtml('posted')}
                    </TabPane>
                </Tabs>
                {isShowDetailModal &&
                <InvoiceDetail
                    visible={isShowDetailModal}
                    reset={this.close}
                    invoiceData={this.state.invoiceData}
                />
                }
                {isShowPostInvoiceForm &&
                <InvoicePostForm
                        visible={isShowPostInvoiceForm}
                        reset={this.reset}
                        viewParam={this.state.viewParam}
                        viewData={this.state.viewData}
                        confirmAddress={this.confirmAddress}
                    />
                }
            </div>
        );
    }
}




