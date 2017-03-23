import React, {Component} from 'react';
import {Modal, Form, Radio, message, Upload, Icon, Select, Button, InputNumber} from 'antd';
import {OWNER, MEDIA_RES_TYPE, PLATFORM_TYPE} from 'common/config/constants';
import * as media from 'common/util/media';
import {booleanToString} from 'common/util';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class MediaForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            platform: props.platform,
            resType: props.resType,
            sort: props.sort,
            children: []
        };
    }

    onChange = (value) => {
        this.props.getMediaTypes(value);
    };

    tagTypeOnChange = (e)=> {
        this.props.getTagsList(e.target.value);
    };

    tagOnchange = (value)=> {

        const dataSource = value.split(',');

        const children = [];

        for (let i = 0; i < dataSource.length; i++) {
            children.push(<Option key={i} value={dataSource[i]}>{dataSource[i]}</Option>);
        }

        this.setState({
            children: children
        });
    };

    handleSubmit = (e)=> {

        e.preventDefault();

        let {updateMedia,form,param} = this.props;

        form.validateFields((errors, values) => {
            if (errors) {
                return;
            } else {

                values.lib = values.isLib;

                updateMedia(param,values);
            }
        });
    };

    render() {

        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };

        let {form, visible, reset, mediaTypes, list, tagList, param} = this.props;

        let {children} = this.state;

        const {getFieldDecorator, getFieldValue} = form;

        // 构建
        let upLoadUrl = media.addMedia({
            owner: getFieldValue('owner'),
            restype: getFieldValue('restype'),
            params: {
                isLib: booleanToString(getFieldValue('isLib')),
                categoryId: getFieldValue('categoryId'),
                ledou: getFieldValue('ledou'),
                tags: getFieldValue('tags')
            }
        });

        // Upload属性设置
        const props = {
            name: 'media',
            action: upLoadUrl,
            multiple: true,
            showUploadList: false,
            withCredentials: true,
            onChange: (info)=> {

                switch (info.file.status) {
                    case 'uploading':
                        // reset();
                        message.loading('上传中，请稍候...');
                        break;
                    case 'done':
                        message.destroy();
                        message.success('上传完成...');
                        list(0);
                        break;
                    case 'error':
                        message.destroy();
                        message.error('上传出错，请重试...');
                        list(0);
                        break;
                }
            },
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

        let ownerList = {
            'anonym': '匿名',
            'wechat': '微信',
            'users': '注册用户',
            'biz': '商业',
            'v': '微账户',
            'platform': '平台运营用户'
        };

        let platformList = {
            'cms': '内容直通车',
            'vveshow': '移动微秀场',
            'iloka': '艾乐卡',
            'projects': '项目',
            'interact': '互动平台',
            'buy': '交易平台',
            'platform': '平台管理系统'
        };

        let resTypeList = {
            'res': '资源',
            'face': '人脸',
            'tker': '推客',
            'headimg': '头像',
            'cover': '封面',
            'share': '分享',
            'show': '晒图',
            'vcard': '名片',
            'bg': '背景',
            'shape': '图形',
            'banner': '广告条',
            'redenvelope': '红包',
            'coupon': '优惠券',
            'integral': '积分',
            'distribute': '分发',
            'feedback': '反馈',
            'font': '字体',
            'resume': '简历'
        };

        // 构建options
        let ownerOptionsList = [];

        for (let i in OWNER) {
            if (OWNER.hasOwnProperty(i)) {
                ownerOptionsList.push(
                    <Option value={OWNER[i]} key={OWNER[i]}>{ownerList[OWNER[i]]}</Option>
                );
            }
        }

        let resTypeOptionsList = [];

        for (let i in MEDIA_RES_TYPE) {
            if (MEDIA_RES_TYPE.hasOwnProperty(i)) {
                resTypeOptionsList.push(
                    <Option value={MEDIA_RES_TYPE[i]} key={MEDIA_RES_TYPE[i]}>{resTypeList[MEDIA_RES_TYPE[i]]}</Option>
                );
            }
        }

        let platformOptionsList = [];

        for (let i in PLATFORM_TYPE) {
            if (PLATFORM_TYPE.hasOwnProperty(i)) {
                platformOptionsList.push(
                    <Option value={PLATFORM_TYPE[i]} key={PLATFORM_TYPE[i]}>{platformList[PLATFORM_TYPE[i]]}</Option>
                );
            }
        }

        let mediaTypesList = [];

        mediaTypes.map((item)=> {
            mediaTypesList.push(
                <Option value={item.id} key={item.id}>{item.name}</Option>
            );
        });

        // console.dir(tagList);

        let tagTypesList = [];

        tagList.map((item)=> {

            let tags = [];

            item.tags.map((item)=> {
                tags.push(item.name);
            });

            tagTypesList.push(
                <Option value={tags.toString()} key={item.id}>{item.name}</Option>
            );
        });

        let title = param ? '修改媒体文件' : '上传媒体文件';

        let footer = (
            <div>
                {!param && <Upload {...props}>
                    <Button type="primary" disabled={getFieldValue('isLib') && !getFieldValue('categoryId')}>
                        <Icon type="upload"/> 选择文件并上传
                    </Button>
                </Upload>}
                {
                    param && <Button type="primary" onClick={this.handleSubmit}>
                        确定
                    </Button>
                }
            </div>
        );

        return (
            <div>
                <Modal title={title}
                       width="560px"
                       visible={visible}
                       footer={footer}
                       onCancel={reset}>
                    <Form layout="horizontal">
                        <FormItem
                            {...formItemLayout}
                            label="上传用户类型："
                            help="请选择上传用户类型"
                            hasFeedback>
                            {
                                getFieldDecorator('owner', {
                                    rules: [{
                                        required: true,
                                        message: '请选择上传用户类型'
                                    }]
                                })(
                                    <Select placeholder="请选择上传用户类型" style={{width: '50%'}}
                                            disabled={true}>
                                        {ownerOptionsList}
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="上传资源类型："
                            help="请选择上传资源类型"
                            hasFeedback>
                            {
                                getFieldDecorator('restype', {
                                    rules: [{
                                        required: true,
                                        message: '请选择上传资源类型'
                                    }]
                                })(
                                    <Select placeholder="请选择上传资源类型" style={{width: '50%'}}>
                                        {resTypeOptionsList}
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="是否为库文件："
                            help="请选择是否为库文件"
                            hasFeedback>
                            {
                                getFieldDecorator('isLib', {
                                    rules: [{
                                        type: 'boolean',
                                        required: true,
                                        message: '请选择是否为库文件'
                                    }]
                                })(
                                    <RadioGroup>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>

                        {getFieldValue('isLib') && <FormItem
                            {...formItemLayout}
                            label="媒体文件平台："
                            help="请选择媒体文件平台，仅当该平台下有具体分类时可上传资源"
                            hasFeedback>
                            {
                                getFieldDecorator('platform', {
                                    rules: [{
                                        required: true,
                                        message: '请选择媒体文件平台'
                                    }]
                                })(
                                    <Select placeholder="请选择媒体文件平台"
                                            style={{width: '50%'}}
                                            onChange={this.onChange}>
                                        {platformOptionsList}
                                    </Select>
                                )
                            }
                        </FormItem>}

                        {getFieldValue('isLib') && mediaTypesList.length != 0 && <FormItem
                            {...formItemLayout}
                            label="该平台下分类："
                            help="请选择该平台下分类"
                            hasFeedback>
                            {
                                getFieldDecorator('categoryId', {
                                    rules: [{
                                        required: true,
                                        message: '请选择该平台下分类'
                                    }]
                                })(
                                    <Select placeholder="请选择该平台下分类"
                                            style={{width: '50%'}}>
                                        {mediaTypesList}
                                    </Select>
                                )
                            }
                        </FormItem>}

                        {getFieldValue('isLib') && <FormItem
                            {...formItemLayout}
                            label="乐豆："
                            help="请输入乐豆面值"
                            hasFeedback>
                            {
                                getFieldDecorator('ledou', {
                                    rules: [{
                                        type: 'number',
                                        min: 0,
                                        required: true,
                                        message: '请输入乐豆面值'
                                    }]
                                })(
                                    <InputNumber min={0}/>
                                )
                            }
                        </FormItem>}
                        {getFieldValue('isLib') && <FormItem
                            {...formItemLayout}
                            label="平台标签："
                            help="请选择平台标签"
                            hasFeedback>
                            {
                                getFieldDecorator('tagType', {
                                    rules: [{
                                        required: true,
                                        message: '请选择平台标签'
                                    }]
                                })(
                                    <RadioGroup onChange={this.tagTypeOnChange}>
                                        <Radio value='app' disabled>应用</Radio>
                                        <Radio value='tpl' disabled>模板</Radio>
                                        <Radio value='material'>素材</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>}
                        {getFieldValue('isLib') && tagTypesList.length != 0 && <FormItem
                            {...formItemLayout}
                            label="该平台下标签："
                            help="请选择该平台下标签"
                            hasFeedback>
                            {
                                getFieldDecorator('tag', {
                                    rules: [{
                                        required: true,
                                        message: '请选择该平台下标签'
                                    }]
                                })(
                                    <Select placeholder="请选择该平台下标签"
                                            style={{width: '50%'}}
                                            onChange={this.tagOnchange}>
                                        {tagTypesList}
                                    </Select>
                                )
                            }
                        </FormItem>}
                        {getFieldValue('isLib') && getFieldValue('tag') && <FormItem
                            {...formItemLayout}
                            label='标签'
                            hasFeedback
                            help='请输入标签，按回车确定'>
                            {getFieldDecorator('tags', {
                                rules: [
                                    {
                                        required: true,
                                        type: 'array',
                                        min: 1,
                                        message: '至少输入一组标签'
                                    }
                                ]
                            })(
                                <Select
                                    tags
                                    searchPlaceholder='标签模式'>
                                    {children}
                                </Select>
                            )}
                        </FormItem>}
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create({
    // 把 props 转为对应的值，可用于把 Redux store 中的值读出
    mapPropsToFields: function (props) {

        const {data} = props;

        if (data) {
            return {
                owner: {
                    value: 'platform'
                },
                restype: {
                    value: data.restype ? data.restype : 'res'
                },
                isLib: {
                    value: data.isLib ? data.isLib : false
                },
                platform: {
                    value: data.platform ? data.platform : ''
                },
                ledou: {
                    value: data.ledou ? data.ledou : 0
                },
                tagType: {
                    value: data.tagType ? data.tagType : 'material'
                },
                categoryId: {
                    value: data.categoryId ? data.categoryId : ''
                },
                tag: {
                    value: data.tag ? data.tag : ''
                },
                tags: {
                    value: data.tags ? data.tags : []
                },

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

})(MediaForm);
