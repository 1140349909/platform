import React, { Component } from 'react';
import { Table } from 'antd';
import { getSafeValue, moneyFormat} from 'common/util';
import './index.less';

export default class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    // 获取
    getColumns() {

        return [{
            title: '名次',
            dataIndex: 'index',
            width:50,
            className: 'text-center',
            render: (mediaRes, record, index) => {
                return <span>{index + 1}</span>;
            }
        },{
            title: '商品名称',
            dataIndex: 'name',
        }, {
            title: '代言总数',
            dataIndex: 'opdata.tkerData.totalAmount',
            className: 'text-right',
            render: (text) => getSafeValue(text, 0)
        }, {
            title: '代言支出',
            dataIndex: 'opdata.tkerData.profit.total',
            className: 'text-right',
            render: (text) => getSafeValue(moneyFormat(text), 0)
        }];
    }

    render() {
        const columns = this.getColumns();
        return (
            <Table
                className="tker-top"
                rowKey='id'
                columns={columns}
                dataSource={this.props.data}
                bordered
                title={() => '代言商品TOP10'}
                pagination={false}
                loading={this.props.loading}/>
        );
    }
}
