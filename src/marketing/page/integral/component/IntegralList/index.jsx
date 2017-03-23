import React from 'react';
import {dateFormat} from 'common/util/index';
import './index.less';
import {Table, Button} from 'antd';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';


export default class IntegralList extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {};

    Percentage = (num)=> {
        return (Math.round(num * 10000) / 100.00 + '%');
    };

    // 使用产品功能
    useModule = (type,success,failure)=> {
        this.anyWhereModule(type).then(success,failure);
    };

    render() {

        //表格的columns
        let columns = [{
            title: '积分包名称',
            dataIndex: 'name',
            key: 'name'
        },   {
            title: '积分包数量',
            dataIndex: 'total',
            key: 'total'
        }, {
            title: '限领数',
            dataIndex: 'limit',
            key: 'limit'
        }, {
            title: '领取数量',
            dataIndex: 'reception',
            key: 'reception'
        }, {
            title: '领取率',
            dataIndex: 'receptionRate',
            key: 'receptionRate'
        },{
            title: '创建日期',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (text, record) => {
                return (
                    <div>
                        {dateFormat(new Date(parseInt(record.createdDate)), 'yyyy-MM-dd hh:mm')}
                    </div>
                );

            }
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {

                return (

                    <div>
                        <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                            <Button className="button-style"
                                    onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE,this.props.showAddNumber(record.id))}>追加数量</Button>
                        </AuthModule>
                        <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                            <Button className="button-style"
                                    onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE,this.props.showIntegralInfo(record.id))}>投放详情</Button>
                        </AuthModule>
                        <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                            <Button className="button-style"
                                    onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE,this.props.deleteIntegral(record))}>删除</Button>
                        </AuthModule>
                    </div>
                );
            }
        }];

        const dataList = this.props.data != undefined ? this.props.data : [];

        const dataSource = [];

        for (let i = 0; i < dataList.length; i++) {

            let scrData = dataList[i];

            scrData.key = i;
            scrData.index = i + 1;

            /*使用数
             used
             兑换数
             cashed
             领取数
             recieved*/

            let data = {
                id: scrData.id,
                key: scrData.key,
                index: scrData.index,
                name: scrData.name?scrData.name:scrData.integral+'积分兑换券',
                total: scrData.total == -1 ? '不限' : scrData.total,
                reception: scrData.recieved,
                receptionRate: scrData.total == -1 ? '-' :this.Percentage(scrData.recieved/scrData.total),
                hasRes:scrData.resId?true:false,
                limit:scrData.perTotal,
                createdDate:scrData.createdDate
            };

            dataSource.push(data);
        }

        //分页
        const pagination = {
            total: this.props.resTotal,
            showSizeChanger: true,
            onShowSizeChange: (page, size)=> {
                this.props.resList(0, size);
            },
            onChange: (page)=> {
                this.props.resList((page - 1));
            }
        };

        return (
            <Table columns={columns}
                   rowKey={record => record.index}
                   loading={this.props.loading}
                   pagination={pagination}
                   dataSource={dataSource}
                   bordered/>
        );
    }
}
