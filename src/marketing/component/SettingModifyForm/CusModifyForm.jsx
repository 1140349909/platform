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
class SettingCusModifyForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmitClick = () => {
        this.props.form.validateFields((errors) => {
            if (errors) {
                return;
            }
            this.props.cusModify(this.handleSubmit());
        });
    }

    handleSubmit = () => {

        const fieldsValue = this.props.form.getFieldsValue();

        let data = {
            cusMobile: this.props.data.cusMobile || '',
        };

        switch (this.props.currentData.type) {

            case 'serviceMobile':
                data.cusMobile = fieldsValue.serviceMobile;
                break;
        }

        return data;

    }

    render() {

        // 获取表单相关API
        const { getFieldDecorator} = this.props.form;

        const serviceMobileProps = getFieldDecorator('serviceMobile', {
            rules: [{
                pattern: /^(13|15|18|17)[0-9]{9}$/, message: '请输入格式正确的手机号码'
            }],
        });


        const visible = this.props.type === 'showCusModify' ? true: false;


        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };

        if(this.props.type === 'showCusModify') {
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

                            { type == 'serviceMobile' &&
                                <FormItem
                                    label={title}
                                    {...formItemLayout}>
                                    {serviceMobileProps(
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

        let { currentData, type} = props;

        if (type == 'showCusModify') {

            switch (currentData.type) {
                case 'serviceMobile':
                    return {
                        serviceMobile: {
                            value: currentData.value
                        }
                    };
            }
        } else {
            return {};
        }
    },
})(SettingCusModifyForm);
