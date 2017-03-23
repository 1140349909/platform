import React, { Component } from 'react';
import { Table } from 'antd';
import { getSafeValue, getOrderValue } from 'common/util';
import {numberFormat} from 'common/util';
import moment from 'moment';

class ShowDetailsList extends Component {

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
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm')
        }, {
            title: '商品名称',
            dataIndex: 'productDesc.name',
            render: (text) => getSafeValue(text, '-')
        },{
            title: '支付方式',
            dataIndex: 'payType',
            render: (payType) => {
                let text;
                switch (payType) {
                    case 'wechatqrcode':
                        text = '微信支付';
                        break;
                    case 'alipayweb':
                        text = '支付宝支付';
                        break;
                }
                return text;
            }
        },{
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
            title: '商品价格(乐豆)',
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
                }
                return  text;
            }
        }];
    }

    handleChange = (pagination, filters, sorter) => {
        this.props.list(pagination.current - 1, pagination.pageSize, {
            sort: sorter.field,
            order: getOrderValue(sorter.order)
        });
    }

    render() {
        const { type, data} = this.props;
        const columns = type == 'withdraw' ? this.getWithdrawColumns() : this.getDepositColumns();
        return (
            <Table rowKey={(record, index) => index}
                   columns={columns}
                   dataSource={[data]}
                   pagination={false}
                   bordered
                   onChange={this.handleChange}/>
        );
    }
}

export default ShowDetailsList;
