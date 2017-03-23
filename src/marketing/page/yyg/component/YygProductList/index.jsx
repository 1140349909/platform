import React, { Component } from 'react';
import { Table, Button, Progress } from 'antd';
import Tooltip from 'common/component/Tooltip';
import { getSafeValue, getOrderValue } from 'common/util';
import { moneyFormat } from 'common/util';
import Img from 'common/component/Img';
import './index.less';

export default class YygProductList extends Component {

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
                        <Img className="text-productinfo-img" src={mediaRes.coverImgUrl}/>
                        <div className="text-productinfo-text">
                            <p>编号:{record.code}</p>
                            <p>名称:{record.title}</p>
                        </div>
                    </div>);
            }
        }, {
            title: '库存总量',
            dataIndex: 'yygCfg.stock',
            className: 'text-right',
            width:150,
            render: (text) => getSafeValue(text)
        }, {
            title: '已售量',
            dataIndex: 'opdata.tradeData.amount',
            className: 'text-right',
            width:150,
            sorter: true,
            render: (text) => getSafeValue(text, 0)
        }, {
            title: '库存余量',
            dataIndex: 'intensity',
            className: 'text-right',
            width:150,
            render: (text) => getSafeValue(text, 0)
        }, {
            title: '商品成本(元)',
            dataIndex: 'cost',
            className: 'text-right',
            width:150,
            render: (text) => moneyFormat(text)
        }, {
            title: '最低投币数',
            dataIndex: 'yygCfg.bidStep',
            className: 'text-right',
            width:150,
            render: (text) => getSafeValue(text, 0)
        }, {
            title: '所需币数',
            dataIndex: 'yygCfg.credit',
            className: 'text-right',
            width:150,
            render: (text) => getSafeValue(text, 0)
        },{
            title: '每期开奖',
            dataIndex: 'yygCfg.numOfOwners',
            className: 'text-right',
            width:150,
            render: (text) => getSafeValue(text, 0)
        }, {
            title: '交易期数',
            dataIndex: 'yygCfg.issueNo',
            className: 'text-right',
            width:150,
            render: (text, record) => {
                if (record.yygCfg.issueNo == 0) {
                    return 0;
                } else {
                    return record.yygCfg.issueNo - 1;
                }
            }
        }, {
            title: '已交易总额(元)',
            dataIndex: 'opdata.tradeData.salesAmount',
            className: 'text-right',
            width:150,
            sorter: true,
            render: (text) => moneyFormat(text)
        }, {
            title: '当期进度',
            dataIndex: 'percent',
            className: 'text-center',
            width: 160,
            render: (text, record) => {
                if (record.status != 'news') {
                    return <Progress type="circle" percent={Math.round(text)} width={72}/>;
                } else {
                    return '-';
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            fixed:'right',
            width: 190,
            render: (text, record) => {
                return (
                    <span className="operation operation-vertical">
                            <span className="operation-item">
                                { record.canOpening &&
                                    <Tooltip type="yyg-opening" placement="left">
                                        <Button onClick={()=>this.props.opening(record.id)}>上架</Button>
                                    </Tooltip>
                                }
                                { record.canPreFinished &&
                                    <Tooltip type="yyg-finished" placement="left">
                                        <Button onClick={()=>this.props.finished(record.id)}>预下架</Button>
                                    </Tooltip>
                                }
                                { record.canReOpening &&
                                    <Tooltip type="yyg-continue-opening" placement="left">
                                        <Button onClick={()=>this.props.continueOpening(record.id)}>续上架</Button>
                                    </Tooltip>
                                }
                            </span>
                            <span className="operation-item">
                                <Tooltip type="yyg-info" placement="left">
                                    <Button
                                        onClick={()=>this.props.editProductInfo(record.id)}>修改商品详情</Button>
                                </Tooltip>
                            </span>

                        {(record.bizStatus !== 'finished' && record.bizStatus !== 'soldout') &&
                            <span className="operation-item">
                                <Tooltip type="yyg-trade" placement="left">
                                    <Button
                                        onClick={()=>this.props.editProductTrade(record.id)}>修改参与规则</Button>
                                </Tooltip>
                            </span>
                        }

                        {record.bizStatus == 'soldout' &&
                            <span className="operation-item">
                                <Button
                                onClick={()=>this.props.deleteProductFinishedClosed(record.id)}>结束商品</Button></span>
                        }

                        {record.canDel &&
                            <span className="operation-item">
                                <Tooltip type="yyg-delete" placement="left">
                                    <Button
                                        onClick={()=>this.props.del(record.id)}>移除</Button>
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
        const columns = this.props.status == 'finished' || this.props.status == '' ? this.getColumns().splice(0, this.getColumns().length - 1) : this.getColumns();
        const pagination = this.getPagination();
        return (
            <Table rowKey={(record, index) => index}
                   columns={columns}
                   pagination={pagination}
                   dataSource={this.props.data}
                   bordered
                   scroll={{ x: 2000 }}
                   loading={this.props.loading}
                   onChange={this.handleChange}/>
        );
    }
}
