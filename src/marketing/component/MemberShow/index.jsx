import React, {Component} from 'react';
import {Table, Modal, Select, Tabs} from 'antd';
import {dateFormat} from 'common/util/index';
const Option = Select.Option;
const TabPane = Tabs.TabPane;

export default class MemberShow extends Component {

    constructor(props) {

        super(props);
    }

    state = {
        page: 0
    };

    callback = (key) => {
        const {page} = this.state;
        const {viewParam, payType, tradeStatus} = this.props.state;
        this.props.list(viewParam, payType, tradeStatus, page, 10, key);
    };

    getColumns(buyType) {

        const filters = [{
            text: '微信',
            value: 'wechat'
        }, {
            text: '支付宝',
            value: 'alipay'
        }, {
            text: '余额',
            value: 'balance'
        }];

        const tradeFilters = [{
            text: '未支付',
            value: 'topay'
        }, {
            text: '待发货',
            value: 'todelivery'
        }, {
            text: '待收货',
            value: 'shipped'
        }, {
            text: '已收货',
            value: 'received'
        }];

        const drawFilters = [
            {
                text: '等待开奖',
                value: 'todraw'
            }, {
                text: '未中奖',
                value: 'noluck'
            }, {
                text: '等待领奖',
                value: 'toaccept'
            }, {
                text: '待发货',
                value: 'todelivery'
            }, {
                text: '待收货',
                value: 'shipped'
            }, {
                text: '已收货',
                value: 'received'
            }
        ];

        const columns1 = [
            {
                title: '交易时间',
                dataIndex: 'lastModifiedDate',
                render: (text, record) => {
                    return (
                        <div>{dateFormat(new Date(record.lastModifiedDate), 'yyyy-MM-dd hh:mm:ss.S')}</div>
                    );
                }
            }, {
                title: '商品名称',
                dataIndex: 'productName',

            },
            {
                title: '支付方式',
                dataIndex: 'payType',
                render: (text, record) => {

                    let payType = '',
                        payTypeText = '';

                    switch (record.buyType) {
                        case 'mall':
                            payType = record.mall.payType;
                            break;
                        case 'yyg':
                            payType = record.yyg.payType;
                            break;

                    }

                    filters.map((item) => {
                        if (item.value == payType) {
                            payTypeText = item.text;
                        }
                    });

                    return (
                        <div>
                            {payTypeText}
                        </div>
                    );
                }
            }];

        const mallColumns = [

            {
                title: '交易价格（元）',
                dataIndex: 'price',
                className: 'text-right',
                render: (text, record) => {

                    return (
                        <div style={{'textAlign': 'right'}}>
                            {record.mall ? (record.mall.price / 100).toFixed(2) : '-'}
                        </div>
                    );
                }

            }, {
                title: '商品数量（件）',
                dataIndex: 'amount',
                className: 'text-right',
                render: (text, record) => {

                    return (
                        <div style={{'textAlign': 'right'}}>
                            {record.mall ? record.mall.amount : '-'}
                        </div>
                    );
                }
            }];

        const yygColumns = [
            {
                title: '参与币数（枚）',
                dataIndex: 'price',
                className: 'text-right',
                render: (text, record) => {

                    return (
                        <div style={{'textAlign': 'right'}}>
                            {record.yyg ? record.yyg.credit + '枚幸运币' : '-'}
                        </div>
                    );
                }

            }, {
                title: '参与次数（次）',
                dataIndex: 'amount',
                className: 'text-right',
                render: () => {

                    return (
                        <div style={{'textAlign': 'right'}}>
                            {1}
                        </div>
                    );
                }
            }
        ];

        let title;

        switch (buyType) {
            case 'mall':
                title = '交易状态';
                break;
            case 'yyg':
                title = '中奖状态';
                break;

        }


        const columns2 = [
            {
                title: '支付金额/元',
                className: 'text-right',
                dataIndex: 'totalMoney',
                render: (text, record) => {

                    let totalMoney = '';

                    switch (record.buyType) {
                        case 'mall':
                            totalMoney = record.totalMoney;
                            break;
                        case 'yyg':
                            totalMoney = record.yyg.balance != 0 ? record.yyg.balance : record.yyg.money;
                            break;

                    }

                    return (
                        <div style={{'textAlign': 'right'}}>
                            {(totalMoney / 100).toFixed(2)}
                        </div>
                    );
                }
            },
            {
                title: title,
                dataIndex: 'status',
                render: (text, record) => {

                    let tradeStatus = '';

                    switch (record.buyType) {
                        case 'mall':
                            tradeFilters.map((item) => {
                                if (item.value == record.tradeStatus) {
                                    tradeStatus = item.text;
                                }
                            });

                            break;
                        case 'yyg':
                            drawFilters.map((item) => {
                                if (item.value == record.drawStatus) {
                                    tradeStatus = item.text;
                                }
                            });
                            break;
                    }
                    return (
                        <div>
                            {tradeStatus}
                        </div>
                    );

                }
            }

        ];

        let columns;

        switch (buyType) {
            case 'mall':
                columns = [].concat(columns1, mallColumns, columns2);
                break;
            case 'yyg':
                columns = [].concat(columns1, yygColumns, columns2);
                break;

        }

        return columns;
    }

    getPagination() {
        const {totalElements, size} = this.props.data;
        const {viewParam, payType, tradeStatus, buyType} = this.props.state;
        return {
            total: totalElements,
            pageSize: size,
            showSizeChanger: true,
            onShowSizeChange: (page, size) => {
                this.props.list(viewParam, payType, tradeStatus, 0, size, buyType);
            },
            onChange: (page) => {
                this.setState({
                    page: page - 1
                });
                this.props.list(viewParam, payType, tradeStatus, page - 1, 10, buyType);
            },
            showTotal: total => `共 ${total} 个订单`
        };
    }

    render() {

        let {data} = this.props;
        const {buyType} = this.props.state;

        if (!data) {
            return null;
        }

        const columns = this.getColumns(buyType);

        const pagination = this.getPagination();

        return (
            <div>
                <Modal title="订单明细"
                       width={1100}
                       visible={this.props.visible}
                       onOk={this.props.reset}
                       onCancel={this.props.reset}>

                    <div style={{'height': '50px'}}>
                        <Select placeholder="请选择支付方式"
                                onChange={(value) => this.props.onChange(value, 'payType')}
                                style={{width: 120, 'margin': '5px'}}>
                            <Option value="">全部</Option>
                            <Option value="wechat">微信</Option>
                            <Option value="alipay">支付宝</Option>
                            <Option value="balance">余额</Option>
                        </Select>
                        <Select placeholder="请选择交易状态"
                                onChange={(value) => this.props.onChange(value, 'tradeStatus')}
                                style={{width: 120, 'margin': '5px'}}>
                            <Option value="">全部</Option>
                            <Option value="topay">未支付</Option>
                            <Option value="todelivery">待发货</Option>
                            <Option value="shipped">待收货</Option>
                            <Option value="received">已收货</Option>
                        </Select>
                    </div>

                    <Tabs onChange={this.callback} type="card">
                        <TabPane tab="商城" key="mall"></TabPane>
                        <TabPane tab="一元购" key="yyg"></TabPane>
                    </Tabs>


                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={data.content}
                        pagination={pagination}
                        bordered
                    />
                </Modal>
                {/*onChange={this.props.handleChange}*/}
            </div>
        );
    }
}
