import React, {Component} from 'react';
import {Table} from 'antd';
import {dateFormat} from 'common/util';
import * as media from 'common/util/media';
import Img from 'common/component/Img';
import './index.less';
export default class CustomerServiceList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    differColumns = (record) => {
        const param = this.props.params;
        if (param) {
            return (
                <Img className="qrcode" style={{'display': 'block', width: 50, height: 50}}
                     src={media.getMediaUrl(record, 100)}/>
            );
        } else {
            return (
                record
            );
        }
    }

    render() {
        const param = this.props.params;
        const columns = [{
            title: '标识',
            dataIndex: 'mark',
            key: 'mark',
        }, {
            title: param ? '二维码' : '编号',
            dataIndex: param ? 'qrcode' : 'id',
            key: param ? 'qrcode' : 'id',
            render: (record) => this.differColumns(record)
        }, {
            title: '标题',
            dataIndex: param ? 'name' : 'title',
            key: param ? 'name' : 'title',
        }, {
            title: '最后修改时间',
            dataIndex: 'lastModifiedDate',
            key: 'lastModifiedDate',
            width: 120,
            render: (record) => dateFormat(record, 'yyyy-MM-dd hh:mm')
        }, {
            title: '状态',
            dataIndex: 'contentStatus',
            key: 'contentStatus',
            width: 80,
            render: (record) => {
                return (
                    record == 'published' ? '启用' : '未启用'
                );
            }
        }, {
            title: '操作',
            dataIndex: '',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (record) => {
                const contentStatus = record && record.contentStatus;
                return (
                    <div style={{'color': '#ccc'}}>
                        <a style={{'marginRight': 10, 'marginLeft': 10}}
                           onClick={() => this.props.getDetailInfo(record.id)}>编辑</a>
                        |
                        <a style={{'marginRight': 10, 'marginLeft': 10}}
                           onClick={() => this.props.deleteHelpProblemModal(record.id)}>删除</a>
                        |
                        <a style={{'marginLeft': 10}}
                           onClick={() => this.props.changeHelpStatus(record.id, contentStatus == 'published' ? 'edit' : 'published')}>
                            {contentStatus == 'published' ? '禁用' : '启用'}</a>
                    </div>
                );
            }
        }];
        const dataSource = this.props.dataSource;
        const pagination = {
            total: dataSource.totalElements,
            pageSize: 10,
            onChange: (page) => {
                this.props.list((page - 1), 10);
            }
        };

        return (
            <Table
                rowKey="id"
                columns={columns}
                pagination={pagination}
                scroll={{x: 1000}}
                dataSource={dataSource.content}
                bordered/>
        );
    }
}
