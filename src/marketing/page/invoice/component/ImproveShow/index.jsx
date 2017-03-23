import React, {Component} from 'react';
import {Form, Modal, Input} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

class ImproveShow extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        visible: false
    };

    handleSubmit = ()=> {

        // const value = this.props.form.getFieldsValue();

    };

    handleCancel = (data)=> {
        data.enable = false;
        this.setState({
            visible: false
        });
    };

    render() {

        let {data, type} = this.props;

        if (!data) {
            return null;
        }

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };

        let title, config;

        let visible = data.enable;

        switch (type) {
            case 'wechat':

                title = '微信支付配置';

                config = (
                    <div>
                        <FormItem
                            label="微信公众号Id："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('appid', {
                                    rules: [
                                        {
                                            required: true,
                                            type: 'string',
                                            max: 18,
                                            message: '微信公众号Id长度一般为18个字符'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           style={{'width': '353px'}}
                                           placeholder="输入微信公众号AppId，长度一般为18个字符"/>
                                )
                            }

                        </FormItem>
                        <FormItem
                            label="微信公众号AppSecret："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('secret', {
                                    rules: [
                                        {
                                            required: true,
                                            type: 'string',
                                            max: 32,
                                            message: '微信公众号AppSecret长度一般为32个字符'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           style={{'width': '353px'}}
                                           placeholder="输入微信公众号AppSecret，长度一般为32个字符"/>
                                )
                            }

                        </FormItem>
                        <FormItem
                            label="微信商城Id："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('muchId', {
                                    rules: [
                                        {
                                            required: true,
                                            type: 'string',
                                            max: 10,
                                            message: '微信商城Id长度一般为10个字符'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           style={{'width': '353px'}}
                                           placeholder="输入微信商城Id，长度一般为10个字符"/>
                                )
                            }

                        </FormItem>
                        <FormItem
                            label="微信商城App密钥："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('muchKey', {
                                    rules: [
                                        {
                                            required: true,
                                            type: 'string',
                                            max: 32,
                                            message: '微信商城App密钥长度一般为32个字符'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           style={{'width': '353px'}}
                                           placeholder="输入微信商城App密钥，长度一般为32个字符"/>
                                )
                            }

                        </FormItem>
                    </div>
                );


                break;
            case 'alipay':

                title = '支付宝支付配置';

                config = (
                    <div>
                        <FormItem
                            label="支付宝账号："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('account', {
                                    rules: [
                                        {
                                            required: true,
                                            type: 'string',
                                            message: '请输入支付宝账号'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           style={{'width': '353px'}}
                                           placeholder="请输入支付宝账号"/>
                                )
                            }

                        </FormItem>
                        <FormItem
                            label="交易安全检验码："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('key', {
                                    rules: [
                                        {
                                            required: true,
                                            type: 'string',
                                            message: '请输入交易安全检验码'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           style={{'width': '353px'}}
                                           placeholder="请输入交易安全检验码"/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            label="合作者Id："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('pid', {
                                    rules: [
                                        {
                                            required: true,
                                            type: 'string',
                                            message: '请输入合作者Id'
                                        }
                                    ]
                                })(
                                    <Input type="text"
                                           style={{'width': '353px'}}
                                           placeholder="请输入合作者Id"/>
                                )
                            }

                        </FormItem>
                    </div>
                );
                break;
        }

        return (
            <div>
                <Modal width="960"
                       title={title}
                       visible={visible}
                       onOk={this.handleSubmit}
                       onCancel={()=>this.handleCancel(data)}>

                    <Form layout="horizontal">

                        {config}

                    </Form>

                </Modal>
            </div>
        );
    }
}

export default createForm({

    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {

        const {data, type} = props;

        if (data) {

            switch (type) {
                case 'wechat':

                    return {
                        appid: {
                            value: data.appid
                        },
                        muchId: {
                            value: data.muchId
                        },
                        muchKey: {
                            value: data.muchKey
                        },
                        secret: {
                            value: data.secret
                        }
                    };
                case 'alipay':
                    return {
                        account: {
                            value: data.account
                        },
                        key: {
                            value: data.key
                        },
                        pid: {
                            value: data.pid
                        }
                    };
            }

        } else {
            return {};
        }
    }
    /*,
     当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
     onFieldsChange: function (props, fields) {
     // const keys = Object.keys(fields);
     }
     */

})(ImproveShow);

