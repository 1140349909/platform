import React, { Component } from 'react';
import {
    Icon,
    Button,
    Modal,
    Form,
    Input,
    Upload,
} from 'antd';
import * as media from 'common/util/media';
import _ from 'lodash';
import {trim} from 'common/util';
import './index.less';

const FormItem = Form.Item;

// 平台设置-修改弹出层表单
class SettingWechatForm extends Component {

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
        return {
            appid: trim(fieldsValue.appid),
            secret: trim(fieldsValue.secret),
            muchId: trim(fieldsValue.muchId),
            muchKey: trim(fieldsValue.muchKey),
            useSys: false,
            enable: true,
        };
    }

    normFile=(e)=> {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {

        const uploadWechatCertUrl = media.getUploadCertUrl('wechat');

         // 获取表单相关API
        const { getFieldDecorator} = this.props.form;

        const visible = this.props.type === 'showWechat' ? true: false;

        const appidProps = getFieldDecorator('appid', {
            rules: [
                {
                    required: true,
                    type: 'string',
                    max: 18,
                    message: '微信公众号Id长度一般为18个字符'
                },
            ],
        });

        const secretProps = getFieldDecorator('secret', {
            rules: [
                {
                    required: true,
                    type: 'string',
                    max: 32,
                    message: '微信公众号Secret长度一般为32个字符'
                },
            ],
        });

        const muchIdProps = getFieldDecorator('muchId', {
            rules: [
                {
                    required: true,
                    type: 'string',
                    max: 10,
                    message: '微信商城Id长度一般为10个字符'
                },
            ],
        });

        const muchKeyProps = getFieldDecorator('muchKey', {
            rules: [
                {
                    required: true,
                    type: 'string',
                    max: 32,
                    message: '微信商城App密钥长度一般为32个字符'
                },
            ],
        });

        const formItemLayout = {
            labelCol: {span: 7 },
            wrapperCol: {span: 14},
        };

        return (
            <Modal
                title='微信设置'
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

                <Form layout="horizontal">
                    <FormItem
                        label="appid："
                        {...formItemLayout}>
                        {appidProps(
                            <Input id="waybill" type="text"
                                placeholder="请输入appid"/>
                        )}

                    </FormItem>
                    <FormItem
                        label="app secret："
                        {...formItemLayout}>
                        {secretProps(
                            <Input id="waybill" type="text"
                                placeholder="请输入app secret"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="商城id mch_id："
                        {...formItemLayout}>
                        {muchIdProps(
                            <Input id="waybill" type="text"
                                placeholder="请输入商城id mch_id"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="商城密钥 mch_secret："
                        {...formItemLayout}>
                        {muchKeyProps(
                            <Input id="waybill" type="text"
                                   placeholder="请输入商城密钥 mch_secret"/>
                        )}
                    </FormItem>
                    {/*需要增加支付证书上传*/}
                    <FormItem
                        label="商城证书 p12："
                        help="文件名为apiclient_cert.p12，从微信商城下载获取"
                        {...formItemLayout}>
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            normalize: this.normFile,
                        })(
                            <Upload name="media"
                                    action={uploadWechatCertUrl}>
                                <Button type="ghost">
                                    <Icon type="upload"/> 点击上传
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        let { data } = props;
        if (_.has(data, 'weChat')) {
            return {
                appid: {
                    value: data.weChat.appid
                },
                secret: {
                    value: data.weChat.secret
                },
                muchId: {
                    value: data.weChat.muchId
                },
                muchKey: {
                    value: data.weChat.muchKey
                }
            };
        } else {
            return {};
        }
    },
})(SettingWechatForm);
