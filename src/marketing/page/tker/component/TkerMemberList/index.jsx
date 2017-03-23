import React, {Component} from 'react';
import {
    Button,
    Table,
} from 'antd';
export default class TKerMemberList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let {data,loading} = this.props;

        if(!data){
            return null;
        }

        const columns = [
            {
                title: '会员卡号',
                dataIndex: 'cardNo',
                render:(text,record)=>{
                    return (
                        <div>
                            {record.cardNo?record.cardNo:'-'}
                        </div>
                    );
                }
            }, {
                title: '会员姓名',
                dataIndex: 'name',
                render:(text,record)=>{
                    return (
                        <div>
                            {record.name?record.name:'匿名'}
                        </div>
                    );
                }
            },{
                title: '手机号',
                dataIndex: 'mobile',
            },{
                title: '粉丝数',
                dataIndex: 'opdata.tkerData.members',
                className: 'text-right',
                render:(text,record)=>{
                    return (
                        <div>
                            {record.opdata && record.opdata.hasOwnProperty('tkerData') &&
                            record.opdata.tkerData.hasOwnProperty('members')?
                                record.opdata.tkerData.members:0}

                        </div>
                    );
                }
            },{
                title: '代言商品数量',
                dataIndex: 'opdata.tkerData.products',
                className: 'text-right',
                render:(text,record)=>{
                    return (
                        <div>
                            {record.opdata && record.opdata.hasOwnProperty('tkerData') &&
                            record.opdata.tkerData.hasOwnProperty('amount')
                                ?record.opdata.tkerData.amount.lv0:0}
                        </div>
                    );
                }
            },{
                title:'总酬劳',
                colSpan: 2,
                dataIndex:'opdata.tkerData.profit.lv0',
                className: 'text-right',
                render:(text)=>{

                    let value = text?text/100:'暂无';

                    const obj = {
                        children: '酬劳：'+value,
                        props: {},
                    };
                    //佣金
                    return obj;
                }
            },{
                title:'总提成',
                colSpan: 0,
                dataIndex: 'opdata.tkerData.profit.total',
                className: 'text-right',
                render:(text,record)=>{

                    let value = '暂无';

                    if(record.opdata && record.opdata.hasOwnProperty('tkerData') && record.opdata.tkerData.hasOwnProperty('profit')){
                        value = (text-record.opdata.tkerData.profit.lv0)/100;
                    }else{
                        //null
                    }

                    return (
                        <div>
                            {'提成：'+value}
                        </div>
                    );
                }
            },{
                title: '可提现额度/元',
                dataIndex: 'withdraw',
                className: 'text-right',
                render:(text,record)=>{

                    // 总红利
                    // opdata.tkerData.profit.total
                    // 提现金额
                    // opdata.ltkerData.account{pending,cleared}

                    // 最低提现10元
                    // 可提现额度 = record.tkerData.profit.total - record.tkerData.account.total - 10

                    // 添加七天后提现逻辑修改
                    // 可提现额度 = record.tkerData.income.total

                    return (
                        <div style={{'textAlign':'right'}}>
                            {record.opdata && record.opdata.hasOwnProperty('tkerData') && record.opdata.tkerData.hasOwnProperty('income')?
                                ((record.opdata.tkerData.income.total)/100).toFixed(2):0}
                        </div>
                    );
                }
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    return (
                        <div>
                            <Button className="button-style"
                                    onClick={()=>this.props.viewTker(record.createdBy)}>粉丝详情</Button>
                            <Button className="button-style"
                                    onClick={()=>this.props.viewDividend(record.createdBy)}>酬劳明细</Button>
                        </div>
                    );
                }
            }

        ];


        let pagination = {
            pageSize: data.size,
            total: data.totalElements,
            onShowSizeChange: (page, size) => {
                this.props.list(0, size);
            },
            onChange: (page) => {
                this.props.list(page -1);
            }
        };

        let dataSource = [];

        data.content.map((item)=>{

            dataSource.push(item);

        });

        return (
            <Table
                loading={loading}
                rowKey={record => record.id}
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                bordered/>
        );
    }
}
