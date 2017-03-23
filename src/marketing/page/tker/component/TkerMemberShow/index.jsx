import React, {Component} from 'react';
import {
    Table,
    Modal,
    Select,
} from 'antd';
import {dateFormat} from 'common/util/index';
const Option = Select.Option;

import SearchInput from 'common/component/SearchInput';

export default class TkerMemberShow extends Component {

    constructor(props) {

        super(props);

    }

    state = {

    };

    render() {

        let {type, data, loading, id,item} = this.props;

        if (!data) {
            return null;
        }

        let dataSource = data.content;

        let visible = false,
            title = '',
            columns = [],
            leftText = undefined, leftValue = '',
            rightText = undefined, rightValue = '',
            pagination = {},
            value = 0;

        let selectList = '';

        switch (type) {
            case 'tker':
                title = '粉丝详情';
                visible = true;


                value = data.totalElements;

                leftText = '会员粉丝';
                leftValue = value;

                columns = [
                    {
                        title: '粉丝姓名',
                        dataIndex: 'name',
                        render: (text, record)=> {
                            return (
                                <div>
                                    {record.name ? record.name : '匿名'}
                                </div>
                            );
                        }
                    },
                    {
                        title: '联系电话',
                        dataIndex: 'mobile',
                        render: (text, record)=> {
                            return (
                                <div>
                                    {record.mobile ? record.mobile : '-'}
                                </div>
                            );
                        }
                    },
                    {
                        title: 'Ta的粉丝',
                        dataIndex: 'opdata.tkerData.members',
                        render: (text, record)=> {
                            return (
                                <div>
                                    {record.opdata ? record.opdata.tkerData.members : '-'}
                                </div>
                            );
                        }
                    }

                ];

                pagination = {
                    pageSize: data.size,
                    total: data.totalElements,
                    onShowSizeChange: (page, size) => {
                        this.props.getManagerTkerSubMember(id, 0, size);
                    },
                    onChange: (page) => {
                        this.props.getManagerTkerSubMember(id, page - 1);
                    }
                };
                break;
            case 'dividend':
                title = '酬劳明细';
                visible = true;

                let optionList = [
                    <Option value="" key="total">全部</Option>
                ];

                if(item.opdata && item.opdata.tkerData.profit){

                    for(let obj in item.opdata.tkerData.profit){

                        if(item.opdata.tkerData.profit[obj] != 0){
                            switch (obj){
                                case 'lv0':
                                    optionList.push(
                                        <Option value="0" key="0">酬劳</Option>
                                    );
                                    break;
                                case 'lv1':
                                    optionList.push(
                                        <Option value="1" key="1">钻石提成</Option>
                                    );
                                    break;
                                case 'lv2':
                                    optionList.push(
                                        <Option value="2" key="2">金牌提成</Option>
                                    );
                                    break;
                            }
                        }


                    }

                    selectList = (

                        <Select placeholder="请选择利润类型"
                                onChange={this.props.onChange}
                                style={{ width: 120,'margin':'5px' }}>
                            {optionList}
                        </Select>);

                }

                leftText = '酬劳总额';
                leftValue = item.opdata && item.opdata.tkerData.profit?'￥' + (item.opdata.tkerData.profit.total / 100).toFixed(2):0;

                rightText = '统计金额';
                rightValue = item.opdata && item.opdata.tkerData.profit?'￥' + (item.opdata.tkerData.profit[this.props.level?'lv'+this.props.level.toString():'total'] / 100).toFixed(2):0;

                columns = [

                    {
                        title: '酬劳类型',
                        dataIndex: 'tkerData.lv',
                        render: (text, record)=> {

                            let filters = ['酬劳', '钻石提成', '金牌提成'];

                            return (
                                <div>
                                    {record.tkerData != undefined && record.tkerData.lv != undefined ? filters[record.tkerData.lv] : '-'}
                                </div>
                            );
                        }
                    }, {
                        title: '粉丝姓名',
                        dataIndex: 'userInfo',
                        render:(text,record)=>{
                            return (<div>
                                {record.userInfo && record.userInfo.hasOwnProperty('nickName')?record.userInfo.nickName:'-'}
                            </div>
                            );
                        }
                    },{
                        title: '交易商品',
                        dataIndex: 'resName',
                    }, {
                        title: '酬劳/提成金额（元）',
                        dataIndex: 'tkerData.money',
                        render: (text, record)=> {
                            return (
                                <div style={{'textAlign':'right'}}>
                                    {record.tkerData != undefined ?(record.tkerData.money / 100).toFixed(2):'-'}
                                </div>
                            );
                        }
                    },{
                        title: '交易时间',
                        dataIndex: 'lastModifiedDate',
                        render: (text, record)=> {
                            return (
                                <div>{dateFormat(new Date(record.lastModifiedDate), 'yyyy-MM-dd hh:mm:ss.S')}</div>
                            );
                        }
                    }

                ];

                pagination = {
                    pageSize: data.size,
                    total: data.totalElements,
                    onShowSizeChange: (page, size) => {
                        this.props.getManagerTkerProfit(id, 0, size);
                    },
                    onChange: (page) => {
                        this.props.getManagerTkerProfit(id, page - 1);
                    }
                };
                break;
            default:
                visible = false;
                break;
        }

        return (
            <div>
                <Modal title={title}
                       width={960}
                       visible={visible}
                       onOk={this.props.handleComplete}
                       onCancel={this.props.handleComplete}>

                    <div style={{'height':'50px'}}>
                        {leftText && <span style={{'lineHeight':'50px'}}>
                            {leftText}：{leftValue}
                        </span>}
                        {rightText && <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{'lineHeight':'50px'}}>
                            {rightText}：{rightValue}
                        </span></span>}
                         {type == 'dividend' && <div style={{'float':'right'}}>

                             {selectList}
                         </div>}
                        {type == 'tker' && <SearchInput placeholder="请输入手机号进行查询"
                                                        onSearch={this.props.handleSearchTker}
                                                        style={{ width: 200,'position': 'absolute',
                                                            right: '15px',
                                                            margin: '10px 0'}}/>}
                    </div>

                    <Table rowKey={record=>record.id?record.id:record.lastModifiedDate}
                           columns={columns}
                           loading={loading}
                           dataSource={dataSource}
                           pagination={pagination}
                           bordered/>
                </Modal>
            </div>
        );
    }
}
