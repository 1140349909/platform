import React, { Component } from 'react';
import {
    Modal,
    Row,
    Col,
    Button,
    Table,
} from 'antd';
import './index.less';
import { getSafeValue} from 'common/util';
import { moneyFormat } from 'common/util';
import DatePickerGroup from 'common/component/DatePickerGroup';

// 在售商品
export default class ProductSalesDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let data = this.props.data;

        // 判断属性不存在给于null值
        const mallDataList = typeof data.mall !== 'undefined' ? data.mall: null;
        const yygDataList = typeof data.yyg !== 'undefined' ? data.yyg : null;
        const total = typeof data.total !== 'undefined' ? data.total : null;

        const loading = this.props.loading;
        const extra = this.props.extra ? this.props.extra : '销售详情';

        return (
            <Modal
                visible={this.props.visible}
                className="modal-top"
                width={900}
                title={extra}
                footer={
                    <Button
                        size="large"
                        onClick={this.props.onCancel}>返回</Button>
                    }
                onCancel={this.props.onCancel}>
                <div className="product-sales-details">

                    <ProductSalesDetailsControl
                        onOk={this.props.onOk}
                        onDatePicker={this.props.onDatePicker}/>
                     <div>
                        <ProductSalesDetailsMallTable
                            loading={loading}
                            data={mallDataList}/>

                        <ProductSalesDetailsYygTable
                            loading={loading}
                            data={yygDataList}/>

                        <ProductSalesDetailsTotal
                            loading={loading}
                            mallDataList={mallDataList}
                            yygDataList={yygDataList}
                            data={total}/>
                    </div>
                </div>
            </Modal>
        );
    }
}


// 数据控制模块
class ProductSalesDetailsControl extends Component {


    // 日期选择按钮
    onOk = (type) => {
        if (this.props.onOk) {
            this.props.onOk(type);
        }
    }

    // 日期选择回调
    onDatePicker = (value, dateString) => {
        if (this.props.onDatePicker) {
            this.props.onDatePicker(dateString[0], dateString[1]);
        }
    }

    render() {
        return (
            <div className="product-sales-details-control">
                <div className="product-sales-details-l">
                    <Button
                        size="large"
                        onClick={() => this.onOk('')}>全部</Button>

                    <Button
                        size="large"
                        onClick={() => this.onOk('today')}>今日</Button>

                    <Button
                        size="large"
                        onClick={() => this.onOk('yesterday')}>昨天</Button>

                    <Button
                        size="large"
                        onClick={() => this.onOk('last7days')}>近7天</Button>

                    <Button
                        size="large"
                        onClick={() => this.onOk('last30days')}>近30天</Button>
                </div>
                <div className="product-sales-details-r">
                    <DatePickerGroup style={{ width: 230 }} onChange={this.onDatePicker} />
                </div>
            </div>
        );
    }
}

// 商城销售详情
class ProductSalesDetailsMallTable extends Component {

    // 生成对应字段
    getColumns = () => {
        return [{
            title: '交易方式',
            dataIndex: 'tradeTypes',
            render: (text) => {
                switch (text) {
                    case 'integralcash':
                        return '现金 + 积分';
                    case 'cash':
                        return '现金支付';
                    case 'integral':
                        return '积分支付';
                }
            }
        },

        {
            title: '现金定价',
            dataIndex: 'price',
            className: 'text-right',
            render: (text) => moneyFormat(text)
        },
        {
            title: '积分定价',
            dataIndex: 'integral',
            className: 'text-right',
            render: (text) =>  getSafeValue(text)

        },
        {
            title: '成本/元',
            dataIndex: 'cost',
            className: 'text-right',
            render: (text) =>  moneyFormat(text)
        },
        {
            title: '销售数量',
            dataIndex: 'amount',
            className: 'text-right',
            render: (text) => getSafeValue(text, 0)
        },
        {
            title: '总积分抵现/元',
            dataIndex: 'offsetAmount',
            className: 'text-right',
            render: (text) =>  moneyFormat(text)
        },
        {
            title: '总优惠券/元',
            dataIndex: 'couponAmount',
            className: 'text-right',
            render: (text) => moneyFormat(text)
        },
        {
            title: '销售额',
            dataIndex: 'salesAmount',
            className: 'text-right',
            render: (text) => moneyFormat(text)
        },
        {
            title: '实收',
            dataIndex: 'totalpaid',
            className: 'text-right',
            render: (text, record) => {
                if (record.tradeTypes == 'cash') {
                    return moneyFormat(record.salesAmount - (record.couponAmount + record.offsetAmount));
                } else {
                    return 0;
                }
            }
        },
        {
            title: '成本',
            dataIndex: 'costAmount',
            className: 'text-right',
            render: (text) => moneyFormat(text)
        },
        {
            title: '盈利金额',
            dataIndex: 'profitAmount',
            className: 'text-right',
            render: (text) => moneyFormat(text)
        }];
    }
    render() {

        const columns = this.getColumns();
        const data = this.props.data;

        let amount = 0,
            salesAmount = 0,
            profitAmount = 0,
            list = [],
            paid = 0;

        if (data !== null) {
            amount = data.total.amount;
            salesAmount = data.total.salesAmount;
            profitAmount = data.total.profitAmount;
            list = data.details;
            list.map(item => {
                paid = item.couponAmount + item.offsetAmount;
            });
        }
        // 交易时间
        return (
            <div>
                <div className='product-sales-details-tit'>
                    <Row>
                        <Col span={4}>商城销售详情</Col>
                        <Col span={5}>销售总量：{amount}</Col>
                        <Col span={5}>销售总额/元：{moneyFormat(salesAmount)}</Col>
                        <Col span={5}>总实收/元：{moneyFormat(salesAmount - paid)}</Col>
                        <Col span={5}>盈利总金额/元：{moneyFormat(profitAmount)}</Col>
                    </Row>
                </div>
                <Table
                   className='product-sales-details-table'
                   rowKey={(record, index) => index}
                   columns={columns}
                   dataSource={list}
                   pagination={false}
                   bordered
                   loading={this.props.loading}/>
            </div>
        );
    }
}

