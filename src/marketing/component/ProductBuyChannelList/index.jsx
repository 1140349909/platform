import React, { Component } from 'react';
import { message, Modal, Table} from 'antd';
import { moneyFormat } from 'common/util';
import SearchInput from 'common/component/SearchInput';
import Img from 'common/component/Img';

// 获取当前账户下的客户所有可添加到指定交易渠道的商品
export default class ProductBuyChannelList extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        productIds: []
    }

    // 获取
    getColumns() {
        return [{
            title: '序号',
            dataIndex: 'id',
            width: 50,
            render: (text, record, index) => {
                return (index + 1) + (this.props.size * this.props.page);
            }
        }, {
            title: '缩略图',
            dataIndex: 'mediaRes',
            width: 80,
            render: (mediaRes) => {
                if (mediaRes.productImgUrl) {
                    return (<Img width="60" src={mediaRes.productImgUrl}/>);
                } else {
                    return '-';
                }
            }
        }, {
            title: '商品编号',
            dataIndex: 'code'
        }, {
            title: '商品名称',
            dataIndex: 'name'
        }, {
            title: '成本单价(元)',
            dataIndex: 'cost',
            className: 'text-right',
            width: 100,
            render: (text) => moneyFormat(text)
        }];
    }

    getPagination() {
        return {
            total: this.props.total,
            pageSize: this.props.size,
            showSizeChanger: false,
            showTotal: total => `共 ${total} 个商品`
        };
    }

    getRowSelection() {
        return {
            onChange: (selectedRowKeys)=> {
                this.setState({
                    'productIds': selectedRowKeys
                });
            }
        };
    }

    handleChange = (pagination) => {
        this.props.list(pagination.current - 1, this.state.name);
    }

    handleSearch = (name) => {
        this.setState({
            name: name
        }, ()=> {
            this.props.list(0, name);
        });
    }

    handleOk = () => {
        const productIds = this.state.productIds;
        if (productIds.length > 0) {
            this.props.save(this.props.buyChannel, productIds);
        } else {
            message.error('请选择要添加的商品');
        }
    }

    render() {

        const columns = this.getColumns();

        const pagination = this.getPagination();

        const rowSelection = this.getRowSelection();

        const searchBar = (
            <div style={{height:20}}>
                <SearchInput style={{ width: 200, float:'right', marginRight:30 }} placeholder="请输入商品名称/编号"
                             onSearch={this.handleSearch}/>
                <div className="ant-modal-title" style={{float:'left'}}>商品库商品列表</div>
            </div>
        );

        return <Modal
            className="modal-top"
            width={840}
            title={searchBar}
            visible={true}
            onOk={this.handleOk}
            onCancel={this.props.reset}
            confirmLoading={this.props.confirmLoading}>
            <Table rowKey="id"
                   columns={columns}
                   pagination={pagination}
                   rowSelection={rowSelection}
                   dataSource={this.props.data}
                   bordered
                   loading={this.props.loading}
                   onChange={this.handleChange}/>
        </Modal>;
    }
}


