import React, {Component} from 'react';
import {Table} from 'antd';
import MallAuth from '../MallAuth';
import MallFeatureAuth from '../MallFeatureAuth';

export default class MallList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    render() {

        const columns = [
            // {
            //     title: 'id',
            //     dataIndex: 'id',
            //     width:180
            // },
            {
                title: 'id',
                dataIndex: 'uin'
            }, {
                title: '商城名称',
                dataIndex: 'name',
            }, {
                title: '商城账号',
                dataIndex: 'userName',
            }, {
                title: '联系人',
                dataIndex: 'contact_name',
                render: (text, record) => record.contact.name
            }, {
                title: '联系电话',
                dataIndex: 'contact_mobile',
                render: (text, record) => record.contact.mobile
            }, {
                title: '平台权限',
                dataIndex: 'mallAuth',
                render: (mallAuth) => {
                    return <MallAuth mallAuth={mallAuth} split={<br />}/>;
                }
            }, {
                title: '功能权限',
                dataIndex: 'mallFeatureAuth',
                render: (val, record) => {
                    return <MallFeatureAuth mallAuth={record.mallAuth} split={<br />}/>;
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <span>
                      <a href="javascript:;" onClick={()=>this.props.edit(record.id)}>编辑</a>
                      <span className="ant-divider"></span>
                      <a href="javascript:;" onClick={()=>this.props.show(record.id)}>运营详情</a>
                    </span>
                    );

                }
            }];

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
            <Table rowKey={record => record.id}
                   columns={columns}
                   pagination={pagination}
                   dataSource={this.props.data}
                   loading={this.props.loading}
                   bordered/>
        );
    }
}
