import React, {Component} from 'react';
import {Modal, Form, Input, Radio, message, Upload, Button, Icon} from 'antd';
import * as media from 'common/util/media';
import {Editor, getEditorValue, setEditorValue} from 'common/component/UEditor';

const FormItem = Form.Item;
const EDITOR_ID = 'contentHotEditor';

class ContentHotForm extends Component {

    constructor(props) {
        super(props);
    }

    // 富文本编辑器启动
    componentDidMount() {
        // console.log('EDITOR_ID', this.props.data);
        if (this.props.data) {
            setEditorValue(EDITOR_ID, this.props.data.content);
        }
    }

    // 富文本编辑器启动
    componentWillReceiveProps(nextProps) {
        // console.log('nextProps', nextProps);
        if (nextProps.data) {
            setEditorValue(EDITOR_ID, nextProps.data.content);
        }
    }

    handleSubmit = () => {

        let {form, param, save} = this.props;

        form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }

            // 预处理
            let content = getEditorValue(EDITOR_ID);

            if (content == '') {
                message.error('内容不能为空！');
                return null;
            }

            const formData = {
                id: values.id,
                author: values.author,
                content: content,
                contentStatus: values.contentStatus ? values.contentStatus : 'published',
                desc: values.desc,
                thumbMediaId: values.thumbMediaIdList[0].thumbMediaId,
                title: values.title
            };

            // console.dir(formData);
            save(formData, param ? 'update' : 'add');
        });

    };

    // upload 改变时处理函数
    onChangeUpload = (info) => {

        // 大于1张图片,隐藏Upload
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

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 20},
        };

        let {form, visible, reset, param} = this.props;

        const {getFieldDecorator} = form;

        // 构建

        let radioOptions = [
            {label: '未发布', value: 'edit'},
            {label: '已发布', value: 'published'},
        ];

        let radioList = [];

        radioOptions.map((item) => {
            radioList.push(
                <Radio key={item.value} value={item.value}>{item.label}</Radio>
            );
        });

        // Upload属性设置
        const props = {
            name: 'media',
            //media.upLoad
            action: media.addMedia({
                owner: 'platform',
                restype: 'res',
            }),
            withCredentials: true,
            onPreview: () => {

            },
            beforeUpload(file) {

                //需要增加文件大小判定
                const isJPG = file.type === 'image/jpeg';
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
                <Modal title={param ? '修改热点资讯' : '新增热点资讯'}
                       style={{'top': '25px'}}
                       width="960px"
                       visible={visible}
                       onOk={this.handleSubmit}
                       onCancel={reset}>
                    <Form layout="horizontal">
                        {
                            getFieldDecorator('id', {})(
                                <Input type="hidden"/>
                            )
                        }
                        <FormItem
                            {...formItemLayout}
                            label="作者："
                            help="请输入作者名，最少2个字符，最多8个字符。"
                            hasFeedback>
                            {
                                getFieldDecorator('author', {
                                    rules: [{
                                        required: true,
                                        message: '请输入作者名，最少2个字符，最多8个字符。',
                                        min: 2,
                                        max: 8
                                    }],
                                })(
                                    <Input type="text"/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="标题："
                            help="请输入资讯标题，最少2个字符，最多64个字符。"
                            hasFeedback>
                            {
                                getFieldDecorator('title', {
                                    rules: [{
                                        required: true,
                                        message: '请输入资讯标题，最少2个字符，最多64个字符。',
                                        min: 2,
                                        max: 64
                                    }],
                                })(
                                    <Input type="text"/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="摘要："
                            help="请输入资讯摘要，最少2个字符，最多140个字符。"
                            hasFeedback>
                            {
                                getFieldDecorator('desc', {
                                    rules: [{
                                        required: true,
                                        message: '请输入资讯摘要，最少2个字符，最多140个字符。',
                                        min: 2,
                                        max: 140
                                    }],
                                })(
                                    <Input type="textarea" autosize={{minRows: 2, maxRows: 2}}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='缩略图：'
                            help="请上传缩略图，最多可上传1张"
                            hasFeedback>
                            {
                                getFieldDecorator('thumbMediaIdList', {
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
                                    <Upload
                                        {...props}>
                                        <Button type="ghost">
                                            <Icon type="upload"/> 点击上传
                                        </Button>
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内容：">
                            <Editor id="contentHotEditor" height="500px" type="platform"/>
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

        const {data, param} = props;

        if (!param) {
            return {};
        }

        if (data && param) {

            let thumbMediaIdList = [];

            if (data.thumbMediaId) {
                thumbMediaIdList = [{
                    uid: 0,
                    name: '热点资讯缩略图',
                    thumbMediaId: data.thumbMediaId,
                }];
            }

            return {
                id: {
                    value: data.id
                },
                author: {
                    value: data.author
                },
                contentStatus: {
                    value: data.contentStatus
                },
                desc: {
                    value: data.desc
                },
                title: {
                    value: data.title
                },
                thumbMediaIdList: {
                    value: thumbMediaIdList
                }
            };
        } else {
            return {};
        }
    },
    // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key => {

            props.data[key] = fields[key].value;

        });

    }

})(ContentHotForm);
