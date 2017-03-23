import React, {Component} from 'react';
import {Modal, Form, Select, Button, Input, InputNumber} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class TagForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tagType: props.tagType,
            sort: props.sort
        };
    }

    handleSubmit = (e)=> {

        const {form, addTags, updateTagName, param} = this.props;

        e.preventDefault();

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                let formData = {

                };

                this.setState({
                    tagType: values.tagType
                });

                if (param == null) {

                    let tagsList = [];

                    values.tags.map((item, index)=> {
                        tagsList.push({
                            name: item,
                            seq: index
                        });
                    });

                    formData = {
                        'name': values.name,
                        'seq': values.seq,
                        'tagType': values.tagType,
                        'tags': tagsList
                    };

                    addTags(formData);
                } else {

                    formData = {
                        'newName': values.newName,
                        'oldName': values.oldName,
                        'level':values.level
                    };

                    updateTagName(param, formData);
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

        const children = [];

        return (
            <div>
                <Modal title={param ? '修改标签' : '新建标签'}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    {!param && <Form layout="horizontal">
                        <FormItem
                            {...formItemLayout}
                            label="名称："
                            help="请输入名称"
                            hasFeedback>
                            {
                                getFieldDecorator('name', {
                                    initialValue: '',
                                    rules: [{
                                        required: true,
                                        message: '请输入名称'
                                    }]
                                })(
                                    <Input  style={{'width':'50%'}}/>
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
                        <FormItem
                            {...formItemLayout}
                            label='类型'
                            hasFeedback
                            help='请选择类型'>
                            {getFieldDecorator('tagType', {
                                rules: [
                                    {required: true, message: '请选择类型'},
                                ],
                            })(
                                <Select style={{'width':'50%'}}>
                                    <Option value='app'>应用</Option>
                                    <Option value='h5Tpl'>h5模板</Option>
                                    <Option value='material'>素材</Option>
                                    <Option value='help'>帮助</Option>
                                    <Option value='module'>模块</Option>
                                    <Option value='contentTpl'>资讯模板</Option>
                                    <Option value='hotArticle'>热门文章</Option>
                                    <Option value='depthView'>深度观点</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='标签'
                            hasFeedback
                            help='请输入标签，按回车确定'>
                            {getFieldDecorator('tags', {
                                rules: [
                                    {
                                        required: true,
                                        type: 'array',
                                        min: 1,
                                        message: '至少输入一组标签'
                                    }
                                ]
                            })(
                                <Select
                                    style={{'width':'50%'}}
                                    tags
                                    searchPlaceholder='标签模式'>
                                    {children}
                                </Select>
                            )}
                        </FormItem>
                    </Form>}
                    {param && <Form>
                        <FormItem
                            {...formItemLayout}
                            label="旧名称："
                            hasFeedback>
                            {
                                getFieldDecorator('oldName', {})(
                                    <Input disabled style={{'width':'50%'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="新名称："
                            hasFeedback>
                            {
                                getFieldDecorator('newName', {})(
                                    <Input style={{'width':'50%'}}/>
                                )
                            }
                        </FormItem>
                        {
                            getFieldDecorator('level',{

                            })(
                                <Input type="hidden"/>
                            )
                        }
                    </Form>}
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

            let tagList = [];

            if (data.tags) {

                data.tags.map((item)=> {
                    tagList.push(item.name);
                });
                return {
                    tagType: {
                        value: data.tagType ? data.tagType : 'app'
                    },
                    tags: {
                        value: tagList
                    },
                    name: {
                        value: data.name ? data.name : ''
                    },
                    seq: {
                        value: data.seq ? data.seq : 0
                    }
                };
            }else{
                return {
                    oldName: {
                        value: data.oldName ? data.oldName : ''
                    },
                    newName: {
                        value: data.newName ? data.newName : ''
                    },
                    level:{
                        value:data.level
                    }
                };
            }


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

})(TagForm);
