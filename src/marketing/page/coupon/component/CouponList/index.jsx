import React from 'react';
import {dateFormat} from 'common/util/index';
import './index.less';
import {Table , Button} from 'antd';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';

export default class CouponList extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {
        selectedRowKeys: [],  // 这里配置默认勾选列
        selectedRows:[]
    };

    Percentage = (num)=> {
        return (Math.round(num * 10000) / 100.00 + '%');
    };

    //有效期转具体日期
    validRangeDate = (addValue) =>{

        var dd = new Date();
        //dd.setDate(dd.getDate()-1);
        var y1 = dd.getFullYear();
        var m1 = dd.getMonth();//获取当前月份的日期
        var d1 = dd.getDate();
        //获取日期时间，1天的毫秒数是86400000
        var ss = new Date(new Date(y1, m1, d1).getTime()+86400000*addValue);
        //日期格式化
        var y2 = ss.getFullYear();
        var m2 = ss.getMonth()+1<10?'0'+(ss.getMonth()+1).toString():ss.getMonth()+1; //获取当前月份的日期
        var d2 = ss.getDate()<10?'0'+(ss.getDate()).toString():ss.getDate();

        return y2+'-'+m2+'-'+d2;

    };

    // 使用产品功能
    useModule = (type,success,failure)=> {
        this.anyWhereModule(type).then(success,failure);
    };

    render() {

        const {selectedRowKeys,selectedRows} = this.state;

        //rowSelection：选择功能的配置
        const rowSelection = {
            selectedRowKeys: selectedRowKeys,
            selectedRows:selectedRows,
            onChange: (selectedRowKeys, selectedRows)=> {
                this.setState({selectedRowKeys,selectedRows});
            },
            onSelect: (record, selected, selectedRows)=> {
                this.setState({selectedRows});
            },
            onSelectAll: (selected, selectedRows)=> {
                this.setState({selectedRows});
            },
            getCheckboxProps: record => ({
                disabled: record.hasRes  // 配置无法勾选的列
            })
        };

        const hasSelected = selectedRowKeys.length > 0;

        //表格的columns
        let columns = [ {
            title: '类型',
            dataIndex: 'couponTypeText',
            key: 'couponTypeText',

            render: (text, record)=> {

                return (
                    <div>
                        {record.couponTypeText}
                    </div>
                );

            },
            width:100
        }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width:100
        }, {
            title: '面值设置',
            dataIndex: 'couponValueText',
            key: 'couponValueText',
            render: (text, record)=> {

                return (
                    <div>
                        {record.couponValueText}
                    </div>
                );
            },
            width:100
        }, {
            title: '最低消费',
            dataIndex: 'charge',
            key: 'charge',
            render: (text, record)=> {

                if (record.charge.enable) {
                    return (
                        <div>
                            {record.charge.min / 100}元
                        </div>
                    );
                } else {
                    return (
                        <div>
                            无限制
                        </div>
                    );
                }


            },
            width:100
        },  {
            title: '发放总量',
            dataIndex: 'total',
            key: 'total',
            width:100
        }, {
            title: '每人限领',
            dataIndex: 'limit',
            key: 'limit',
            width:100
        }, {
            title: '已领取',
            dataIndex: 'reception',
            key: 'reception',
            width:100
        }, {
            title: '剩余数',
            dataIndex: 'left',
            key: 'left',
            width:100
        }, {
            title: '已核销',
            dataIndex: 'verification',
            key: 'verification',
            width:100
        }, {
            title: '领取率',
            dataIndex: 'receptionRate',
            key: 'receptionRate',
            render: (text, record)=> {
                return (
                    <div>
                        {record.receptionRate}
                    </div>
                );
            },
            width:100
        }, {
            title: '核销率',
            dataIndex: 'verificationRate',
            key: 'verificationRate',
            render: (text, record)=> {
                return (
                    <div>
                        {record.verificationRate}
                    </div>
                );
            },
            width:100

        }, {
            title: '有效期',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            render: (text, record) => {

                if (record.expiryDate.interval.enable) {

                    return (
                        <div>
                            {dateFormat(new Date(parseInt(record.expiryDate.interval.startDate)), 'yyyy-MM-dd')}
                            <span>至</span>
                            {dateFormat(new Date(parseInt(record.expiryDate.interval.endDate)), 'yyyy-MM-dd')}
                        </div>
                    );

                }

                if (record.expiryDate.dynamic.enable) {

                    if(record.expiryDate.dynamic.begin == 0){
                        return (
                            <div>
                                当天生效，有效天数{record.expiryDate.dynamic.end}天
                                {/*{this.validRangeDate(record.expiryDate.dynamic.begin)}
                                 至
                                 {this.validRangeDate(record.expiryDate.dynamic.end)}*/}
                            </div>
                        );
                    }else{
                        return (
                            <div>
                                {record.expiryDate.dynamic.begin}天后生效，有效天数{record.expiryDate.dynamic.end}天
                                {/*{this.validRangeDate(record.expiryDate.dynamic.begin)}
                                 至
                                 {this.validRangeDate(record.expiryDate.dynamic.end)}*/}
                            </div>
                        );
                    }


                }


            },
            width:200
        }, {
            title: '创建日期',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (text, record) => {

                return (
                    <div>
                        {dateFormat(new Date(parseInt(record.createdDate)), 'yyyy-MM-dd hh:mm')}
                    </div>
                );

            },
            width:200
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
                            <Button className="button-style" disabled={!record.hasRes || record.isEnd}
                                    onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE,this.props.showCouponInfo(record.id))}>投放详情</Button>
                        </AuthModule>
                    </div>
                );
            },
            fixed:'right',
            width:100
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

            let couponValueText = '';
            let couponTypeText = '';

            switch (scrData.couponType) {
                case 'quota':
                    couponTypeText = '定额优惠券';
                    couponValueText = scrData.faceValue / 100 + '元';
                    break;
                case 'discount':
                    couponTypeText = '折扣优惠券';
                    couponValueText = scrData.discount + '折';
                    break;

            }

            let isEnd = false;

            //失效日期判定
            if (scrData.rule.give.period.interval.enable) {

                let nowDate = new Date().getTime();
                let endDate = parseInt(scrData.rule.give.period.interval.endDate)+86400000;

                isEnd = nowDate >= endDate;
            }

            let data = {
                id: scrData.id,
                key: scrData.key,
                index: scrData.index,
                couponType: scrData.couponType,
                name: scrData.name,

                couponTypeText: couponTypeText,
                couponValueText: couponValueText,

                expiryDate: scrData.rule.give.period,
                charge: scrData.rule.give.charge,
                total: scrData.total == -1 ? '不限' : scrData.total,
                left:scrData.total == -1 ? '不限' :scrData.total-scrData.recieved,
                reception: scrData.recieved,
                verification: scrData.cashed,
                receptionRate: scrData.total != -1 ? this.Percentage(scrData.recieved / scrData.total) : '-',
                verificationRate: scrData.total != -1 ? this.Percentage(scrData.cashed / scrData.total) : '-',
                //resId不为空或已领取数大于0
                hasRes: scrData.resId || (scrData.recieved>0)? true : false,
                isEnd:isEnd,
                limit: scrData.rule.receive.perTotal,
                createdDate: scrData.createdDate
            };

            dataSource.push(data);
        }

        //分页
        const pagination = {
            total: this.props.total,
            showSizeChanger: true,
            showQuickJumper:true,
            onShowSizeChange: (page, size)=> {
                this.props.list(0, size);
            },
            onChange: (page)=> {
                this.props.list((page - 1));
            }
        };

        return (
            <div>
                <Table rowSelection={rowSelection}
                       columns={columns}
                       loading={this.props.loading}
                       scroll={{ x: 1500 }}
                       rowKey={record => record.index}
                       pagination={pagination}
                       dataSource={dataSource}
                       bordered/>
                {dataSource.length > 0 && <div style={{ marginTop: -40 }}>

                    <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                        <Button type="primary"
                                disabled={!hasSelected}
                                onClick={()=>this.useModule(module.MPLUGIN_COUPON_CREATE,this.props.deleteCoupon(selectedRows))}>删除</Button>
                    </AuthModule>
                    <span style={{ 'marginLeft': '8px','color':'#999' }}>仅未投放过的优惠券可进行删除</span>
                </div>}
            </div>
        );
    }
}
