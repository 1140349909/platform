import React, { Component } from 'react';
import {Table} from 'antd';
import { getSafeValue, dateFormat, getOrderValue } from 'common/util';
import { getMediaUrl } from 'common/util/media';
import { moneyFormat } from 'common/util';
import Img from 'common/component/Img';


// 在售商品
export default class ProductSaleList extends Component {

    constructor(props) {
        super(props);
    }

    // 获取
    getColumns() {
        return [{
            title: '商品图',
            dataIndex: 'mediaRes',
            width: 100,
            render: (mediaRes, record) => {
                return (<Img width="50" src={getMediaUrl(record.mediaRes.productImgId)}/>);
            }
        }, {
            title: '商品编号',
            width: 100,
            dataIndex: 'code'
        }, {
            title: '商品名称',
            dataIndex: 'title',
            width: 100,
        }, {
            title: '已售量',
            width: 100,
            dataIndex: 'opdata.tradeData.amount',
            className: 'text-right',
            render: (text, record) => getSafeValue(record.opdata.tradeData.amount, 0),
            sorter: true
        }, {
            title: '库存余量',
            dataIndex: 'intensity',
            width: 100,
            className: 'text-right',
            render: (text, record) => {
                let intensity = getSafeValue(record.mallCfg.stock, 0) - getSafeValue(record.opdata.tradeData.amount, 0);
                if (intensity < 0) {
                    intensity = 0;
                }
                return intensity;
            }
        }, {
            title: '成本单价(元)',
            dataIndex: 'cost',
            className: 'text-right',
            width: 120,
            sorter: true,
            render: (text) => moneyFormat(text, 0)
        }, {
            title: '销售单价(元)',
            dataIndex: 'mallCfg.price',
            className: 'text-right',
            width: 120,
            sorter: true,
            render: (text, record) => moneyFormat(record.mallCfg.price)
        }, {
            title: '积分抵现总额(元)',
            dataIndex: 'opdata.tradeData.offsetAmount',
            className: 'text-right',
            width: 130,
            sorter: true,
            render: (text, record) => moneyFormat(record.opdata.tradeData.offsetAmount)
        }, {
            title: '优惠券抵现总额(元)',
            dataIndex: 'opdata.tradeData.couponAmount',
            className: 'text-right',
            width: 140,
            sorter: true,
            render: (text, record) => moneyFormat(record.opdata.tradeData.couponAmount)
        }, {
            title: '交易总额(元)',
            dataIndex: 'opdata.tradeData.salesAmount',
            className: 'text-right',
            sorter: true,
            width: 120,
            render: (text, record) => moneyFormat(record.opdata.tradeData.salesAmount)
        }, {
            title: '上架时间',
            width:130,
            dataIndex: 'lastModifiedDate',
            sorter: true,
            render: (text) => dateFormat(text)
        }];
    }

    getPagination() {
        return {
            total: this.props.total,
            pageSize: this.props.size,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 个商品`
        };
    }

    handleChange = (pagination, filters, sorter) => {
        this.props.list(pagination.current - 1, pagination.pageSize, {
            sort: sorter.field,
            order: getOrderValue(sorter.order)
        });
    }

    render() {

        const columns = this.getColumns();

        const pagination = this.getPagination();

        return (
            <Table rowKey="id"
                   columns={columns}
                   pagination={pagination}
                   dataSource={this.props.data}
                   bordered
                   scroll={{ x: 1250 }}
                   loading={this.props.loading}
                   onChange={this.handleChange}/>
        );
    }
}
