import React, {Component} from 'react';
import {Table} from 'antd';
import moment from 'moment';
import {moneyFormat} from 'common/util';
import './index.less';

export default class ExamineAndVerifyInvoiceList extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const {inType,invoiceList,isLoading} = this.props;
        const moneyTitle = <div style={{textAlign: 'right'}}>
            发票金额/元
        </div>;

        let pagination = {
            total: this.props.totalElements,
            showSizeChanger: false,
            defaultPageSize: this.props.size,
            current: this.props.page + 1,
            onChange: (current) => {
                this.props.getInvoiceList(current - 1);
            },
        };

        let columns = [{
            title: '申请编号',
            dataIndex: 'applyNo',
            key: 'applyNo',
        }, {
            title: '申请时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
        }, {
            title: moneyTitle,
            dataIndex: 'money',
            key: 'money',
            render: (text) => <div style={{textAlign: 'right'}}> {moneyFormat(text, null, 2)}</div>
        },{
            title: '发票抬头',
            dataIndex: 'invoiceConfig.title',
            key: 'invoiceConfig.title',
        }, {
            title: '发票类型',
            dataIndex: 'invoiceConfig.invocieType',
            key: 'invoiceConfig.invocieType',
            render: (text) => <span>
                {text=='special'?'增值税专用发票':'增值税普通发票'}
            </span>
        }];
        switch (true){
            case inType == 'billing':
                columns.splice(2,0,{
                    title: '发票内容',
                    dataIndex: 'invoiceContent',
                    key: 'invoiceContent'
                });
                columns.push({
                    title: '操作',
                    dataIndex: 'action',
                    render:(text,record)=><div>
                        <a onClick={()=>this.props.viewDetails(record)}>查看详情</a>
                        <span className="ant-divider"></span>
                        <a onClick={()=>this.props.postInvoice(inType ,record)}>邮寄</a>
                    </div>
                });
                break;
            case inType == 'posted':
                let arr = [{
                    title: '快递公司',
                    dataIndex: 'express.expcom',
                    key: 'expressCompany'
                }, {
                    title: '快递单号',
                    dataIndex: 'express.expNo',
                    key: 'courierNumber'
                }, {
                    title: '操作',
                    dataIndex: 'action',
                    render:(text,record)=><a onClick={()=>this.props.postInvoice(inType ,record)}>修改</a>

                }];
                columns=columns.concat(arr);
                break;
        }
        let dataSource = invoiceList;

        return (
            <Table
                pagination={pagination}
                loading={isLoading}
                columns={columns}
                dataSource={dataSource}
                bordered/>
        );
    }
}
