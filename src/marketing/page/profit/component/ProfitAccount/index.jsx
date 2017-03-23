import React from 'react';
import {Card, Button,Modal} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moneyFormat} from 'common/util';
import classnames from 'classnames';
import {withRouter} from 'react-router';
import * as merchantAction from  '../../../../store/merchant/action';
import * as ledouConfigActions from '../../../../store/ledouConfig/action';
import _ from 'lodash';
import './index.less';
import * as module from 'common/config/module';
import AuthModule from 'common/component/AuthModule';
import AuthComponentBase from 'common/base/AuthComponentBase';

@connect(
    state => ({
        operation: state.operation,
        merchant: state.merchant.toJS(),
        ledouConfig:state.ledouConfig.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...merchantAction,
            ...ledouConfigActions,
        }, dispatch)
    })
)

@withRouter
class ProfitAccount extends AuthComponentBase {

    constructor(props) {
        super(props);
    }
    state = {
        isLoading:true,
        configAccount:{},
        sumProfit:0,
        sumCash:0,
    };
    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.getConfigAccountWithdraw();
        this.getMerchantAccount();
    }
    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case merchantAction.GET_MERCHANT_ACCOUNT_SUCCESS:
                if(_.has(nextProps.merchant.money,'opdata')){
                    this.setState({
                        sumProfit:nextProps.merchant.money.opdata.uinAccountData.platformMoney,
                        sumCash:nextProps.merchant.money.opdata.uinAccountData.totalMoney,
                        isLoading:false,
                    });

                }else{
                    this.setState({
                        sumProfit:0,
                        sumCash:0,
                        isLoading:false,
                    });
                }
                break;
            case ledouConfigActions.GET_CONFIG_ACCOUNT_WITHDRAW_SUCCESS:
                this.setState({
                    configAccount:nextProps.ledouConfig.configAccount,
                });
                break;
        }
    }
    /*ACTION*/
    getConfigAccountWithdraw = (params) => {
        this.props.actions.getConfigAccountWithdraw(params);
    };

    getMerchantAccount=()=>{
        this.props.actions.getMerchantAccount();
    };


    /*HANDLE*/
    _handelPayment = () => {
        let _this= this;
        this.anyWhereModule(module.PAYMENT_WITHDRAW_WITHDRAW).then(()=> {
            if(this.state.configAccount.aliPay.name=='' || this.state.configAccount.aliPay.account==''){
                Modal.confirm({
                    iconType: 'exclamation-circle',
                    width: 400,
                    title: '提现',
                    content: '您还未进行提现设置，请设置后再提现',
                    okText: '立刻设置',
                    cancelText: '取消',
                    onOk(){
                        _this.props.router.push('profit/setting');
                    },
                    onCancel(){
                    }
                });
            }else{
                this.props.router.push('charge/enchashment');
            }
        });




    };
    getMoneyNumber=(number)=>{
        return moneyFormat(number,null, 2);
    };
    render() {
        const { className} = this.props;

        const classString = classnames({
            [className]: true,
            ['profit-account']: true,
        });
        if(this.state.isLoading){
            return (<Card title="收益提现"
                          className={classString}
                          bodyStyle={{paddingTop:'32px', paddingBottom: '35px'}}>
                    <div className="profit-account-box" style={{height:'110px'}}>
                    </div>
                </Card>
            );
        }
        return (
            <Card title="收益提现"
                  className={classString}
                  bodyStyle={{paddingTop:'32px', paddingBottom: '35px'}}>
                <div className="profit-account-box">
                    <div className="profit-account-hd">
                        <div className="profit-account-hd-l">
                            <div className="profit-account-item">
                                <div className="profit-account-money">{this.getMoneyNumber(this.state.sumCash)}</div>
                                <div className="profit-account-moneytext">&nbsp;&nbsp;&nbsp;总收益(元)&nbsp;&nbsp;&nbsp;</div>
                            </div>
                        </div>
                        <div className="profit-account-link"></div>
                        <div className="profit-account-hd-r">
                            <div className="profit-account-item">
                                <div className="profit-account-money">{this.getMoneyNumber(this.state.sumProfit)}</div>
                                <div className="profit-account-moneytext">可提现金额(元)</div>
                            </div>
                        </div>
                    </div>
                    <div className="profit-account-btns">
                        <AuthModule type={module.PAYMENT_WITHDRAW_WITHDRAW}>
                            <Button type="primary"
                                    onClick={this._handelPayment}
                                    size="large">提现</Button>
                        </AuthModule>
                    </div>
                </div>
            </Card>

        );
    }
}

ProfitAccount.defaultProps = {
    className: '',
};

export default ProfitAccount;
