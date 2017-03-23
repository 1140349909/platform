import React from 'react';
import {Form, Input} from 'antd';
import * as media from 'common/util/media';
import AuthUpload from 'common/component/AuthUpload';
import UploadFrame from 'common/component/UploadFrame';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import InputCount from 'common/component/InputCount';
import {RELEASE_LENGTH_CONFIG} from 'common/config/content';
import _ from 'lodash';
const FormItem = Form.Item;
export default class WeiSite extends AuthComponentBase {
    constructor(props) {
        super(props);
    }
    state = {
        // 图片id
        mediaUrl: '',
        // 图片上传状态
        status: 'not',
    }
    componentDidMount() {
        this.loadImgId();
    }
    componentWillReceiveProps() {
        this.loadImgId();
    }
    // 封面图片载入处理功能
    loadImgId = () => {
        if (this.state.status == 'not') {
            let mediaUrl = null;
            if (_.has(this.props.form.getFieldsValue(), 'vsite.imgId.file.response.data')) {
                if (!this.props.form.getFieldsValue().vsite.imgId.file.response.data && _.has(this.props.data.vsite, 'imgUrl')) {
                    mediaUrl = this.props.data.vsite.imgUrl;
                } else {
                    mediaUrl = this.props.form.getFieldsValue().vsite.imgId.file.response.data;
                }
            } else {
                if (_.has(this.props, 'data.vsite.imgUrl')) {
                    mediaUrl = this.props.data.vsite.imgUrl;
                }
            }
            if (!mediaUrl) {
                return;
            }
            this.setState({
                status: 'done',
                mediaUrl: mediaUrl,
            });
        }
    }
    // 图片裁剪完成回调
    uploadDone = (data, status) => {
        if (status == 'success') {
            this.setState({
                mediaUrl: data,
                status: 'done',
            });
        } else if (status == 'error') {
            this.setState({
                status: 'not',
            });
        }
    }
    // 图片上传回调
    uploadChange = (info, status) => {
        if (status == 'uploading') {
            this.setState({
                status: 'pending'
            });
        } else if (status == 'error') {
            this.setState({
                status: 'error',
            });
        }
    }
    getRules = (type = 'string') => {
        if (this.props.enable) {
            return [{
                type, required: true, message: '不可为空'
            }];
        } else {
            return [];
        }
    }

    getImgRules = () => {
        if (!this.props.data.vsite.imgUrl) {
            return this.getRules('object')
        } else {
            return {}
        }
    }

    render() {
        const {getFieldDecorator, getFieldsValue, getFieldError} = this.props.form;
        const uploadProps = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            action: media.addMedia({
                owner: 'users',
                restype: 'cover',
            }),
        };

        const getImgRules = () => {
            if (!_.has(this, 'props.data.vsite.imgUrl') || !this.props.data.vsite.imgUrl) {
                return {
                    rules: this.getRules('object')
                }
            } else {
                return {}
            }
        }

        const uploadFileProps = {
            fileName: 'vsite.imgId',
            options: {
                onChange: this.uploadChange,
                ...getImgRules()
            },
        };
        const crooperOptions = {
            aspectRatioEnable: true,
            aspectRatio: 1 / 1,
        };
        const style = {
            width: '210px',
        };
        const vsiteDesc = getFieldDecorator('vsite.desc', {rules: this.getRules()});
        const vsiteTitle = getFieldDecorator('vsite.title', {rules: this.getRules()});
        const vsiteAuthor = getFieldDecorator('vsite.author', {rules: this.getRules()});
        return (
            <div className="content-distribution-weisite" style={this.props.style}>
                <FormItem
                    className="content-distribution-upload"
                    label="封面">
                    <AuthUpload
                        type={module.CONTENT_RICHTEXT_UPLOAD}
                        form={this.props.form}
                        useCropper={true}
                        useOrigin={true}
                        uploadDone={this.uploadDone}
                        modalDesc={'请上传400px*400px尺寸的图片'}
                        uploadProps={uploadProps}
                        crooperOptions={crooperOptions}
                        uploadFileProps={uploadFileProps}
                        onCropperChange={this.props.onCropperChange}>
                        <UploadFrame
                            error={getFieldError('vsite.imgId')}
                            tip="建议尺寸400 * 400"
                            mediaUrl={this.state.mediaUrl}
                            status={this.state.status}/>
                    </AuthUpload>
                </FormItem>
                <FormItem
                    label="标题">
                    <InputCount
                        value={getFieldsValue().vsite.title}
                        max={RELEASE_LENGTH_CONFIG.VSITE_TITLE}>
                        {vsiteTitle(
                            <Input
                                maxLength={RELEASE_LENGTH_CONFIG.VSITE_TITLE}
                                style={style}
                                placeholder="请输入标题"/>
                        )}
                    </InputCount>
                </FormItem>
                <FormItem
                    label="作者">
                    <InputCount
                        value={getFieldsValue().vsite.author}
                        max={RELEASE_LENGTH_CONFIG.VSITE_AUTHOR}>
                        {vsiteAuthor(
                            <Input
                                maxLength={RELEASE_LENGTH_CONFIG.VSITE_AUTHOR}
                                style={style}
                                placeholder="请输入作者"/>
                        )}
                    </InputCount>
                </FormItem>
                <FormItem
                    label="摘要">
                    <InputCount
                        value={getFieldsValue().vsite.desc}
                        max={RELEASE_LENGTH_CONFIG.VSITE_DESC}>
                        {vsiteDesc(
                            <Input
                                maxLength={RELEASE_LENGTH_CONFIG.VSITE_DESC}
                                type="textarea"
                                style={style}
                                placeholder="请输入摘要"/>
                        )}
                    </InputCount>
                </FormItem>
            </div>
        );
    }
}
WeiSite.defaultProps = {
    style: {}
};