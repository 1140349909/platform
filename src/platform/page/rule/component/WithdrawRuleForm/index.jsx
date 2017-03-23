import React, {Component} from 'react';
import {Modal, Form, Button, Input, InputNumber, Radio, Card,Select} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class WithdrawRuleForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tagType: props.tagType,
            sort: props.sort
        };
    }

    handleSubmit = (e)=> {

        const {form, addWithdrawRule, updateWithdrawRule, param} = this.props;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                //和金额有关的需要从元转分
                let formData = {
                    'name': values.name,
                    'platformRule': {
                        'maxDayPayCount': values.maxDayPayCount,
                        'maxDayPayNum': values.maxDayPayNum * 100,
                        'maxMonthSumPay': values.maxMonthSumPay * 100,
                        'maxMonthSumPayCount': values.maxMonthSumPayCount,
                        'payType': values.payType,
                    },
                    'ruleId': values.ruleId,
                    'ruleStatus': values.ruleStatus,
                    'userRule': {
                        'maxDayTakeCount': values.maxDayTakeCount,
                        'minTake': values.minTake * 100,
                        'userOnceMaxTake': values.userOnceMaxTake * 100
                    }
                };

                if (param == null) {
                    addWithdrawRule(formData);
                } else {
                    updateWithdrawRule({
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
                <Modal title={param ? '修改提现规则' : '新建提现规则'}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Form layout="horizontal">
                        <Card title="基本设置">
                            <FormItem
                                {...formItemLayout}
                                label="标识："
                                hasFeedback>
                                {
                                    getFieldDecorator('ruleId', {
                                        rules: [{
                                            required: true,
                                            message: '请填写标识',
                                        }]
                                    })(
                                        <Input style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="名称："
                                help="介于4~10个字"
                                hasFeedback>
                                {
                                    getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '介于4~10个字',
                                            min: 4,
                                            max: 10
                                        }]
                                    })(
                                        <Input style={{'width': '50%'}}/>
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
                                label="单次最低提现："
                                help="介于100~1000"
                                hasFeedback>
                                {
                                    getFieldDecorator('minTake', {
                                        rules: [{
                                            type: 'number',
                                            required: true,
                                            message: '请输入单次最低提现金额',
                                            min: 100,
                                            max: 1000
                                        }]
                                    })(
                                        <InputNumber
                                            step={0.01}
                                            style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="单次最多提现："
                                help="介于100~10000"
                                hasFeedback>
                                {
                                    getFieldDecorator('userOnceMaxTake', {
                                        rules: [{
                                            type: 'number',

                                            required: true,
                                            message: '请输入单次最多提现金额',
                                            min: 100,
                                            max: 10000
                                        }]
                                    })(
                                        <InputNumber
                                            step={0.01}
                                            style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="单日提现次数上限："
                                help="介于1~3"
                                hasFeedback>
                                {
                                    getFieldDecorator('maxDayTakeCount', {
                                        rules: [{
                                            type: 'number',

                                            required: true,
                                            message: '请输入单日提现次数上限',
                                            min: 1,
                                            max: 3
                                        }]
                                    })(
                                        <InputNumber style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                        </Card>
                        <br/>
                        <Card title="平台设置">
                            <FormItem
                                {...formItemLayout}
                                label="日付款次数上限："
                                help="介于20~100"
                                hasFeedback>
                                {
                                    getFieldDecorator('maxDayPayCount', {
                                        rules: [{
                                            type: 'number',

                                            required: true,
                                            message: '介于20~100',
                                            min: 20,
                                            max: 100
                                        }]
                                    })(
                                        <InputNumber style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="日付款金额上限："
                                help="介于20000~50000"
                                hasFeedback>
                                {
                                    getFieldDecorator('maxDayPayNum', {
                                        rules: [{
                                            type: 'number',

                                            required: true,
                                            message: '请输入日付款金额上限',
                                            min: 20000,
                                            max: 50000
                                        }]
                                    })(
                                        <InputNumber
                                            step={0.01}
                                            style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="月付款次数上限："
                                help="介于20~3000"
                                hasFeedback>
                                {
                                    getFieldDecorator('maxMonthSumPayCount', {
                                        rules: [{
                                            type: 'number',

                                            required: true,
                                            message: '请输入月付款次数上限',
                                            min: 20,
                                            max: 3000
                                        }]
                                    })(
                                        <InputNumber style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="月累计付款上限："
                                help="介于50000~1500000"
                                hasFeedback>
                                {
                                    getFieldDecorator('maxMonthSumPay', {
                                        rules: [{
                                            type: 'number',

                                            required: true,
                                            message: '请输入月累计付款上限',
                                            min: 50000,
                                            max: 1500000
                                        }]
                                    })(
                                        <InputNumber
                                            step={0.01}
                                            style={{'width': '50%'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="付款账号类型："
                                help="请选择付款账号类型"
                                hasFeedback>
                                {
                                    getFieldDecorator('payType', {
                                        rules: [{
                                            required: true,
                                            message: '请选择付款账号类型'
                                        }]
                                    })(
                                        <Select style={{'width': '50%'}}>
                                            <Option value='wechat'>微信</Option>
                                            <Option value='alipay'>支付宝</Option>
                                            <Option value='unionpay'>银联</Option>
                                        </Select>
                                    )
                                }
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
                maxDayPayCount: {
                    value: data.platformRule ? data.platformRule.maxDayPayCount : ''
                },
                maxDayPayNum: {
                    value: data.platformRule ? data.platformRule.maxDayPayNum/100 : ''
                },
                maxMonthSumPay: {
                    value: data.platformRule ? data.platformRule.maxMonthSumPay/100 : ''
                },
                maxMonthSumPayCount: {
                    value: data.platformRule ? data.platformRule.maxMonthSumPayCount : ''
                },
                payType: {
                    value: data.platformRule ? data.platformRule.payType : ''
                },
                ruleId:{
                    value:data.ruleId
                },
                ruleStatus: {
                    value: data.ruleStatus
                },
                maxDayTakeCount: {
                    value: data.userRule ? data.userRule.maxDayTakeCount : ''
                },
                minTake: {
                    value: data.userRule ? data.userRule.minTake/100 : ''
                },
                userOnceMaxTake: {
                    value: data.userRule ? data.userRule.userOnceMaxTake/100 : ''
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

})(WithdrawRuleForm);
