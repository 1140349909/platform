import React, {Component} from 'react';
import {Table} from 'antd';
import config from 'common/config';
import {moneyFormat} from '/common/util';
import './index.less';

export default class WithdrawRuleList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        page:0,
        size:config.SIZE
    };

    render() {

        const {data, loading,
            list,edit,deleteWithdrawRule,
            switchWithdrawRuleStatus} = this.props;

        const columns = [
            {
                title:'基本设置',
                className:'text-center',
                children:[
                    {
                        title: '标识',
                        className:'text-center',
                        dataIndex: 'ruleId',
                        key:'ruleId'
                    },
                    {
                        title: '规则名称',
                        className:'text-center',
                        dataIndex: 'name',
                        key:'name'
                    }, {
                        title: '状态',
                        dataIndex: 'ruleStatus',
                        className:'text-center',
                        key:'ruleStatus',
                        render:(text)=>{

                            let ruleStatus = {
                                'FALSE':'禁用',
                                'TRUE':'启用'
                            };

                            return (
                                <div>
                                    {ruleStatus[text]}
                                </div>
                            );
                        }
                    }
                ]
            }, {
                title: '用户设置',
                className:'text-center',
                children: [{
                    title: '单次最低提现',
                    dataIndex: 'userRule.minTake',
                    key:'minTake',
                    className:'text-center',
                    render:(text)=>{
                        return (
                            <div className="text-right">
                                {moneyFormat(text,'￥',2)}元
                            </div>
                        );
                    }
                }, {
                    title: '单日提现次数上限',
                    dataIndex: 'userRule.maxDayTakeCount',
                    key:'maxDayTakeCount',
                    className:'text-center',
                    render:(text)=>{
                        return (
                            <div className="text-right">
                                {text}次
                            </div>
                        );
                    }
                }, {
                    title: '单次最多提现',
                    dataIndex: 'userRule.userOnceMaxTake',
                    key:'userOnceMaxTake',
                    className:'text-center',
                    render:(text)=>{
                        return (
                            <div className="text-right">
                                {moneyFormat(text,'￥',2)}元
                            </div>
                        );
                    }
                }]
            }, {
                title: '平台设置',
                className:'text-center',
                children:[{
                    title: '日付款次数上限',
                    dataIndex: 'platformRule.maxDayPayCount',
                    key:'maxDayPayCount',
                    className:'text-center',
                    render:(text)=>{
                        return (
                            <div className="text-right">
                                {text}次
                            </div>
                        );
                    }
                },{
                    title: '日付款金额上限',
                    dataIndex: 'platformRule.maxDayPayNum',
                    key:'maxDayPayNum',
                    className:'text-center',
                    render:(text)=>{
                        return (
                            <div className="text-right">
                                {moneyFormat(text,'￥',2)}元
                            </div>
                        );
                    }
                },{
                    title: '月付款次数上限',
                    dataIndex: 'platformRule.maxMonthSumPayCount',
                    key:'maxMonthSumPayCount',
                    className:'text-center',
                    render:(text)=>{
                        return (
                            <div className="text-right">
                                {text}次
                            </div>
                        );
                    }
                },{
                    title: '月累计付款上限',
                    dataIndex: 'platformRule.maxMonthSumPay',
                    key:'maxMonthSumPay',
                    className:'text-center',
                    render:(text)=>{
                        return (
                            <div className="text-right">
                                {moneyFormat(text,'￥',2)}元
                            </div>
                        );
                    }
                },{
                    title: '付款账号类型',
                    dataIndex: 'platformRule.payType',
                    key:'payType',
                    className:'text-center',
                    render:(text)=>{

                        let payType = {
                            'wechat':'微信',
                            'alipay':'支付宝',
                            'unionpay':'银联'
                        };

                        return (
                            <div className="text-right">
                                {payType[text]}
                            </div>
                        );
                    }
                }]
            }, {
                title: '操作',
                className:'text-center',
                render:(text,record)=>{

                    let ruleStatus = {
                        'FALSE':'启用',
                        'TRUE':'禁用'
                    };

                    return (
                        <div>
                            <a href="javascript:;" onClick={()=>edit(record.id)}>
                                修改
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>switchWithdrawRuleStatus(record)}>
                                {ruleStatus[record.ruleStatus]}
                            </a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={()=>deleteWithdrawRule(record.id)}>
                                删除
                            </a>
                        </div>
                    );
                }
            }];

        const pagination = {
            total: data.totalElements,
            defaultPageSize:config.SIZE,
            showSizeChanger: true,
            onShowSizeChange: (page, size)=> {
                this.setState({
                    page,
                    size
                },()=>list(page-1, size));
            },
            onChange: (page)=> {
                list((page - 1),this.state.size);
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
