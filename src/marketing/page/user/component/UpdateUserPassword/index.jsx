import React, {Component} from 'react';
import {Modal, Input, Form} from 'antd';
const FormItem = Form.Item;
class UpdateUserPassword extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        passwordDirty: false
    }
    //验证密码
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        form.validateFields(['password_sure'], {force: true});
        callback();
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                this.props.updateUserPassword({
                    oldPassWord: values.oldPassWord,
                    password: values.password
                });
            }
        });
    }

    handlePasswordBlur = (e) => {
        const value = e.target.value;
        this.setState({passwordDirty: this.state.passwordDirty || !!value});
    }

    checkPassowrd = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('您两次输入的密码不一致');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirmPassword'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const checkRules = [{
            required: true, message: '请输入6-18位字母或数字!',
        }, {
            pattern: /^[a-zA-Z\d]{6,18}$/, message: '请输入6-18位字母或数字!'
        }];
        return (
            <Modal title="修改密码" visible={this.props.visible}
                   onOk={this.handleSubmit}
                   onCancel={this.props.reset}


            >
                <Form layout="horizontal">
                    <FormItem label="当前密码" {...formItemLayout} >
                        {getFieldDecorator('oldPassWord', {
                            rules: [{required: true, message: '请输入原密码!'}],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="新密码">
                        {getFieldDecorator('password', {
                            rules: [...checkRules, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password" onBlur={this.handlePasswordBlur}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认新密码">
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true, message: '请输入6-18位字母或数字!',
                                }
                                , {
                                    validator: this.checkPassowrd,
                                }],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
export default Form.create({
    mapPropsToFields: function ({data}) {
        if (data) {
            return {
                oldPassWord: {
                    value: data.oldPassWord
                },
                password: {
                    value: data.password
                },
                confirmPassword: {
                    value: data.password
                }
            };
        } else {
            return {};
        }
    },
})(UpdateUserPassword);
