import React, {Component} from 'react';
import {Modal,Row,Form,Input,Button} from 'antd';
import './index.less';
import _ from 'lodash';
const FormItem = Form.Item;
class InvoicePostForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    };
    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                this.props.confirmAddress(this.props.viewParam,values);
                this.props.reset();
            }
        });
    };
    render() {
        const {visible,reset} = this.props;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        const  {getFieldDecorator }= this.props.form;
        let footer = (
            <div>
                <Button onClick={this.props.reset}>取消</Button>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            </div>
        );

        return (
            <Modal
                maskClosable={false}
                className='invoice-modal-post'
                title='邮件确认'
                visible={visible}
                onCancel={reset}
                footer={footer}
                width={600}>
                <Row>
                    <FormItem
                        label='快递单号'
                        {...formItemLayout}>
                        {
                            getFieldDecorator('expNo',{
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入快递单号'
                                    }
                                ]
                            })(
                                <Input  style={{width: 300}}
                                              placeholder="请输入快递单号"/>
                            )
                        }
                    </FormItem>
                </Row>
                <Row>
                    <FormItem
                        label='快递公司'
                        {...formItemLayout}>
                        {
                            getFieldDecorator('expcom',{
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入快递公司'
                                    }
                                ]
                            })(
                                <Input  style={{width: 300}}
                                              placeholder="请输入快递公司"/>
                            )
                        }
                    </FormItem>
                </Row>
            </Modal>
        );
    }
}
export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        let data = props.viewData;
        if(_.isEmpty(data)){
            return {};
        }else{
            return {
                expcom:{
                    value:data.express.expcom
                },
                expNo:{
                    value:data.express.expNo
                }
            };
        }


    },
    // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
    /*onFieldsChange: function (props, fields) {

    }*/

})(InvoicePostForm);

