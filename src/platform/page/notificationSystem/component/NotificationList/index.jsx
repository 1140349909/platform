import React, {Component} from 'react';
import {Table} from 'antd';
import {dateFormat} from 'common/util';
import './index.less';

export default class NotificationList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: null
    };

    render() {
        const columns = [{
            title: '标识',
            dataIndex: 'mark',
            key: 'mark',
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '最后修改时间',
            dataIndex: 'lastModifiedDate',
            key: 'lastModifiedDate',
            render: (record) => {
                return (
                    dateFormat(record, 'yyyy-MM-dd hh:mm')
                );
            }
        }, {
            title: '状态',
            dataIndex: 'contentStatus',
            key: 'contentStatus',
            render: (record) => {
                return (
                    record == 'published' ? '已启用' : '未启用'
                );
            }
        }, {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            render: (record) => {
                return (
                    <div style={{'color': '#ccc'}}>
                        <a style={{'marginRight': 10, 'marginLeft': 10}}
                           onClick={() => this.props.showUpdateModal(record)}>编辑</a>
                    </div>
                );
            }
        }];
        const dataSource = this.props.dataSource;
        const pagination = {
            total: dataSource.totalElements,
            showSizeChanger: false,
            pageSize: dataSource.size,
            current: this.state.page + 1,
            onChange: (current) => {
                this.setState({
                    page: current - 1,
                    size: dataSource.size
                });
                this.props.list((current - 1), this.state.size);
            }
        };

        return (
            <Table
                columns={columns}
                pagination={pagination}
                dataSource={dataSource.content}
                bordered/>
        );
    }
}
