import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, message, Tabs, Modal, Radio,Select} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as financeAction from '../../store/finance/action';
import WithdrawReviewList from './component/WithdrawReviewList';
const Option = Select.Option;
import {dateFormat, moneyFormat, redirect} from 'common/util';

// 提现管理
@connect(
    state => ({
        finance: state.finance.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...financeAction
        }, dispatch)
    })
)
export default class WithdrawIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        label: '待审核',
        tradeStatus: 'tradeWait',
        platStatus:'',
        merchantStatus: '',
        account:null,

        sort: 'createdDate',
        order: 'desc',

        refuse: {
            label:'提现申请不通过',
            emailMark:'WITHDRAW_REFUSE'
        },
        close: {
            label:'提现失败_账户名错误',
            emailMark:'WITHDRAW_FAIL_1'
        },
    };

    componentDidMount() {
        this.list(this.state);
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        // let {tradeStatus} = this.state;

        switch (operation.type) {
            case financeAction.GET_MERCHANT_WITHDRAW_LIST_SUCCESS:
                this.setState({
                    list: nextProps.finance.list
                });
                break;
            case financeAction.GET_WITHDRAW_RULE_ACCOUNT_SUCCESS:
                this.setState({
                    account: nextProps.finance.account
                },()=>this.showConfirmNext(operation.result.params.id,this.state.account));
                break;
            // 提现更新
            case financeAction.UPDATE_MERCHANT_WITHDRAW_SUCCESS:

                let alipayUrl = nextProps.finance.alipayUrl;

                if (alipayUrl) {
                    redirect(alipayUrl, '_blank');
                }

                message.info('操作成功');
                this.list(this.state);
                break;
           
        }
    }

    // 确认付款弹框
    showInfo = (record)=> {

        let content = (
            <div style={{'textAlign': 'left'}}>
                <p>转账时间：{dateFormat(new Date(record.createdDate),'yyyy-MM-dd hh:mm:ss')}</p>
                <p>失败时间：{dateFormat(new Date(record.lastModifiedDate),'yyyy-MM-dd hh:mm:ss')}</p>
                <p>流水号：{record.tradeNo}</p>
                {record.auditModel && record.auditModel.reason && <p>失败原因：{record.auditModel.reason}</p>}
                {record.auditModel && record.auditModel.platReason && <p>第三方原因：{record.auditModel.platReason}</p>}
            </div>
        );

        Modal.info({
            title: '详情',
            content: content,
        });
    };

    showConfirmNext = (id,record)=>{

        let payType = {
            'wechat': '微信',
            'alipay': '支付宝',
            'unionpay': '银联'
        };

        let content = (
            <div style={{'textAlign': 'left'}}>
                <p>本次付款{moneyFormat(record.money, '￥', 2)}元，确认本次付款？</p>
                <br/>
                <p>付款方式：{payType[record.payType]}</p>
                <p>本日剩余付款次数：{record.dayPayCount}次</p>
                <p>本日剩余付款额度：{moneyFormat(record.dayPayNum, '￥', 2)}元</p>
                <p>本月剩余付款次数：{record.monthSumPayCount}次</p>
                <p>本月剩余付款额度：{moneyFormat(record.monthSumPay, '￥', 2)}元</p>
            </div>
        );

        Modal.confirm({
            title: '提示',
            content: content,
            onOk: ()=>this.props.actions.updateMerchantWithdraw({
                id: id,
                data: {
                    operation:'confirm',
                    emailMark:'WITHDRAW_SUCCESS'
                }
            })
        });
    };

    // 确认付款弹框
    showConfirm = (record)=> {

        this.getWithdrawRuleAccount({
            id:record.id,
            accountType:record.merchantModel.accountType
        });

    };

    // 关闭
    onCloseChange = (value)=> {
        this.setState({
            close: value,
        });
    };

    closeWithdraw = (record)=> {

        let content = (
            <div style={{'textAlign': 'left'}}>
                <p>确认关闭本次付款？</p>
                <br/>
                <Select labelInValue
                        style={{'width':'100%'}}
                        defaultValue={this.state.close}
                        onChange={this.onCloseChange}>
                    <Radio value="WITHDRAW_FAIL_1">提现失败_账户名错误</Radio>
                    <Radio value="WITHDRAW_FAIL_2">提现失败_其他原因</Radio>
                </Select>
            </div>
        );

        Modal.confirm({
            title: '提示',
            content: content,
            onOk: ()=>this.props.actions.updateMerchantWithdraw({
                id: record.id,
                data: {
                    operation:'close',
                    emailMark: this.state.close.emailMark,
                    reason:this.state.close.label,
                }
            })
        });
    };

    // 拒绝
    onRefuseChange = (value)=> {
        this.setState({
            refuse: value
        });
    };

    confirmWithdraw = (record)=>{
        this.props.actions.updateMerchantWithdraw({
            id: record.id,
            data: {
                operation: 'allow',
            }
        });
    };

    refuseWithdraw = (record)=> {

        let content = (
            <div style={{'textAlign': 'left'}}>
                <p>审核不通过？请选择原因。</p>
                <br/>
                <Select labelInValue
                        onChange={this.onRefuseChange}
                        style={{'width':'100%'}}
                        defaultValue={this.state.refuse}>
                    <Option value="WITHDRAW_REFUSE">提现申请不通过</Option>
                </Select>
            </div>
        );

        Modal.confirm({
            title: '提示',
            content: content,
            onOk: ()=>this.props.actions.updateMerchantWithdraw({
                id: record.id,
                data: {
                    operation:'refuse',
                    emailMark: this.state.refuse.emailMark,
                    reason:this.state.refuse.label,
                }
            })
        });

    };

    // 获取提现列表
    list = (params)=> {

        this.setState(params, ()=> this.props.actions.getMerchantWithdrawList(this.state));
    };

    // 根据日期搜索提现记录
    handleSearch = (params) => {

        this.setState(params, ()=> {
            this.list(params);
        });
    };

    //Tab切换的onChange函数
    callback = (key)=> {
        this.list(JSON.parse(key));
    };

    getWithdrawRuleAccount = (params)=>{
        this.props.actions.getWithdrawRuleAccount(params);
    };

    render() {
        const {operation} = this.props;

        const TabPane = Tabs.TabPane;

        let {tradeStatus, merchantStatus,platStatus,list} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == financeAction.GET_MERCHANT_WITHDRAW_LIST_PENDING;

        let tabPanelOptions = [
            {
                label: '待审核',
                value: JSON.stringify({
                    tradeStatus: 'tradeWait',
                    merchantStatus: '',
                    platStatus:''
                })

            }, {
                label: '审核不通过',
                value: JSON.stringify({
                    tradeStatus: 'tradeRefuse',
                    merchantStatus: '',
                    platStatus:''
                })
            },{
                label: '待付款',
                value: JSON.stringify({
                    tradeStatus: 'tradeAllow',
                    merchantStatus: 'withdrawsIn',
                    platStatus:'s6'
                })
            },
            {
                label: '付款中',
                value: JSON.stringify({
                    tradeStatus: 'tradeAllow',
                    merchantStatus: 'withdrawsIn',
                    platStatus:'s5'
                })
            },
            {
                label: '付款成功',
                value: JSON.stringify({
                    tradeStatus: 'tradeAllow',
                    merchantStatus: 'withdrawsSuccess',
                    platStatus:'s1'
                })
            }, {
                label: '付款失败',
                value: JSON.stringify({
                    tradeStatus: 'tradeAllow',
                    merchantStatus: 'withdrawsIn',
                    platStatus:'s2'
                })
            }, {
                label: '已关闭',
                value: JSON.stringify({
                    tradeStatus: 'tradeAllow',
                    merchantStatus: 'withdrawsFail',
                    platStatus:'s3'
                })
            }
        ];

        let tabPanelList = [];

        tabPanelOptions.map((item)=> {
            tabPanelList.push(
                <TabPane tab={item.label} key={item.value}>
                    {
                        <WithdrawReviewList
                            data={list}
                            tradeStatus={tradeStatus}
                            merchantStatus={merchantStatus}
                            platStatus={platStatus}
                            listLoading={isListLoading}
                            list={this.list}
                            showConfirm={this.showConfirm}
                            showInfo={this.showInfo}
                            confirmWithdraw={this.confirmWithdraw}
                            refuseWithdraw={this.refuseWithdraw}
                            closeWithdraw={this.closeWithdraw}
                        />
                    }
                </TabPane>
            );
        });

        return (
            <div className="app-page">
                <Card title="提现审核" extra={null}>
                    <Tabs onChange={this.callback} type="card" animated={false}>
                        {tabPanelList}
                    </Tabs>
                </Card>
            </div>
        );
    }
}

