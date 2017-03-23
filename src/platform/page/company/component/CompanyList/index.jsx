import React, {Component} from 'react';
import {Table, Button} from 'antd';
import {dateFormat} from 'common/util/index';
import './index.less';

export default class CompanyList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        const columns = [
            {
                title: '序号',
                dataIndex: 'index'
            }, {
                title: '企业编号',
                dataIndex: 'uin'
            }, {
                title: '企业名称',
                dataIndex: 'name'
            }, {
                title: '企业类型',
                dataIndex: 'type',
                render: (text, record)=> {

                    let typeList = [];

                    for (let i = 0; i < record.type.length; i++) {
                        let data = record.type[i];

                        switch (data) {
                            case 'BRAND':
                                typeList.push('品牌客户');
                                break;
                            case 'PLATFORM_MALL':
                                typeList.push('平台商城');
                                break;
                            case 'MALL':
                                typeList.push('商城');
                                break;
                            default:
                                typeList.push('-');
                                break;
                        }
                    }

                    return (
                        <div>{
                            typeList.toString()
                        }</div>
                    );

                }
            }, {
                title: '注册日期',
                dataIndex: 'lastModifiedDate',
                render: (text, record)=> {
                    return (
                        <div>{dateFormat(new Date(record.date), 'yyyy-MM-dd')}</div>
                    );

                }
            }, {
                title: '商城名称',
                dataIndex: 'mallName'
            }, {
                title: '联系人',
                dataIndex: 'contactName',
                render: (text, record) => record.contact ? record.contact.name : '-'
            }, {
                title: '联系电话',
                dataIndex: 'contactMobile',
                render: (text, record) => record.contact ? record.contact.mobile : '-'
            }, {
                title: '运营状态',
                dataIndex: 'status',
                filters: [{
                    text: '运营中',
                    value: '运'
                }, {
                    text: '未通过',
                    value: '未'
                }, {
                    text: '待审核',
                    value: '待'
                }],
                onFilter: (value, record) => {

                    let status = '';

                    switch (record.status) {
                        case 'AUTHENTICATION':
                            status = '运营中';
                            break;
                        case 'UNAUTHENTICATION':
                            status = '未通过';
                            break;
                        default:
                            status = '待审核';
                            break;
                    }

                    return (
                        status.indexOf(value) === 0
                    );
                },
                render: (text, record)=> {

                    let status = '';

                    switch (record.status) {
                        case 'AUTHENTICATION':
                            status = (<span>运营中</span>);
                            break;
                        case 'INVALIDATED':
                            status = (<span style={{'color': '#FF6161'}}>未通过</span>);
                            break;
                        default:
                            status = (<span style={{'color': '#FF6161'}}>待审核</span>);
                            break;
                    }

                    return (
                        <div>
                            {status}
                        </div>

                    );
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record)=> {
                    return (
                        <div className="operation">
                            <Button onClick={()=>this.props.showForm(record.id)}>
                                企业信息
                            </Button>
                            <Button disabled={record.status != 'AUTHENTICATION'}
                                    onClick={()=>this.props.showModal(record.id)}>
                                平台权限
                            </Button>
                        </div>

                    );
                }
            }];

        //分页
        const pagination = {
            pageSize: 10,
            total: this.props.total,
            showSizeChanger: true,
            onShowSizeChange: (page, size)=> {
                this.props.list(0, size);
            },
            onChange: (page)=> {
                this.props.list((page - 1));
            }
        };

        const dataList = this.props.data != undefined ? this.props.data : [];

        const dataSource = [];

        for (let i = 0; i < dataList.length; i++) {

            let scrData = dataList[i];

            //console.log(dataList[i].logistic);

            scrData.key = i;
            scrData.index = i + 1;

            let data = {
                index: i + 1,
                id: dataList[i].id,
                uin: dataList[i].uin,
                name: dataList[i].name,
                type: dataList[i].customerTypes,
                date: dataList[i].lastModifiedDate,
                contact: dataList[i].contact,
                status: dataList[i].status,
                mallName: dataList[i].mallName ? dataList[i].mallName : '-'
            };
            dataSource.push(data);
        }

        return (
            <Table rowKey={record => record.id}
                   columns={columns}
                   pagination={pagination}
                   dataSource={dataSource}
                   loading={this.props.loading}
                   bordered/>
        );
    }
}
