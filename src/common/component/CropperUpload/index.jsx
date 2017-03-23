import React from 'react';
import {Upload, message} from 'antd';
import CropperShow from './CropperShow.jsx';
import {imgReady, gcd} from 'common/util';
import {getMediaUrl} from 'common/util/media';
import _ from 'lodash';
import './index.less';

export default class CropperUpload extends React.Component {
    constructor() {
        super();
    }

    state = {
        cropperShow: false,
        crooperOptions: {},
        infoData: null,
    };

    componentDidMount() {
        this.setState({
            crooperOptions: this.props.crooperOptions,
        });
    }

    // 设置裁剪属性
    setCrooperOptions = (obj) => {
        let crooperOptions = this.state.crooperOptions;
        crooperOptions[obj.name] = obj.value;
        this.setState({
            crooperOptions: crooperOptions,
        });
    };

    // 返回操作upload组件时所需要的数据
    getUploadFileParam = () => {
        return {
            form: this.props.form,
            fileName: this.props.uploadFileProps.fileName,
            listType: this.props.uploadProps.listType || '',
        };
    };

    // 生成upload组件数据
    createUploadFile = (data) => {
        const listType = this.props.uploadProps.listType || '';

        // 添加upload 裁剪完成后的数据
        if (listType == 'picture-card') {
            const seconds = new Date().getSeconds();
            return {
                uid: seconds,
                name: seconds,
                url: getMediaUrl(data, null, false),
                thumbUrl: getMediaUrl(data, null, false),
                response: {
                    data: data,
                }
            };
        } else {
            return {
                file: {
                    response: {
                        data: data
                    }
                }
            };
        }
    };

    // 设置upload组件数据
    setUploadFile = (data) => {
        const param = this.getUploadFileParam();

        // 添加upload 裁剪完成后的数据
        if (param.listType == 'picture-card') {
            let listData = param.form.getFieldValue(param.fileName) || [];
            listData.push(this.createUploadFile(data));

            param.form.setFieldsValue({
                [param.fileName]: listData
            });

        } else {
            param.form.setFieldsValue({
                [param.fileName]: this.createUploadFile(data)
            });
        }
        this.uploadDone(data, 'success');
    };

    // 清空当前upload数据
    clearUploadFile = () => {
        const param = this.getUploadFileParam();

        // 清空当前upload数据
        if (param.listType == 'picture-card') {
            let listData = param.form.getFieldValue(param.fileName);
            listData.pop();

            param.form.setFieldsValue({
                [param.fileName]: listData,
            });

        } else {
            param.form.setFieldsValue({
                [param.fileName]: this.createUploadFile(null)
            });
        }
    };

    // upload onchange事件
    onChange = (info) => {
        // 上传状态
        const status = info.file.status;

        // 父级传递的uploadChange事件,进行包装父级可以接收到upload上传时传递的回调参数
        const uploadChange = this.props.uploadFileProps.options.onChange;
        // console.log('status', status);
        const {
            aspectRatioEnable = true,
            aspectRatio = 1,
        } = this.props.crooperOptions;

        if (status == 'uploading') {
            if (uploadChange) {
                uploadChange(info, 'uploading');
            }
            return;
        }

        if (status == 'done') {
            if (info.file.response.errCode === 0) {

                // 是否限制上传图片比较
                if (aspectRatioEnable) {
                    const src = getMediaUrl(info.file.response.data, null, false);

                    // 获取图片比例
                    imgReady(src + '?_=' + new Date().getTime(), (width, height) => {

                        // 获取图片宽高比例的商
                        const aspectRatioVal = gcd(width, height).w / gcd(width, height).h;

                        // 判断是否符合设置的图片比例
                        if (aspectRatioVal !== aspectRatio) {
                            this.clearUploadFile();

                            // 打开裁剪窗口
                            this.cropperChange(true);

                            // 设置所需要裁剪的图片的src
                            this.setCrooperOptions({name: 'src', value: src});
                        } else {
                            this.uploadDone(info.file.response.data, 'success');
                            if (uploadChange) {
                                uploadChange(info, 'done');
                            }
                            return;
                        }
                    });
                } else {
                    if (uploadChange) {
                        uploadChange(info, 'done');
                    }
                    return;
                }
                this.setState({
                    infoData: info.file.response.data,
                });
                // errCode非0错误处理
            } else {
                this.clearUploadFile();
                message.warning(info.file.response.errMsg);
                this.uploadDone(null, 'error');
            }
        }

        if (status == 'error') {
            if (uploadChange) {
                uploadChange(info, 'error');
            }
            return;
        }

        if (status == 'removed') {
            if (uploadChange) {
                uploadChange(info, 'removed');
            }
            return;
        }

    }

    cropperChange = (cropperShow) => {
        this.setState({
            cropperShow
        });

        if (_.isFunction(this.props.onCropperChange)) {
            this.props.onCropperChange(cropperShow);
        }
    }
    // 裁剪完成回调
    crooperDone = (data) => {
        this.setUploadFile(data);
        this.cropperChange(false);
    }

    // base64压缩
    convertImgToBase64 = (url, multiple = 4, callback, outputFormat) => {
        let canvas = document.createElement('CANVAS');
        let ctx = canvas.getContext('2d');
        let img = new Image;

        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            const width = img.width;
            const height = img.height;

            // 按比例压缩4倍
            const rate = (width < height ? width / height : height / width) / multiple;
            canvas.width = width * rate;
            canvas.height = height * rate;
            ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
            const dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    }

    // 上传或裁剪完成
    uploadDone = (data, status) => {
        if (this.props.uploadDone) {
            this.props.uploadDone(data, status);
        }
    }

    // 关闭裁剪弹窗
    reset = () => {
        this.cropperChange(false);

        this.uploadDone(null, 'error');
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const uploadProps = _.assign(
            {},
            this.props.uploadProps);

        const uploadFileProps = getFieldDecorator(this.props.uploadFileProps.fileName,
            _.assign(
                {},
                this.props.uploadFileProps.options,
                {onChange: this.onChange})
        );

        return (
            <div>
                {uploadFileProps(
                    <Upload
                        {...uploadProps}>
                        {this.props.children}
                    </Upload>
                )}
                {this.state.cropperShow &&
                <CropperShow
                    reset={this.reset}
                    modalDesc={this.props.modalDesc}
                    useOrigin={this.props.useOrigin}
                    crooperStyle={this.props.crooperStyle}
                    crooperParams={this.props.crooperParams}
                    crooperDone={this.crooperDone}
                    convertImgToBase64={this.convertImgToBase64}
                    infoData={this.state.infoData}
                    crooperOptions={this.state.crooperOptions}/>
                }
            </div>
        );
    }
}
