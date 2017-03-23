import React, {Component} from 'react';
import {Form, Modal, Input} from 'antd';
import  {isValid} from 'common/util/validator';
import './index.less';
const FormItem = Form.Item;


class ShowForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        showType: null,
        viewParam: null,
        viewData: null
    };

    // 真实的DOM被渲染出来后调用。
    componentDidMount() {}

    _handelOk = () => {
        let isErrors = false;

        // 校验
        this.props.form.validateFields((errors) => {
            if (errors) {
                isErrors = true;
                return;
            }
        });

        if (!isErrors) {
            const formData = this.props.form.getFieldsValue();
            const data = {
                aliPay: {
                    name: formData.name,
                    account: formData.account,
                }
            };
            this.props.onOk && this.props.onOk(data);
        }

    }

    _isAccount = (rule, value, callback) => {
        if (!isValid('mobile', value) && !isValid('email', value)) {
            callback([new Error('邮箱/手机号格式不正确')]);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const accountFile = getFieldDecorator('account', {
            rules: [
                {
                    required: true,
                    message: '请输入支付宝账号',
                },
                {
                    validator: this._isAccount,
                }
            ],
        });

        const nameFile = getFieldDecorator('name', {
            rules: [{
                required: true, message: '请输入真实姓名',
            }]
        });

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };

        return (
            <Modal title="设置"
                   className="profit-setting-form"
                   onOk={this._handelOk}
                   onCancel={this.props.reset}
                   visible={true}
                   maskClosable={false}>

                <Form layout="horizontal">
                    <FormItem
                        label="支付宝账号"
                        {...formItemLayout}>
                        {accountFile(
                            <Input
                                placeholder="最多输入50个字符"
                                maxLength={50}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="真实姓名"
                        {...formItemLayout}>
                        {nameFile(
                            <Input
                                placeholder="最多输入20个字符"
                                maxLength={20}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        const {data} = props;
        return {
            name: {
                value: data.name,
            },
            account: {
                value: data.account,
            }
        };
    }

})(ShowForm);
