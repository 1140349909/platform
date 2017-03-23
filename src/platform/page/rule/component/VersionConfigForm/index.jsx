import React, {Component} from 'react';
import {Modal, Form, Button, Input, InputNumber, Radio, Select} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class VersionConfigForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e)=> {

        const {form, addVersionPara, updateVersionPara, param,reset} = this.props;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                //和金额有关的需要从元转分
                let formData = {
                    'allowBuy': values.allowBuy,
                    'defaultValue':values.defaultValue,
                    'desc': values.desc,
                    'mark': values.mark,
                    'maxValue': values.maxValue,
                    'minBuyQuantity': values.minBuyQuantity,
                    'minValue': values.minValue,
                    'name': values.name,
                    'paraType': values.paraType,
                    'price': values.price,
                    'unit': values.unit,
                    'threshold':values.threshold
                };

                if(values.unit == 'y_t_article' || values.unit == 'y_t_times' || values.unit == 't_times'){
                    formData.defaultValue *= 1000;
                    formData.minValue *= 1000;
                    formData.maxValue *= 1000;
                    formData.minBuyQuantity *= 1000;
                    formData.price *= 1000;
                    formData.threshold *= 1000;
                }

                if (param == null) {
                    addVersionPara(formData);
                } else {
                    updateVersionPara({
                        id: param,
                        data: formData
                    });
                }

                reset();

            }
        });
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        let {form, visible, reset, param} = this.props;

        const {getFieldDecorator,getFieldValue} = form;

        let footer = (
            <div>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button onClick={reset}>取消</Button>
            </div>
        );

        return (
            <div>
                <Modal title={param ? '修改参数配置' : '新建参数配置'}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Form layout="horizontal">
                        <FormItem
                            {...formItemLayout}
                            label="标识："
                            hasFeedback>
                            {
                                getFieldDecorator('mark', {
                                    rules: [{
                                        required: true,
                                        message: '请输入标识',
                                    }]
                                })(
                                    <Input disabled={param?true:false}
                                        style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
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
                            label="参数类型："
                            hasFeedback>
                            {
                                getFieldDecorator('paraType', {
                                    rules: [{
                                        required: true,
                                        message: '请选择参数类型',
                                    }]
                                })(
                                    <RadioGroup>
                                        <Radio value='numeric'>数字</Radio>
                                        <Radio value='bool'>布尔</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="默认值："
                            hasFeedback>
                            {
                                getFieldDecorator('defaultValue', {
                                    rules: [{
                                        required: true,
                                        message: '请输入默认值',
                                    }]
                                })(
                                    <Input style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
                        {
                             <div style={{'display':getFieldValue('paraType') == 'numeric' ?'block':'none'}}>
                                <FormItem
                                    {...formItemLayout}
                                    label="最小值："
                                    hasFeedback>
                                    {
                                        getFieldDecorator('minValue', {
                                            rules: [{
                                                type:'number',
                                                required: false,
                                                message: '请输入最小值',
                                            }]
                                        })(
                                            <InputNumber style={{'width': '50%'}}/>
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="最大值："
                                    hasFeedback>
                                    {
                                        getFieldDecorator('maxValue', {
                                            rules: [{
                                                type:'number',
                                                required: false,
                                                message: '请输入最大值',
                                            }]
                                        })(
                                            <InputNumber style={{'width': '50%'}}/>
                                        )
                                    }
                                </FormItem>
                            </div>
                        }

                        <FormItem
                            {...formItemLayout}
                            label="单位："
                            hasFeedback>
                            {
                                getFieldDecorator('unit', {
                                    rules: [{
                                        required: false,
                                        message: '请选择单位'
                                    }]
                                })(
                                    <Select>
                                        <Option value='day'>天</Option>
                                        <Option value='week'>周</Option>
                                        <Option value='month'>月</Option>
                                        <Option value='year'>年</Option>
                                        <Option value='sheet'>张</Option>
                                        <Option value='times'>次</Option>
                                        <Option value='t_times'>千次</Option>
                                        <Option value='y_t_times'>千次/年</Option>
                                        <Option value='discount'>折</Option>
                                        <Option value='individual'>个</Option>
                                        <Option value='y_t_article'>千篇/年</Option>
                                        <Option value='nounit'>无</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="允许购买："
                            hasFeedback>
                            {
                                getFieldDecorator('allowBuy', {
                                    rules: [{
                                        required: true,
                                        message: '请选择是否允许购买'
                                    }]
                                })(
                                    <RadioGroup>
                                        <Radio value="TRUE">是</Radio>
                                        <Radio value="FALSE">否</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="最少购买量："
                            hasFeedback>
                            {
                                getFieldDecorator('minBuyQuantity', {
                                    rules: [{
                                        type: 'number',
                                        required: false,
                                        message: '请输入最少购买量'
                                    }]
                                })(
                                    <InputNumber
                                        style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="刊例价格/乐豆："
                            hasFeedback>
                            {
                                getFieldDecorator('price', {
                                    rules: [{
                                        type: 'number',
                                        required: false,
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
                            label="预警阈值："
                            hasFeedback>
                            {
                                getFieldDecorator('threshold', {
                                    rules: [{
                                        type: 'number',
                                        required: false,
                                        message: '请输入预警阈值',

                                    }]
                                })(
                                    <InputNumber
                                        style={{'width': '50%'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述："
                            hasFeedback>
                            {
                                getFieldDecorator('desc', {
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

        /*let unitDict = {
            day: 1,
            week: 1,
            month: 1,
            year: 1,
            sheet: 1,
            times: 1,
            t_times: 1000,
            y_t_times: 1000,
            discount: 1,
            individual: 1,
            y_t_article: 1000,
            nounit: 1
        };*/

        if (data) {

            return {
                threshold:{
                    value:data.threshold
                },
                allowBuy: {
                    value: data.allowBuy
                },
                defaultValue: {
                    value: data.defaultValue
                },
                desc: {
                    value: data.desc
                },
                mark: {
                    value: data.mark
                },
                maxValue: {
                    value: data.maxValue
                },
                minBuyQuantity: {
                    value: data.minBuyQuantity
                },
                minValue: {
                    value: data.minValue
                },
                name: {
                    value: data.name
                },
                paraType: {
                    value: data.paraType
                },
                price: {
                    value: data.price
                },
                unit: {
                    value: data.unit
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

})(VersionConfigForm);
