import React, {Component} from 'react';
import {Row, Col, Modal, message} from 'antd';
import  './index.less';
const confirm = Modal.confirm;

export default class UserSecurSetting extends Component {
    constructor(props) {
        super(props);
    }

    renderPassword = (passwordNotSet) => {
        return (
            <Row>
                <Col className='user-label' span={2}>登录密码：</Col>
                <Col span={3}
                     className={!passwordNotSet ? 'sec-setting-binded' : 'sec-setting'}> {!passwordNotSet ? '已设置' : '未设置'}</Col>
                <Col span={12} className='user-secure-desc'> 建议使用6-16个字符，可包括大小写字母和数字</Col>
                <Col span={2}>
                    <a onClick={!passwordNotSet ? this.props.showUpdateUserPassword : this.props.setPassword}>
                        {!passwordNotSet ? '修改密码' : '设置密码'}</a></Col>
            </Row>
        );
    }

    renderEmail = (email) => {
        return (
            <Row>
                <Col className='user-label' span={2}>邮箱：</Col>
                <Col span={3} className={email ? 'sec-setting-binded' : 'sec-setting'}>{email ? '已绑定' : '未绑定'}</Col>
                <Col span={12} className='user-secure-desc'> {email ? '您绑定的邮箱为：' + email : '绑定后，可使用邮箱进行快速登录'}</Col>
                <Col span={2}> <a onClick={email ? this.props.showUpdateEmailForm : this.props.showBindEmailForm}>
                    {email ? '修改邮箱' : '绑定邮箱'}</a></Col>
            </Row>
        );
    }

    renderMobile = (mobile, passwordNotSet) => {
        //如果密码已经设置，则进行手机号码绑定；如果没有设置密码，则进行手机号码验证，以及密码的设置
        return (
            <Row>
                <Col className='user-label' span={2}>手机号：</Col>
                <Col span={3} className={mobile ? 'sec-setting-binded' : 'sec-setting'}>{mobile ? '已绑定' : '未绑定'}</Col>
                <Col span={12} className='user-secure-desc'> {mobile ? '您绑定的手机号码为：' + mobile : '绑定后，可使用手机号进行快速登录'}</Col>
                <Col span={2}> <a
                    onClick={mobile && !passwordNotSet ? () => this.props.showUpdateMobileForm(mobile) : () => this.props.showSetMobileForm(0)}>{
                    mobile ? '修改手机' : '绑定手机'
                }</a></Col>
            </Row>
        );
    }

    renderWechat = () => {
        let channel = this.hasSocialBind('wx');
        return this.renderSocialDom(channel, '微信', 'wx');
    }

    renderQQ = () => {
        let channel = this.hasSocialBind('qq');
        return this.renderSocialDom(channel, 'QQ', 'qq');
    }

    renderWb = () => {
        let channel = this.hasSocialBind('wb');
        return this.renderSocialDom(channel, '微博', 'wb');
    }

    hasSocialBind = (channel) => {
        const {accountBinds} = this.props.info.info;
        let channelObj = null;
        accountBinds && accountBinds.map((item) => {
            if (item.channel == channel) {
                channelObj = item;
                return channelObj;
            }
        });
        return channelObj;
    }
    renderSocialDom = (bindChannel, channelText, socialFlag) => {
        return (
            <Row>
                <Col className='user-label' span={2}>{channelText}账号：</Col>
                <Col span={3}
                     className={bindChannel ? 'sec-setting-binded' : 'sec-setting'}>{bindChannel ? '已绑定' : '未绑定'} </Col>
                <Col span={12}
                     className='user-secure-desc'>{bindChannel ? '已绑定' + channelText + '账号：' + bindChannel.openId : '绑定后，可使用'
                + channelText + '账号进行快速登录'}</Col>
                <Col span={2}><a
                    onClick={bindChannel ? () => this.unbindSocialAccount(bindChannel.channel, channelText) : () => this.bindSocialAccount(socialFlag)}>
                    {bindChannel ? '解除绑定' : '绑定' + channelText}</a></Col>
            </Row>
        );
    }

    //是否能解除绑定
    isUnBindSocialChannels = () => {
        let channels = [];
        const {accountBinds} = this.props.info.info;
        accountBinds && accountBinds.map((item) => {
            channels.push(item.channel);
        });
        return channels;
    }

    //解除绑定
    unbindSocialAccount = (channel, channelText) => {
        const {info} = this.props.info;
        let socialChannels = this.isUnBindSocialChannels();
        if (socialChannels.length > 1 || (socialChannels.length <= 1 && info.mobile)) {
            confirm({
                title: '你是否确认解绑' + channelText + '？',
                content: '',
                onOk: () => {
                    this.props.unbindSocialAccount(channel);
                },
                onCancel: () => {
                    this.props.reset();
                },
            });
        } else if (socialChannels.length <= 1 && !info.mobile) {
            //如果第三方登录只剩下一种登录方式，需要绑定手机号之后才能解除绑定
            message.warn('您需要先绑定手机号才能解绑' + channelText);
        }
    }

    //绑定第三方账号
    bindSocialAccount = (channel) => {
        this.props.bindSocialAccount(channel);
    }

    render() {
        const {info} = this.props.info;
        return (
            <div className='user-container app-user-secure-setting-page'>
                <p className='title'>安全设置</p>
                {
                    info &&
                    <div className='user-info'>
                        {
                            this.renderPassword(info.passwordNotSet)
                        }
                        {
                            this.renderEmail(info.email)
                        }
                        {
                            this.renderMobile(info.mobile, info.passwordNotSet)
                        }
                        {
                            this.renderWechat()
                        }
                        {
                            this.renderQQ()
                        }
                        {
                            this.renderWb()
                        }
                    </div>
                }

            </div>
        );
    }
}
