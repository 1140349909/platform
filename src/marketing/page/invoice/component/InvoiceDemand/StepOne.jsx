import React, {Component}from 'react';
import {Table, Button} from 'antd';
import {moneyFormat} from 'common/util';
import moment from 'moment';
import IconFont from 'common/component/IconFont';
import _ from 'lodash';
import * as module from 'common/config/module';
import AuthModule from 'common/component/AuthModule';
import DatePickerGroup from 'common/component/DatePickerGroup';

export default class StepOne extends Component {
    constructor(props) {
        super(props);
    }

    disabledDate = (current) => {
        return  current && current.valueOf() > Date.now();
    };
    getType=(type)=>{
        let str ='';
        if(type=='deposit'){
            str='乐豆充值服务';
        }else if(type=='upgrade'){
            str='账户升级服务';
        }
        return str;
    };
    render() {

        let {startDate, endDate, page,invoiceRule,isLoading}= this.props;
        let titleMoney = <div style={{textAlign: 'right'}}>
            订单实付金额(元)
        </div>;
        let titleInvoice = <div style={{textAlign: 'right'}}>
            订单实付金额(元)
        </div>;
        const columns = [{
            width: '21%',
            title: '订单编号',
            dataIndex: 'tradeNo',
            key: 'tradeNo',
        }, {
            title: '商品',
            dataIndex: 'ledou',
            key: 'ledou',
            render: (text, record) => (
                <span>
                        {record.productDesc.name}
                    </span>
            ),
        }, {
            width: '13%',
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text) => (
                <span>
                    {this.getType(text)}
                </span>
            ),
        }, {
            width: '16%',
            title: titleMoney,
            dataIndex: 'money',
            key: 'money',
            render: (text, record) => (
                <div style={{textAlign: 'right'}}>
                    {moneyFormat(record.money, null, 2)}
                </div>
            )
        }, {
            width: '16%',
            title: titleInvoice,
            dataIndex: 'moneyInvoice',
            key: 'moneyInvoice',
            render: (text, record) => (
                <div style={{textAlign: 'right'}}>
                    {moneyFormat(record.money, null, 2)}
                </div>
            )
        }, {
            width: '15%',
            title: '订单支付时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        }];

        const data = this.props.isSetting ? this.props.data.content : [];
        const rowSelection = {
            selectedRowKeys: this.props.selectedRowKeys,
            onChange: this.props.onSelectChange,
        };
        let pagination = {
            width: '6%',
            total: this.props.tradeList.totalElements,
            showSizeChanger: false,
            defaultPageSize: this.props.size,
            current: page + 1,
            onChange: (current) => {
                this.props.list(current - 1);
            },
        };

        const dateFormat = 'YYYY-MM-DD';
        let dateRange = (startDate == '' || endDate == '') ? [] : [moment(startDate, dateFormat), moment(endDate, dateFormat)];
        const locale = {
            emptyText: <div style={{fontSize: '14px', marginTop: '20px', marginBottom: '20px'}}><IconFont
                style={{fontSize: '16px'}} type="info"/>&nbsp;&nbsp;您目前没有可开票的订单</div>
        };
        return (

            <div>
                <h3 className="invoice-title">
                    <span className="title-bg"></span>
                    可开票订单列表
                </h3>
                <div className="select-time">
                    订单成功时间（{_.isEmpty(invoiceRule)?'':invoiceRule.orderValidateDay==30?'30天内':'本月'}）：
                    <DatePickerGroup
                        onChange={this.props.handleDataChange}
                        defaultValue={dateRange}
                        format="YYYY-MM-DD"
                        disabledDate={this.disabledDate}
                        disabled={!this.props.isSetting}/>
                </div>
                <div className='add-step1-click'>
                    <div className="add-step1-click-text">
                        <p>已选总金额：<span style={{fontSize: '20px'}}>¥{this.props.totalPrice}</span></p>
                        <p>(开票数必须超过：<span>¥{_.isEmpty(invoiceRule)?'':moneyFormat(invoiceRule.userRule.preTimesMinMoney, null, 2)}</span>)</p>
                    </div>
                    {/*invoiceRule.userRule.preTimesMinMoney/100*/}
                    <AuthModule type={module.PAYMENT_BILL_MANAGEMENT}>
                        <Button style={{marginLeft: '20px'}}
                                size="large"
                                onClick={this.props.handleNextClick}
                                type="primary"
                                disabled={!this.props.isSetting || this.props.selectedRowKeys.length <= 0 || this.props.totalPrice < invoiceRule.userRule.preTimesMinMoney/100}>
                            索取发票
                        </Button>
                    </AuthModule>

                </div>
                <Table rowSelection={rowSelection}
                       className='add-step1-invoice-list'
                       columns={columns}
                       dataSource={data}
                       rowKey="id"
                       pagination={pagination}
                       locale={locale}
                       loading={isLoading}
                />
            </div>
        );

    }
}

