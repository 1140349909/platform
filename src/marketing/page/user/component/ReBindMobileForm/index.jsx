import React, {Component} from 'react';
import {Input, Form, Button, Row, Col} from 'antd';
import {withRouter} from 'react-router';
const FormItem = Form.Item;
import './index.less';
const COUNTDOWN_TIME = 90;

@withRouter
class ReBindMobileForm extends Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.countdownTime = COUNTDOWN_TIME;
    }

    state = {
        sendNumBtnText: '发送验证码',
        sendNumBtnDisabled: false,
    };
    //属性变化的时候触发
    componentDidUpdate(prevProps) {
        if (this.props.data.showSuccess) {
            this.stopCountdown();
        }
        // 验证码状态变化
        if (this.props.data.smsCodeStatus != prevProps.data.smsCodeStatus) {
            if (this.props.data.smsCodeStatus == 'FAILURE') {
                this.stopCountdown();
                this.setSendBtn('重新发送', false);
            }
        }
    }

    // 启动倒计时
    startCountdown = () => {
        this.stopCountdown();
        this.timer = setInterval(() => {
            if (--this.countdownTime <= 0) {
                this.stopCountdown();
                this.setSendBtn('重新发送', false);
            } else {
                this.setSendBtn(this.countdownTime + '秒', true);
            }

        }, 1000);
    }

    // 停止倒计时
    stopCountdown = () => {
        clearInterval(this.timer);
        this.countdownTime = COUNTDOWN_TIME;
    }

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
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.validateMobile({
                    mobile: values.mobile,
                    code: values.code
                });
            }
        });
    };

    render() {
        const formItemLayout = {labelCol: {span: 4}, wrapperCol: {span: 10}};
        const {getFieldDecorator} = this.props.form;
        const {sendNumBtnDisabled, sendNumBtnText} =this.state;
        const info = this.props.info;
        return (
            <Form horizontal className='rebindMobileForm'>
                <FormItem
                    id='adminName'
                    label='账号名'
                    {...formItemLayout}
                >
                    <i id='adminName'>{info && info.email}</i>
                </FormItem>
                <FormItem
                    id='userName'
                    label='昵称'
                    {...formItemLayout}
                >
                    <i id='userName'>{info && info.nickName}</i>
                </FormItem>
                <FormItem
                    label='输入手机号'
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                >
                    <Row gutter={8}>
                        <Col span={18}>
                            {getFieldDecorator('mobile', {
                                rules: [
                                    {required: true, message: '请输入手机号码'},
                                    {pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号码'}
                                ],
                            })(
                                <Input type="tel" placeholder='请输入' style={{'height': 38}}/>
                            )}
                        </Col>
                        <Col span={4}>
                            <Button className='sendNumBtn' disabled={sendNumBtnDisabled}
                                    onClick={this.sendNum}>{sendNumBtnText}</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    label='输入验证码'
                    labelCol={{span: 4}}
                    wrapperCol={{span: 12}}
                >
                    {getFieldDecorator('code', {
                        rules: [
                            {required: true, message: '输入验证码'}],
                    })(
                        <Input type='text' id='rePwd' placeholder='请输入' style={{'height': 38}}/>
                    )}
                </FormItem>
                <FormItem wrapperCol={{span: 6, offset: 4}}>
                    <Button type='primary' htmlType='submit' className='submitBtn'
                            onClick={this.handleSubmit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}


export default Form.create({
    mapPropsToFields: function ({data}) {
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
})(ReBindMobileForm);
