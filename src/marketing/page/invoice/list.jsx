import React from 'react';
import PageBase from 'common/base/PageBase';
import {Table} from 'antd';
import IconFont from 'common/component/IconFont';
import * as invoiceAction from '../../store/invoice/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  './list.less';
import  InvoiceCard from './component/InvoiceCard';
import {moneyFormat} from 'common/util';
import moment from 'moment';
import _ from 'lodash';
import DatePickerGroup from 'common/component/DatePickerGroup';
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

export default class List extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        invoiceList: [],
        isSetting: false,
        isLoading: true,
        dateRange: '',
        startDate: '',
        endDate: '',
        invocieProcessStatus: '',
        size: 10,
        page: 0,
        totalElements: 0
    };

    // 在完成首次渲染之前调用，此时仍可以修改组件的state。
    componentWillMount() {

    }

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.getIsConfigInvoice();
    }

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            // 发票状态列表
            // 发票是否设置
            case invoiceAction.GET_ISCONFIG_INVOICE_SUCCESS:
                this.setState({
                    isSetting: nextProps.invoice.invoiceIsSetting.settting,
                });
                if (nextProps.invoice.invoiceIsSetting.settting) {
                    this.getTransInvoiceList();
                }
                break;
            case invoiceAction.GET_ISCONFIG_INVOICE_FAILURE:
                this.setState({
                    isSetting: nextProps.invoice.invoiceIsSetting.settting,
                    isLoading: false,
                });
                break;
            case invoiceAction.GET_TRANS_INVOICE_LIST_SUCCESS:
                this.setState({
                    invoiceList: nextProps.invoice.invoiceList,
                    totalElements: nextProps.invoice.invoiceList.totalElements,
                    isLoading: false,
                });
                break;

        }
    }

    /*HANDLE*/
    handleDataChange = (date, dateString) => {
        this.setState({
            totalElements: 0,
        });
        this.getTransInvoiceList(0, {
            startDate: dateString[0],
            endDate: dateString[1],
        });
    };
    disabledDate = (current) => {
        return current && current.valueOf() > Date.now();
    };


    /*ACTION*/
    //检查发票配置
    getIsConfigInvoice = () => {
        this.props.actions.getIsConfigInvoice({
            check: true
        });
    };
    getTransInvoiceList = (page, parameter) => {
        this.setState({
            isLoading:true,
        });
        let defaults = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            invocieProcessStatus: this.state.invocieProcessStatus,
            dateRange: this.state.dateRange,
            size: this.state.size,
            page: page,
            isLoading:true,
        };

        const params = _.assign({}, defaults, parameter);
        this.setState(params);
        this.props.actions.getTransInvoiceList(params);

    };



    render() {
        let title = <p style={{textAlign: 'right'}}>发票金额（元）</p>;
        const columns = [{
            width: '16%',
            title: title,
            dataIndex: 'money',
            key: 'money',
            render: text => <div style={{textAlign: 'right'}}> {moneyFormat(text, null, 2)}</div>
        }, {
            width: '16%',
            title: '申请日期',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        }, {
            title: '发票抬头',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => <span >{record.invoiceConfig.title}</span>
        }, {
            width: '25%',
            title: '收取方式(公司：快递单号)',
            render: (text,record) => <span>{record.express?record.express.expcom+'：'+record.express.expNo:'-'}</span>
        }, {
            width: '16%',
            title: '状态',
            dataIndex: 'invocieProcessStatus',
            key: 'invocieProcessStatus',
            render: (text) => <div>
                {text=='shipped'?<span>已邮寄</span>:<span style={{color: '#FCBE76'}}>处理中</span>}
            </div>

        }];

        const data = this.state.invoiceList.content;
        // const dateFormat = 'YYYY-MM-DD';

        // let dateRange = (this.state.startDate == '' || this.state.endDate == '') ? [] : [moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)];
        let pagination = {
            total: this.state.totalElements,
            showSizeChanger: false,
            defaultPageSize: this.state.size,
            current: this.state.page + 1,
            onChange: (current) => {
                this.getTransInvoiceList(current - 1);
            },
        };
        const locale = {
            emptyText: <div style={{fontSize: '14px', marginTop: '20px', marginBottom: '20px'}}><IconFont
                style={{fontSize: '16px'}} type="info"/>&nbsp;&nbsp;您目前没有发票记录</div>
        };
        return (
            <div className="app-page app-page-invoice-list">
                <InvoiceCard activeKey="/invoice/list">
                    <div>
                        <h3 className="invoice-title">
                            <span className="title-bg"></span>
                            发票列表
                        </h3>
                        <div className="select-time">
                            发生时间： <DatePickerGroup
                            disabled={!this.state.isSetting}
                            onChange={this.handleDataChange}
                            disabledDate={this.disabledDate}
                            format="YYYY-MM-DD"/>
                        </div>
                        <Table className='invoice-list'
                               loading={this.state.isLoading}
                               columns={columns}
                               dataSource={data}
                               pagination={pagination}
                               locale={locale}/>
                    </div>
                </InvoiceCard>
            </div>
        );
    }
}


