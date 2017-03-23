import React, { Component } from 'react';
import { Table} from 'antd';
import { getSafeValue, getOrderValue } from 'common/util';
import { moneyFormat, numberFormat} from 'common/util';
import moment from 'moment';

class List extends Component {

    constructor(props) {
        super(props);
    }

    // 充值记录
    getDepositColumns = () => {
        return [{
            title: '订单编号',
            dataIndex: 'tradeNo',
        }, {
            title: '交易时间',
            dataIndex: 'createdDate',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        }, {
            title: '商品名称',
            dataIndex: 'productDesc.name',
            render: (text) => getSafeValue(text, '-')
        },{
            title: <div className="text-right">商品价格(元)</div>,
            dataIndex: 'money',
            className: 'text-right',
            render: (text) => moneyFormat(text ,null , 2)
        }, {
            title: '支付结果',
            dataIndex: 'payStatus',
            render: (payStatus) => {
                let text;
                switch (payStatus) {
                    case 's0':
                        text = '未完成';
                        break;
                    case 's1':
                        text = <span className="color-success">成功</span>;
                        break;
                }
                return  text;
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (<a href="javascript:;" onClick={() => this.props.showDetails(record)}>详情</a>);
            }
        }];
    }

    // 消费明细
    getWithdrawColumns = () => {
        return [{
            title: '订单编号',
            dataIndex: 'tradeNo',
        }, {
            title: '交易时间',
            dataIndex: 'createdDate',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        }, {
            title: '商品名称',
            dataIndex: 'productDesc.name',
            render: (text) => getSafeValue(text, '-')
        }, {
            title: <div className="text-right">商品价格(乐豆)</div>,
            dataIndex: 'ledou',
            className: 'text-right',
            render: (text) => numberFormat(text, 0)
        },{
            title: '交易状态',
            dataIndex: 'payStatus',
            render: (payStatus) => {
                let text;
                switch (payStatus) {
                    case 's0':
                        text = '未完成';
                        break;
                    case 's1':
                        text = <span className="color-success">成功</span>;
                        break;
                    default:
                        text = '-';
                }
                return  text;
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (<a href="javascript:;" onClick={() => this.props.showDetails(record)}>详情</a>);
            }
        }];
    }

    getPagination = () => {
        const {totalElements, size} = this.props.data;
        return {
            total: totalElements,
            pageSize: size,
            current:this.props.page+1,
        };
    }

    handleChange = (pagination, filters, sorter) => {
        this.props.list(pagination.current - 1, pagination.pageSize, {
            sort: sorter.field,
            order: getOrderValue(sorter.order)
        });
    }

    render() {
        const { type, loading, data: { content }} = this.props;
        const columns = type == 'ledoushoping' ? this.getWithdrawColumns() : this.getDepositColumns();
        const pagination = this.getPagination();
        return (
            <Table rowKey={(record, index) => index}
                   columns={columns}
                   pagination={pagination}
                   dataSource={content}
                   bordered
                   loading={loading}
                   onChange={this.handleChange}/>
        );
    }
}

export default List;
