import React, {Component} from 'react';
import {Modal, Form, Input, Upload, Icon, Button, InputNumber, message} from 'antd';
import * as media from 'common/util/media';
import './index.less';
import NavTag from 'common/component/NavTag';
import Img from 'common/component/Img';
const FormItem = Form.Item;

class EditSuperviseInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        confirmLoading: false,
        selectedTags: [],
    };

    componentWillMount() {
        const {resOwner} = this.props.tplBaseInfo;
        this.setState({
            selectedTags: resOwner.tags
        });
    }

    handleSubmit = () => {
        const {tplBaseInfo} = this.props;
        const {resOwner} = tplBaseInfo;
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {
                if (this.state.selectedTags.length > 0) {
                    values.coverMediaId = resOwner.appType == 'S' ? resOwner.coverMediaId : values.coverMediaId[0].thumbMediaId;
                    let tplInfo = {
                        id: tplBaseInfo.id,
                        coverMediaId: values.coverMediaId,
                        name: values.name,
                        tags: this.state.selectedTags,
                        ledou: values.ledou
                    };
                    this.props.updateTpl(tplInfo);
                } else {
                    message.error('请选择相关分类');
                }
            }
        });
    };
    onSelect = (objectCheckedKeys) => {
        this.setState({
            selectedTags: objectCheckedKeys
        });
    }
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    onChangeUpload = (info) => {
        if (info.fileList.length > 1) {
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
    _renderUpload = () => {
        const {resOwner} = this.props.tplBaseInfo;
        const props = {
            name: 'media',
            listType: 'picture',
            action: media.addMedia({owner: 'platform', restype: 'res'}),
            withCredentials: true,
            beforeUpload: (file) => {
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
            <Upload {...props} className="upload-list-inline" disabled={resOwner.appType == 'S' ? true : false}>
                <Button type="ghost">
                    <Icon type="upload"/>修改封面
                </Button>
            </Upload>
        );
    }

    render() {
        const formItemLayout = {labelCol: {span: 5}, wrapperCol: {span: 16},};
        const {getFieldDecorator} = this.props.form;
        const {tplBaseInfo, auditStatus} = this.props;
        const {resOwner} =tplBaseInfo;
        return (
            <Modal title="修改"
                   visible={this.props.visible}
                   maskClosable={false}
                   onOk={this.handleSubmit}
                   confirmLoading={this.state.confirmLoading}
                   onCancel={this.props.reset}
                   className='editSuperviseModal'
                   width={500}
            >
                <FormItem
                    {...formItemLayout}
                    label="名称："
                    help="您只能输入最多20个字符">
                    {
                        getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: '您只能输入最多20个字符',
                                max: 20
                            }]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="分类：">
                    {
                        getFieldDecorator('tags', {})(
                            <NavTag data={this.props.tagList} onSelect={this.onSelect}
                                    defaultSelectedKeys={resOwner.tags}/>
                        )
                    }
                </FormItem>
                {
                    resOwner.appType == 'S' &&
                    <FormItem
                        {...formItemLayout}
                        label="封面：">
                        <Img src={media.getMediaUrl(resOwner.coverMediaId)} width={60} height={60}/>
                    </FormItem>
                }
                {
                    resOwner.appType == 'M' &&
                    <FormItem
                        {...formItemLayout}
                        help="请上传封面,最多可上传1张"
                        label="封面：">
                        {
                            getFieldDecorator('coverMediaId', {
                                valuePropName: 'fileList',
                                normalize: this.normFile,
                                onChange: this.onChangeUpload,
                                rules: [
                                    {
                                        required: true,
                                        message: '请上传封面图',
                                        max: 1,
                                        type: 'array'
                                    }
                                ]
                            })(
                                this._renderUpload()
                            )
                        }
                    </FormItem>
                }
                {
                    auditStatus == 's11' &&
                    <FormItem
                        {...formItemLayout}
                        label="价格/乐豆：">
                        {
                            getFieldDecorator('ledou', {})(
                                <InputNumber min={0} max={10000} step={100} disabled={true}/>
                            )
                        }
                    </FormItem>
                }
                {
                    auditStatus != 's11' &&
                    <FormItem
                        {...formItemLayout}
                        label="价格/乐豆：">
                        {
                            getFieldDecorator('ledou', {
                                rules: [{
                                    required: true,
                                    message: '介于0~10000乐豆',
                                    max: 10000,
                                    min: 0,
                                    type: 'number',
                                }]
                            })(
                                <InputNumber min={0} max={10000} step={100}/>
                            )
                        }
                    </FormItem>
                }
            </Modal>
        );
    }
}


export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function ({tplBaseInfo}) {
        const {resOwner} =  tplBaseInfo;
        let coverImg = '';
        //封面图
        if (resOwner) {
            coverImg = [{
                uid: -1,
                url: media.getMediaUrl(resOwner.coverMediaId),
                thumbUrl: media.getMediaUrl(resOwner.coverMediaId),
                status: 'done',
                response: {
                    data: resOwner.coverMediaId
                }
            }];
        }
        if (resOwner) {
            return {
                name: {
                    value: resOwner.title
                },
                tags: {
                    value: resOwner.tags
                },
                coverMediaId: {
                    value: coverImg
                },
                ledou: {
                    value: resOwner.ledou
                }
            };

        } else {
            return {};
        }
    }
})(EditSuperviseInfo);
