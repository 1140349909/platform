import React, {Component} from 'react';
import Tooltip from 'common/component/Tooltip';
import _ from 'lodash';
import * as module from 'common/config/module';
import AuthModule from 'common/component/AuthModule';
import AuthComponentBase from 'common/base/AuthComponentBase';
import Img from 'common/component/Img';
import './index.less';
import {
    Modal,
    Card,
} from 'antd';
const confirm = Modal.confirm;

export default class PaywayCard extends AuthComponentBase {
    render() {
        const tradingTitle = (
            <h3 className="ant-card-head-title">
                交易方式设置
                <Tooltip type="setting-trading"></Tooltip>
            </h3>
        );
        return (

            <Card title={tradingTitle} style={{'height': '100%','overflowY':'scroll'}}
                  extra={'系统开通三种支付方式，可以选择支付方式，便于用户支付参与商城活动'}>
                <SettingCardPayZhifubao
                    reset={this.props.reset}
                    data={this.props.data.aliPay}
                    updateAliPay={this.props.updateAliPay}
                    showAliPay={this.props.showAliPay}/>

                <SettingCardPayWeixin
                    reset={this.props.reset}
                    data={this.props.data.weChat}
                    updateWechat={this.props.updateWechat}
                    showWechat={this.props.showWechat}/>

            </Card>

        );
    }
}

// 支付设置-支付宝
class SettingCardPayZhifubao extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    render() {

        let ele;

        if (!_.isEmpty(this.props.data) && this.props.data.enable) {

            ele = (
                <div>
                    <div className="settingcard-pay-text-tit">
                        支付宝账号：
                    </div>
                    <div className="settingcard-pay-text-number">
                        {this.props.data.account}
                    </div>
                    <div className="settingcard-pay-text-btn">
                        <AuthModule type={module.PAYMENT_SETTING_SETTING}>
                            <a className="settingcard-pay-text-btn-modify" onClick={() => {
                                this.anyWhereModule(module.PAYMENT_SETTING_SETTING).then(() => this.props.showAliPay());
                            }}>修改</a>
                        </AuthModule>
                        <SettingUinBind
                            type='aliPay'
                            data={this.props.data}
                            reset={this.props.reset}
                            update={this.props.updateAliPay}/>
                    </div>
                </div>
            );

        } else {

            ele = (
                <div>
                    <div className="settingcard-pay-text-no">
                        未开通
                    </div>
                    <div className="settingcard-pay-text-btn">
                        <AuthModule type={module.PAYMENT_SETTING_SETTING}>
                            <a className="settingcard-pay-text-btn-modify" onClick={() => {
                                this.anyWhereModule(module.PAYMENT_SETTING_SETTING).then(() => this.props.showAliPay());
                            }}>去绑定</a>
                        </AuthModule>
                    </div>
                </div>
            );
        }

        return (
            <Card className="settingcard-pay-zhifubao">
                <div className="settingcard-pay-img">
                    <Img
                        src="http://work.361ser.com/Content/ueditor/net/upload/image/20160528/6360004804336180465615025.jpg"/>
                </div>
                <div className="settingcard-pay-text">
                    {ele}
                </div>
            </Card>
        );
    }
}

// 支付设置-微信
class SettingCardPayWeixin extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    render() {
        let ele;
        if (!_.isEmpty(this.props.data) && this.props.data.enable) {
            ele = (
                <div>
                    <div className="settingcard-pay-text-tit">
                        微信账号：
                    </div>
                    <div className="settingcard-pay-text-number">
                        {this.props.data.appid}
                    </div>
                    <div className="settingcard-pay-text-btn">
                        <AuthModule type={module.PAYMENT_SETTING_SETTING}>
                            <a className="settingcard-pay-text-btn-modify" onClick={() => {
                                this.anyWhereModule(module.PAYMENT_SETTING_SETTING).then(() => this.props.showWechat());
                            }}>修改</a>
                        </AuthModule>

                        <SettingUinBind
                            type='wechat'
                            data={this.props.data}
                            reset={this.props.reset}
                            update={this.props.updateWechat}/>
                    </div>
                </div>
            );

        } else {

            ele = (
                <div>
                    <div className="settingcard-pay-text-no">
                        未开通
                    </div>
                    <div className="settingcard-pay-text-btn">
                        <AuthModule type={module.PAYMENT_SETTING_SETTING}>
                            <a className="settingcard-pay-text-btn-modify" onClick={() => {
                                this.anyWhereModule(module.PAYMENT_SETTING_SETTING).then(() => this.props.showWechat());
                            }}>去绑定</a>
                        </AuthModule>
                    </div>
                </div>
            );
        }
        return (
            <Card className="settingcard-pay-weixin ">
                <div className="settingcard-pay-img">
                    <Img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2658307387,2538659503&fm=58"/>
                </div>
                <div className="settingcard-pay-text">
                    {ele}
                </div>
            </Card>
        );
    }
}

// 解除绑定
class SettingUinBind extends Component {

    showConfirm = () => {
        confirm({
            title: '是否解除绑定',
            content: '解除绑定后,系统会自动启用默认配置信息,不会影响爆款商城交易',
            onOk: () => {

                let data;

                switch (this.props.type) {

                    case 'aliPay':

                        data = {
                            account: '',
                            enable: false,
                            key: '',
                            pid: '',
                            useSys: true
                        };

                        break;

                    case 'wechat':

                        data = {
                            appid: '',
                            enable: false,
                            muchId: '',
                            muchKey: '',
                            secret: '',
                            useSys: true
                        };

                        break;
                }

                this.props.update(data);

            },
            onCancel: () => {
                this.props.reset();
            },
        });
    }

    render() {
        return (
            <a className="settingcard-pay-text-btn-unbind" onClick={this.showConfirm}>解除绑定</a>
        );
    }
}



