import React, {Component} from 'react';
import {Modal, Form, Button, Input, InputNumber, Radio, Card} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class InvoiceRuleForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sort: props.sort
        };
    }

    handleSubmit = (e)=> {

        const {form, addInvoiceRule, updateInvoiceRule, param} = this.props;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                switch (values.invoiceType){
                    case 'normal':
                        values.ruleId = 'BILL_NORMAL';
                        break;
                    case 'special':
                        values.ruleId = 'BILL_SPECIAL';
                        break;
                }

                let formData = {
                    'invoiceType': values.invoiceType,
                    'name': values.name,
                    'orderValidateDay': values.orderValidateDay,
                    'ruleStatus': values.ruleStatus,
                    'ruleId': values.ruleId,
                    'userRule': {
                        'preMonthMaxTimes': values.preMonthMaxTimes,
                        'preTimesMinMoney': values.preTimesMinMoney * 100
                    }
                };

                if (values.orderValidateType == 'currentMonth') {
                    formData.orderValidateDay = 0;
                }

                if (param == null) {
                    addInvoiceRule(formData);
                } else {
                    updateInvoiceRule({
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

        const {getFieldDecorator, getFieldValue} = form;

        let footer = (
            <div>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button onClick={reset}>取消</Button>
            </div>
        );

        return (
            <div>
                <Modal title={param ? '修改发票规则' : '新建发票规则'}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Form layout="horizontal">
                        <Card title="基本设置">
                            {
                                getFieldDecorator('ruleId', {

                                })(
                                    <Input type="hidden" style={{'width': '50%'}}/>
                                )
                            }
                            <FormItem
                                {...formItemLayout}
                                label="名称："
                                help="介于4~15个字"
                                hasFeedback>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '介于4~15个字',
                                            min: 4,
                                            max: 15
                                        }]
                                    })(
                                        <Input style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="发票类型："
                                hasFeedback>
                                {
                                    getFieldDecorator('invoiceType', {
                                        rules: [{
                                            required: true,
                                            message: '请选择发票类型'
                                        }]
                                    })(
                                        <RadioGroup>
                                            <Radio value='normal'>增值税普通发票</Radio>
                                            <Radio value='special'>增值税专用发票</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="订单的有效时间："
                                hasFeedback>
                                {
                                    getFieldDecorator('orderValidateType', {
                                        rules: [{
                                            required: true,
                                            message: '请选择订单的有效时间',
                                        }]
                                    })(
                                        <RadioGroup>
                                            <Radio value='workday'>
                                                {
                                                    getFieldDecorator('orderValidateDay', {
                                                        rules: [{
                                                            type: 'number',
                                                            required: true,
                                                            message: '请输入订单的有效时间',
                                                            min: 1
                                                        }]
                                                    })(
                                                        <InputNumber
                                                            min={1}
                                                            disabled={getFieldValue('orderValidateType') == 'currentMonth'}
                                                            style={{'width': '50%'}}/>
                                                    )
                                                }
                                                <span className="ant-form-text"> 个工作日内</span>
                                            </Radio>
                                            <Radio value='currentMonth'>本月</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="状态："
                                help="请选择状态"
                                hasFeedback>
                                {
                                    getFieldDecorator('ruleStatus', {
                                        rules: [{
                                            required: true,
                                            message: '请选择状态'
                                        }]
                                    })(
                                        <RadioGroup>
                                            <Radio value='TRUE'>启用</Radio>
                                            <Radio value='FALSE'>禁用</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                        </Card>
                        <br/>
                        <Card title="用户设置">
                            <FormItem
                                {...formItemLayout}
                                label="单张发票最低限额："
                                help="介于100~1000"
                                hasFeedback>
                                {
                                    getFieldDecorator('preTimesMinMoney', {
                                        rules: [{
                                            type: 'number',
                                            required: true,
                                            message: '介于100~1000',
                                            min: 100,
                                            max: 1000
                                        }]
                                    })(
                                        <InputNumber style={{'width': '50%'}}/>
                                    )
                                }
                                <span className="ant-form-text"> 元</span>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="每账户每月最多开票次数："
                                help="介于1~100次"
                                hasFeedback>
                                {
                                    getFieldDecorator('preMonthMaxTimes', {
                                        rules: [{
                                            type: 'number',
                                            required: true,
                                            message: '介于1~100次',
                                            min: 1,
                                            max: 100
                                        }]
                                    })(
                                        <InputNumber style={{'width': '50%'}}/>
                                    )
                                }
                                <span className="ant-form-text"> 次</span>
                            </FormItem>
                        </Card>
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
                name: {
                    value: data.name
                },
                ruleId: {
                    value: data.ruleId
                },
                ruleStatus: {
                    value: data.ruleStatus
                },
                invoiceType: {
                    value: data.invoiceType
                },
                preTimesMinMoney: {
                    value: data.userRule ? data.userRule.preTimesMinMoney / 100 : ''
                },
                preMonthMaxTimes: {
                    value: data.userRule ? data.userRule.preMonthMaxTimes : ''
                },
                orderValidateType: {
                    value: data.orderValidateDay == 0 ? 'currentMonth' : 'workday'
                },
                orderValidateDay: {
                    value: data.orderValidateDay ? data.orderValidateDay : 1
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

})(InvoiceRuleForm);
