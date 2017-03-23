import React, {Component} from 'react';
import {Modal, Input, Form, Button, Row, Col} from 'antd';
import {withRouter} from 'react-router';
const FormItem = Form.Item;
import './index.less';
const COUNTDOWN_TIME = 90;

@withRouter
class UpdateEmailForm extends Component {
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
        upEmailDisabled: false
    }
    //属性变化的时候触发
    componentDidUpdate(prevProps) {
        const {emailValidateStatus, emailCodeStatus} = this.props;
        if (emailValidateStatus != prevProps.emailValidateStatus) {
            this.setEmailValidateStatus(emailValidateStatus);
        }
        if (emailCodeStatus != prevProps.emailCodeStatus) {
            this.setState({
                sendNumBtnDisabled: true,
                upEmailDisabled: true
            });
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
                if (emailFlag == 0) {
                    //确认原邮箱
                    this.props.alterSureUserEmail({
                        code: values.code,
                        email: values.email
                    });
                } else {
                    //确定修改邮箱alterUserEmail
                    this.props.alterUserEmail({
                        code: values.code,
                        email: values.email,
                        verifyCode: this.props.data.verifyCode
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
            const email = values.email;
            if (!err) {
                this.props.alterCodeToUserEmail({email});
                this.startCountdown();
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
            upEmailDisabled: status == 'error' ? true : false
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {sendNumBtnDisabled, sendNumBtnText, upEmailDisabled} = this.state;
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 17},
        };
        const columnLayout = {labelCol: {span: 6}, wrapperCol: {span: 16}};

        let footer = (
            <div>
                <Button onClick={this.props.reset}>取消</Button>
                <Button disabled={upEmailDisabled} type="primary"
                        onClick={this.handleSubmit}>{this.props.data.emailFlag == 0 ? '下一步' : '确定'}</Button>
            </div>
        );
        const emailFlag = this.props.data.emailFlag;
        return (
            <Modal title='修改邮箱' visible={this.props.visible}
                   footer={footer}
                   onCancel={this.props.reset}
                   width={434}
                   maskClosable={false}
                   className='app-bind-email-form-page'
            >

                <Form layout="horizontal">
                    <Row gutter={3}>
                        <Col span={17}>
                            <FormItem
                                label={emailFlag == 0 ? '原邮箱' : '新邮箱'}
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
                                    <Input placeholder='请输入邮箱' disabled={emailFlag == 0 ? true : false}
                                           onBlur={this.availableUserEmail}/>
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
})(UpdateEmailForm);
