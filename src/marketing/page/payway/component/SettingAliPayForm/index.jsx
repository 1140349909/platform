import React, {Component} from 'react';
import {Button, Modal, Form, Input} from 'antd';
import _ from 'lodash';
import './index.less';
import {trim} from 'common/util';
import {withRouter} from 'react-router';
const FormItem = Form.Item;

@withRouter


// 平台设置-修改弹出层表单
class SettingAliPayForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmitClick = () => {
        this.props.form.validateFields((errors) => {
            if (errors) {
                return;
            }
            this.props.updateAliPay(this.handleSubmit());
        });
    };

    handleSubmit = () => {

        const fieldsValue = this.props.form.getFieldsValue();

        return {
            name:trim(fieldsValue.name),
            account: trim(fieldsValue.account),
            key: trim(fieldsValue.key),
            pid: trim(fieldsValue.pid),
            useSys: false,
            enable: true,
        };
    };

    handelHelp = () => {
        this.props.router.replace('/help/detail/58760f38a6dc365ba83f0ea6');
    }

    handleUpload=(info)=>{
        if (info.file.status !== 'uploading') {
            // console.log(info.file);
            // console.log(info.fileList);
        }
    };

    normFile=(e)=> {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {

        // 获取表单相关API
        const { getFieldDecorator } = this.props.form;

        const visible = this.props.type === 'showAliPay';

        const pidProps = getFieldDecorator('pid', {
            rules: [
                {required: true, message: '必填项'},
            ],
        });

        const keyProps = getFieldDecorator('key', {
            rules: [
                {required: true, message: '必填项'},
            ],
        });

        const accountProps = getFieldDecorator('account', {
            rules: [
                {required: true, message: '必填项'},
            ],
        });

        const nameProps = getFieldDecorator('name', {
            rules: [
                {required: true, message: '必填项'},
            ],
        });

        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };

        return (
            <Modal
                title='支付宝设置'
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
                        提 交</Button>]}>

                     <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem
                            label="合作身份者ID："
                            {...formItemLayout}>
                            {pidProps(
                                <Input type="text"
                                   placeholder="请输入合作身份者ID"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="交易安全检验码："
                            {...formItemLayout}>
                            {keyProps(
                                <Input type="text"
                                    placeholder="请输入交易安全检验码"/>
                            )}
                        </FormItem>

                        <FormItem
                            label="商家支付宝账号："
                            {...formItemLayout}>
                            {accountProps(
                                <Input type="text"
                                    placeholder="请输入商家支付宝账号"/>
                            )}

                        </FormItem>
                         <FormItem
                             label="商家支付宝名称："
                             {...formItemLayout}>
                             {nameProps(
                                <Input type="text"
                                    placeholder="请输入商家支付宝名称"/>
                             )}
                         </FormItem>
                        <a href="javascript:;" onClick={this.handelHelp}>如何查找相关资料？</a>
                    </Form>

            </Modal>
        );
    }
}

export default Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        let { data } = props;
        if (_.has(data, 'aliPay')) {
            return {
                pid: {
                    value: data.aliPay.pid
                },
                key: {
                    value: data.aliPay.key
                },
                account: {
                    value: data.aliPay.account
                },
                name: {
                    value: data.aliPay.name
                }
            };
        } else {
            return {};
        }

    },
})(SettingAliPayForm);





