import React from 'react';
import {Form, Input} from 'antd';
import * as media from 'common/util/media';
import UploadFrame from 'common/component/UploadFrame';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthUpload from 'common/component/AuthUpload';
import InputCount from 'common/component/InputCount';
import {RELEASE_LENGTH_CONFIG} from 'common/config/content';
import * as module from 'common/config/module';
import _ from 'lodash';
const FormItem = Form.Item;
export default class Weibo extends AuthComponentBase {
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
            if (_.has(this.props.form.getFieldsValue(), 'wb.imgId.file.response.data')) {
                if (!this.props.form.getFieldsValue().wb.imgId.file.response.data && _.has(this.props.data.wb, 'imgUrl')) {
                    mediaUrl = this.props.data.wb.imgUrl;
                } else {
                    mediaUrl = this.props.form.getFieldsValue().wb.imgId.file.response.data;
                }
            } else {
                if (_.has(this.props, 'data.wb.imgUrl')) {
                    mediaUrl = this.props.data.wb.imgUrl;
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
        if (!this.props.data.wb.imgUrl) {
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
            if (!_.has(this, 'props.data.wb.imgUrl') || !this.props.data.wb.imgUrl) {
                return {
                    rules: this.getRules('object')
                }
            } else {
                return {}
            }
        }

        const uploadFileProps = getFieldDecorator('wb.imgId', {
            onChange: this.uploadChange,
            ...getImgRules()
        });

        const style = {
            width: '210px',
        };
        const wbDesc = getFieldDecorator('wb.desc', {rules: this.getRules()});
        return (
            <div className="content-distribution-weibo" style={this.props.style}>
                <FormItem
                    className="content-distribution-upload"
                    label="封面">
                    {uploadFileProps(
                        <AuthUpload
                            {...uploadProps}
                            onCropperChange={this.props.onCropperChange}
                            type={module.CONTENT_RICHTEXT_UPLOAD}>
                            <UploadFrame
                                error={getFieldError('wb.imgId')}
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
                    label="摘要">
                    <InputCount
                        value={getFieldsValue().wb.desc}
                        max={RELEASE_LENGTH_CONFIG.WB_DESC}>
                        {wbDesc(
                            <Input
                                maxLength={RELEASE_LENGTH_CONFIG.WB_DESC}
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
Weibo.defaultProps = {
    style: {}
};