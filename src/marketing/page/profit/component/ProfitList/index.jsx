import React, {Component} from 'react';
import {Table} from 'antd';
import {moneyFormat} from 'common/util';
import moment from 'moment';
import './index.less';

class ProfitList extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {

    }

    gettradeStatus = (text)=> {
        if (!text) return;

        let content = {
            withdrawsIn: {
                text: '提现审核中',
                color: '#FCBE76'
            },
            withdrawsSuccess: {
                text: '提现成功',
                color: ''
            },
            withdrawsFail: {
                text: '提现失败',
                color: ''
            }
        };

        return (
            <span style={{'color': content[text].color}}>
                {content[text].text}
            </span>
        );
    };


    render() {
        const {inType, dataSource, totalElements, size, page, isLoading} = this.props;

        let columns = [];
        let pagination = {
            total: totalElements,
            showSizeChanger: false,
            defaultPageSize: size,
            current: page + 1,
            onChange: (current) => {
                if (inType === 'tipsHistory') {
                    this.props.getTipsHistoryList(current - 1);
                } else {
                    this.props.getManagerMerchantWithdrawList(current - 1);
                }

            },
        };
        if (inType == 'tipsHistory') {
            columns = [{
                width: 200,
                title: '交易时间',
                dataIndex: 'createdDate',
                key: 'createdDate',
                render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
            }, {
                title: '流水号',
                dataIndex: 'orderNo',
                key: 'orderNo',
            }, {
                title: '作品名称',
                dataIndex: 'productDesc.name',
                key: 'productDesc.name',
            }, {
                title: <div style={{textAlign: 'right'}}>打赏金额(元)</div>,
                dataIndex: 'money',
                key: 'money',
                render: text => <div style={{textAlign: 'right'}}> {moneyFormat(text, null, 2)}</div>
            }, {
                width: 200,
                title: <div style={{paddingLeft: '18px'}}> 状态</div>,
                dataIndex: 'payStatus',
                key: 'payStatus',
                render: text => <div style={{paddingLeft: '18px'}}> {text == 's1' ? '成功' : ''}</div>
            }];
        } else if (inType == 'withdrawsHistory'){
            columns = [{
                title: '流水号',
                dataIndex: 'tradeNo',
                key: 'tradeNo',
            }, {
                width: 200,
                title: '申请提现时间',
                dataIndex: 'createdDate',
                key: 'createdDate',
                render: (text) => moment(text).format('YYYY-MM-DD HH:mm'),
            }, {
                title: <div style={{textAlign: 'right'}}>申请提现金额(元)</div>,
                dataIndex: 'money',
                key: 'money',
                render: text => <div style={{textAlign: 'right'}}> {moneyFormat(text, null, 2)}</div>
            }, {
                width: 200,
                title: <div style={{paddingLeft: '18px'}}> 状态</div>,
                dataIndex: 'merchantModel.merchantStatus',
                key: 'merchantModel.merchantStatus',
                render: text => <div style={{paddingLeft: '18px'}}> {this.gettradeStatus(text)}</div>
            }, {
                width: 200,
                title: '提现账号',
                dataIndex: 'merchantModel.receiveAccount',
                key: 'merchantModel.receiveAccount',
            }];
        }
        return (
            <Table
                rowKey={(record, index) => index}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                loading={isLoading}>
            </Table>
        );
    }
}

ProfitList.defaultProps = {

    className: '',

    size: 20,
};

export default ProfitList;
