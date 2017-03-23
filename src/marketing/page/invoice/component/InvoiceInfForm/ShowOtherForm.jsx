import React , {Component}from 'react';
import {Form,Input, Upload, Icon,message} from 'antd';
import  './index.less';
import * as media from 'common/util/media';
import Img from 'common/component/Img';
const FormItem = Form.Item;


export default class ShowOtherForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        bizImgId: '',
        taxImgId: '',
        taxPayerImgId: '',
    };
    // 真实的DOM被渲染出来后调用。
    componentDidMount() {
        const obj =this.props.form.getFieldsValue();
        if(obj.bizImgId &&  obj.taxImgId && obj.taxPayerImgId){
            this.setState({
                bizImgId: obj.bizImgId.file.response.data,
                taxImgId: obj.taxImgId.file.response.data,
                taxPayerImgId: obj.taxPayerImgId.file.response.data,
            });
        }

    }

    mobileValidator = (rule, value, callback)=> {
        if (!value) {
            callback();
        } else {
            const regexp = new RegExp('^1[3|4|5|7|8][0-9]\\d{8}$');
            if (regexp.test(value)) {
                callback();
            } else {
                callback([new Error('请输入正确的电话')]);
            }
        }
    };
    taxNoValidator=(rule, value, callback)=>{
        if (!value) {
            callback();
        } else {
            const taxNoregexp = new RegExp('\\d{15,20}');
            if (taxNoregexp.test(value)) {
                callback();
            } else {
                callback([new Error('请输入15-20位税务登记号')]);
            }
        }
    };
    accountValidator=(rule, value, callback)=>{
        if (!value) {
            callback();
        } else {
            const accountregexp = new RegExp('\\d{1,30}');

            if (accountregexp.test(value)) {
                callback();
            } else {
                callback([new Error('请输入正确的开户行账号')]);
            }
        }
    };

    // upload 改变时处理函数
    onChangeUpload = (info,obj) => {
        if(info.file.status==='done'){
            switch (true){
                case obj=='bizImgId':
                    message.success('营业执照复印件图片上传成功!');
                    this.setState({
                        bizImgId:info.file.response.data
                    });

                    break;
                case obj=='taxImgId':
                    message.success('税务登记复印件图片上传成功!');
                    this.setState({
                        taxImgId:info.file.response.data
                    });

                    break;
                default:
                    message.success('一般纳税人资格认证复印件图片上传成功!');
                    this.setState({
                        taxPayerImgId:info.file.response.data
                    });
            }
        }else if (info.file.status === 'error') {
            message.error('图片上传失败!');
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        };
        const uploadProps = {
            name: 'media',
            //media.upLoad
            showUploadList: false,
            withCredentials: true,
            action: media.addMedia({
                owner: 'biz',
                restype: 'res',
            }),
            beforeUpload(file) {

                //需要增加文件大小判定
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';

                if (!isJPG && !isPNG) {
                    message.error('只支持 JPG/PNG 文件哦！');
                }

                const isSize = file.size < 1548576;

                if (!isSize) {
                    message.error('上传图片大小限制在1.5M以内！');
                }

                return (isJPG  || isPNG) && isSize;
            },
           /* onPreview(file){
                this.props.handlePreview(file.response.data)
            }*/
            /*  onRemove:(file)=>{
                  let id = file.response.data;
                  switch (true){
                      case id==this.state.bizImgId:
                          this.setState({
                              bizImgId:"",
                          });
                          break;
                      case id==this.state.taxImgId:
                          this.setState({
                              taxImgId:"",
                          });
                          break;
                      case id==this.state.taxPayerImgId:
                          this.setState({
                              taxPayerImgId:"",
                          });
                          break;
                  }
              }*/

        };
        const bizImgIdUrl=media.getMediaUrl(this.state.bizImgId);
        const taxImgIdUrl=media.getMediaUrl(this.state.taxImgId);
        const taxPayerImgIdUrl=media.getMediaUrl(this.state.taxPayerImgId);
        return (
            <div>
                <FormItem
                    style={{fontSize:'13px',marginBottom:'20px'}}
                    className='radio-button-label-new'
                    {...formItemLayout}
                    label='税务登记号'
                    help="请与贵公司财务人员核实并填写准确的税务登记证号，以免影响您发票后续的使用">
                    {getFieldDecorator('taxNo', {
                        rules: [
                            {
                                required: true,
                                min:15,
                                max:20,
                                message:'请输入15-20位税务登记号'
                            },
                            {
                                validator: this.taxNoValidator
                            }
                        ]
                    })(
                        <Input placeholder="请输入15-20位税务登记号"  style={{width:'360px',height:'36px'}}/>
                    )}
                </FormItem>
                <FormItem
                    className='radio-button-label-new-large'
                    {...formItemLayout}
                    label='注册地址'>
                    {getFieldDecorator('addr', {
                        rules: [
                            {
                                required: true,
                                max:74,
                                message:'请输入正确的注册地址'
                            }
                        ]
                    })(
                        <Input placeholder="请输入正确的注册地址" style={{width:'360px',height:'36px'}}/>
                    )}
                </FormItem>
                <FormItem
                    className='radio-button-label-new-large'
                    {...formItemLayout}
                    label='注册手机号'>
                    {getFieldDecorator('tel', {
                        rules: [
                            {
                                required: true,
                                message: '请输入正确的注册手机号'
                            }, {
                                validator: this.mobileValidator
                            }
                        ]
                    })(
                        <Input placeholder="请输入正确的注册手机号" style={{width:'360px',height:'36px'}}/>
                    )}
                </FormItem>
                <FormItem
                    className='radio-button-label-new-large'
                    {...formItemLayout}
                    label='开户行名称'>
                    {getFieldDecorator('bank', {
                        rules: [
                            {
                                required: true,
                                message:'请输入正确的开户行名称'
                            }
                        ]
                    })(
                        <Input placeholder="请输入正确的开户行名称" style={{width:'360px',height:'36px'}}/>
                    )}
                </FormItem>
                <FormItem
                    className='radio-button-label-new-large'
                    {...formItemLayout}
                    label='开户行账号'>
                    {getFieldDecorator('account', {
                        rules: [
                            {
                                required: true,
                                message:'请输入正确的开户行账号,30位以内'
                            }
                            , {
                                validator: this.accountValidator
                            }
                        ]
                    })(
                        <Input placeholder="请输入正确的开户行账号" style={{width:'360px',height:'36px'}}/>
                    )}
                </FormItem>
                <FormItem
                    className='radio-button-label-new-large'
                    {...formItemLayout}
                    label='营业执照复印件'>
                    {getFieldDecorator('bizImgId', {
                        normalize: this.normFile,
                        onChange: (info)=>this.onChangeUpload(info,'bizImgId'),
                        rules: [
                            {
                                type: 'object',
                                required: true,
                                message: '只能上传JPG/PNG文件，且不超过1.5M',
                            }
                        ]
                    })(
                        <Upload
                            {...uploadProps}
                            className="avatar-uploader"
                        >
                            {
                                bizImgIdUrl ?
                                    <Img src={bizImgIdUrl} role="presentation" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>

                    )}
                </FormItem>
                <FormItem
                    className='radio-button-label-new-large'
                    {...formItemLayout}
                    label='税务登记复印件'>
                    {getFieldDecorator('taxImgId', {
                        normalize: this.normFile,
                        onChange: (info)=>this.onChangeUpload(info,'taxImgId'),
                        rules: [
                            {
                                type: 'object',
                                required: true,
                                message: '只能上传JPG/PNG文件，且不超过1.5M',
                            }
                        ]
                    })(
                        <Upload
                            {...uploadProps}
                            className="avatar-uploader"
                        >
                            {
                                taxImgIdUrl ?
                                    <Img src={taxImgIdUrl} role="presentation" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    className='radio-button-label-new-large'
                    {...formItemLayout}
                    label='一般纳税人资格认证复印件'>
                    {getFieldDecorator('taxPayerImgId', {
                        normalize: this.normFile,
                        onChange: (info)=>this.onChangeUpload(info,'taxPayerImgId'),
                        rules: [
                            {
                                type: 'object',
                                required: true,
                                message: '只能上传JPG/PNG文件，且不超过1.5M',
                            }
                        ]
                    })(
                        <Upload
                            {...uploadProps}
                            className="avatar-uploader"
                        >
                            {
                                taxPayerImgIdUrl ?
                                    <Img src={taxPayerImgIdUrl} role="presentation" className="avatar" /> :
                                    <Icon type="plus" className="avatar-uploader-trigger" />
                            }
                        </Upload>
                    )}
                </FormItem>
            </div>
        );

    }
}

