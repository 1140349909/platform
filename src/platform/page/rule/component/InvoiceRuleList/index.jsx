import React, {Component} from 'react';
import {Table} from 'antd';
import config from 'common/config';
import {moneyFormat} from '/common/util';
import './index.less';

export default class InvoiceRuleList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: config.SIZE
    };

    render() {

        const {
            data, loading,
            list, edit, deleteInvoiceRule,
            switchInvoiceRuleStatus
        } = this.props;

        const columns = [
            {
                title: '基本设置',
                className: 'text-center',
                children: [
                    {
                        title: '标识',
                        className: 'text-center',
                        dataIndex: 'ruleId',
                        key: 'ruleId'
                    },
                    {
                        title: '规则名称',
                        className: 'text-center',
                        key: 'name',
                        dataIndex: 'name',
                    }, {
                        title: '发票类型',
                        className: 'text-center',
                        dataIndex: 'invoiceType',
                        key: 'invoiceType',
                        render: (text)=> {

                            let invoiceType = {
                                'normal': '增值税普通发票',
                                'special': '增值税专用发票'
                            };

                            return (
                                <div className="text-center">
                                    {invoiceType[text]}
                                </div>
                            );
                        }
                    }, {
                        title: '订单的有效时间',
                        dataIndex: 'orderValidateDay',
                        key: 'orderValidateDay',
                        className: 'text-center',
                        render: (text)=> {

                            let orderValidateDay = '';

                            if (text == 0) {
                                orderValidateDay = '本月';
                            } else {
                                orderValidateDay = text + '个工作日内';
                            }

                            return (
                                <div>
                                    {orderValidateDay}
                                </div>
                            );
                        }
                    }, {
                        title: '状态',
                        dataIndex: 'ruleStatus',
                        key: 'ruleStatus',
                        className: 'text-center',
                        render: (text)=> {

                            let ruleStatus = {
                                'FALSE': '禁用',
                                'TRUE': '启用'
                            };

                            return (
                                <div>
                                    {ruleStatus[text]}
                                </div>
                            );
                        }
                    }
                ]
            },
            {
                title: '用户设置',
                className: 'text-center',
                children: [{
                    title: '单张发票最低限额',
                    dataIndex: 'userRule.preTimesMinMoney',
                    key: 'preTimesMinMoney',
                    className: 'text-center',
                    render: (text)=> {
                        return (
                            <div className="text-right">
                                {moneyFormat(text, '￥', 2)}元
                            </div>
                        );
                    }
                }, {
                    title: '每账户每月最多开票次数',
                    dataIndex: 'userRule.preMonthMaxTimes',
                    key: 'preMonthMaxTimes',
                    className: 'text-center',
                    render: (text)=> {
                        return (
                            <div className="text-right">
                                {text}次
                            </div>
                        );
                    }
                }]
            }, {
                title: '操作',
                className: 'text-center',
                render: (text, record)=> {

                    let ruleStatus = {
                        'FALSE': '启用',
                        'TRUE': '禁用'
                    };

                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>edit(record.id)}>
                                修改
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>switchInvoiceRuleStatus(record)}>
                                {ruleStatus[record.ruleStatus]}
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>deleteInvoiceRule(record.id)}>
                                删除
                            </a>
                        </div>
                    );
                }
            }];

        const pagination = {
            total: data.totalElements,
            defaultPageSize: config.SIZE,
            showSizeChanger: true,
            onShowSizeChange: (page, size)=> {
                this.setState({
                    page,
                    size
                }, ()=>list(page - 1, size));
            },
            onChange: (page)=> {
                list((page - 1), this.state.size);
            }
        };

        return (
            <Table rowKey={record => record.id}
                   columns={columns}
                   pagination={pagination}
                   dataSource={data.content}
                   loading={loading}
                   bordered/>
        );
    }
}
