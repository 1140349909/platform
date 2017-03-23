import React, {Component} from 'react';
import {Icon, Button, Modal, Form, Input, Spin, message} from 'antd';
import * as media from 'common/util/media';
import _ from 'lodash';
import {Editor, getEditorValue, setEditorValue} from 'common/component/UEditor';
import AuthUpload from 'common/component/AuthUpload';
import Img from 'common/component/Img';
import './index.less';

const FormItem = Form.Item;
const EDITOR_ID = 'contentEditor';


// 新增产品容器-父组件
class ProductInfo extends Component {

    constructor(props) {
        super(props);
    }

    onChange = () => {
        return this.handleSubmitClick();
    }

    // 获取表单数据
    handleSubmitClick = () => {

        let content = getEditorValue(EDITOR_ID);
        let formData = this.props.form.getFieldsValue();
        let isErrors = false;

        this.props.form.validateFields((errors) => {
            if (errors) {
                isErrors = true;
                if (!formData.bannerImgs || formData.bannerImgs.length == 0) {
                    message.warning('广告图片不可为空');
                }
                return;
            }
        });

        // 图文不可为空
        if (content == '') {
            message.warning('图文详情不可为空!');
            return;
        }

        // 判断上架图片是否上传完成
        if (typeof(formData.coverImgId.file.response) == 'undefined') {
            message.warning('上架首页图片，没有上传完成');
            return;
        }

        // 判断图片是否存在做数据转换
        if (formData.bannerImgs) {
            formData.bannerImgs.map((item) => {
                if (typeof(item.response) == 'undefined') {
                    isErrors = true;
                    message.warning('上架广告图片，没有上传完成');
                    return;
                }
            });
        }

        // 校验成功
        if (!isErrors) {
            return {
                ...formData,
                content,
            };
        }
    }

    // 数据转为详情设置API可用的数据格式
    handleDataConversion = (formData) => {

        // 上传图片数据转换
        let bannerImgs = [],
            coverImgId = '',
            productImgId;

        if (this.props.mold == 'show') {
            productImgId = _.has(this.props.data, 'mediaRes.productImgId') ? this.props.data.mediaRes.productImgId : '';
        } else {
            productImgId = _.has(this.props.data, 'productImgId') ? this.props.data.productImgId.file.response.data : '';
        }

        formData.bannerImgs.map((item) => {
            bannerImgs.push(item.response.data);
        });

        coverImgId = formData.coverImgId.file.response.data;

        return {
            name: formData.name,
            content: formData.content,
            digest: formData.digest,
            mediaRes: {
                bannerImgs,
                coverImgId,
                productImgId,
            },
        };
    }

    // 退出编辑
    onCancel = () => {
        this.props.onCancel();
    }

    // 保存
    onExit = () => {
        this.props.onExit();
    }

    // 上一步
    onPrev = () => {
        let formData = this.handleSubmitClick();

        if (!formData) return;

        const dataConversion = this.handleDataConversion(formData);

        this.props.onPrev(formData, dataConversion);
    }

    // 保存
    onOk = () => {
        let formData = this.handleSubmitClick();

        if (!formData) return;

        const dataConversion = this.handleDataConversion(formData);

        this.props.onOk(formData, dataConversion);
    }

    // 预览
    onPreview = () => {
        let formData = this.handleSubmitClick();

        if (!formData) return;

        const dataConversion = this.handleDataConversion(formData);

        this.props.onPreview(formData, dataConversion);
    }

    // 完成
    onDone = () => {
        let formData = this.handleSubmitClick();

        if (!formData) return;

        const dataConversion = this.handleDataConversion(formData);

        this.props.onDone(formData, dataConversion);
    }

    // 富文本编辑器启动·
    componentDidMount() {
        if (this.props.data) {
            setEditorValue(EDITOR_ID, this.props.data.content);
        }
    }

