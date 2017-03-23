import React from 'react';
import {Table, Button} from 'antd';
import TableListBase from 'common/base/TableListBase';
export default class extends TableListBase {
    renderUri(uris) {
        if (!uris) {
            return null;
        }
        uris = uris.split('\n');
        return (<div>
            {uris.map((uri, key) => {
                return (<div key={key}>{uri}</div>);
            })}
        </div>);
    }

    // 获取列配置
    getColumns() {
        return [{
            title: '序号',
            dataIndex: 'id',
            width: this.getTableColumnWidth(2),
            render: (text, record, index) => (index + 1)
        }, {
            title: '功能名称',
            dataIndex: 'name',
            width: this.getTableColumnWidth(15)
        }, {
            title: '功能标识',
            dataIndex: 'key',
            width: this.getTableColumnWidth(20)
        }, {
            title: '负责人',
            dataIndex: 'page',
            width: this.getTableColumnWidth(10)
        }, {
            title: '业务角色',
            dataIndex: 'roles',
            width: this.getTableColumnWidth(25)
        }, {
            title: 'Method',
            dataIndex: 'method',
            width: this.getTableColumnWidth(4)
        }, {
            title: 'URI',
            dataIndex: 'uri',
            width: this.getTableColumnWidth(15),
            render: (text) => {
                return this.renderUri(text);
            }
        }, /*{
         title: 'Action',
         dataIndex: 'action',
         width: this.getTableColumnWidth(10)
        }, */{
            title: '功能描述',
            dataIndex: 'desc',
            width: this.getTableColumnWidth(10)
        }, {
            title: '修改时间',
            dataIndex: 'lastModifiedDate',
            width: this.getTableColumnWidth(9),
            render: (text) => this.outDateTime(text)
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: this.getTableColumnWidth(11),
            fixed: 'right',
            render: (text, record) => {
                return (
                    <div>
                        <Button onClick={() => this.props.onEdit(record.id)}>编辑</Button> <Button
                        onClick={() => this.props.onDelete(record.id)}>删除</Button>
                    </div>
                );
            }
        }];
    }


    render() {
        const {content} = this.props.data;
        const columns = this.getColumns();
        return (
            <Table bordered
                   rowKey="id"
                   dataSource={content}
                   columns={columns}
                   scroll={{x: this.getTableColumnsX(columns)}}
                   pagination={this.getPagination()}
                   loading={this.props.loading}/>
        );
    }
}
