import React, {Component} from 'react';
import {Modal, Form, Select, Button, Input, InputNumber} from 'antd';
import {PLATFORM_TYPE} from 'common/config/constants';
const FormItem = Form.Item;
const Option = Select.Option;

class CategoryForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platform: props.platform,
            resType: props.resType,
            sort: props.sort
        };
    }

    handleSubmit = (e)=> {

        const {form, addMediaType, updateMediaType, param} = this.props;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                const formData = {
                    'code': values.code,
                    'name': values.name,
                    'seq': values.seq,
                    'platform': values.platform,
                };

                // 验证

                if (param == null) {
                    addMediaType(formData);
                } else {
                    updateMediaType(param, formData);
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

        let platformList = {
            'iloka': '艾乐卡',
            'buy': '交易平台',
            'platform': '平台管理系统',
            'cms': '内容直通车',
            'vveshow': '移动微秀场',
            'projects': '项目',
            'interact': '互动平台',
        };

        // 构建options
        let platformOptionsList = [];

        for (let i in PLATFORM_TYPE) {
            if (PLATFORM_TYPE.hasOwnProperty(i)) {
                platformOptionsList.push(
                    <Option value={PLATFORM_TYPE[i]} key={PLATFORM_TYPE[i]}
                            disabled={PLATFORM_TYPE[i] != 'iloka'}
                    >{platformList[PLATFORM_TYPE[i]]}</Option>
                );
            }
        }

        let footer = (
            <div>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button onClick={reset}>取消</Button>
            </div>
        );

        return (
            <div>
                <Modal title={param ? '修改素材分类' : '新建素材分类'}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Form layout="horizontal">
                        <FormItem
                            {...formItemLayout}
                            label="上传后台类型："
                            help="请选择上传后台类型"
                            hasFeedback>
                            {
                                getFieldDecorator('platform', {
                                    initialValue: 'iloka',
                                    rules: [{
                                        required: true,
                                        message: '请选择上传后台类型'
                                    }]
                                })(
                                    <Select placeholder="请选择上传后台类型" style={{width: '50%'}}>
                                        {platformOptionsList}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="媒体分类代码："
                            help="请输入媒体分类代码"
                            hasFeedback>
                            {
                                getFieldDecorator('code', {
                                    rules: [{
                                        required: true,
                                        message: '请输入媒体分类代码'
                                    }]
                                })(
                                    <Input style={{width: '50%'}}/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="媒体分类名称："
                            help="请输入媒体分类名称"
                            hasFeedback>
                            {
                                getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入媒体分类名称'
                                    }]
                                })(
                                    <Input style={{width: '50%'}}/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="自定义排序："
                            help="请输入自定义排序值，最小值为0"
                            hasFeedback>
                            {
                                getFieldDecorator('seq', {
                                    rules: [{
                                        type: 'number',
                                        min: 0,
                                        required: true,
                                        message: '请输入自定义排序值，最小值为0'
                                    }]
                                })(
                                    <InputNumber min={0}/>
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

        if (data) {
            return {
                platform: {
                    value: data.platform ? data.platform : 'iloka'
                },
                code: {
                    value: data.code ? data.code : ''
                },
                name: {
                    value: data.name ? data.name : ''
                },
                seq: {
                    value: data.seq ? data.seq : 0
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

})(CategoryForm);