    // 富文本编辑器启动
    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            setEditorValue(EDITOR_ID, nextProps.data.content);
        }
    }

    render() {

        const formProps = {
            form: this.props.form,
            data: this.props.data,
        };

        // 弹出层模式下样式变化
        const classBtnsShow = this.props.mold == 'show' ? 'product-info-btnsshow' : '';

        return (
            <div className='product-info'>
                <Form layout="horizontal">
                    <div className="product-info-hd">
                        <div className="product-info-coverimg">
                            <ProductInfoCoverImg
                                {...formProps}/>
                        </div>
                        <div className="product-info-bannerimg">
                            <ProductInfoBannerImg
                                {...formProps}/>
                        </div>
                    </div>

                    <div className="product-info-line"></div>

                    <div className="product-info-inputs">
                        <ProductInfoInputs
                            mold={this.props.mold}
                            {...formProps}/>
                    </div>

                    <div className="product-info-des">
                        <h2>上架图文详情</h2>
                        <Editor id="contentEditor" height="450px"/>
                    </div>

                    <div
                        className={'product-info-btns ' + classBtnsShow}>
                        {this.props.onCancel &&
                        <Button
                            size="large"
                            onClick={this.onCancel}>退出编辑</Button>
                        }

                        {this.props.onExit &&
                        <Button
                            size="large"
                            onClick={this.onExit}>取消</Button>
                        }

                        {this.props.onPrev &&
                        <Button
                            size="large"
                            onClick={this.onPrev}>上一步</Button>
                        }

                        {this.props.onOk &&
                        <Button
                            loading={this.props.saveLoading}
                            size="large"
                            type="primary"
                            onClick={this.onOk}>保存</Button>
                        }

                        {this.props.onPreview &&
                        <Button
                            loading={this.props.previewLoading}
                            size="large"
                            onClick={this.onPreview}>预览</Button>
                        }

                        {this.props.onDone &&
                        <Button
                            loading={this.props.doneLoading}
                            size="large"
                            onClick={this.onDone}>完成</Button>
                        }
                    </div>
                </Form>
            </div>
        );
    }
}

// 商品详情信息inputs
class ProductInfoInputs extends Component {

    render() {

        const {getFieldDecorator} = this.props.form;

        const nameProps = getFieldDecorator('name', {
            rules: [
                {required: true, message: '请填写产品标题', whitespace: true},
                {max: 20, message: '上架标题，只可输入20个汉字',}
            ],
        });

        const digestProps = getFieldDecorator('digest', {
            rules: [
                {required: true, message: '请填写上架描述', whitespace: true},
                {max: 50, message: '上架描述，只可输入50个汉字'}
            ],
        });

        let formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 21},
        };

        return (
            <div>
                <FormItem
                    label="上架标题"
                    {...formItemLayout}>
                    {nameProps(
                        <Input
                            placeholder="上架标题，只可输入20个汉字"/>
                    )}
                </FormItem>
                <FormItem
                    label="上架描述"
                    {...formItemLayout}>

                    {digestProps(
                        <Input
                            placeholder="上架描述，只可输入50个汉字"/>
                    )}
                </FormItem>

            </div>
        );
    }
}


// 首页图片
class ProductInfoCoverImg extends Component {

    state = {
        // 图片Id
        coverImgId: false,

        // 图片状态 not | pending | upload
        coverImgIdState: 'not',
    }

    componentDidMount() {
        this.loadCoverImgId();
    }

    componentWillReceiveProps(nextProps) {
        this.loadCoverImgId(nextProps.data);
    }

    // 封面图片载入处理功能
    loadCoverImgId = (data = this.props.data) => {

        if (!data) {
            return;
        }

        if (data.coverImgId == undefined) {
            return;
        }

        let coverImgIdVal = _.has(this.props.form.getFieldsValue(), 'coverImgId.file.response') ? this.props.form.getFieldsValue().coverImgId.file.response : null;

        if (!coverImgIdVal) {
            return;
        }

        this.setState({
            coverImgIdState: 'upload',
            coverImgId: coverImgIdVal.data,
        });
    }

    // 裁剪完成之后回调
    uploadDone = (data, status) => {
        if (status == 'success') {
            this.setState({
                coverImgId: data,
                coverImgIdState: 'upload',
            });
        } else if (status == 'error') {
            this.setState({
                coverImgIdState: 'not',
            });
        }
    }

    // 图片上传回调
    crooperChange = (info, status) => {
        if (status == 'uploading') {
            // 图片上传状态改变
            if (this.state.coverImgIdState == 'not' || this.state.coverImgIdState == 'upload') {
                this.setState({
                    coverImgIdState: 'pending'
                });
            }
        }
    }

    render() {

        const props = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            //media.upLoad
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
        };

        const coverImgIdProps = {
            fileName: 'coverImgId',
            options: {
                onChange: this.crooperChange,
                rules: [
                    {required: true, message: '需要上传一张商品图片', type: 'object'},
                ],
            }
        };

        const crooperOptions = {
            aspectRatioEnable: true,
            aspectRatio: 3 / 2,
        };

