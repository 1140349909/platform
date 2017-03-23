import React, {Component} from 'react';
import {Modal, Input, Form, Button, Row, Col} from 'antd';
import {withRouter} from 'react-router';
const FormItem = Form.Item;
import './index.less';
const COUNTDOWN_TIME = 90;

@withRouter
class BindMobileForm extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.countdownTime = COUNTDOWN_TIME;
    }

    state = {
        sendNumBtnText: '发送验证码',
        sendNumBtnDisabled: false,
        passwordDirty: false,
        mobile: {
            errorMsg: '',
            validateStatus: ''
        },
        upMobileDisabled: false
    }
    //属性变化的时候触发
    componentDidUpdate(prevProps) {
        const {mobileValidateStatus} = this.props;
        if (mobileValidateStatus != prevProps.mobileValidateStatus) {
            this.setMobileValidateStatus(mobileValidateStatus);
        }
    }

    // 页面卸载
    componentWillUnmount() {
        this.stopCountdown();
    }

    //绑定手机
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({sendText: '发送验证码'});
                this.props.bindUserMobile({
                    code: values.code,
                    password: values.password,
                    mobile: values.mobile
                });
            } else {
                if (err.mobile) {
                    this.setMobileValidateStatus('error', err.mobile.errors[0].message);
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
        this.props.form.validateFields(['mobile'], (err, values) => {
            if (!err) {
                this.props.captchaMobile(values.mobile);
                this.startCountdown();
            }
        });
    }

    availableUserMobile = () => {
        this.props.form.validateFields(['mobile'], (err, values) => {
            if (!err) {
                this.props.availableUserMobile(values.mobile);
            } else {
                this.setMobileValidateStatus('error', '请输入正确的手机号码');
            }
        });
    }

    setMobileValidateStatus = (status, errorMsg) => {
        let errorMsgEnum = {
            'validating': '正在校验中',
            'success': '',
            'error': '手机号已绑定过营销管家账号',
        };
        this.setState({
            mobile: {
                validateStatus: status,
                errorMsg: errorMsg || errorMsgEnum[status],
            },
            sendNumBtnDisabled: status == 'error' ? true : false,
            upMobileDisabled: status == 'error' ? true : false
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
        const {sendNumBtnDisabled, sendNumBtnText, upMobileDisabled} = this.state;

        const formItemLayout = {labelCol: {span: 5}, wrapperCol: {span: 18}};
        const columnLayout = {labelCol: {span: 5}, wrapperCol: {span: 16}};
        const tailFormItemLayout = {
            wrapperCol: {
                span: 21,
                offset: 4,
            },
        };
        const checkRules = [{required: true, message: '请输入6-18位字母或数字!',}, {
            pattern: /^[a-zA-Z\d]{6,18}$/, message: '请输入6-18位字母或数字!'
        }];
        const {info} = this.props.info;
        const {data}=this.props;

        let footer = (
            <div>
                <Button onClick={this.props.reset}>取消</Button>
                <Button disabled={upMobileDisabled} type="primary"
                        onClick={this.handleSubmit}>确定</Button>
            </div>
        );

        return (
            <Modal title={data.flag == 0 ? '绑定手机' : '修改手机'} visible={this.props.visible}
                   maskClosable={false}
                   footer={footer}
                   onCancel={this.props.reset}
                   width={434}
                   className="app_bind_mobile_form"
            >
                <Form layout="horizontal">
                    {
                        data.flag == 0 &&
                        <FormItem {...tailFormItemLayout} style={{'marginBottom': 0}}>
                            <p className='desc'>手机验证后可用于账号登陆</p>
                        </FormItem>
                    }
                    <Row gutter={5}>
                        <Col span={16}>
                            <FormItem
                                label='手机号'
                                {...columnLayout}
                                validateStatus={this.state.mobile.validateStatus}
                                help={this.state.mobile.errorMsg}
                                hasFeedback
                            >
                                {getFieldDecorator('mobile', {
                                    rules: [{required: true, message: '请输入手机号!'}, {
                                        pattern: /^1(3|4|5|7|8)\d{9}$/,
                                        message: '请输入正确的手机号码'
                                    }],
                                })(
                                    <Input type="tel" placeholder='请输入手机号码' onBlur={this.availableUserMobile}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            <Button size='large' className='sendNumBtn' disabled={sendNumBtnDisabled}
                                    onClick={this.sendNum}>{sendNumBtnText}</Button>
                        </Col>
                    </Row>
                    <FormItem
                        label='验证码'
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
                    {info.passwordNotSet &&
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
                                <Input type="password" placeholder='请输入登录密码'/>
                            )}
                        </FormItem>
                        < FormItem
                            label='确认密码：'
                            {...formItemLayout}
                        >
                            {getFieldDecorator('confirmPassword', {
                                rules: [{
                                    required: true, message: '请输入6-18位字母或数字!',
                                }, {
                                    validator: this.checkPassowrd,
                                }],
                            })(
                                <Input type="password" placeholder='请确认登录密码'/>
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
    mapPropsToFields: ({data}) => {
        if (data) {
            return {
                mobile: {
                    value: data.mobile
                },
                code: {
                    value: data.smsCode
                },
                password: {
                    value: data.password
                },
            };
        }
    },
    onFieldsChange: (props, fields) => {
        const keys = Object.keys(fields);
        keys.forEach(key => {
            props.data[key] = fields[key].value;
        });
    }
})(BindMobileForm);
