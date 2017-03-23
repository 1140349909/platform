import React, {Component} from 'react';
import {Modal, Form, Input, Radio, Checkbox, message, Select, Upload, Button, Icon} from 'antd';
import {Editor, getEditorValue, setEditorValue} from 'common/component/UEditor';
import './index.less';
import * as media from 'common/util/media';

// <Editor id="contentEditor" height="450px" type="bs"/>

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const EDITOR_ID = 'contentBulkEditor';


class ContentBulkForm extends Component {

    constructor(props) {
        super(props);
    }

    // 富文本编辑器启动
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

    handleSubmit = ()=> {

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

            var reg1 = new RegExp('"_135', 'g');
            var reg2 = new RegExp('"135', 'g');

            content = content.replace(reg1, '"ILoka');
            content = content.replace(reg2, '"ILoka');


            let formData = {
                id: values.id,
                content: content,
                coverMediaId: values.coverMediaIdList && values.coverMediaIdList.length != 0 ? values.coverMediaIdList[0].coverMediaId : '',
                name: values.name,
                resType: values.resType,
            };

            if (values.bulkType == 'tpl') {
                formData.title = values.title;
                formData.tagIds = values.tagIds;
                formData.tags = values.tags;

                if (values.effect != '') {
                    formData.style = {
                        effect: values.effect
                    };
                }
            }

            // console.dir(formData);
            save(formData, values.bulkType, param ? 'update' : 'add');
        });

    };

    // upload 改变时处理函数
    onChangeUpload = (info)=> {

        // 大于1张图片,隐藏Upload
        if (info.fileList.length > 1) {
            info.fileList = info.fileList.slice(-1);
        } else {
            let fileList = info.fileList;
            fileList.map((file) => {

                if (file.response) {
                    file.coverMediaId = file.response.data;
                }
                return file;
            });
        }
    };

    normFile = (e)=> {
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

        let {form, visible, reset, param, tagList} = this.props;

        const {getFieldDecorator, getFieldValue} = form;

        // 构建
        let options = [
            {label: '活动', value: 'h5'},
            {label: '图文', value: 'content'},
            {label: '商品', value: 'product'},
            {label: '互动', value: 'interact'},
            {label: '外链', value: 'links'},
            {label: '模板', value: 'contentTpl'},
        ];

        let radioOptions = [
            {label: '标题', value: 'bt'},
            {label: '正文', value: 'zw'},
            {label: '图文', value: 'tw'},
            {label: '关注', value: 'gz'},
            {label: '二维码', value: 'qr'},
            {label: '分隔符', value: 'fgf'},
            {label: '模板', value: 'tpl'},
        ];

        let radioList = [];

        radioOptions.map((item)=> {
            radioList.push(
                <Radio key={item.value} value={item.value}>{item.label}</Radio>
            );
        });

        let tagOptions = [];

        tagList.map((item)=> {
            tagOptions.push(
                <Option key={item.id} value={item.id}>{item.name}</Option>
            );
        });

        let tagIdsOptions = [];

        tagList.map((item)=> {

            if (item.id == getFieldValue('tagName')) {

                item.tags.map((child)=> {
                    tagIdsOptions.push(
                        <Option key={child.tagId} value={child.tagId}>{child.name}</Option>
                    );
                });
            }
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
                <Modal title={param ? '修改资讯块' : '新增资讯块'}
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
                            label="资讯块类型："
                            help="请选择资讯块类型"
                            hasFeedback>
                            {
                                getFieldDecorator('bulkType', {
                                    initialValue: 'bt',
                                    rules: [{
                                        required: true,
                                        message: '请选择资讯块类型'
                                    }]
                                })(
                                    <RadioGroup disabled={param}>
                                        {radioList}
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        {
                            getFieldValue('bulkType') == 'tpl' && (
                                <div>
                                    <FormItem
                                        {...formItemLayout}
                                        label='特效：'
                                        help="可选">
                                        {
                                            getFieldDecorator('effect', {})(
                                                <Select style={{'width': '50%'}}>
                                                    <Option value="">无</Option>
                                                    <Option value="snow">飘雪</Option>
                                                    <Option value="flowers">飘花</Option>
                                                    <Option value="stars">亮晶晶</Option>
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label='缩略图：'
                                        help="请上传缩略图，最多可上传1张"
                                        hasFeedback>
                                        {
                                            getFieldDecorator('coverMediaIdList', {
                                                valuePropName: 'fileList',
                                                normalize: this.normFile,
                                                onChange: this.onChangeUpload,
                                                rules: [
                                                    {
                                                        required: false,
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
                                        label="标题："
                                        help="请输入标题，最少2个字符，最多32个字符"
                                        hasFeedback>
                                        {
                                            getFieldDecorator('title', {
                                                rules: [{
                                                    min: 2,
                                                    max: 32,
                                                    required: true,
                                                    message: '请输入标题，最少2个字符，最多32个字符'
                                                }]
                                            })(
                                                <Input type="text"/>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="分类："
                                        help="请选择分类"
                                        hasFeedback>
                                        {
                                            getFieldDecorator('tagName', {})(
                                                <Select style={{'width': '50%'}}>
                                                    {tagOptions}
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="标签："
                                        help="请选择标签"
                                        hasFeedback>
                                        {
                                            getFieldDecorator('tagIds', {})(
                                                <Select tags style={{'width': '50%'}}>
                                                    {tagIdsOptions}
                                                </Select>
                                            )
                                        }
                                    </FormItem>
                                </div>
                            )
                        }

                        <FormItem
                            {...formItemLayout}
                            label="名称："
                            help="请输入资讯块名称，最少2个字符，最多32个字符"
                            hasFeedback>
                            {
                                getFieldDecorator('name', {
                                    rules: [{
                                        min: 2,
                                        max: 32,
                                        required: true,
                                        message: '请输入资讯块名称，最少2个字符，最多32个字符'
                                    }]
                                })(
                                    <Input type="text"/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="资源类型："
                            help="请选择资源类型，最少选择1项"
                            hasFeedback>
                            {
                                getFieldDecorator('resType', {
                                    initialValue: ['content'],
                                    rules: [{
                                        min: 1,
                                        type: 'array',
                                        required: true,
                                        message: '请选择资源类型，最少选择1项'
                                    }]
                                })(
                                    <CheckboxGroup options={options}/>
                                )
                            }
                        </FormItem>


                        <FormItem
                            label="内容："
                            {...formItemLayout}>
                            <Editor className="content-bulk-form-editor" id="contentBulkEditor" height="500px"
                                    type="platform"/>
                        </FormItem>
                        <ul>
                            <li>1. 图片最好定宽不定高;</li>
                            <li>2. 圆形的图片请保证原图是正方形;</li>
                            <li>3. 上传内容后请仔细检查版式是否变形;</li>
                            <li>4. 元素的style禁止使用position属性,否则推送到微信中内容会被过滤掉</li>
                            <li>5. <a href="http://cdn.vveshow.com/cloud/oss/bs/bulk/rule-2.0.docx" target="_blank">主题色详细规则</a>
                            </li>
                        </ul>
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

            let coverMediaIdList = [];

            if (data.coverMediaId) {
                coverMediaIdList = [{
                    uid: 0,
                    name: '资讯块缩略图',
                    coverMediaId: data.coverMediaId,
                }];
            }

            return {
                id: {
                    value: data.id
                },
                bulkType: {
                    value: data.bulkType
                },
                name: {
                    value: data.name
                },
                effect: {
                    value: data.style ? data.style.effect : ''
                },
                /*content: {
                 value: data.content
                 },*/
                resType: {
                    value: data.resType
                },
                coverMediaIdList: {
                    value: coverMediaIdList
                },
                title: {
                    value: data.title
                },
                tagIds: {
                    value: data.tagIds
                }
            };
        } else {
            return {};
        }
    },
    // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
    onFieldsChange: function (props, fields) {

        const keys = Object.keys(fields);

        keys.forEach(key=> {

            props.data[key] = fields[key].value;

        });

    }

})(ContentBulkForm);
