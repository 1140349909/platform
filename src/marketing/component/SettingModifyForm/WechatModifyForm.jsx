import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
import './index.less';

const FormItem = Form.Item;

// 平台设置-修改弹出层表单
class SettingWechatModifyForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmitClick = () => {
        this.props.form.validateFields((errors) => {
            if (errors) {
                return;
            }
            this.props.updateWechat(this.handleSubmit());
        });
    }

    handleSubmit = () => {

        const fieldsValue = this.props.form.getFieldsValue();

        let data = {};

        switch (this.props.currentData.type) {

            case 'publicName':
                data.name = fieldsValue.publicName;
                break;
        }
        return data;
    }

    render() {


        // 获取表单相关API
        const { getFieldDecorator} = this.props.form;

        const publicNameProps = getFieldDecorator('publicName');

        const visible = this.props.type === 'showCustomerModify' ? true: false;

        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };

        if(this.props.type === 'showCustomerModify') {
            const {
                type,
                title,
            } = this.props.currentData;

            return (
                <Modal
                    title='详情设置修改'
                    visible={visible}
                    onCancel={this.props.reset}
                    footer={[
                        <Button
                            key="back"
                            type="ghost"
                            size="large"
                            onClick={this.props.reset}>
                            返 回</Button>,

                        <Button
                            key="submit"
                            type="primary"
                            size="large"
                            onClick={this.handleSubmitClick}>
                            提 交</Button>,]}>
                        <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>

                            { type == 'publicName' &&
                                <FormItem
                                    label={title}
                                    {...formItemLayout}>
                                    {publicNameProps(
                                        <Input
                                            type="text"/>
                                    )}
                                </FormItem>
                            }
                        </Form>
                </Modal>
            );
        } else {
            return null;
        }
    }
}


export default Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        let { currentData, type } = props;

        if (type == 'showCustomerModify') {

            switch (currentData.type) {
                case 'publicName':
                    return {
                        publicName: {
                            value: currentData.value
                        }
                    };
            }
        } else {
            return {};
        }
    },
})(SettingWechatModifyForm);
