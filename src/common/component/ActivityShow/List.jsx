import React, {Component} from 'react';
import {message, Table} from 'antd';
import {getSafeValue} from 'common/util';
import _ from 'lodash';
import moment from 'moment';
import './index.less';

class List extends Component {

    constructor(props) {
        super(props);
    }

    getColumns() {
        return [{
            title: '活动H5名称',
            dataIndex: 'name',
            render: (text, item) => {
                const {vsite, toutiao, wx, wb} = item;
                if (_.has(vsite, 'title')) {
                    return vsite.title;

                } else if (_.has(wx, 'title')) {
                    return wx.title;

                } else if (_.has(wb, 'title')) {
                    return wb.title;

                } else if (_.has(toutiao, 'title')) {
                    return toutiao.title;

                } else {
                    return '标题未编辑';
                }
            }
        }, {
            title: '创建时间',
            dataIndex: 'createdDate',
            render: (text) => {
                return moment(text).format('YYYY-MM-DD HH:mm');
            }
        }, {
            title: '浏览量',
            dataIndex: 'opdata.pv',
            render: (text) => {
                return getSafeValue(text, '-');
            }
        }];
    }

    getRowSelection = () => {
        return {
            onChange: (selectedRowKeys, selectedRows)=> {
                this.props.selectedCallback(selectedRows[0]);
            },
            selectedRowKeys: [this.props.selected || ''],
            type: 'radio',
        };
    }

    onRowClick = (selectedRowKeys) => {
        this.props.selectedCallback(selectedRowKeys);
    }

    handleChange = (pagination) => {
        this.props.list(pagination.current - 1);
    }

    handleOk = () => {
        const productIds = this.state.productIds;
        if (productIds.length > 0) {
            this.props.save(this.props.buyChannel, productIds);
        } else {
            message.error('请选择要添加的活动H5页面');
        }
    }

    getPagination = () => {
        const {totalElements, size} = this.props.data;
        return {
            total: totalElements,
            pageSize: size,
        };
    }

    render() {
        const {data} = this.props;
        const rowSelection = this.getRowSelection();
        const columns = this.getColumns();
        const pagination = this.getPagination();
        return (
            <Table rowKey="id"
                   onRowClick={this.onRowClick}
                   loading={this.props.loading}
                   pagination={pagination}
                   columns={columns}
                   rowSelection={rowSelection}
                   dataSource={data.content}
                   bordered
                   onChange={this.handleChange}/>
        );
    }
}

export default List;
