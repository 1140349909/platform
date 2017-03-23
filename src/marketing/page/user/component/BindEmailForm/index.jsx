import React, {Component} from 'react';
import {Modal, Input, Form, Button, Row, Col} from 'antd';
import {withRouter} from 'react-router';
const FormItem = Form.Item;
import './index.less';
const COUNTDOWN_TIME = 90;

@withRouter
class BindEmailForm extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.countdownTime = COUNTDOWN_TIME;
    }

    state = {
        sendNumBtnText: '发送验证邮件',
        sendNumBtnDisabled: false,
        passwordDirty: false,
        email: {
            errorMsg: '',
            validateStatus: ''
        },
        bindEmailAbled: false,
    }
    //属性变化的时候触发
    componentDidUpdate(prevProps) {
        const {emailValidateStatus, emailCodeStatus} = this.props;
        if (emailValidateStatus != prevProps.emailValidateStatus) {
            this.setEmailValidateStatus(emailValidateStatus);
        }
        if (emailCodeStatus != prevProps.emailCodeStatus) {
            if (!emailCodeStatus) {
                this.stopCountdown();
                this.setState({
                    sendNumBtnDisabled: true
                });
            }
        }
    }

    // 页面卸载
    componentWillUnmount() {
        this.stopCountdown();
    }

    //绑定邮箱
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const emailFlag = this.props.data.emailFlag;
                this.setState({sendText: '发送验证码'});
                if (emailFlag == 1) {
                    //确定修改邮箱alterUserEmail
                    this.props.alterUserEmail({
                        code: values.code,
                        email: values.email,
                        verifyCode: this.props.data.verifyCode
                    });
                } else {
                    this.props.bindUserEmail({
                        code: values.code,
                        password: values.password,
                        email: values.email
                    });
                }

            }
        });
    }

    // 启动倒计时
    startCountdown = () => {
        this.stopCountdown();
        this.timer = setInterval(() => {
            if (--this.countdownTime <= 0) {
                this.stopCountdown();
                this.setSendBtn('重新发送', false);
            } else {
                this.setSendBtn(this.countdownTime + '秒后重试', true);
            }

        }, 1000);
    }

    // 停止倒计时
    stopCountdown = () => {
        clearInterval(this.timer);
        this.countdownTime = COUNTDOWN_TIME;
    }

    //重启计时器
    setSendBtn(text, disabled) {
        this.setState({
            sendNumBtnText: text,
            sendNumBtnDisabled: disabled
        });
    }

    // 获取验证码
    sendNum = () => {
        // 1.点击发送验证码->验证手机是否正确->发送请求->启动计时器;
        this.props.form.validateFields(['email'], (err, values) => {
            if (!err) {
                const emailFlag = this.props.data.emailFlag;
                if (emailFlag == 1) {
                    this.props.alterCodeToUserEmail({email: values.email});
                } else {
                    this.props.bindUserEmailCode(values.email);
                }
                this.startCountdown();
            } else {
                this.setState({
                    email: {
                        validateStatus: 'error',
                        errorMsg: this.props.form.getFieldError('email')
                    },
                });
            }
        });
    }

    availableUserEmail = () => {
        this.props.form.validateFields(['email'], (err, values) => {
            if (!err) {
                this.props.availableUserEmail(values.email);
            } else {
                this.setEmailValidateStatus('error', '请输入正确格式的邮箱');
            }
        });
    }

    setEmailValidateStatus = (status, errorMsg) => {
        let errorMsgEnum = {
            'validating': '正在校验中',
            'success': '',
            'error': '此邮箱已经绑定过营销管家账号',
        };
        this.setState({
            email: {
                validateStatus: status,
                errorMsg: errorMsg || errorMsgEnum[status]
            },
            sendNumBtnDisabled: status == 'error' ? true : false,//如果校验没通过，则禁用发送按钮
            bindEmailAbled: status == 'error' ? true : false
        });
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirmPassword'], {force: true});
        }
        callback();
    }
    checkPassowrd = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('您两次输入的密码不一致');
        } else {
            callback();
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {sendNumBtnDisabled, sendNumBtnText, bindEmailAbled} = this.state;
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 17},
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 20,
                offset: 4,
            },
        };
        const columnLayout = {labelCol: {span: 6}, wrapperCol: {span: 16}};
        const checkRules = [{required: true, message: '请输入6-18位字母或数字!',}, {
            pattern: /^[a-zA-Z\d]{6,18}$/, message: '请输入6-18位字母或数字!'
        }];
        const {info} = this.props;

        let footer = (
            <div>
                <Button onClick={this.props.reset}>取消</Button>
                <Button disabled={bindEmailAbled} type="primary"
                        onClick={this.handleSubmit}>确定</Button>
            </div>
        );
        const emailFlag = this.props.data.emailFlag;
        return (
            <Modal title={emailFlag == 1 ? '修改邮箱' : '绑定邮箱'} visible={this.props.visible}
                   width={434}
                   footer={footer}
                   onCancel={this.props.reset}
                   maskClosable={false}
                   className='app-bind-email-form-page'
            >

                <Form layout="horizontal">
                    <Row gutter={3}>
                        <Col span={17}>
                            <FormItem
                                label={emailFlag == 1 ? '新邮箱' : '邮箱'}
                                validateStatus={this.state.email.validateStatus}
                                help={this.state.email.errorMsg}
                                hasFeedback
                                {...columnLayout}
                            >
                                {getFieldDecorator('email', {
                                    rules: [
                                        {required: true, message: '请输入邮箱!'},
                                        {type: 'email', message: '请输入正确格式的邮箱'}],
                                })(
                                    <Input placeholder='请输入邮箱' onBlur={this.availableUserEmail}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            <Button size='large' className='sendNumBtn' disabled={sendNumBtnDisabled}
                                    onClick={this.sendNum}>{sendNumBtnText}</Button>
                        </Col>
                    </Row>
                    <FormItem
                        label='邮箱验证码'
                        {...formItemLayout}
                    >
                        {getFieldDecorator('code', {
                            rules: [{required: true, message: '请输入验证码!'}, {
                                min: 1,
                                max: 11,
                                message: '请输入正确的验证码'
                            }],
                        })(
                            <Input placeholder='请输入验证码'/>
                        )}
                    </FormItem>
                    { info.passwordNotSet &&
                    <div>
                        <FormItem {...tailFormItemLayout} style={{'marginBottom': 0}}>
                            <p className='email_mobile_desc'>请设置登陆密码。长度6~16位，由字母和数字组成。</p>
                        </FormItem>
                        <FormItem label='登录密码：' {...formItemLayout} >
                            {getFieldDecorator('password', {
                                rules: [...checkRules, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type='password' placeholder='请输入长度6~16位，由字母和数字组成的登录密码'/>
                            )}
                        </FormItem>
                        < FormItem
                            label='确认密码：'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('confirmPassword', {
                                rules: [{
                                    required: true, message: '请确认密码!',
                                }, {
                                    validator: this.checkPassowrd,
                                }],
                            })(
                                <Input type='password' placeholder='请确认登录密码'/>
                            )}
                        </FormItem>
                    </div>
                    }
                </Form>
            </Modal>
        );
    }
}


export default Form.create({
    mapPropsToFields: function (props) {
        const {data} = props;
        if (data) {
            return {
                email: {
                    value: data.email
                },
                code: {
                    value: data.code
                }
            };
        } else {
            return {};
        }
    }
})(BindEmailForm);
