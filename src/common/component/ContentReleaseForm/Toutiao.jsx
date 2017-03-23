import React from 'react';
import {Form, Input} from 'antd';
import * as media from 'common/util/media';
import AuthComponentBase from 'common/base/AuthComponentBase';
import UploadFrame from 'common/component/UploadFrame';
import InputCount from 'common/component/InputCount';
import {RELEASE_LENGTH_CONFIG} from 'common/config/content';
import AuthUpload from 'common/component/AuthUpload';
import _ from 'lodash';
const FormItem = Form.Item;
export default class Toutiao extends AuthComponentBase {
    constructor(props) {
        super(props);
    }
    state = {
        // 图片id
        mediaUrl: '',
        // 图片上传状态
        status: 'not',
    };
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
            if (_.has(this.props.form.getFieldsValue(), 'toutiao.imgId.file.response.data')) {
                if (!this.props.form.getFieldsValue().toutiao.imgId.file.response.data && _.has(this.props.data.toutiao, 'imgUrl')) {
                    mediaUrl = this.props.data.toutiao.imgUrl;
                } else {
                    mediaUrl = this.props.form.getFieldsValue().toutiao.imgId.file.response.data;
                }
            } else {
                if (_.has(this.props, 'data.toutiao.imgUrl')) {
                    mediaUrl = this.props.data.toutiao.imgUrl;
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
    // 图片上传回调
    uploadChange = (data) => {
        const status = data.file.status;
        if (status == 'uploading') {
            // 图片上传状态改变
            this.setState({
                status: 'pending'
            });
        } else if (status == 'done') {
            this.setState({
                mediaUrl: data.file.response.data,
                status: 'done',
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
        if (!this.props.data.toutiao.imgUrl) {
            return this.getRules('object')
        } else {
            return {}
        }
    }

    render() {
        const {getFieldDecorator, getFieldsValue, getFieldError} = this.props.form;
        const style = {
            width: '210px',
        };

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
            if (!_.has(this, 'props.data.toutiao.imgUrl') || !this.props.data.toutiao.imgUrl) {
                return {
                    rules: this.getRules('object')
                }
            } else {
                return {}
            }
        }

        const uploadFileProps = getFieldDecorator('toutiao.imgId', {
            onChange: this.uploadChange,
            ...getImgRules()
        });

        let titleRule = this.getRules();

        if (this.props.enable) {
            titleRule = titleRule.concat([{min:5}]);
        }

        const toutiaoTitle = getFieldDecorator('toutiao.title', {rules: titleRule});
        const toutiaoDesc = getFieldDecorator('toutiao.desc', {rules: this.getRules()});

        return (
            <div className="content-distribution-Toutiao" style={this.props.style}>
                <FormItem
                    className="content-distribution-upload"
                    label="封面">
                    {uploadFileProps(
                        <AuthUpload
                            {...uploadProps}
                            onCropperChange={this.props.onCropperChange}
                            type={module.CONTENT_RICHTEXT_UPLOAD}>
                            <UploadFrame
                                error={getFieldError('toutiao.imgId')}
                                width="210px"
                                height="144px"
                                tip="可上传任意尺寸"
                                mediaUrl={this.state.mediaUrl}
                                status={this.state.status}/>
                        </AuthUpload>
                    )
                    }
                </FormItem>
                <FormItem
                    label="标题">
                    <InputCount
                        value={getFieldsValue().toutiao.title}
                        max={RELEASE_LENGTH_CONFIG.TOUTIAO_TITLE_MAX}>
                        {toutiaoTitle(
                            <Input
                                maxLength={RELEASE_LENGTH_CONFIG.TOUTIAO_TITLE_MAX}
                                type="text"
                                style={style}
                                placeholder="限制5-30个字符"/>
                        )}
                    </InputCount>
                </FormItem>
                <FormItem
                    label="摘要">
                    <InputCount
                        value={getFieldsValue().toutiao.desc}
                        max={RELEASE_LENGTH_CONFIG.TOUTIAO_DESC_MAX}>
                        {toutiaoDesc(
                            <Input
                                maxLength={RELEASE_LENGTH_CONFIG.TOUTIAO_DESC_MAX}
                                type="textarea"
                                style={style}
                                placeholder="最多140个字符"/>
                        )}
                    </InputCount>
                </FormItem>
            </div>
        );
    }
}
Toutiao.defaultProps = {
    style: {}
};
