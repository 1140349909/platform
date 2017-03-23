import React, {Component} from 'react';
import * as media from 'common/util/media';
import {dateFormat} from 'common/util/index';
import Img from 'common/component/Img';
import {Table, Button} from 'antd';

export default class TradeList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    moduleTypeCheck = (data)=> {

        const moduleList = [{
            'type': 'mall',
            'name': '商城'

        }, {
            'type': 'yyg',
            'name': '一元购'
        }];

        if (data.mall) {
            return {
                'name': moduleList[0].name,
                'cfg': data.mall,
                'way': data.mallCfg
            };
        } else {
            return {
                'name': moduleList[1].name,
                'cfg': data.yyg
            };
        }

    };

    render() {

        //表格的columns
        let columns = [{
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width:100,
        }, {
            title: '商品图',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width:160,
            render: (text, record) => {

                return (
                    <Img src={record.thumbnail} alt="" style={{'maxWidth': '100%', 'height': 100}}/>
                );

            }
        }, {
            title: '商品编号',
            dataIndex: 'code',
            key: 'code',
            width:130,
            sorter: (a, b) => a.code - b.code
        }, {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
            width:130
        }];

        //交易模块删除
        let column_yyg = [
            {
                title: '开奖时间',
                dataIndex: 'date',
                key: 'date',
                width:130,
                sorter: (a, b) => a.date - b.date,
                render: (text, record) => {

                    return (
                        <div>{dateFormat(new Date(record.date), 'yyyy-MM-dd hh:mm:ss')}</div>
                    );

                }
            },
            {
                title: '中奖编号',
                width:150,
                render: (text, record)=> {
                    return (
                        <div>
                            {record.ticket?record.ticket.toString():'-'}
                        </div>
                    );
                }
            }, {
                width:150,
                title: '参与金额',
                dataIndex: 'realAmount',
                key: 'realAmount',
                render: (text, record) => {
                    let money = '';

                    switch (record.amount.payType) {
                        case 'balance':
                            money = record.amount.balance / 100;
                            break;
                        default:
                            money = record.amount.money / 100;
                            break;
                    }

                    return (
                        <div style={{'textAlign':'right'}}>
                            {money}元
                        </div>
                    );
                }
            }
        ];

        let column_mall = [
            {
                title: '交易时间',
                dataIndex: 'date',
                key: 'date',
                width:130,
                sorter: (a, b) => a.date - b.date,
                render: (text, record) => {

                    return (
                        <div>{dateFormat(new Date(record.date), 'yyyy-MM-dd hh:mm:ss')}</div>
                    );

                }
            },
            {
                width:130,
                title: '交易金额',
                dataIndex: 'amount',
                key: 'amount',
                render: (text, record) => {


                    return (
                        <div style={{'textAlign':'right'}}>
                            {record.totalMoney / 100}元
                        </div>
                    );

                }
            }, {
                width:100,
                title: '实交易金额',
                dataIndex: 'realAmount',
                key: 'realAmount',
                render: (text, record) => {
                    let integral = '',
                        money = '';

                    switch (record.amount.payType) {
                        case 'balance':
                            money = record.amount.balance / 100;
                            break;
                        default:
                            money = record.amount.money / 100;
                            break;
                    }

                    let useMoney = true,
                        useIntegral = true;

                    for (var name in record.way) {

                        //过滤一下对象的属性
                        if (record.way[name] && record.way.hasOwnProperty(name)) {
                            switch (name) {
                                case 'enableCash':
                                    useIntegral = false;
                                    break;
                                case 'enableIntegral':
                                    useMoney = false;
                                    break;
                                case 'enableIntegralCash':
                                    break;
                                case 'enableIntegralOffset':
                                    break;
                                case 'enableCoupon':
                                    useIntegral = false;
                                    break;
                                default:
                                    break;
                            }
                        }


                    }

                    switch (record.buyType) {
                        case 'mall':
                            integral = record.amount.integral;
                            break;
                        case 'yyg':
                            useIntegral = false;
                            integral = 0;
                            break;
                    }
                    return (
                        <div>
                            {useIntegral && <p>积分：{integral}分</p>}
                            {useMoney && <p>现金：{money}元</p>}
                        </div>
                    );
                }
            }, {
                width:100,
                title: '优惠方式',
                dataIndex: 'preferentialWay',
                key: 'preferentialWay',
                render: (text, record) => {

                    let way = '无';

                    for (var name in record.way) {

                        //过滤一下对象的属性
                        if (record.way[name] == true && record.way.hasOwnProperty(name)) {
                            switch (name) {
                                case 'enableCash':
                                    way = '爆款';
                                    break;
                                case 'enableIntegral':
                                    if(!record.amount.userCoupon){
                                        way = '积分兑换';
                                    }
                                    break;
                                case 'enableIntegralCash':
                                    if(!record.amount.userCoupon){
                                        way = '积分优惠';
                                    }
                                    break;
                                case 'enableIntegralOffset':
                                    //缺少积分和现金的兑换比
                                    if(!record.amount.userCoupon){
                                        way = '积分抵现';
                                    }

                                    // way = '积分抵现'+record.amount.integral+'元';
                                    break;
                                case 'enableCoupon':
                                    if (record.amount.userCoupon) {
                                        switch (record.amount.userCoupon.couponType) {
                                            case 'discount':
                                                way = record.amount.userCoupon.discount + '折优惠券';
                                                break;
                                            case 'quota':
                                                way = record.amount.userCoupon.faceValue / 100 + '元优惠券';
                                                break;
                                        }
                                    } else {
                                        way = '';
                                    }

                                    break;
                                default:
                                    way = '无';
                                    break;
                            }
                        }
                    }
                    return (
                        <div>
                            {way}
                        </div>
                    );
                }
            },{
                width:100,
                title: '买家留言',
                dataIndex: 'memo',
                key: 'memo',
                render: (text, record) => {

                    return (
                        <div>
                            {record.amount.sku && record.amount.sku.memo?record.amount.sku.memo:'-'}
                        </div>
                    );

                }
            }
        ];

        let column3 = [{
            width:100,
            title: '收货人',
            dataIndex: 'consignee',
            key: 'consignee',
            render: (text, record) => {

                return (
                    <div>
                        {record.consignee?<a onClick={()=>this.props.showConsignee(record.id)}>
                            {record.consignee}
                        </a>:'-'}
                    </div>
                );

            }
        },{
            title: '手机号',
            width:100,
            render: (text, record)=> {
                return (
                    <div>
                        {record.logistics.mobile?record.logistics.mobile:'-'}
                    </div>
                );
            }
        }, {
            width:100,
            title: '物流状态',
            dataIndex: 'status',
            key: 'status',
            filters: [{
                text: '待发货',
                value: 'todelivery'
            }, {
                text: '已发货',
                value: 'shipped'
            }, {
                text: '已收货',
                value: 'received'
            }],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (text, record)=> {

                let tradeStatus = undefined;

                switch (record.status) {
                    case 'topay':
                        tradeStatus = '待支付';
                        break;
                    case 'todelivery':
                        tradeStatus = '待发货';
                        break;
                    case 'shipped':
                        tradeStatus = '已发货';
                        break;
                    case 'received':
                        tradeStatus = '已收货';
                        break;
                    case 'show':
                        tradeStatus = '已晒图';
                        break;
                    default:
                        tradeStatus = '-';
                        break;

                }

                if (record.address) {
                    /*for (let attr in record.address) {
                        if (record.address[attr] == '') {
                            tradeStatus = '-';
                        }
                    }*/
                } else {
                    tradeStatus = '-';
                }

                return (
                    <div style={{'textAlign': 'center'}}>

                        <p style={{'color': tradeStatus != '-' ? '#ea5035' : 'black'}}>
                            {tradeStatus}
                        </p>
                    </div>
                );
            }
        }, {
            width:150,
            title: '运单号',
            dataIndex: 'billNumber',
            key: 'billNumber',
            render: (text, record)=> {

                let status = '';

                switch (record.status) {
                    case 'shipped':
                        status = '已发货';
                        break;
                    default:
                        status = '其他';
                        break;
                }


                return (
                    <div>
                        {record.billNumber?<a onClick={
                            status == '其他'
                                ? ()=>this.props.showLogistics(record.id)
                                : ()=>this.props.submit(record.id)}>
                            {record.billNumber}
                        </a>:'-'}
                    </div>
                );
            }
        }, {
            width:150,
            title: '物流商',
            dataIndex: 'logistics',
            key: 'logistics',
            render: (text, record)=> {
                return (
                    <div>
                        {record.logistics.vendor?record.logistics.vendor:'-'}
                    </div>
                );
            }
        },{
            title: '订单编号',
            dataIndex: 'orderCode',
            key: 'orderCode',
            width:150,
            sorter: (a, b) => a.orderCode - b.orderCode
        }, {
            width:100,
            title: '操作',
            dataIndex: 'operation',
            fixed: 'right',
            key: 'operation',
            render: (text, record) => {

                let title = '',
                    type = '',
                    disabled = false;

                switch (this.props.buyType) {
                    case 'mall':
                        switch (record.status) {
                            case 'topay':
                                type = 'primary';
                                title = '提交物流';
                                disabled = true;
                                break;
                            case 'todelivery':
                                type = 'primary';
                                title = '提交物流';
                                break;
                            case 'shipped':
                                title = '确认收货';
                                break;
                            case 'received':
                                title = '确认收货';
                                disabled = true;
                                break;
                            default:
                                type = 'primary';
                                title = '提交物流';
                                disabled = true;
                                break;

                        }
                        break;
                    case 'yyg':
                        switch (record.draw) {
                            case 'todraw':
                                type = 'primary';
                                title = '提交物流';
                                disabled = true;
                                break;
                            case 'noluck':
                                type = 'primary';
                                title = '提交物流';
                                disabled = true;
                                break;
                            case 'toaccept':
                                type = 'primary';
                                title = '提交物流';
                                disabled = true;
                                break;
                            case 'todelivery':
                                type = 'primary';
                                title = '提交物流';
                                break;
                            case 'shipped':
                                title = '确认收货';
                                break;
                            case 'received':
                                title = '确认收货';
                                disabled = true;
                                break;
                            case 'show':
                                title = '确认收货';
                                disabled = true;
                                break;
                            default:
                                type = 'primary';
                                title = '提交物流';
                                disabled = true;
                        }
                        break;
                }

                if (record.address) {
                    /*for (let attr in record.address) {
                        if (record.address[attr] == '') {
                            disabled = true;
                        }
                    }*/
                } else {
                    disabled = true;
                }

                return (

                    <div>
                        <Button type={type}
                                disabled={disabled}
                                onClick={title == '提交物流' ? ()=>this.props.submit(record.id) : ()=>this.props.confirmDelete({record})}>
                            {title}
                        </Button>
                    </div>
                );
            }
        }];

        //debug
        switch (this.props.buyType) {
            case 'mall':
                columns = columns.concat(column_mall, column3);
                break;
            case 'yyg':
                columns = columns.concat(column_yyg, column3);
                break;
        }


        let {data,list} = this.props;

        if(!list){
            return null;
        }
        const dataList = data;
        const dataSource = [];

        for (let i = 0; i < dataList.length; i++) {

            let scrData = dataList[i];
            scrData.key = i;
            scrData.index = i + 1;

            let data = {
                index: i + 1,
                buyType: dataList[i].buyType,
                id: dataList[i].id,
                thumbnail: media.getMediaUrl(dataList[i].coverImgId),
                code: dataList[i].productCode,
                name: dataList[i].productName,
                date: dataList[i].lastModifiedDate,
                orderCode: dataList[i].tradeNo,
                number: dataList[i].issueNo,

                address: dataList[i].address,

                ticket: dataList[i].ticket ? dataList[i].ticket : '',
                module: this.moduleTypeCheck(dataList[i]).name,
                amount: this.moduleTypeCheck(dataList[i]).cfg,

                way: this.moduleTypeCheck(dataList[i]).way ? this.moduleTypeCheck(dataList[i]).way : '',
                totalMoney: dataList[i].totalMoney ? dataList[i].totalMoney : '',

                consignee: dataList[i].address ? dataList[i].address.name : '',
                status: dataList[i].tradeStatus ? dataList[i].tradeStatus : 'none',
                draw: dataList[i].drawStatus ? dataList[i].drawStatus : 'none',
                pay: dataList[i].payStatus ? dataList[i].payStatus : 'none',
                billNumber: dataList[i].logistic != undefined ? dataList[i].logistic.code : '',
                logistics: {
                    vendor: dataList[i].logistic != undefined ? dataList[i].logistic.vendor : '',
                    name: dataList[i].address ? dataList[i].address.name : '',
                    mobile: dataList[i].address ? dataList[i].address.mobile : '',
                    address: dataList[i].address ? dataList[i].address.prov + ' '
                    + dataList[i].address.city + ' '
                    + dataList[i].address.region + ' '
                    + dataList[i].address.street : ''
                }
            };
            dataSource.push(data);
        }

        //分页
        const pagination = {
            total: this.props.total,
            showSizeChanger: true,
            onShowSizeChange: (page, size)=> {
                this.props.list(0, size);
            },
            onChange: (page)=> {
                this.props.list((page - 1));
            }
        };

        return (
            <Table columns={columns}
                   rowKey={record => record.id}
                   pagination={pagination}
                   dataSource={dataSource}
                   scroll={{ x: 1700, y: 500 }}
                   bordered/>
        );
    }
}
