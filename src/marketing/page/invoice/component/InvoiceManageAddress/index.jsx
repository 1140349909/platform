import React, {Component}from 'react';
import {Table, Button, Modal} from 'antd';
import  './index.less';
import IconFont from 'common/component/IconFont';
const confirm = Modal.confirm;


import InvoiceManageAddressForm from '../InvoiceManageAddressForm';


export default class InvoiceManageAddress extends Component {

    constructor(props) {
        super(props);
    }


    handleDoAddress = (type, data) => {
        this.props.showAddressInf(type, data);
    };

    showConfirm = (action, obj, record) => {

        if (action == 'delete') {
            confirm({
                title: '确认删除该收件地址？',
                onOk() {
                    obj.props.deleteCustomerAddress(record);
                },
                onCancel() {
                },
            });
        }

    };

    rowChange = (selectedRowKeys, selectedRows) => {

        if (this.props.entry == 'add') {
            this.props.handleSelected(selectedRows[0]);
            this.props.getDeliveryAddress(selectedRows);
        }
    };

    render() {
        //组件属性的继承
        let {isShowAddressInf, reset, param, formData, id,isLoading} =this.props;
        const columns = [{
            title: '收件人',
            dataIndex: 'name',
            key: 'name',
        }, {
            width: '18%',
            title: '所在地区',
            dataIndex: 'area',
            key: 'area',
        }, {
            width: '20%',
            title: '详细地址',
            dataIndex: 'street',
            key: 'street',
        }, {
            width: '8%',
            title: '',
            dataIndex: 'often',
            key: 'often',
            render: (text, record) => {
                return (
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: '#888',
                        color: '#fff',
                        borderRadius: '2px'
                    }}>{record.often ? '默认地址' : ''}</span>
                );
            },
        }, {
            width: '13%',
            title: '邮编',
            dataIndex: 'postCode',
            key: 'postCode',
            render: (text, record) => (
                <span>
                       {record.postCode ? record.postCode : ''}
                    </span>
            ),
        }, {
            width: '13%',
            title: '联系方式',
            dataIndex: 'mobile',
            key: 'mobile',
        }, {
            width: '15%',
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                        <a onClick={() => this.handleDoAddress('edit', record)}>编辑</a>
                    &nbsp; &nbsp;
                    <a style={{color: '#FF6A6A'}} onClick={() => this.showConfirm('delete', this, record)}>删除</a>
                    </span>
            ),
        }];

        let data = this.props.addressList;
        for (let i = 0; i < data.length; i++) {
            data[i].area = data[i]['prov'] + ' ' + data[i]['city'] + ' ' + data[i]['region'];
        }
        /*入口的判断*/
        let rowSelection;
        if (this.props.entry === 'address') {
            rowSelection = null;
        } else if (this.props.entry === 'add') {
            rowSelection = {
                type: 'radio',
                onChange: this.rowChange,
                selectedRowKeys: [id || ''],
            };

        }
        const locale = {
            emptyText: <div style={{fontSize: '14px', marginTop: '20px', marginBottom: '20px'}}>
                <IconFont
                    style={{fontSize: '16px'}}
                    type="info"/>
                &nbsp;&nbsp;您还没有地址信息，
                <a onClick={ () => {this.handleDoAddress('add');}}>
                    立即设置
                </a>
            </div>
        };
        return (
            <div>
                <div className="invoice-manageAddress">
                    <h3 className="invoice-title">
                        <span className="title-bg"></span>
                        收件地址(将免费邮递给您)
                    </h3>
                    <Button type='primary'
                            size="large"
                            onClick={() => {
                                this.handleDoAddress('add');
                            }}
                            disabled={data.length === 5}>添加收件地址</Button>
                    <p className="manageAddress-tip">
                        已保存{data.length}条地址，还能保存{5 - data.length}条
                    </p>
                    {/*表格的列表*/}
                    <Table className='invoice-list'
                           columns={columns}
                           dataSource={data}
                           pagination={false}
                           rowSelection={rowSelection}
                           rowKey="id"
                           locale={locale}
                           loading={isLoading}
                    />
                </div>
                {isShowAddressInf &&
                <InvoiceManageAddressForm
                    isShowAddressInf={isShowAddressInf}
                    visible={isShowAddressInf}
                    reset={reset}
                    param={param}
                    data={formData}
                    addCustomerAddress={this.props.addCustomerAddress}
                    updateCustomerAddress={this.props.updateCustomerAddress}
                    entry={this.props.entry}/>
                }
            </div>

        );

    }
}
