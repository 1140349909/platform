import React, {Component} from 'react';
import {Modal, Form, message, Select, Input} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as moduleAction from '../../../store/module/action';
import _ from 'lodash';
import {exists, tree2map} from 'common/util';


class ModuleForm extends Component {

    componentDidMount() {
        if (this.props.id) {
            this.props.actions.getPlatformModule(this.props.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case moduleAction.ADD_PLATFORM_MODULE_SUCCESS:
                message.success('保存成功!');
                this.props.onSaveSuccess('add');
                break;
            case moduleAction.UPDATE_PLATFORM_MODULE_SUCCESS:
                message.success('保存成功!');
                this.props.onSaveSuccess('update');
                break;
        }
    }

    handleSubmit = () => {

        const {form, data} = this.props;

        // 表单验证
        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                this.props.actions.savePlatformModule(_.merge({}, data, values));
            }
        });
    };

    render() {
        let {operation, id, form, visible, onReset} = this.props;

        const confirmLoading = operation.type == moduleAction.ADD_PLATFORM_MODULE_PENDING || operation.type == moduleAction.UPDATE_PLATFORM_MODULE_PENDING;

        const {getFieldDecorator} = form;

        const title = id ? '编辑功能' : '新增功能';

        // 表单布局
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 18},
        };


        //  {/*<Input disabled={!!id}/>*/}
        return (
            <Modal title={title}
                   width="560px"
                   confirmLoading={confirmLoading}
                   visible={visible}
                   onCancel={onReset}
                   onOk={this.handleSubmit}>
                <Form layout="horizontal">
                    <FormItem
                        {...formItemLayout}
                        label="功能标识"
                        help="功能标识要唯一,用于权限判断识别功能点"
                        hasFeedback>
                        {getFieldDecorator('key', {
                            rules: [{
                                message: '请输入功能标识',
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
                        label="功能名称"
                        hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入功能名称', min: 2, max: 32}]
                        })(
                            <Input />
                        )}
                    </FormItem>


                    <FormItem
                        {...formItemLayout}
                        label="业务角色"
                        hasFeedback>
                        {getFieldDecorator('roles', {
                            rules: [{required: true, message: '请输入业务角色', min: 4, max: 64}]
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Method"
                        help="用于Api权限校验">
                        {getFieldDecorator('method', {
                            initialValue: 'GET'
                        })(
                            <Select style={{width: '80px'}}>
                                <Option value="GET">GET</Option>
                                <Option value="POST">POST</Option>
                                <Option value="PUT">PUT</Option>
                                <Option value="DELETE">DELETE</Option>
                            </Select>
                        )
                        }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="URI"
                        help="用于Api权限校验">
                        {getFieldDecorator('uri', {
                            rules: [{required: true, message: '请输入Api路径'}],
                        })(
                            <Input type="textarea" autosize={{minRows: 2, maxRows: 20}}/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="功能描述"
                        hasFeedback>
                        {getFieldDecorator('desc', {
                            rules: [{message: '功能描述不能超过64个字', max: 64}]
                        })(
                            <Input type="textarea" autosize={{minRows: 2, maxRows: 20}}/>
                        )}
                    </FormItem>


                    <FormItem
                        {...formItemLayout}
                        label="负责人"
                        help="负责人">
                        {getFieldDecorator('page', {
                            rules: [{message: 'Page不能超过64个字', max: 64}],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    {/*<FormItem*/}
                    {/*{...formItemLayout}*/}
                    {/*label="Action"*/}
                    {/*help="预留Action拓展">*/}
                    {/*{getFieldDecorator('action', {*/}
                    {/*rules: [{message: 'Action不能超过64个字', max: 64}],*/}
                    {/*})(*/}
                    {/*<Input />*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
                </Form>
            </Modal>
        );
    }
}

// 默认值
const DEFAULT_FIELDS_VALUE = {};

function convertFormDataToFields(data, defaultFields) {
    let fields = tree2map(data, (key, val) => {

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

ModuleForm = Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function ({data}) {
        return convertFormDataToFields(data, DEFAULT_FIELDS_VALUE);
    }
})(ModuleForm);

ModuleForm = connect(
    state => ({
        operation: state.operation,
        data: state.module.toJS().item
    }),
    dispatch => ({
        actions: bindActionCreators({
            getPlatformModule: moduleAction.getPlatformModule,
            savePlatformModule: moduleAction.savePlatformModule
        }, dispatch)
    })
)(ModuleForm);

export default ModuleForm;
