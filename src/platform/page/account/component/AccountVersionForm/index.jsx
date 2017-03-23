import React, {Component} from 'react';
import {Modal, Form, Button, Input, InputNumber, Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AccountVersionForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sort: props.sort
        };
    }

    handleSubmit = (e)=> {

        const {form, addVersion, updateVersion, param} = this.props;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                //和金额有关的需要从元转分
                let formData = {
                    'content': values.content,
                    'default': values.default,
                    'expiry': values.expiry,
                    'expiryUnit': values.expiryUnit,
                    'memo': values.memo,
                    'name': values.name,
                    'price': values.price*100,
                    'version': values.version
                };

                if (param == null) {
                    addVersion(formData);
                } else {
                    updateVersion({
                        id: param,
                        data: formData
                    });
                }

            }
        });
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        let {form, visible, reset, param} = this.props;

        const {getFieldDecorator} = form;

        let footer = (
            <div>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button onClick={reset}>取消</Button>
            </div>
        );

        return (
            <div>
                <Modal title={param ? '修改版本配置' : '新建版本配置'}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Form layout="horizontal">

                        <FormItem
                            {...formItemLayout}
                            label="名称："
                            hasFeedback>
                            {
                                getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入名称',
                                    }]
                                })(
                                    <Input style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="版本等级："
                            help="介于100~999"
                            hasFeedback>
                            {
                                getFieldDecorator('version', {
                                    rules: [{
                                        type: 'number',
                                        required: true,
                                        message: '请输入版本等级',
                                        min: 100,
                                        max: 999
                                    }]
                                })(
                                    <InputNumber
                                        style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="刊例价格/元："
                            hasFeedback>
                            {
                                getFieldDecorator('price', {
                                    rules: [{
                                        type: 'number',
                                        required: true,
                                        message: '请输入刊例价格',

                                    }]
                                })(
                                    <InputNumber
                                        style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="有效期："
                            hasFeedback>
                            {
                                getFieldDecorator('expiry', {
                                    rules: [{
                                        type: 'number',
                                        required: true,
                                        message: '请输入有效期'
                                    }]
                                })(
                                    <InputNumber
                                        style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="有效期单位："
                            hasFeedback>
                            {
                                getFieldDecorator('expiryUnit', {
                                    rules: [{
                                        required: true,
                                        message: '请选择有效期单位'
                                    }]
                                })(
                                    <RadioGroup>
                                        <Radio value='day'>天</Radio>
                                        <Radio value='year'>年</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="设置为默认版本："
                            hasFeedback>
                            {
                                getFieldDecorator('default', {
                                    rules: [{
                                        type:'boolean',
                                        required: true,
                                        message: '请选择是否设置为默认版本'
                                    }]
                                })(
                                    <RadioGroup>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="管理员备注："
                            hasFeedback>
                            {
                                getFieldDecorator('memo', {
                                    rules: [{
                                        required: false,
                                    }]
                                })(
                                    <Input type="textarea" rows={4}/>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        const {data} = props;

        // console.dir(data);

        if (data) {

            return {
                content: {
                    value: data.content
                },
                default: {
                    value: data.default
                },
                expiry: {
                    value: data.expiry
                },
                expiryUnit: {
                    value: data.expiryUnit
                },
                memo: {
                    value: data.memo
                },
                name: {
                    value: data.name
                },
                price: {
                    value: data.price
                },
                version: {
                    value: data.version
                }
            };

        } else {
            return {};
        }
    },
    // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key=> {

            props.data[key] = fields[key].value;

        });
    }

})(AccountVersionForm);
