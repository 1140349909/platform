import React, {Component} from 'react';
import {
    Button,
    Table,
} from 'antd';
import {dateFormat, moneyFormat} from 'common/util/index';
import './index.less';
export default class WithdrawReviewList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedRowKeys: [],  // 这里配置默认勾选列
        selectedRows: []
    };

    render() {

        let {data, listLoading, list,tradeStatus,platStatus} = this.props;

        if (!data) {
            return null;
        }

        let dataSource = data.content;

        //rowSelection：选择功能的配置

        /*const payFailureColumns = [
            {
                title: '失败原因',
                dataIndex: 'result',
                render: (text, record)=> {
                    return (<div>
                        {record.result ? record.result.err_code_des : '暂无'}
                    </div>);
                }
            }
        ];*/

        let columns = [
            {
                title: '流水号',
                dataIndex: 'tradeNo'
            },
            {
                title: '提交申请时间',
                dataIndex: 'createdDate',
                render: (text)=> {
                    return (
                        <div>{dateFormat(new Date(parseInt(text)), 'yyyy-MM-dd hh:mm:ss')}</div>
                    );
                }
            },
            {
                title: '申请提现金额',
                dataIndex: 'money',
                render: (text)=> {
                    return (
                        <div style={{'textAlign': 'right'}}>
                            {moneyFormat(text, '￥', 2)}
                        </div>
                    );
                }
            }, {
                title: '提现账号类型',
                dataIndex: 'merchantModel.accountType',
                render: (text)=> {

                    let accountType = {
                        'wechat': '微信',
                        'alipay': '支付宝',
                        'unionpay': '银联'
                    };

                    return (
                        <div>
                            {accountType[text]}
                        </div>
                    );
                }
            }, {
                title: '提现账号',
                dataIndex: 'merchantModel.receiveAccount',
                render: (text)=> {
                    return (
                        <div>
                            {text}
                        </div>
                    );
                }
            }, {
                title: '账号开户名',
                dataIndex: 'merchantModel.receiveName',
                render: (text)=> {
                    return (
                        <div>
                            {text}
                        </div>
                    );
                }
            }, {
                title: '平台登录名',
                dataIndex: 'merchantModel.userName',
                render: (text)=> {
                    return (
                        <div>
                            {text}
                        </div>
                    );
                }
            }];

        const operationColumn = [{
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {

                let button = '';

                switch (record.tradeStatus) {
                    case 'tradeWait':
                        button = (
                            <div>
                                <Button
                                    onClick={()=>this.props.confirmWithdraw(record)}>
                                    确认
                                </Button>
                                <Button
                                    onClick={()=>this.props.refuseWithdraw(record)}>
                                    拒绝
                                </Button>
                            </div>
                        );
                        break;
                    case 'tradeRefuse':
                        button = (
                            <div>
                                <Button
                                    onClick={()=>this.props.showInfo(record)}>
                                    查看详情
                                </Button>
                            </div>
                        );
                        break;
                    case 'tradeAllow':
                        switch (record.platModel.platStatus) {
                            case 's2':
                                button = (
                                    <div>
                                        <Button
                                            onClick={()=>this.props.showConfirm(record)}>
                                            重新付款
                                        </Button>
                                        <Button
                                            onClick={()=>this.props.closeWithdraw(record)}>
                                            关闭本次付款
                                        </Button>
                                        <Button
                                            onClick={()=>this.props.showInfo(record)}>
                                            查看详情
                                        </Button>
                                    </div>

                                );
                                break;
                            case 's3':
                                button = (
                                    <div>
                                        <Button
                                            onClick={()=>this.props.showInfo(record)}>
                                            查看详情
                                        </Button>
                                    </div>

                                );
                                break;
                            case 's6':
                                button = (
                                    <div>
                                        <Button
                                            onClick={()=>this.props.showConfirm(record)}>
                                            确认付款
                                        </Button>
                                    </div>
                                );
                                break;

                        }
                        break;
                }

                return (
                    <div>
                        {button}
                    </div>
                );
            }
        }];

        switch (tradeStatus) {
            case 'tradeWait':
                columns = columns.concat(operationColumn);
                break;
            case 'tradeRefuse':
                columns = columns.concat(operationColumn);
                break;
            case 'tradeAllow' :
                switch (platStatus){
                    case 's2':
                        columns = columns.concat(operationColumn);
                        break;
                    case 's3':
                        columns = columns.concat(operationColumn);
                        break;
                    case 's6':
                        columns = columns.concat(operationColumn);
                        break;
                }
                break;
        }

        let pagination = {
            pageSize: data.size,
            total: data.totalElements,
            onShowSizeChange: (page, size) => {
                list({
                    page,
                    size
                });
            },
            onChange: (page) => {
                list({
                    page: (page - 1)
                });
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
