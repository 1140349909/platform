import React, {Component} from 'react';
import {Button, Form, Upload, Icon, message} from 'antd';
import * as media from 'common/util/media';
import PreviewForm from './PreviewForm';

const createForm = Form.create;
const FormItem = Form.Item;

// let uuid = 0;
/*封装模态框类，与表单配合使用*/
class BannerForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        // 图片信息列表
        fileList: [],

        // 图片src地址
        bannerImgIdData: '',

        // 图片缩略图弹出层状态
        previewVisible: false,
        previewImage: ''
    };

    handleSubmit = ()=> {

        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                let bannerList = [];

                if (values.banners != undefined) {
                    for (let k = 0; k < values.banners.length; k++) {
                        bannerList.push(values.banners[k].submitData);
                    }
                } else {
                    message.error('请上传图片！');
                    return;
                }

                let formData = {
                    banners: bannerList
                };

                // 验证
                this.props.updateManagerBanner(this.props.buyType, formData);

            }
        });
    };


    // upload 改变时处理函数
    onChange(info) {

        // 大于5张图片,隐藏Upload
        if (info.fileList.length > 5) {
            info.fileList = info.fileList.slice(0, 5);
            message.warn('最多支持上传5张图片');
        } else {
            let fileList = info.fileList;
            fileList = fileList.map((file) => {

                if (!file.submitData && file.status == 'done') {
                    file.submitData = {
                        mediaId: (file.response.data),
                        seq: fileList.length - 1,
                        title: '',
                        url: ''
                    };
                }

                if (file.response) {
                    file.url = media.getMediaUrl(file.response.data);
                }
                return file;
            });
        }
    }

    normFile = (e)=> {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    handleCancel = ()=> {
        this.setState({
            previewVisible: false
        });
    };

    render = ()=> {

        let {data} = this.props;

        if (!data) {
            return null;
        }

        /*表单相应设置*/

        const {getFieldDecorator} = this.props.form;

        /*移植代码*/

        // Upload属性设置
        const props = {
            name: 'media',
            //media.upLoad
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
            listType: 'picture-card',
            withCredentials: true,
            onPreview: (file) => {

                this.setState({
                    bannerSetting: file.submitData,
                    bannerImgIdData: file.url,
                    previewVisible: true
                });


            },
            beforeUpload(file) {

                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/gif';
                const isGIF = file.type === 'image/png';

                if (!isJPG && !isGIF && !isPNG) {
                    message.error('只支持 JPG/GIF/PNG 文件哦！');
                }
                return isJPG || isGIF || isPNG;
            }
        };

        // 表单验证及属性相关设置
        return (
            <div>
                <div style={{'margin': '0 auto'}}>
                    <Form inline>

                        <div style={{'margin': '16px 80px'}} className="banner-fix">
                            <FormItem
                                label='图片：'>
                                {
                                    getFieldDecorator('banners', {
                                        valuePropName: 'fileList',
                                        normalize: this.normFile,
                                        onChange: this.onChange,
                                        rules: [
                                            {
                                                // required: true,
                                                message: '请上传banner图,最多可上传5张',
                                                max: 5,
                                                type: 'array'
                                            }
                                        ]
                                    })(
                                        <Upload
                                            {...props}>
                                            <div>
                                                <Icon type="plus"/>
                                                <div className="ant-upload-text">
                                                    上传图片
                                                </div>
                                            </div>
                                        </Upload>
                                    )
                                }
                            </FormItem>
                        </div>

                        <div style={{'margin': '16px 0 0 128px'}}>
                            <FormItem>

                                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                            </FormItem>
                        </div>
                    </Form>

                </div>

                <br/>

                {/*这是非模态预览框，需要测试*/}
                <PreviewForm
                    src={this.state.bannerImgIdData}
                    banner={this.state.bannerSetting}
                />

            </div>

        );
    };

}

export default createForm({
    /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
    mapPropsToFields: function (props) {

        let {data} = props;

        // console.log(data);

        if (data.banners.length != 0) {

            // 转换为banner图可识别的数据格式
            let bannersList = [];

            data.banners.map((item, index) => {
                bannersList[index] = {
                    uid: index,
                    name: index,
                    url: media.getMediaUrl(item.mediaId),
                    thumbUrl: media.getMediaUrl(item.mediaId),
                    response: {
                        data: item.mediaId
                    },
                    submitData: {
                        mediaId: item.mediaId,
                        title: item.title,
                        url: item.url,
                        seq: item.seq
                    }
                };
            });

            return {
                banners: {
                    value: bannersList
                }

            };

        } else {
            return {};
        }
    },
    /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key=> {

            props.data[key] = fields[key].value;

        });

    }
})(BannerForm);