        return (
            <div>
                <h2>上架首页图片</h2>
                <FormItem>
                    <AuthUpload
                        useCropper
                        uploadDone={this.uploadDone}
                        crooperOptions={crooperOptions}
                        modalDesc={'请上传300px*200px尺寸的图片'}
                        form={this.props.form}
                        uploadFileProps={coverImgIdProps}
                        uploadProps={props}>

                        <div
                            className={this.state.coverImgIdState == 'upload' ? 'product-info-upload product-info-upload-success' : 'product-info-upload'}>
                            {this.state.coverImgIdState == 'upload' &&
                            <Img
                                className="product-info-uploadimg"
                                src={this.state.coverImgId}/>
                            }

                            {this.state.coverImgIdState == 'pending' &&
                            <div className="product-init-upload-pending">
                                <Spin />
                                <div className="product-init-upload-pendingtext">图片上传中...</div>
                            </div>
                            }

                            {this.state.coverImgIdState == 'not' &&
                            <div>
                                <div className="product-info-upload-info">
                                    <Icon className="product-info-icon" type="picture"/><br/>
                                    <p>
                                        建议上传
                                        <br/>
                                        图片大小为300px*200px
                                    </p>
                                </div>
                            </div>
                            }
                        </div>
                    </AuthUpload>
                </FormItem>
            </div>
        );
    }
}


// 广告图
class ProductInfoBannerImg extends Component {

    state = {

        // 图片信息列表
        fileList: [],

        // 图片缩略图弹出层状态
        priviewVisible: false,

        // 图片src地址
        bannerImgIdData: '',
    };

    // 弹出层关闭处理函数
    handleCancel = () => {
        this.setState({
            priviewVisible: false,
        });
    }

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    // 图片上传回调
    crooperChange = (info, status) => {
        if (status == 'done') {
            // 大于5张图片,隐藏Upload

            let fileList = info.fileList;
            let uploadEle = document.querySelector('.product-info-bannerimg').querySelector('.ant-upload');

            fileList = fileList.map((file) => {
                if (file.response) {
                    file.url = media.getMediaUrl(file.response.data);
                }
                return file;
            });

            // banner添加框控制
            // 上传5张图时添加框消失
            // 上传4张图时添加框位置修正
            if (fileList.length == 5) {
                uploadEle.style.display = 'none';

            } else if (fileList.length == 4) {
                uploadEle.style.display = 'inline-block';
                uploadEle.style.position = 'absolute';
                uploadEle.style.top = '83px';
                uploadEle.style.left = '148px';
            } else {
                uploadEle.style.display = 'inline-block';
                uploadEle.style.position = 'relative';
                uploadEle.style.top = 0;
                uploadEle.style.left = 0;
            }
        }
    }

    render() {

        const crooperOptions = {
            aspectRatioEnable: true,
            aspectRatio: 2 / 1,
        };

        // Upload属性设置
        const props = {
            name: 'media',
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
            listType: 'picture-card',
            withCredentials: true,
            onPreview: (file) => {
                this.setState({
                    bannerImgIdData: file.url,
                    priviewVisible: true,
                });
            }
        };

        // Upload与表单进行双向绑定,及校验和属性设置
        const bannerImgsProps = {
            fileName: 'bannerImgs',
            options: {
                onChange: this.crooperChange,
                normalize: this.normFile,
                valuePropName: 'fileList',
                rules: [
                    {required: true, message: '请上传banner图,最多可上传5张', max: 6, type: 'array'},
                ],
            }
        };

        return (
            <div>
                <h2>上架广告页</h2>
                <div>
                    <FormItem
                        help="上传最多5张，格式要求为jpg\png/gif格式,图片大小为640px*320px">
                        <AuthUpload
                            useCropper
                            uploadDone={this.uploadDone}
                            crooperOptions={crooperOptions}
                            form={this.props.form}
                            modalDesc={'请上传640px*320px尺寸的图片'}
                            uploadFileProps={bannerImgsProps}
                            uploadProps={props}>
                            <Icon type="plus"/>
                            <div className="ant-upload-text">上传照片</div>

                        </AuthUpload>
                    </FormItem>

                    <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                        <Img alt="example" className="add-uploadbanner-img" src={this.state.bannerImgIdData}/>
                    </Modal>
                </div>
            </div>
        );
    }
}


export default Form.create({

    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        let {data} = props;

        if (!data) {
            return {};
        }

        // 弹出层模式，数据转换
        if (props.mold == 'show') {
            data.coverImgId = {
                file: {
                    response: {
                        data: data.mediaRes.coverImgId
                    }
                }
            };

            data.bannerImgs = [];

            data.mediaRes.bannerImgs.map((item, index) => {
                data.bannerImgs[index] = {
                    uid: index,
                    name: index,
                    url: media.getMediaUrl(item),
                    thumbUrl: media.getMediaUrl(item),
                    response: {
                        data: item
                    }
                };
            });
        } else {
            if (!data.name) {
                data.name = data.title;
            }
        }

        return {
            name: {
                value: data.name,
            },
            digest: {
                value: data.digest,
            },
            coverImgId: {
                value: data.coverImgId,
            },
            bannerImgs: {
                value: data.bannerImgs,
            }
        };
    },
})(ProductInfo);
