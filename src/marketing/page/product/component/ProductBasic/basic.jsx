import React, {Component} from 'react';
import {
    InputNumber,
    Form,
    Input,
    Spin,
} from 'antd';
import _ from 'lodash';
import * as media from 'common/util/media';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthUpload from 'common/component/AuthUpload';
import Img from 'common/component/Img';
const FormItem = Form.Item;

// 商品基本信息
export default class ProductBasicInfo extends AuthComponentBase {
    render() {

        const {getFieldDecorator} = this.props.form;

        const codeProps = getFieldDecorator('code', {
            rules: [
                {required: true, message: '请填写商品编号', whitespace: true},
                {max: 20, message: '商品编号，只可输入20个汉字'}
            ],
        });

        const titleProps = getFieldDecorator('title', {
            rules: [
                {required: true, message: '请填写商品名称', whitespace: true},
                {max: 20, message: '商品产品，只可输入20个汉字'},
            ],
        });

        const costProps = getFieldDecorator('cost', {
            rules: [
                {required: true, message: '请填写成本价格', type: 'number'},
            ],
        });

        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 12},
        };

        return (

            <div className="product-basic-info">
                <h2>商品基本信息</h2>
                <FormItem
                    label="商品编号"
                    {...formItemLayout}>
                    {codeProps(
                        <Input
                            placeholder="商品编号，只可输入20个汉字"/>
                    )
                    }

                </FormItem>

                <FormItem
                    label="商品名称"
                    {...formItemLayout}>
                    {titleProps(
                        <Input
                            placeholder="商品名称，只可输入20个汉字"/>
                    )
                    }
                </FormItem>

                <FormItem
                    label="成本价格"
                    {...formItemLayout}>
                    {costProps(
                        <InputNumber
                            min={0}
                            step={0.001}
                            {...costProps}/>
                    )
                    }元
                </FormItem>

                <ProductBasicUpload
                    setCropper={this.props.setCropper}
                    readOnly={this.props.readOnly}
                    productId={this.props.productId}
                    data={this.props.data}
                    form={this.props.form}/>

            </div>
        );
    }
}


// 商品封面图
class ProductBasicUpload extends Component {

    state = {
        // 图片Id
        productImgId: false,

        // 图片状态 not | pending | upload
        productImgIdState: 'not',
    }

    componentDidMount() {
        this.loadProductImg();
    }

    componentWillReceiveProps(nextProps) {
        this.loadProductImg(nextProps.data, nextProps.productId);
    }

    // 封面图片载入处理功能
    loadProductImg = (data = this.props.data) => {
        if (!data) {
            return;
        }

        let productVal = _.has(this.props.form.getFieldsValue().productImgId, 'file.response') ? this.props.form.getFieldsValue().productImgId.file.response : null;

        if (productVal == undefined || !productVal) {
            return;
        }

        this.setState({
            productImgIdState: 'upload',
            productImgId: productVal.data,
        });
    }

    // 图片上传回调
    crooperChange = (info, status) => {
        if (status == 'uploading') {
            if (this.state.productImgIdState == 'not' || this.state.productImgIdState == 'upload') {
                this.setState({
                    productImgIdState: 'pending'
                });
            }
        }
    }

    // 裁剪完成之后回调
    uploadDone = (data, status) => {
        if (status == 'success') {
            this.setState({
                productImgId: data,
                productImgIdState: 'upload',
            });
        } else if (status == 'error') {
            this.setState({
                productImgIdState: 'not',
            });
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 12},
        };

        const uploadProps = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            //media.upLoad
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
            data: this.uploadData,
        };

        const productImgIdProps = {
            fileName: 'productImgId',
            options: {
                onChange: this.crooperChange,
                rules: [
                    {required: true, message: '需要上传一张商品图片', type: 'object'},
                ],
            }
        };

        const crooperOptions = {
            aspectRatio: 1 / 1,
        };

        return (
            <FormItem
                label="商品缩略图"
                {...formItemLayout}>

                <div className="product-basic-uploadbox">
                    <AuthUpload
                        modalDesc={'请上传200px*200px尺寸的图片'}
                        form={this.props.form}
                        useCropper
                        useOrigin={true}
                        uploadDone={this.uploadDone}
                        crooperOptions={crooperOptions}
                        uploadFileProps={productImgIdProps}
                        uploadProps={uploadProps}>
                        <div className="product-basic-upload">
                            {
                                this.state.productImgIdState == 'upload' &&
                                <Img
                                    className="product-basic-uploadimg"
                                    src={media.getMediaUrl(this.state.productImgId)}/>
                            }

                            {
                                this.state.productImgIdState == 'pending' &&
                                <div className="product-basic-upload-pending">
                                    <Spin />
                                    <div className="product-basic-upload-pendingtext">图片上传中...</div>
                                </div>
                            }

                            {
                                this.state.productImgIdState == 'not' &&
                                <div>
                                    <div className="product-basic-upload-info">
                                        建议上传<br/>
                                        200px*200px
                                    </div>

                                    <div className="product-basic-upload-tip">
                                        点击上传
                                    </div>
                                </div>
                            }
                        </div>
                    </AuthUpload>
                </div>

            </FormItem>
        );
    }
}
