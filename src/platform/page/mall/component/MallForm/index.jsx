import React, {Component} from 'react';
import {Modal, Form, Input, Radio, Checkbox} from 'antd';
import {parseBoolean, booleanToString} from 'common/util';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class MallForm extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = ()=> {
        const fields = this.props.form.getFieldsValue();
        const data = {
            'id': fields['id'],
            'uin': fields['uin'],
            'name': fields['name'],
            'password': fields['password'],
            'userName': fields['userName'],
            'contact': {
                'name': fields['contactName'],
                'email': fields['contactEmail'],
                'mobile': fields['contactMobile']
            },
            'mallAuth': {
                'mallOpMode': fields['mallAuthMallOpMode'],
                'brandAuth': booleanToString(fields['mallAuthBrandAuth'], 'upper'),
                'partnerAuth': booleanToString(fields['mallAuthPartnerAuth'], 'upper'),
                'contentAuth': booleanToString(fields['mallAuthContentAuth'], 'upper'),
                'mallAuth': booleanToString(fields['mallAuthMallAuth'], 'upper'),
                'yygAuth': booleanToString(fields['mallAuthYygAuth'], 'upper'),

            }
        };

        // TODO:验证

        this.props.save(data);
        this.props.reset();
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 12},
        };

        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Modal title="商城录入"
                       width="560px"
                       visible={this.props.visible}
                       onOk={this.handleSubmit}
                       onCancel={this.props.reset.bind(this)}>
                    <Form layout="horizontal">
                        {
                            getFieldDecorator('id',{

                            })(
                                <Input type="hidden"/>
                            )
                        }
                        <FormItem
                            {...formItemLayout}
                            label="客户编号：">
                            {
                                getFieldDecorator('uin',{

                                })(
                                    <Input type="text"/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="客户名称："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('name',{

                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="联系人："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('contactName',{

                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="联系电话："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('contactMobile',{

                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="联系邮箱："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('contactEmail',{

                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="登陆账号："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{

                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="原始密码："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('password',{

                                })(
                                    <Input type="password"/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="商城运营方式："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('mallAuthMallOpMode',{
                                    initialValue:'S'
                                })(
                                    <RadioGroup>
                                        <Radio value="S">单商城运营</Radio>
                                        <Radio value="M">多商城运营</Radio>
                                    </RadioGroup>
                                )
                            }

                        </FormItem>

                        <FormItem
                            label="合作企业授权："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('mallAuthBrandAuth',{
                                    valuePropName:'checked'
                                })(
                                    <Checkbox>授权</Checkbox>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="品牌企业授权："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('mallAuthPartnerAuth',{
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>授权</Checkbox>
                                )
                            }
                        </FormItem>

                        <FormItem
                            label="功能授权："
                            {...formItemLayout}>
                            {
                                getFieldDecorator('mallAuthYygAuth',{
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>一元购授权</Checkbox>
                                )
                            }
                            {
                                getFieldDecorator('mallAuthMallAuth',{
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>商城授权</Checkbox>
                                )
                            }
                            {
                                getFieldDecorator('mallAuthContentAuth',{
                                    valuePropName: 'checked'
                                })(
                                    <Checkbox>资讯授权</Checkbox>
                                )
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
        const {data} = props;
        if (data && data.id) {
            var fields = {
                id: {
                    value: data.id
                },
                uin: {
                    value: data.uin
                },
                name: {
                    value: data.name
                },
                userName: {
                    value: data.userName
                },
                contactName: {
                    value: data.contact.name
                },
                contactEmail: {
                    value: data.contact.email
                },
                contactMobile: {
                    value: data.contact.mobile
                },
                mallAuthMallOpMode: {
                    value: data.mallAuth.mallOpMode
                },
                mallAuthBrandAuth: {
                    value: parseBoolean(data.mallAuth.brandAuth)
                },
                mallAuthPartnerAuth: {
                    value: parseBoolean(data.mallAuth.partnerAuth)
                },
                mallAuthContentAuth: {
                    value: parseBoolean(data.mallAuth.contentAuth)
                },
                mallAuthMallAuth: {
                    value: parseBoolean(data.mallAuth.mallAuth)
                },
                mallAuthYygAuth: {
                    value: parseBoolean(data.mallAuth.yygAuth)
                }
            };
            //console.log(fields)
            return fields;
        } else {
            return {};
        }
    },
    // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store

})(MallForm);
