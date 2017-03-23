import React from 'react';
import {Button, Form, InputNumber} from 'antd';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import AuthModule from 'common/component/AuthModule';

const createForm = Form.create;
const FormItem = Form.Item;

/*封装模态框类，与表单配合使用*/
class SettingIntegralForm extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {};

    handleSubmit = ()=> {
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                let formData = values;
                // 验证
                this.props.updateIntegralExchange(formData);
            }
        });
    };

    render = ()=> {

        const {getFieldDecorator} = this.props.form;

        return (

            <div>
                <Form inline>

                    <FormItem
                        label="积分兑换比例：">
                        <span>1元&nbsp;  =&nbsp;  &nbsp; </span>
                        {
                            getFieldDecorator('integral', {
                                rules: [
                                    {
                                        type: 'number',
                                        required: true,
                                        message: '请设定当前积分'
                                    }
                                ]
                            })(
                                <InputNumber
                                    min={1}
                                    style={{width: 200}}
                                    type="number"/>
                            )
                        }

                        <span>积分</span>
                        &nbsp;  &nbsp;
                        <span style={{'color': '#FF9900'}}>
                            （主要用于商城积分抵现）
                        </span>

                    </FormItem>
                    <FormItem>
                        <AuthModule type={module.MPLUGIN_COUPON_CREATE}>
                            <Button type="primary"
                                    onClick={() => this.anyWhereModule(module.MPLUGIN_COUPON_CREATE).then(()=>this.handleSubmit())}>确定</Button>
                        </AuthModule>
                    </FormItem>
                </Form>
            </div>

        );
    };

}

export default createForm({

    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {
        const {dataIntegral} = props;

        if (dataIntegral) {
            return {
                integral: {
                    value: dataIntegral.integral
                }
            };
        } else {
            return {};
        }
    },
    /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key=> {
            props.dataIntegral.integral = fields[key].value;
        });
    }
})(SettingIntegralForm);
