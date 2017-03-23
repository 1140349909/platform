import React, {Component}from 'react';
import {Modal, Form, Row, Col, Input, Checkbox} from 'antd';
import  AreaCascader from 'common/component/AreaCascader';

import  './index.less';
const FormItem = Form.Item;

class ManageAddressForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        visible: false,
    };

    handleOk = () => {
        this.props.form.validateFields((error, value) => {
            if (error) return;
            /*这里要进行判断，修改还是增加*/
            let area = value.area;
            value.addressType = 'trade_invoice';
            value.prov = area[0];
            value.city = area[1];
            value.region = area[2];
            delete value.area;
            if (this.props.param === 'add') {
                this.props.addCustomerAddress(value);
            } else {
                this.props.updateCustomerAddress(this.props.data.id, value);
            }
            this.props.reset();
        });
    };
    telValidator = (rule, value, callback)=> {
        if (!value) {
            callback();
        } else {
            const regexp = new RegExp('^(([0\\+]\\d{2,3}-)?(\\d{2,4})-)?(\\d{7,8})(-(\\d{3,}))?$');
            const regexpMobile = new RegExp('^(13|15|18|17)[0-9]{9}$');

            if (regexp.test(value) || regexpMobile.test(value)) {
                callback();
            } else {
                callback([new Error('请输入正确的手机号或者电话号码')]);
            }
        }
    };

    render() {


        let {visible, reset, param} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        };


        return (
            <Modal
                title={param === 'add' ? '添加收件地址' : '编辑收件地址'}
                visible={visible}
                onCancel={reset}
                onOk={this.handleOk}
                width={600}
                maskClosable={false}

            >
                <Form style={{padding: '11px 0 0 57px'}} className="manage-address-form">
                    <Row>
                        <Col>
                            <AreaCascader
                                getFieldDecoratorName="area"
                                style={{width: 360}}
                                placeholder="请选择省份，城市，区"
                                formItemLayout={formItemLayout}
                                form={this.props.form}
                                require="true"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem
                                {...formItemLayout}
                                label='详细地址'>
                                {getFieldDecorator('street', {
                                    rules: [
                                        {
                                            required: true,
                                            max:74,
                                            message: '请输入详细的收件地址'
                                        }
                                    ]
                                })(
                                    <Input type="textarea" style={{width: 360}} placeholder="请输入详细的收件地址"
                                           autosize={{minRows: 2, maxRows: 6}}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem
                                {...formItemLayout}
                                label='邮政编码'>
                                {getFieldDecorator('postCode', {
                                    rules: [
                                        {
                                            required: false,
                                            pattern: /^[a-zA-Z0-9]{3,12}$/,
                                            message: '请输入邮政编码'
                                        }
                                    ]
                                })(
                                    <Input style={{width: 360}} placeholder="请输入邮政编码"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem
                                {...formItemLayout}
                                label='收件人'>
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            min: 2,
                                            max: 25,
                                            required: true,
                                            message: '长度不得超过25个字符'
                                        }
                                    ]
                                })(
                                    <Input style={{width: 360}} placeholder="长度不得超过25个字符"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem
                                {...formItemLayout}
                                label='联系方式'>
                                {getFieldDecorator('mobile', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入手机号或固定电话',
                                        },{
                                            validator: this.telValidator
                                        }
                                    ]
                                })(
                                    <Input style={{width: 360}} placeholder="请输入手机号或固定电话"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{height:'30px'}}>
                        <Col>
                            <FormItem>
                                {getFieldDecorator('often', {
                                    valuePropName: 'checked',
                                    rules: [
                                        {
                                            required: false
                                        }
                                    ]
                                })(
                                    <Checkbox style={{marginLeft: '84px'}}>设置为默认地址</Checkbox>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );

    }
}
export default Form.create({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {
        //数据回显
        let {data}=props;
        //省份地区的拆解
        if( data.area){
            data.area = [data.prov, data.city, data.region];
        }
        let defaultValue;
        if(data.often===true){
            defaultValue=true;
        }else if(data.often===false) {
            defaultValue = false;
        }else{
            defaultValue=true;
        }
        return {
            area: {
                value: data.area
            },
            street: {
                value: data.street
            },
            postCode: {
                value: data.postCode
            },
            name: {
                value: data.name
            },
            mobile: {
                value: data.mobile
            },
            often: {
                value:defaultValue
            },
        };
    },
})(ManageAddressForm);
