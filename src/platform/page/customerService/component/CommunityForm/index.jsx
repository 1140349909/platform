import React, {Component} from 'react';
import {Modal, Form, Select, Button, Input, message, Upload, Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import * as media from 'common/util/media';

class CommunityForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                const {status, viewData} = this.props;
                if (status == 'edit') {
                    values.qrcode = values.qrcode[0].thumbMediaId;
                    this.props.updateHelpInfo(viewData.id, values);
                } else {
                    values.qrcode = values.qrcode[0].thumbMediaId;
                    this.props.addHelpCommunity(values);
                }
            }
        });
    };
    onChangeUpload = (info) => {
        // 大于1张图片,隐藏Upload
        if (info.fileList.length > 1) {
            //this.props.form.setFieldsValue('fileList', info.fileList.slice(-1));
            info.fileList = info.fileList.slice(-1);
        } else {
            let fileList = info.fileList;
            fileList.map((file) => {
                if (file.response) {
                    file.thumbMediaId = file.response.data;
                }
                return file;
            });
        }
    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const {form, viewData, status} = this.props;
        const getFieldDecorator = form.getFieldDecorator;

        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 17},
        };

        let footer = (
            <div>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                <Button onClick={this.props.reset}>取消</Button>
            </div>
        );

        let selectOptions = [
            {label: '未启用', value: 'edit'},
            {label: '已启用', value: 'published'},
        ];
        let selectList = [];
        selectOptions.map((item) => {
            selectList.push(
                <Option key={item.value} value={item.value}
                        selected={viewData.status == item.value ? 'selected' : ''}>{item.label}</Option>
            );
        });
        const props = {
            name: 'media',
            listType: 'picture',
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
            withCredentials: true,
            beforeUpload(file) {
                //需要增加文件大小判定
                const isJPG = file.type === 'image/jpeg' || 'image/jpg';
                const isPNG = file.type === 'image/gif';
                const isGIF = file.type === 'image/png';
                if (!isJPG && !isGIF && !isPNG) {
                    message.error('只支持 JPG/GIF/PNG 文件哦！');
                }
                const isSize = file.size < 1548576;
                if (!isSize) {
                    message.error('上传图片大小限制在1M以内！');
                }
                return (isJPG || isGIF || isPNG) && isSize;
            }
        };
        return (
            <div>
                <Modal title={status == 'edit' ? '用户社区问题编辑' : '用户社区问题新增'}
                       width="560px"
                       visible={this.props.visible}
                       footer={footer}
                       onCancel={this.props.reset}>
                    <Form layout="horizontal">
                        <FormItem {...formItemLayout} label="标识">
                            {
                                getFieldDecorator('mark', {
                                    rules: [{
                                        required: true,
                                        message: '请填写用户社区标识符'
                                    }, {
                                        min: 1,
                                        max: 50,
                                        message: '请输入1-50个字符'
                                    }]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="名称">
                            {
                                getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入名称'
                                    }, {
                                        min: 1,
                                        max: 50,
                                        message: '请输入1-50个字符'
                                    }],
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem  {...formItemLayout} label="启用状态">
                            {
                                getFieldDecorator('contentStatus', {
                                    rules: [{
                                        required: true,
                                        message: '请选择启用状态'
                                    }]
                                })(
                                    <Select placeholder="请选择">
                                        {selectList}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem  {...formItemLayout} label="社区分类">
                            {
                                getFieldDecorator('qrcodeType', {
                                    rules: [{
                                        required: true,
                                        message: '请选择用户社区分类'
                                    }]
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="lkwx">官方微信</Option>
                                        <Option value="wx">普通微信群</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            help="请上传二维码，最多可上传1张"
                            label="二维码">
                            {
                                getFieldDecorator('qrcode', {
                                    valuePropName: 'fileList',
                                    normalize: this.normFile,
                                    onChange: this.onChangeUpload,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请上传缩略图，最多可上传1张',
                                            max: 1,
                                            type: 'array'
                                        }
                                    ]
                                })(
                                    <Upload {...props} className="upload-list-inline">
                                        <Button type="ghost">
                                            <Icon type="upload"/> upload
                                        </Button>
                                    </Upload>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {
        const {viewData, status} = props;
        let qrCode = '';
        if (status == 'edit') {
            qrCode = [{
                uid: -1,
                url: media.getMediaUrl(viewData.qrcode),
                thumbUrl: media.getMediaUrl(viewData.qrcode),
                status: 'done',
                response: {
                    data: viewData.qrcode
                }
            }];
        }
        if (viewData) {
            return {
                mark: {
                    value: viewData.mark
                },
                name: {
                    value: viewData.name
                },
                contentStatus: {
                    value: viewData.contentStatus
                },
                qrcodeType: {
                    value: viewData.qrcodeType,
                },
                qrcode: {
                    value: qrCode
                }
            };
        } else {
            return {};
        }
    },
})(CommunityForm);
