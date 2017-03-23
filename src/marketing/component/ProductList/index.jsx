import React, { Component } from 'react';
import { Table, Button } from 'antd';
import Tooltip from 'common/component/Tooltip';
import BuyChannels from './BuyChannels';
import { getSafeValue, dateFormat, getOrderValue } from 'common/util';
import { moneyFormat } from 'common/util';
import Img from 'common/component/Img';
import './index.less';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    // 获取
    getColumns() {

        return [{
            title: '商品信息',
            dataIndex: 'mediaRes',
            width: 280,
            render: (mediaRes, record) => {
                return (
                    <div className="text-productinfo">
                        <Img className="text-productinfo-img" src={mediaRes.productImgUrl}/>
                        <div className="text-productinfo-text">
                            <p>编号:{record.code}</p>
                            <p>名称:{record.title}</p>
                        </div>
                    </div>);
            }
        }, {
            title: '库存总量',
            dataIndex: 'mallCfg.stock',
            width: 100,
            className: 'text-right',
            render: (text, record) => getSafeValue(record.mallCfg.stock, 0),
            sorter: true
        }, {
            title: '已售量',
            dataIndex: 'opdata.tradeData.amount',
            width: 100,
            className: 'text-right',
            render: (text) => getSafeValue(text, 0),
            sorter: true
        }, {
            title: '访问数',
            dataIndex: 'opdata.pv',
            width: 100,
            className: 'text-right',
            render: (text)=> getSafeValue(text, 0),
        },{
            title: '库存余量',
            dataIndex: 'intensity',
            width: 100,
            className: 'text-right',
        }, {
            title: '成本单价(元)',
            dataIndex: 'cost',
            width: 120,
            className: 'text-right',
            sorter: true,
            render: (text) => moneyFormat(text)
        }, {
            title: '销售单价(元)',
            dataIndex: 'mallCfg.price',
            width: 120,
            className: 'text-right',
            sorter: true,
            render: (text, record) => moneyFormat(record.mallCfg.price)
        }, {
            title: '交易总额(元)',
            dataIndex: 'opdata.tradeData.salesAmount',
            width: 120,
            className: 'text-right',
            sorter: true,
            render: (text, record) => moneyFormat(record.opdata.tradeData.salesAmount)
        }, {
            title: '盈利总额(元)',
            dataIndex: 'opdata.tradeData.profitAmount',
            width: 120,
            className: 'text-right',
            sorter: true,
            render: (text, record) => moneyFormat(record.opdata.tradeData.profitAmount)
        }, {
            title: '积分抵现总额(元)',
            dataIndex: 'opdata.tradeData.offsetAmount',
            width: 150,
            className: 'text-right',
            sorter: true,
            render: (text, record) => moneyFormat(record.opdata.tradeData.offsetAmount)
        }, {
            title: '优惠券抵现总额(元)',
            dataIndex: 'opdata.tradeData.couponAmount',
            width: 165,
            className: 'text-right',
            sorter: true,
            render: (text, record) => moneyFormat(record.opdata.tradeData.couponAmount)
        },{
            title: '入库时间',
            dataIndex: 'createdDate',
            className: 'text-center',
            width: 145,
            sorter: true,
            render: (text) => {
                return dateFormat(text);
            }
        },{
            title: '更新时间',
            dataIndex: 'lastModifiedDate',
            className: 'text-center',
            width: 145,
            sorter: true,
            render: (text) => {
                return dateFormat(text);
            }
        },  {
            title: '营销渠道',
            dataIndex: 'buyChannels',
            width: 80,
            className: 'text-center',
            render: (buyChannels) => {
                return <BuyChannels data={buyChannels}/>;
            }
        },{
            title: '商城',
            dataIndex: 'statusText',
            width: 60,
            className: 'text-center',
            render: (text)=> {
                let className = text == '已上架' ? 'text-enabled' : 'text-disabled';
                return <span className={className}>{text}</span>;
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 120,
            fixed: 'right',
            render: (text, record) => {
                return (
                    <span className="operation operation-vertical">
                        <span className="operation-item">
                        { record.mallCfg.enable &&
                            <Tooltip type="product-finished" placement="left">
                                <Button
                                    onClick={()=>this.props.finished(record.id)}>
                                    从商城中下架</Button>
                            </Tooltip>
                        }

                        {!record.mallCfg.enable &&
                            <Tooltip type="product-opening" placement="left">
                                <Button onClick={()=>this.props.opening(record.id)}>上架到商城中</Button>
                            </Tooltip>
                        }
                        </span>

                        <span className="operation-item">
                            <Tooltip type="product-info" placement="left">
                                <Button
                                    onClick={()=>this.props.editProductInfo(record.id)}>修改商品详情</Button>
                            </Tooltip>
                        </span>

                        <span className="operation-item">
                            <Tooltip type="product-basic" placement="left">
                                <Button
                                    onClick={()=>this.props.editProductBasic(record.id)}>修改交易设置</Button>
                            </Tooltip>
                        </span>

                        { !record.canDel &&
                        <span className="operation-item">
                            <Button
                            onClick={()=>this.props.showProductSalesDetails(record.id)}>查看销售详情</Button>
                        </span>
                        }

                        { record.canDel &&
                        <span className="operation-item">
                            <Tooltip type="product-delete" placement="left">
                                <Button
                                    onClick={()=>this.props.del(record.id)}>删除</Button>
                            </Tooltip>
                        </span>
                        }
                        { this.props.copyShow &&
                            <span className="operation-item">
                                <Tooltip type="product-add" placement="left">
                                    <Button
                                        onClick={()=>this.props.copyAdd(record.id)}>复制新增</Button>
                                </Tooltip>
                            </span>
                        }
                    </span>
                );
            }
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
                   className="product-list"
                   columns={columns}
                   pagination={pagination}
                   dataSource={this.props.data}
                   bordered
                   loading={this.props.loading}
                   scroll={{ x: 1800 }}
                   onChange={this.handleChange}/>
        );
    }
}
