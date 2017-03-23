import React from 'react';
import {Table, Button} from 'antd';
import {dateFormat, getOrderValue} from 'common/util';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import AuthModule from 'common/component/AuthModule';
import './index.less';

export default class OpinionList extends AuthComponentBase {
    constructor(props) {
        super(props);
    }

    // 获取
    getColumns() {
        return [{
            title: '序号',
            dataIndex: 'index',
            width: 50,
            render: (text, record, index) => index + 1
        }, {
            title: '资讯标题',
            dataIndex: 'title',
            render: (text) => {
                return text ? text : '暂无';
            },
            width: 100,
        }, {
            title: '留言内容',
            dataIndex: 'content',
            width: 200,
        }, {
            title: '留言者称呼',
            dataIndex: 'name',
            width: 100,
        }, {
            title: '留言时间',
            dataIndex: 'createdDate',
            width: 70,
            render: (text) => dateFormat(text)
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: (text, record) => {
                return (
                    <div className="opinion-list-btns">
                        {record.contentStatus == 'edit' &&
                            <AuthModule type={module.CONTENT_MESSAGE_CHECK}>
                                <Button type="primary" onClick={() => {
                                    this.anyWhereModule(module.CONTENT_MESSAGE_CHECK).then(()=>{
                                        this.props.updatePublish(record.id);
                                    });
                                }}>通&#12288;过</Button>
                            </AuthModule>
                        }

                        {record.contentStatus == 'published' &&
                        <Button type="primary" className="opinion-list-btn-pass">已通过</Button>
                        }
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="dashed" onClick={() => this.props.delOperation(record.id)}>删除</Button>
                    </div>
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
                   className="opinion-list"
                   columns={columns}
                   pagination={pagination}
                   dataSource={this.props.data}
                   bordered
                   loading={this.props.loading}
                   onChange={this.handleChange}
                   scroll={{x: 1067}}/>
        );
    }
}
