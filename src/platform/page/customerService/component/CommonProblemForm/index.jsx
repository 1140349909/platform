import React, {Component} from 'react';
import {Modal, Form, Select, Button, Input, message} from 'antd';
import {Editor, getEditorValue, setEditorValue} from 'common/component/UEditor';
const FormItem = Form.Item;
const Option = Select.Option;
const COMMUNITY_FORM = 'community_form_editor';
class CommonProblemForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        type: '',
        tagSeq: ''
    }
    // 富文本编辑器启动
    componentDidMount() {
        if (this.props.data.viewData) {
            setEditorValue(COMMUNITY_FORM, this.props.data.viewData.content);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                //获取富文本编辑器的内容
                let content = getEditorValue(COMMUNITY_FORM);
                if (content == '') {
                    message.error('内容不能为空！');
                    return null;
                }
                const {status, viewData} = this.props.data;
                const problem = {
                    keyword: values.keyword,
                    mark: values.mark,
                    title: values.title,
                    tags: values.tags,
                    content: content,
                    contentStatus: values.contentStatus
                };
                if (status == 'add') {
                    this.props.addHelpProblem(problem);
                } else {
                    this.props.updateHelpInfo(viewData.id, problem);
                }
            }
        });
    };
    onChange = (value) => {
        this.setState({
            type: value[0],
            tagSeq: value[1]
        });
    }


    render() {

        const {viewData, status} = this.props.data;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 17},
        };
        const {getFieldDecorator} = this.props.form;
        let footer = (
            <div>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button onClick={this.props.reset}>取消</Button>
            </div>
        );
        let selectOptions = [
            {label: '未启用', value: 'edit'},
            {label: '已启用', value: 'published'},
        ];

        let selectList = [];

        selectOptions.map((item) => {
            selectList.push(
                <Option key={item.value} value={item.value}
                        selected={viewData.status == item.value ? 'selected' : ''}>{item.label}</Option>
            );
        });

        let tagArray = [];
        const tagList = this.props.tagList;
        tagList && tagList.map((item) => {
            tagArray.push(
                <Option key={item.id} value={item.name}>{item.name}</Option>
            );
        });
        return (
            <div>
                <Modal title={status == 'add' ? '新增常见问题' : '修改常见问题'}
                       width="1000px"
                       visible={this.props.visible}
                       footer={footer}
                       onCancel={this.props.reset}>
                    <Form layout="horizontal">
                        <FormItem {...formItemLayout} label="标识">
                            {
                                getFieldDecorator('mark', {
                                    rules: [{
                                        required: true,
                                        message: '请填写常见问题标识符'
                                    }, {
                                        min: 1,
                                        max: 50,
                                        message: '请输入1-50个字符'
                                    }]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem {...formItemLayout} label="标题分类">
                            {
                                getFieldDecorator('tags', {
                                    rules: [{
                                        required: true,
                                        message: '请选择标题分类'
                                    }]
                                })(
                                    <Select placeholder="请选择">
                                        {tagArray}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="标题">
                            {
                                getFieldDecorator('title', {
                                    rules: [{
                                        required: true,
                                        message: '请输入标题'
                                    }, {
                                        min: 1,
                                        max: 50,
                                        message: '请输入1-50个字符'
                                    }]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="关键词">
                            {
                                getFieldDecorator('keyword', {
                                    rules: [{
                                        required: true,
                                        message: '以分号,逗号或者空格分隔'
                                    }, {
                                        min: 1,
                                        max: 100,
                                        message: '请输入1-100个字符'
                                    }]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem  {...formItemLayout} label="启用状态">
                            {
                                getFieldDecorator('contentStatus', {
                                    initialValue: viewData.tag,
                                    rules: [{
                                        required: true,
                                        message: '请选择启用状态'
                                    }]
                                })(
                                    <Select placeholder="请选择">
                                        {selectList}
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="正文">
                            {
                                <Editor id="community_form_editor" height="600px" type="platform"/>
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
        const {viewData} = props.data;
        if (viewData) {
            return {
                mark: {
                    value: viewData.mark
                },
                title: {
                    value: viewData.title
                },
                contentStatus: {
                    value: viewData.contentStatus
                },
                keyword: {
                    value: viewData.keyword
                },
                tags: {
                    value: viewData.tags && viewData.tags[0]
                }
            };
        } else {
            return {};
        }
    },
})(CommonProblemForm);
