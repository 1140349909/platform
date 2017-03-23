import React, {Component} from 'react';
import {
    Button,
    Table,
} from 'antd';
import Img from 'common/component/Img';
import {dateFormat} from 'common/util/index';
export default class MemberList extends Component {

    constructor(props) {
        super(props);
    }

    getColumns() {
        const columns = [
            {
                title: '会员卡号',
                dataIndex: 'cardNo',
            },
            {
                title: '会员头像',
                dataIndex: 'headImg',
                render: (text, record)=> {
                    return (
                        <div>
                            {record.headImg ? <Img src={record.headImg}
                                                   style={{'maxWidth': '100%', 'height': 60}}/> : '-'}
                        </div>
                    );

                }
            }, {
                title: '会员姓名',
                dataIndex: 'name',
                render: (text, record)=> {
                    return (
                        <div>{record.name ? record.name : '-'}</div>
                    );

                }
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: (text, record) => {

                    let sex = '-';

                    switch (record.sex) {
                        case 'M':
                            sex = '男';
                            break;
                        case 'F':
                            sex = '女';
                            break;
                        default:
                            break;
                    }
                    return sex;
                }
            },{
                title: '手机号',
                dataIndex: 'mobile'

            },{
                title: '出生日期',
                dataIndex: 'birthday',
                render: (text, record) => {
                    return (
                        <div>{record.birthday ? dateFormat(new Date(parseInt(record.birthday)), 'yyyy-MM-dd') : '-'}</div>
                    );
                }
            },{
                title: '注册地',
                dataIndex: 'ipAdr',
                render: (text, record) => {
                    return (
                        <div>{record.ipAdr ? record.ipAdr : '-'}</div>
                    );
                }
            },{
                title: '注册日期',
                dataIndex: 'createdDate',
                render: (text, record)=> {
                    return (
                        <div>{dateFormat(new Date(record.createdDate), 'yyyy-MM-dd')}</div>
                    );

                }
            },
            {
                title: '最后登录时间',
                dataIndex: 'lastModifiedDate',
                render: (text, record)=> {
                    return (
                        <div>{dateFormat(new Date(record.lastModifiedDate), 'yyyy-MM-dd hh:mm:ss.S')}</div>
                    );

                }
            },{
                title: '交易次数',
                dataIndex: 'opdata.tradeData.orders',
                className: 'text-left',
                render: (text, record) => {
                    return (
                        <div>
                            {record.opdata && record.opdata.tradeData.orders ? record.opdata.tradeData.orders : '-'}
                        </div>
                    );
                }
            },{
                title: '实交易金额/元',
                dataIndex: 'opdata.tradeData.cashAmount',
                className: 'text-right',
                render: (text, record)=> {

                    return (
                        <div style={{'textAlign': 'right'}}>
                            {record.opdata && record.opdata.tradeData.cashAmount ? (record.opdata.tradeData.cashAmount / 100).toFixed(2) : '-'}
                        </div>
                    );
                }
            },




            {
                title: '代言状态',
                dataIndex: 'uinSeller',
                render: (text, record) => {
                    return (
                        <div>{record.uinSeller ? '已开通' : '未开通'}</div>
                    );
                }
            },   {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <Button type="primary"
                                    onClick={()=>this.props.showMemberMallOrderList(record.id)}>订单明细</Button>
                        </div>
                    );
                }
            }

        ];
        return columns;
    }

    getPagination() {
        const {totalElements, size} = this.props.data;
        return {
            total: totalElements,
            pageSize: size,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 个会员`
        };
    }

    handleChange = (pagination) => {
        this.props.list(pagination.current - 1, pagination.pageSize);
    }

    render() {

        let {data, loading} = this.props;

        if (!data) {
            return null;
        }

        const columns = this.getColumns();

        const pagination = this.getPagination();

        return (
            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={data.content}
                pagination={pagination}
                bordered
                onChange={this.handleChange}/>
        );
    }
}
