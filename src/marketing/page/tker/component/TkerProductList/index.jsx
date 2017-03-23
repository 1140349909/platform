import React, { Component } from 'react';
import { Table, Button} from 'antd';
import { getSafeValue, getOrderValue } from 'common/util';
import { moneyFormat } from 'common/util';
import Img from 'common/component/Img';

export default class TkerProductList extends Component {

    constructor(props) {
        super(props);
    }

    // 获取
    getColumns() {

        return [{
            title: '序号',
            dataIndex: 'index',
            width:50,
            className: 'text-center',
            render: (mediaRes, record, index) => {
                return <span>{index + 1}</span>;
            }
        }, {
            title: '商品信息',
            dataIndex: 'product.info',
            width:300,
            render: (text, record) => {
                return (
                    <div className="text-productinfo">
                        <Img className="text-productinfo-img" src={record.mediaRes.productImgUrl}/>
                        <div className="text-productinfo-text">
                            <p>{record.name}</p>
                            <p>商品编号：{record.code}</p>
                            <p>商品单价：{getSafeValue(moneyFormat(record.cost))}</p>
                        </div>
                    </div>);
            }
        },{
            title: '售价',
            dataIndex: 'mallCfg.price',
            className: 'text-right',
            render: (text) => getSafeValue(moneyFormat(text), 0)
        },{
            title: '成本',
            dataIndex: 'cost',
            className: 'text-right',
            render: (text) => getSafeValue(moneyFormat(text), 0)
        },
        {
            title: '毛利',
            dataIndex: 'profits',
            className: 'text-right',
            render: (text) => getSafeValue(moneyFormat(text), 0)
        },{
            title: '已代言数',
            dataIndex: 'opdata.tkerData.totalAmount',
            className: 'text-right',
            render: (text) => getSafeValue(text, 0)
        },{
            title: '代言支出',
            dataIndex: 'opdata.tkerData.profit.total',
            className: 'text-right',
            render: (text) => getSafeValue(moneyFormat(text), 0)
        },{
            title: '销售状态',
            dataIndex: 'statusText',
            className: 'text-center',
            render: (text) => {
                return (
                    <span className={text == '已上架' ? 'color-err' : ''}>
                        {text}
                    </span>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'btns',
            width:100,
            render: (text, record) => {
                return (
                    <Button
                        type="primary"
                        onClick={() => this.props.showTkerDetails(record.id)}>代言状态</Button>
                );
            }
        }];
    }

    getPagination() {
        const { total, size } = this.props.data;
        return {
            total: total,
            pageSize: size,
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
            <Table rowKey='id'
                   columns={columns}
                   pagination={pagination}
                   dataSource={this.props.data.content}
                   bordered
                   loading={this.props.loading}
                   onChange={this.handleChange}/>
        );
    }
}
