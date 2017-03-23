import React from 'react';
import ComponentBase from 'common/base/ComponentBase';
import {Card, Modal, Alert, Button, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moneyFormat} from 'common/util';
import {withRouter} from 'react-router';
import {Pay, TopUp, QrCodeShow} from './component/ChargePayment';
import * as payAction from '../../store/pay/action';
import * as versionAction from '../../store/version/action';
import config from 'common/config';
import openPay from 'common/util/openPay';
import  './payment.less';

@connect(
    state => ({
        operation: state.operation,
        payInfo: state.pay.toJS().payInfo,
        versionPrice: state.version.toJS().versionPrice,
        info: state.auth.toJS().info

    }),
    dispatch => ({
        actions: bindActionCreators({
            ...payAction,
            ...versionAction
        }, dispatch)
    })
)

@withRouter

class PaymentUpgrade extends ComponentBase {

    constructor(props) {
        super(props);
        this.qrcodePay = false;
        this.handelTimeoutPay = this.handelTimeoutPay(() => this._reset());

        // 乐豆购买列表
        this.topUpList = {
            type: 'upgrade',
            title: '升级账号',
            list: [
                {
                    money: 88800,
                },
            ]
        };
    }

    state = {
        isLoad: false,
        money: 88800,
        payType: 'wechatqrcode',

        viewType: null,
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        const versionId = this.props.location.query.versionId;
        this.props.actions.getVersionPrice(versionId);
    }

    // 组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;
        switch (operation.type) {

            // 购买乐豆 和 购买升级服务
            case payAction.UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_SUCCESS:
                if (this.state.payType == 'alipayweb') {

                    this.showPurchase();
                    openPay.location(nextProps.payInfo.payUrl);

                } else if (this.state.payType == 'wechatqrcode') {

                    this.handelTimeoutPay(true);
                    this.showView('qrCodeShow', null, nextProps.payInfo.wxcfg.codeUrl);
                    this.qrcodePay = true;
                }
                break;

            // 购买乐豆
            case payAction.UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_FAILURE:
                message.error('支付异常,请重新确认支付');
                break;

            // 获取支付状态
            case payAction.GET_CUSTOMER_BUY_RESULT_SUCCESS:
                if (this.state.payType == 'wechatqrcode') {
                    this._reset();
                }

                Modal.success({
                    title: '充值结果',
                    content: '版本购买成功!',
                    cancelText: '续费版本',
                    onOk: () => {
                        setTimeout(() => {
                            location.reload();
                        },1000);
                        this.handelReturn();
                    },
                    onCancel: () => {
                        // nore
                    }
                });
                break;

            // 获取支付状态
            case payAction.GET_CUSTOMER_BUY_RESULT_FAILURE:
                if (this.state.payType == 'alipayweb') {
                    Modal.error({
                        title: '充值结果',
                        content: '版本购买失败!',
                        okText: '重新充值',
                        onOk: () => {
                            // nore
                        },
                        onCancel: () => {
                            // nore
                        }
                    });
                } else if (this.qrcodePay){
                    this.handelTimeoutPay();
                }
                break;

            case versionAction.GET_VERSION_PRICE_SUCCESS:
                const price = nextProps.versionPrice.data.price;

                this.setState({
                    isLoad: true,
                    money: price,
                });
                this.topUpList.list[0].money = price;
                break;
        }
    }

    // 执行扫码
    handelTimeoutPay = (callback) => {
        let count = 0;
        let call = callback;

        return function (state) {
            if (state) {
                count = 0;
            }

            setTimeout(() => {
                this.props.actions.getCustomerBuyResult(this.props.payInfo.businessId);
                count++;
            }, 3000);

            if (count >= 30) {
                call();
            }
        };
    }

    // 显示发票须知
    showIssues = () => {
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
    showPurchase = () => {
        Modal.confirm({
            iconType: 'exclamation-circle',
            title: '请您在新打开的页面上完成充值.',
            content: '支付完成前，请不要关闭此支付验证窗口, 支付完成后，请根据您支付的情况点击下面按钮。',
            okText: '充值完成',
            cancelText: '重新选择充值方式',
            onOk: () => {
                this.props.actions.getCustomerBuyResult(this.props.payInfo.businessId);
            },
            onCancel: () => {
                // nore
            }
        });
    }

    // 充值金额选择处理
    handelTopUpChange = (money) => {
        this.setState({
            money,
        });
    }

    // 支付方式选择处理
    handelPayChange = (payType) => {
        this.setState({
            payType,
        });
    }

    // 确认支付
    handelPurchase = () => {
        const versionId = this.props.location.query.versionId;

        if (this.state.payType == 'alipayweb') {
            openPay.open();
        }

        this.props.actions.updatePayCustomerVersionProgress({
            payType: this.state.payType,
            callBackPage: config.UPGRADE_CHARGE_URL,
            versionId
        });
    }

    // 返回账户充值
    handelReturn = () => {
        this.props.router.goBack();
    }

    _reset = () => {
        this.reset();
        this.qrcodePay = false;
    }

    // 渲染乐豆message
    renderAlertMessage = () => (
        <div>
            <p>有效期说明:</p>
            <p>1、升级新会员身份有效期为支付成功当天开始计算一年时间。</p>
            <p> 2、续费会员身份有效期为当前身份到期后开始计算一年时间。</p>
        </div>
    )


    render() {
        const {operation, payInfo} = this.props;
        const isLoadingPay = operation.type == payAction.UPDATE_PAY_CUSTOMER_VERSION_PROGRESS_PENDING;
        const isQrCodeShow = this.isShowView('qrCodeShow');

        let cardExtra = (
            <a href="javascript:;"
               onClick={this.showIssues}>
                查看发票相关问题
            </a>
        );

        return (
            <div className="app-page app-page-charge-payment">
                {this.state.isLoad &&
                    <div className="page-charge-payment">
                        <Card
                            className="page-charge-payment-card"
                            title="账号升级"
                            bodyStyle={{padding: 0}}
                            extra={cardExtra}>
                            <div>
                                <div className="page-charge-payment-box">

                                    <Alert
                                        className="page-charge-payment-alert"
                                        message={this.renderAlertMessage()}
                                        type="info"/>

                                    <TopUp
                                        {...this.topUpList}
                                        defaultSelect={this.state.money}
                                        onChange={this.handelTopUpChange}/>

                                    <Pay
                                        defaultSelect={this.state.payType}
                                        data={payInfo}
                                        onChange={this.handelPayChange}/>

                                </div>

                                <div className="page-charge-payment-footer">
                                    <div className="page-charge-payment-showmoney">
                                        应付金额: &nbsp;<em>{moneyFormat(this.state.money, '¥')}</em>
                                    </div>
                                    <div className="page-charge-payment-footer-btns">
                                        <Button
                                            size="large"
                                            onClick={this.handelReturn}>返回</Button>
                                        <Button
                                            disabled={isLoadingPay}
                                            size="large"
                                            type="primary"
                                            onClick={this.handelPurchase}>
                                            确认支付
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {isQrCodeShow &&
                        <QrCodeShow
                            type="upgrade"
                            payType={this.state.payType}
                            money={this.state.money}
                            qrCodeUrl={this.state.viewData}
                            reset={this._reset}/>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default PaymentUpgrade;


