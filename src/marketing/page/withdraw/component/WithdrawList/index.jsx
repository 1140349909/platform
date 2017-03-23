import React, {Component} from 'react';
import {
    Button,
    Table,
} from 'antd';
import {dateFormat} from 'common/util/index';
import './index.less';
export default class WithdrawList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedRowKeys: [],  // 这里配置默认勾选列
        selectedRows: []
    };

    render() {

        let {data, listLoading, status} = this.props;

        if (!data) {
            return null;
        }

        let dataSource = data.content;

        //rowSelection：选择功能的配置

        const payFailureColumns = [
            {
                title: '失败原因',
                dataIndex: 'result',
                render: (text, record)=> {
                    return (<div>
                        {record.result ? record.result.err_code_des : '暂无'}
                    </div>);
                }
            }
        ];

        let columns = [
            {
                title: '订单序号',
                dataIndex: 'orderNo'
            },
            {
                title: '会员编号',
                dataIndex: 'cardNo'
            },
            {
                title: '手机号码',
                dataIndex: 'mobile'
            }, {
                title: '总酬劳/元',
                dataIndex: 'dividend',
                className: 'text-right',
                render: (text, record)=> {
                    return (
                        <div style={{'textAlign':'right'}}>
                            {record.opdata.tkerData ? (record.opdata.tkerData.profit.total / 100).toFixed(2) : '-'}
                        </div>
                    );
                }
            }, {
                title: '可提现额度/元',
                dataIndex: 'withdraw',
                className: 'text-right',
                render: (text, record)=> {
                    return (
                        <div style={{'textAlign':'right'}}>
                            {record.opdata.tkerData ? ((record.opdata.tkerData.income.total) / 100).toFixed(2) : '-'}
                        </div>
                    );
                }
            }, {
                title: '申请提现/元',
                dataIndex: 'apply',
                className: 'text-right',
                render: (text, record)=> {
                    return (
                        <div style={{'textAlign':'right'}}>
                            {(record.money / 100).toFixed(2)}
                        </div>
                    );
                }
            }, {
                title: '申请时间',
                dataIndex: 'time',
                render: (text, record)=> {
                    return (
                        <div>{dateFormat(new Date(record.lastModifiedDate), 'yyyy-MM-dd hh:mm:ss')}</div>
                    );
                }
            }, {
                title: '提现方式',
                dataIndex: 'withdrawType',
                filters: [{
                    text: '微信',
                    value: 'wechat'
                }, {
                    text: '支付宝',
                    value: 'alipay'
                }, {
                    text: '余额',
                    value: 'balance'
                }],
                onFilter: (value, record) => record.payType == value,
                render: (text, record)=> {

                    let withdrawType = '';

                    switch (record.payType) {
                        case 'balance':
                            withdrawType = '余额';
                            break;
                        case 'wechat':
                            withdrawType = '微信钱包';
                            break;
                        case 'alipay':
                            withdrawType = '支付宝钱包';
                            break;
                    }

                    return (
                        <div>
                            {withdrawType}
                        </div>
                    );
                }
            }];

        const operationColumn = [{
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {

                let button = '';

                switch (record.payStatus) {
                    case 's0':
                        button = (

                            <div>
                                <Button
                                    onClick={()=>this.props.updateManagerWithdrawConfirm(record,true)}>
                                    确认申请
                                </Button>
                                <Button
                                    onClick={()=>this.props.updateManagerWithdrawConfirm(record,false)}>
                                    直接拒绝
                                </Button>
                            </div>
                        );
                        break;
                    case 's5':
                        button = (

                            <Button
                                onClick={()=>this.props.updateManagerWithdrawStatus(record.id)}>
                                查询状态
                            </Button>
                        );
                        break;
                    case 's1':
                        button = null;
                        break;
                    case 's2':
                        // 失败时有几个按钮：重新确认、直接退款、直接拒绝
                        button = (
                            <div>
                                <Button
                                    onClick={()=>this.props.updateManagerWithdrawConfirm(record,true)}>
                                    重新确认
                                </Button>
                                <Button
                                    onClick={()=>this.props.updateManagerWithdrawConfirm(record,false)}>
                                    直接拒绝
                                </Button>
                                <Button type="primary" disabled>
                                    直接退款
                                </Button>
                            </div>

                        );
                        break;
                }


                return (
                    <div>
                        {button}
                    </div>
                );
            }
        }

        ];

        switch (status) {
            case 'failure':
                columns = columns.concat(payFailureColumns, operationColumn);
                break;
            default:
                columns = columns.concat(operationColumn);
                break;

        }


        let pagination = {
            pageSize: data.size,
            total: data.totalElements,
            onShowSizeChange: (page, size) => {
                this.props.list(0, size);
            },
            onChange: (page) => {
                this.props.list(page - 1);
            }
        };

        // 批量操作时需要提示取现类型为同一种，不允许微信/支付宝混合提现
        return (
            <div>
                <Table
                    loading={listLoading}
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={pagination}
                    bordered/>
            </div>
        );
    }
}
