import React from 'react';
import {Card, Button, Spin} from 'antd';
import {bindActionCreators} from 'redux';
import AuthComponentBase from 'common/base/AuthComponentBase';
import {connect} from 'react-redux';
import {numberFormat} from 'common/util';
import classnames from 'classnames';
import {withRouter} from 'react-router';
import AuthModule from 'common/component/AuthModule';
import Tooltip from 'common/component/Tooltip';
import * as module from 'common/config/module';
import * as ledouAction from '../../../../store/ledou/action';
import './index.less';

@connect(
    state => ({
        operation: state.operation,
        ledouAmount: state.ledou.toJS().ledouAmount,
    }),
    dispatch => ({
        actions: bindActionCreators({
            getLedouAmount: ledouAction.getLedouAmount,
        }, dispatch)
    })
)

@withRouter

class ChargeAccount extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {}

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        this.props.actions.getLedouAmount();
    }

    _toPayment = () => {
        this.anyWhereModule(module.PAYMENT_ACCOUNT_CHARGE).then(()=>{
            this.props.router.push('/charge/payment/ledou');
        });
    }

    _toInvoice = () => {
        this.props.router.push('/invoice/add');
    }

    render() {
        const {ledouAmount, className, operation} = this.props;

        const classString = classnames({
            [className]: true,
            ['charge-account']: true,
        });

        const title = (
            <h3 className="ant-card-head-title">
                账户总览
                <Tooltip type="charge-account"></Tooltip>
            </h3>
        );

        const isLoadingLedouAmount = operation.type == ledouAction.GET_LEDOU_AMOUNT_PENDING;

        return (
            <Card title={title}
                  className={classString}
                  bodyStyle={{paddingTop:'32px', paddingBottom: '35px'}}>

                <div className="charge-account-box">
                    <div className="charge-account-money">
                        {isLoadingLedouAmount &&
                            <Spin></Spin>
                        }
                        {!isLoadingLedouAmount &&
                            <span>{numberFormat(ledouAmount, 0)}</span>
                        }
                    </div>
                    <div className="charge-account-moneytext">剩余乐豆</div>
                    <div className="charge-account-btns">
                        <AuthModule type={module.PAYMENT_ACCOUNT_CHARGE}>
                            <Button
                                key="ledou"
                                className="charge-account-btns-ledou"
                                type="primary"
                                onClick={this._toPayment}
                                size="large">充值乐豆</Button>
                        </AuthModule>

                        <Button className="charge-account-btns-invoice"
                            size="large"
                            onClick={this._toInvoice}
                            type="ghost">索取发票</Button>
                    </div>
                </div>
            </Card>
        );
    }
}

ChargeAccount.defaultProps = {
    className: '',
};

export default ChargeAccount;