// 一元购销售详情
class ProductSalesDetailsYygTable extends Component {

    // 生成对应字段
    getColumns = () => {
        return [
            {
                title: '每期需总币数',
                dataIndex: 'credit',
                className: 'text-right',
                render: (text) => getSafeValue(text, 0)
            },
            {
                title: '每次参与币数',
                dataIndex: 'bidStep',
                className: 'text-right',
                render: (text) => getSafeValue(text, 0)

            },
            {
                title: '每期开奖个数',
                dataIndex: 'numOfOwners',
                className: 'text-right',
                render: (text) => getSafeValue(text, 0)

            },
            {
                title: '成本/元',
                dataIndex: 'cost',
                className: 'text-right',
                render: (text) => moneyFormat(text)
            },
            {
                title: '开奖期数',
                dataIndex: 'total',
                className: 'text-right',
                render: (text) => getSafeValue(text, 0)
            },
            {
                title: '开奖次数',
                dataIndex: 'amount',
                className: 'text-right',
                render: (text) => getSafeValue(text, 0)
            },
            {
                title: '交易金额/元',
                dataIndex: 'salesAmount',
                className: 'text-right',
                render: (text) => moneyFormat(text),
            },
            {
                title: '盈利金额/元',
                dataIndex: 'profitAmount',
                className: 'text-right',
                render: (text) => moneyFormat(text),
            }];
    }
    render() {

        const columns = this.getColumns();
        const data = this.props.data;

        let amount = 0,
            salesAmount = 0,
            profitAmount = 0,
            list = [];

        if (data !== null) {
            amount = data.total.amount;
            salesAmount = data.total.salesAmount;
            profitAmount = data.total.profitAmount;
            list = data.details;
        }

        return (
            <div>
                <div className='product-sales-details-tit'>
                    <Row>
                        <Col span={6}>一元购销售详情</Col>
                        <Col span={6}>销售总量：{amount}</Col>
                        <Col span={6}>销售总额/元：{moneyFormat(salesAmount)}</Col>
                        <Col span={6}>盈利总金额/元：{moneyFormat(profitAmount)}</Col>
                    </Row>
                </div>
                <Table
                   className='product-sales-details-table'
                   rowKey={(record, index) => index}
                   columns={columns}
                   dataSource={list}
                   pagination={false}
                   bordered
                   loading={this.props.loading}/>
            </div>

        );
    }
}

// 总销售
class ProductSalesDetailsTotal extends Component {

    // 生成对应字段
    getColumns = () => {
        return [
            {
                title: '销售数量',
                dataIndex: 'amount',
                className: 'text-right',
                render: (text) => getSafeValue(text, 0)
            },
            {
                title: '销售金额/元',
                dataIndex: 'salesAmount',
                className: 'text-right',
                render: (text) => getSafeValue(text)
            },
            {
                title: '总实收/元',
                dataIndex: 'totalpaid',
                className: 'text-right',
                render: () => {
                    let val = 0;
                    if (this.props.mallDataList) {
                        this.props.mallDataList.details.map(item => {
                            val = item.salesAmount - (item.offsetAmount + item.couponAmount);
                        });
                    }

                    if (this.props.yygDataList) {
                        val += this.props.yygDataList.total.salesAmount;
                    }

                    return moneyFormat(val);
                }
            },
            {
                title: '盈利金额/元',
                dataIndex: 'profitAmount',
                className: 'text-right',
                render: (text) => getSafeValue(text)
            }];
    }
    render() {

        const columns = this.getColumns();

        let list = [];
        if (this.props.data !== null) {
            list = [this.props.data];
        }

        return (
            <div>
                <div className='product-sales-details-tit'>
                    <Row>
                        <Col span={6}>总销售</Col>
                    </Row>
                </div>
                <Table
                   className='product-sales-details-table'
                   rowKey={(record, index) => index}
                   columns={columns}
                   dataSource={list}
                   pagination={false}
                   bordered
                   loading={this.props.loading}/>
            </div>
        );
    }
}
