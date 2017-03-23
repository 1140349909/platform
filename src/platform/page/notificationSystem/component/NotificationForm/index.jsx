import React, {Component} from 'react';
import {Modal, Form, Select, Button, Input, message} from 'antd';
import XUeditor from 'common/component/XUeditor';
const FormItem = Form.Item;
const Option = Select.Option;
const NOTIFICATION_FORM = 'notification_form_editor';
class NotificationForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        type: 'notification'
    }
    // 富文本编辑器启动
    componentDidMount() {
        if (this.props.viewData) {
            setEditorValue(NOTIFICATION_FORM, this.props.viewData.content);
        }
    }

    handleSubmit = () => {
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                //获取富文本编辑器的内容
                let content = getEditorValue(NOTIFICATION_FORM);
                if (content == '') {
                    message.error('内容不能为空！');
                    return null;
                }
                const {viewData, status} = this.props;
                values.content = content;
                if (status == 'edit') {
                    this.props.updateNotice(viewData.id, values);
                } else {
                    this.props.addNotice(values);
                }
            }
        });
    };

    render() {
        const {form, status} = this.props;
        const getFieldDecorator = form.getFieldDecorator;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 17},
        };

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
        selectOptions.map((item, index) => {
            selectList.push(
                <Option key={index} value={item.value}>{item.label}</Option>
            );
        });

        return (
            <div>
                <Modal title={status == 'edit' ? '模板编辑' : '模板新增'}
                       width="560px"
                       visible={this.props.visible}
                       footer={footer}
                       onCancel={this.props.reset}>
                    <Form layout="horizontal">
                        <FormItem {...formItemLayout} label="标识">
                            {
                                getFieldDecorator('mark', {
                                    rules: [{
                                        required: true,
                                        message: '请选择常见问题标识符'
                                    }]
                                })(
                                    <Input />
                                )
                            }
                        </FormItem>
                        <FormItem  {...formItemLayout} label="启用状态">
                            {
                                getFieldDecorator('contentStatus', {
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
                        <FormItem {...formItemLayout} label="通知标题">
                            {
                                getFieldDecorator('title', {
                                    rules: [{
                                        required: true,
                                        message: '请输入通知标题'
                                    }],
                                })(
                                    <Input />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="正文">
                            {
                                {/*<Editor id="notification_form_editor" height="300px" type='platform'/>*/}
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
    mapPropsToFields: function ({viewData}) {
        if (viewData) {
            return {
                contentStatus: {
                    value: viewData.contentStatus
                },
                mark: {
                    value: viewData.mark
                },
                title: {
                    value: viewData.title
                }
            };
        }
    },

})(NotificationForm);
