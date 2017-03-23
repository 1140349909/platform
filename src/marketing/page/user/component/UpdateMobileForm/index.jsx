import React, {Component} from 'react';
import {Modal, Input, Form, Button, Row, Col} from 'antd';
import {withRouter} from 'react-router';
const FormItem = Form.Item;
import './index.less';

const COUNTDOWN_TIME = 90;

@withRouter
class UpdateMobileForm extends Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.countdownTime = COUNTDOWN_TIME;
    }

    state = {
        sendNumBtnText: '发送验证码',
        sendNumBtnDisabled: false,
        mobile: {
            errorMsg: '',
            validateStatus: ''
        },
        upMobileDisabled: false
    }
    //属性变化的时候触发
    componentDidUpdate(prevProps) {
        const {mobileValidateStatus, data} = this.props;
        if (mobileValidateStatus != prevProps.mobileValidateStatus) {
            this.setMobileValidateStatus(mobileValidateStatus);
        }
        if (data.flag != prevProps.data.flag) {
            this.setState({
                sendNumBtnDisabled: true
            });
        }
    }

    // 页面卸载
    componentWillUnmount() {
        this.stopCountdown();
    }

    handleSubmit = () => {
        const {data} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (data.flag == 0) {
                    this.props.validateMobile(values);
                } else {
                    this.props.bindUserMobile({
                        mobile: values.mobile,
                        code: values.code
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

    setSendBtn(text, disabled) {
        // 发送验证码
        // 90秒
        // 重新发送
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
                errorMsg: errorMsg || errorMsgEnum[status]
            },
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {sendNumBtnDisabled, sendNumBtnText, upMobileDisabled} = this.state;

        const formItemLayout = {labelCol: {span: 5}, wrapperCol: {span: 19}};
        const {data} = this.props;
        let footer = (
            <div>
                <Button onClick={this.props.reset}>取消</Button>
                <Button disabled={upMobileDisabled} type="primary"
                        onClick={this.handleSubmit}>{data.flag == 0 ? '下一步' : '确定'}</Button>
            </div>
        );
        const columnLayout = {labelCol: {span: 5}, wrapperCol: {span: 16}};
        return (
            <Modal title={data.title} visible={this.props.visible}
                   footer={footer}
                   onCancel={this.props.reset}
                   width={434}
                   className="app-update-mobile-form"
            >
                <Form layout="horizontal">
                    <Row gutter={5}>
                        <Col span={16}>
                            <FormItem
                                label='手机验证'
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
                                    <Input type="tel" placeholder='请输入手机号码' disabled={true}
                                           onBlur={this.availableUserMobile}/>
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
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}


export default Form.create({
    mapPropsToFields: function (props) {
        let {data} = props;
        if (data) {
            return {
                mobile: {
                    value: data.mobile
                },
                code: {
                    value: data.code
                }
            };
        } else {
            return {};
        }
    },
})(UpdateMobileForm);
