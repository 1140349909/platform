import React , {Component}from 'react';
import {Form,Radio,Input,Button,Modal} from 'antd';

import  './index.less';
import ShowOtherForm from './ShowOtherForm';
import * as media from 'common/util/media';
import Img from 'common/component/Img';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class InvoiceInfForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        previewVisible: false,
        previewImage: '',

    };
    /*方法*/
    handleSubmit =(e)=> {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                return;
            }
            if(this.props.form.getFieldValue('issueType')=='person'){
                values.title = '个人';
                values.invocieType = 'normal';
                values.issueType = 'person';
                this.props.updateConfigInvoice(values);
            }
            else if( this.props.editType==='personToCorp' || this.props.editType==='normalToSpecial' || this.props.editType==='' ){
                if(values.invocieType==='normal'){
                    this.props.saveConfirm('saveHead',this.props,values);
                }else{
                    if(values.bizImgId && values.taxImgId && values .taxPayerImgId){
                        values.bizImgId=values.bizImgId.file.response.data;
                        values.taxImgId=values.taxImgId.file.response.data;
                        values.taxPayerImgId=values.taxPayerImgId.file.response.data;
                    }
                    this.props.saveConfirm('saveType',this.props,values);
                }
            }
        });
    };
    /*增加图片*/
    handleCancel = () => this.setState({ previewVisible: false, previewImage:'', });
    handlePreview = (id) => {
        this.setState({
            previewImage: id,
            previewVisible: true,
        });
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        };
        const editType= this.props.editType ;
        const imageUrl = this.state.previewImage!=''?media.getMediaUrl(this.state.previewImage):'';
        return (
            <div>
                <Form className="addOrEditInvoiceInf"  onSubmit={this.handleSubmit}>
                    <FormItem
                        className='radio-button-label-new'
                        {...formItemLayout}
                        label='开具类型'>
                        {getFieldDecorator('issueType', {
                            initialValue:'person',
                            rules: [
                                {
                                    required: true,
                                    message:'请选择开具的类型'
                                }
                            ]
                        })(
                            <RadioGroup size="large" onChange={this.changeIssueType}>
                                <RadioButton value="person" styel={{width:'100px'}} disabled={editType==='personToCorp' || editType==='normalToSpecial'}>个人</RadioButton>
                                <RadioButton value="corp" styel={{width:'100px'}} >企业</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {this.props.form.getFieldValue('issueType')!='person'?
                        <FormItem
                        {...formItemLayout}
                        label='发票抬头'>
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                max:50,
                                message:'请填写您营业执照上的全称'
                            }]
                        })(
                            <Input
                            placeholder="请填写您营业执照上的全称"
                            style={{width:'360px',height:'36px'}}
                            />
                        )}
                        </FormItem>: <FormItem {...formItemLayout} label='发票抬头'>个人</FormItem>
                    }
                    {this.props.form.getFieldValue('issueType')!='person'?
                        <FormItem
                            className='radio-button-label-new-large'
                            {...formItemLayout}
                            label='发票类型'>
                            {getFieldDecorator('invocieType', {
                                initialValue:'normal',
                                rules: [
                                    {
                                        required: true,
                                        message:'请选择发票类型'
                                    }
                                ]
                            })(
                                <RadioGroup size="large">
                                    <RadioButton value="normal" styel={{width:'140px' }} disabled={ editType==='normalToSpecial' }>增值税普通发票</RadioButton>
                                    <RadioButton value="special" styel={{width:'140px'}}>增值税专用发票</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>: <FormItem {...formItemLayout} label='发票类型'>增值税普通发票</FormItem>
                    }
                    {/*控制显示影藏*/}
                    {this.props.form.getFieldValue('issueType')==='corp' && this.props.form.getFieldValue('invocieType')==='special' &&
                    <ShowOtherForm
                        form={this.props.form}
                        handlePreview={this.handlePreview}
                    />}
                    <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary"  htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <Img alt="example" style={{ width: '100%' }} src={imageUrl} />
                </Modal>
            </div>

        );

    }
}
export default Form.create({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {
        let {issueTypeValue,invocieTypeValue} = props;
        /*这里要控制*/
        let bizImgIdValue={
            file: {
                response: {
                    data: props.invoiceSettingInf.bizImgId
                }
            }
        };
        let taxImgIdValue={
            file: {
                response: {
                    data: props.invoiceSettingInf.taxImgId
                }
            }
        };
        let taxPayerImgIdValue={
            file: {
                response: {
                    data:  props.invoiceSettingInf.taxPayerImgId
                }
            }
        };
        return {
            issueType:{
                value:issueTypeValue
            },
            invocieType:{
                value:invocieTypeValue
            },
            title:{
                value:props.invoiceSettingInf.title
            },
            taxNo:{
                value:props.invoiceSettingInf.taxNo
            },
            addr:{
                value:props.invoiceSettingInf.addr
            },
            tel:{
                value:props.invoiceSettingInf.tel
            },
            bank:{
                value:props.invoiceSettingInf.bank
            },
            account:{
                value:props.invoiceSettingInf.account
            },
            bizImgId:{
                value:bizImgIdValue
            },
            taxImgId:{
                value:taxImgIdValue
            },
            taxPayerImgId:{
                value:taxPayerImgIdValue
            }
        };
    }
})(InvoiceInfForm);
