import React, {Component} from 'react';
import {Modal, Form, message, InputNumber, Input} from 'antd';
const FormItem = Form.Item;
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tagAction from '../../../store/tag/action';
import _ from 'lodash';
import {exists, tree2map} from 'common/util';


class ConfigForm extends Component {


    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case tagAction.UPDATE_TAG_SUCCESS:
            case tagAction.ADD_TAG_SUCCESS:
                message.success('保存成功!');
                this.props.onSaveSuccess();
                break;
        }
    }


    handleSubmit = ()=> {
        const {form, rootTagId, parentId, tagId} = this.props;

        // 表单验证
        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                if (tagId) {
                    values.tagId = tagId;

                    // // 特殊处理
                    // if (item.key == data.key) {
                    //     delete item.key;
                    // }
                    //
                    // // 特殊处理
                    // if (item.name == data.name) {
                    //     delete item.name;
                    // }

                    this.props.actions.updateTag(rootTagId, values);
                } else {
                    values.key = _.trim(values.key.toUpperCase());
                    this.props.actions.addTag(rootTagId, parentId, values);
                }
            }
        });
    };
    // onSaveSuccess

    render() {
        let {operation, form, visible, onReset, tagId} = this.props;

        const {getFieldDecorator} = form;

        const title = tagId ? '编辑菜单' : '新增菜单';


        const confirmLoading = operation.type == tagAction.ADD_TAG_PENDING || operation.type == tagAction.UPDATE_TAG_PENDING;

        // 表单布局
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 18},
        };

        // <Input disabled={!!tagId}/>

        return (
            <Modal title={title}
                   width="560px"
                   confirmLoading={confirmLoading}
                   visible={visible}
                   onCancel={onReset}
                   onOk={this.handleSubmit}>
                <Form layout="horizontal" onSubmit={(e)=> {
                    e.preventDefault();
                }}>
                    <FormItem
                        {...formItemLayout}
                        label="菜单名称"
                        hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: '请输入菜单名称',
                                min: 2,
                                max: 32
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="菜单标识"
                        help="功能标识要唯一,用于权限判断识别菜单,只允许有大写英文和下划线"
                        hasFeedback>
                        {getFieldDecorator('key', {
                            rules: [{
                                required: true,
                                type: 'string',
                                pattern: /^[A-Z_0-9]+$/,
                                min: 2,
                                max: 64
                            }]
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Icon标识"
                        help="菜单对应的链接,可以为空">
                        {getFieldDecorator('icon')(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="URI"
                        help="菜单对应的链接,可以为空">
                        {getFieldDecorator('uri', {
                            rules: [{message: '请输入链接地址'}],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="排序"
                        hasFeedback>
                        {getFieldDecorator('seq')(
                            <InputNumber min={0} max={10000}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

// 默认值
const DEFAULT_FIELDS_VALUE = {};

function convertFormDataToFields(data, defaultFields) {
    let fields = tree2map(data, (key, val)=> {

        // 默认值
        let value = exists(val) ? val : defaultFields[key];

        if (_.isArray(value)) {
            value = value.join(',');
        }

        return {
            value: value
        };
    });

    return fields;
}

ConfigForm = Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function ({data}) {
        return convertFormDataToFields(data, DEFAULT_FIELDS_VALUE);
    }
})(ConfigForm);


ConfigForm = connect(
    state => ({
        operation: state.operation,
        tag: state.tag.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            getTag: tagAction.getTag,
            addTag: tagAction.addTag,
            updateTag: tagAction.updateTag,
        }, dispatch)
    })
)(ConfigForm);

export default ConfigForm;
