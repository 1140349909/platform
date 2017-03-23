import React, {Component} from 'react';
import {Button, Modal, Table} from 'antd';
import './index.less';
const confirm = Modal.confirm;

export default class CompanyList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => {
                return index + 1;
            }
        }, {
            title: '店员名称',
            dataIndex: 'name',

        }, {
            title: '工号',
            dataIndex: 'jobNo',
        }, {
            title: '手机号码',
            dataIndex: 'mobile',
        }, {
            title: '所属店铺',
            dataIndex: 'storeName',
            render: (text, record) => {
                return record.store.name;
            }
        }, {
            title: '人数',
            dataIndex: 'number6',
            render: () => {
                return '-';
            }
        }, {
            title: '人数排名',
            dataIndex: 'number7',
            render: () => {
                return '-';
            }
        }, {
            title: '消费总金额',
            dataIndex: 'number8',
            render: () => {
                return '-';
            }
        }, {
            title: '金额排名',
            dataIndex: 'number9',
            render: () => {
                return '-';
            }
        }, {
            title: '操作',
            dataIndex: 'number10',
            colSpan: 2,
            render: (text, record) => {
                return (
                    <Button className="company-list-btn" onClick={() => {
                        this.props.showEmployee(Object.assign(record, {
                            type: 'modify'
                        }));
                    }
                    }>修改</Button>
                );
            }
        }, {
            title: '操作',
            dataIndex: 'number11',
            colSpan: 0,
            render: (text, record) => {
                return (
                    <CompanyListStateBtn
                        id={record.id}
                        empStatus={record.empStatus}
                        doEmployeeState={this.props.doEmployeeState}/>
                );
            }
        }];


        let data = this.props.data;

        const pagination = {
            pageSize: data.size,
            total: data.totalElements,
            onShowSizeChange: (page, size) => {
                this.props.employeeList(0, size);
            },
            onChange: (page) => {
                this.props.employeeList(page - 1);
            }
        };

        return (

            <Table
                loading={this.props.loading}
                className="company-list"
                rowKey={record => record.id}
                columns={columns}
                pagination={pagination}
                dataSource={data.content}
                bordered/>
        );
    }
}


// 控制状态按钮
class CompanyListStateBtn extends Component {

    showTrueConfirm = () => {
        confirm({
            title: '是否启用此员工',
            content: '是否启用此员工',
            onOk: () => {
                this.props.doEmployeeState({
                    id: this.props.id,
                    status: 'TRUE',
                });
            },
            onCancel: () => {
            },
        });
    }

    showFalseConfirm = () => {
        confirm({
            title: '是否禁用此员工',
            content: '是否禁用此员工',
            onOk: () => {
                this.props.doEmployeeState({
                    id: this.props.id,
                    status: 'FALSE',
                });
            },
            onCancel: () => {
            },
        });
    }

    render() {
        return (
            <div>
                {this.props.empStatus == 'TRUE' &&
                <Button
                    className="company-list-btn"
                    onClick={this.showFalseConfirm}>
                    禁用</Button>
                }

                {this.props.empStatus !== 'TRUE' &&
                <Button className="company-list-btn"
                        onClick={this.showTrueConfirm}>
                    启用</Button>
                }
            </div>
        );
    }
}




