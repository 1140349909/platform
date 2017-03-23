import React from 'react';
import ComponentBase from 'common/base/ComponentBase';
import {Card, Modal, Alert, Button, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moneyFormat, numberFormat} from 'common/util';
import {withRouter} from 'react-router';
import Pay from './Pay';
import TopUp from './TopUp';
import QrCodeShow from './QrCodeShow';
import * as ledouAction from '../../../../store/ledou/action';
import {getLedou} from 'common/util/ledou';
import config from 'common/config';
import openPay from 'common/util/openPay';
import  './index.less';

@connect(
    state => ({
        operation: state.operation,
        payInfo: state.ledou.toJS().payInfo,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...ledouAction,
        }, dispatch)
    })
)

@withRouter

class ChargeLedouPayment extends ComponentBase {

    constructor(props) {
        super(props);
        this.watchPay = false;
        this._handelTimeoutPay = this._handelTimeoutPay(() => this._reset());
    }

    state = {
        money: 5000,
        payType: 'wechatqrcode',

        viewType: null,
        viewParam: null,
        viewData: null
    };

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {

            // 购买乐豆
            case ledouAction.BUY_LEDOU_SUCCESS:
                if (this.state.payType == 'alipayweb') {
                    this._showPurchase();
                    openPay.location(nextProps.payInfo.payUrl);

                } else if (this.state.payType == 'wechatqrcode') {
                    this._handelTimeoutPay(true);
                    this.showView('qrCodeShow', null, nextProps.payInfo.wxcfg.codeUrl);
                    this.watchPay = true;
                }
                break;

            // 购买乐豆
            case ledouAction.BUY_LEDOU_FAILURE:
                message.error('支付异常,请重新确认支付');
                break;

            // 获取支付状态
            case ledouAction.GET_LEDOU_BUY_RESULT_SUCCESS:
            case ledouAction.GET_LEDOU_BUY_QRCODE_RESULT_SUCCESS:
                if (this.state.payType == 'wechatqrcode') {
                    this._reset();
                }
                Modal.success({
                    title: '充值结果',
                    content: `${numberFormat(getLedou(this.state.money), 0)}个乐豆, 已充值成功!`,
                    okText: '查看乐豆',
                    cancelText: '继续充值',
                    onOk: () => {
                        this.props.router.push('charge/list');
                    },
                });
                break;

            // 获取支付状态
            case ledouAction.GET_LEDOU_BUY_RESULT_FAILURE:
                if (this.state.payType == 'alipayweb') {
                    Modal.error({
                        title: '充值结果',
                        content: `${numberFormat(getLedou(this.state.money), 0)}个乐豆, 未完成充值!`,
                        okText: '重新充值',
                    });
                }
                break;

            // 获取扫码支付状态
            case ledouAction.GET_LEDOU_BUY_QRCODE_RESULT_FAILURE:
                if (this.state.payType == 'wechatqrcode' && this.watchPay) {
                    this._handelTimeoutPay();
                }
                break;
        }
    }

    // 执行扫码
    _handelTimeoutPay = (callback) => {

        let count = 0;
        let call = callback;

        return function (state) {

            if (state) {
                count = 0;
            }

            setTimeout(() => {
                this.props.actions.getLedouBuyQrcodeResult(this.props.payInfo.businessId);
                count++;
            }, 3000);

            if (count >= 30) {
                call();
            }
        };
    }

    // 显示发票须知
    _showIssues = () => {
        Modal.info({
            title: '发票须知',
            content: (
                <div className="charge-ledoupayment-issues">
                    <p>1，发票申请提交后，我们将在1个月内开具发票并邮寄。</p>
                    <p>2，请认真填写相关信息，因信息错误而导致的发票无法使用，艾乐卡不予退换。</p>
                </div>
            ),
            width: 540,
        });
    }


    // 充值提示信息
    _showPurchase = () => {
        Modal.confirm({
            iconType: 'exclamation-circle',
            title: '请您在新打开的页面上完成充值.',
            content: '支付完成前，请不要关闭此支付验证窗口, 支付完成后，请根据您支付的情况点击下面按钮。',
            okText: '充值完成',
            cancelText: '重新选择充值方式',
            onOk: () => {
                this.props.actions.getLedouBuyResult(this.props.payInfo.businessId);
            }
        });
    }

    // 充值金额选择处理
    _handelTopUpChange = (money) => {
        this.setState({
            money,
        });
    }

    // 支付方式选择处理
    _handelPayChange = (payType) => {
        this.setState({
            payType,
        });
    }

    // 确认支付
    _handelPurchase = () => {

        if (this.state.payType == 'alipayweb') {
            openPay.open();
        }

        const params = {
            ledou: getLedou(this.state.money),
            money: this.state.money,
            payType: this.state.payType,
            callBackPage: config.LEDOU_CHARGE_URL,
            name: `${getLedou(this.state.money)}乐豆`
        };

        this.props.actions.buyLedou(params);
    }

    // 返回账户充值
    _handelReturn = () => {
        this.props.router.goBack();
    }

    _reset = () => {
        this.reset();
        this.watchPay = false;
    }

    render() {
        const {payInfo, operation} = this.props;
        const isLoadingPay = operation.type == ledouAction.BUY_LEDOU_PENDING;

        let cardExtra = (
            <a href="javascript:;"
               onClick={this._showIssues}>
                查看发票相关问题
            </a>
        );

        let alertMessage = (
            <div>
                <p>1、充值后，您将获得乐豆，可用于购买模板或素材；1元 = 10乐豆。</p>
                <p>2、本平台不提供乐豆和人民币兑换服务，请您根据需要购买。</p>
            </div>
        );

        const isQrCodeShow = this.isShowView('qrCodeShow');
        return (
            <div className="charge-ledoupayment">
                <Card
                    className="charge-ledoupayment-card"
                    title="乐豆充值"
                    bodyStyle={{padding: 0}}
                    extra={cardExtra}>
                    <div>
                        <div className="charge-ledoupayment-box">

                            <Alert
                                className="charge-ledoupayment-alert"
                                message={alertMessage}
                                type="info"/>

                            <TopUp
                                defaultSelect={this.state.money}
                                onChange={this._handelTopUpChange}/>

                            <Pay
                                defaultSelect={this.state.payType}
                                data={payInfo}
                                onChange={this._handelPayChange}/>

                        </div>

                        <div className="charge-ledoupayment-footer">
                            <div className="charge-ledoupayment-showmoney">
                                应付金额: &nbsp;<em>{moneyFormat(this.state.money, '¥', 2)}</em>
                            </div>
                            <div className="charge-ledoupayment-footer-btns">
                                <Button
                                    size="large"
                                    onClick={this._handelReturn}>返回</Button>
                                <Button
                                    disabled={isLoadingPay}
                                    size="large"
                                    type="primary"
                                    onClick={this._handelPurchase}>
                                    确认充值
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
                {isQrCodeShow &&
                <QrCodeShow
                    payType={this.state.payType}
                    money={this.state.money}
                    qrCodeUrl={this.state.viewData}
                    reset={this._reset}/>
                }
            </div>
        );
    }
}

export default ChargeLedouPayment;


