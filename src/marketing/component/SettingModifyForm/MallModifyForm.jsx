import React, {Component} from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
} from 'antd';
// import {REGEX} from 'common/util/validator';
import './index.less';
const FormItem = Form.Item;

// 平台设置-修改弹出层表单
class SettingMallModifyForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmitClick = (e) => {
        this.props.form.validateFields((errors) => {
            if (errors) {
                return;
            }
            this.props.mallModify(this.handleSubmit(e));
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const fieldsValue = this.props.form.getFieldsValue();

        let data = {
            name: this.props.data.name || '',
            contact: this.props.data.contact || {},
            share: this.props.data.share || {}
        };

        switch (this.props.currentData.type) {

            case 'name':
                data.name = fieldsValue.name;
                break;

            case 'contactName':
                data.contact.name = fieldsValue.contactName;
                break;

            case 'contactMobile':
                data.contact.mobile = fieldsValue.mobile;
                break;

            case 'shareTitle':
                data.share.title = fieldsValue.shareTitle;
                break;

            case 'shareDesc':
                data.share.desc = fieldsValue.shareDesc;
                break;
        }

        return data;

    };

    render() {

        // 获取表单相关API
        const {getFieldDecorator} = this.props.form;

        const nameProps = getFieldDecorator('name');

        const contactNameProps = getFieldDecorator('contactName');

        const mobileProps = getFieldDecorator('mobile', {
            rules: [{
                pattern: /^(13|15|18|17)[0-9]{9}$/, message: '请输入格式正确的手机号码'
            }],
        });

        const shareTitleProps = getFieldDecorator('shareTitle');

        const shareDescProps = getFieldDecorator('shareDesc');

        const visible = this.props.type === 'showMallModify';


        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 14}
        };

        if (this.props.type === 'showMallModify') {
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
                            onClick={this.handleSubmitClick.bind(this)}>
                            提 交</Button>,]}>
                    <Form layout="horizontal" onSubmit={this.handleSubmitClick.bind(this)}>

                        { type == 'name' &&
                        <FormItem
                            label={title}
                            {...formItemLayout}>
                            {nameProps(
                                <Input
                                    type="text"/>
                            )}
                        </FormItem>
                        }

                        { type == 'contactName' &&
                        <FormItem
                            label={title}
                            {...formItemLayout}>
                            {contactNameProps(
                                <Input
                                    type="text"/>
                            )}
                        </FormItem>
                        }

                        { type == 'contactMobile' &&
                        <FormItem
                            label={title}
                            {...formItemLayout}>
                            {mobileProps(
                                <Input
                                    type="text"/>
                            )}
                        </FormItem>
                        }

                        { type == 'shareTitle' &&
                        <FormItem
                            label={title}
                            {...formItemLayout}>
                            {shareTitleProps(
                                <Input
                                    type="text"/>
                            )}
                        </FormItem>
                        }

                        { type == 'shareDesc' &&
                        <FormItem
                            label={title}
                            {...formItemLayout}>
                            {shareDescProps(
                                <Input
                                    type="textarea"
                                    rows={4}/>
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

        let {currentData, type} = props;

        if (type == 'showMallModify') {

            switch (currentData.type) {

                case 'name':
                    return {
                        name: {
                            value: currentData.value
                        }
                    };

                case 'contactName':
                    return {
                        contactName: {
                            value: currentData.value
                        }
                    };

                case 'contactMobile':
                    return {
                        mobile: {
                            value: currentData.value
                        }
                    };

                case 'shareTitle':
                    return {
                        shareTitle: {
                            value: currentData.value
                        }
                    };

                case 'shareDesc':
                    return {
                        shareDesc: {
                            value: currentData.value
                        }
                    };
            }
        } else {
            return {};
        }
    },
})(SettingMallModifyForm);
