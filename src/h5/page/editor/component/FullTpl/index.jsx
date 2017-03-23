import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {Modal, Checkbox, Form, Input, Row, Col, message} from 'antd';
import NavTag from 'common/component/NavTag';
import CropperUpload from 'common/component/CropperUpload';
import {MEDIA_RES_TYPE, OWNER} from 'common/config/constants';
import * as media from 'common/util/media';
import {autoSizePic} from 'common/util';
import * as TagAction from '../../../../store/tag/action';
import * as h5TplAction from '../../../../store/h5Tpl/action';
import {redirect} from 'common/util';
import Img from 'common/component/Img';
import  _ from 'lodash';
import './index.less';
const FormItem = Form.Item;
@connect(
    state => ({
        operation: state.operation,
        h5Tpl: state.h5Tpl.toJS(),
        tag: state.tag.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...TagAction,
            ...h5TplAction
        }, dispatch)
    })
)
class FullTpl extends PageBase {
    constructor(props) {
        super(props);
        this.defaultSelectedKeys = this.props.data.tags;
    }

    state = {
        coverMediaId: '',
        tagsStatus: '',
        objectCheckedArrays: [],
        resType: '',
        data: [],
        imgUrl: '',
        checked: true
    };

    componentDidMount() {
        this.props.actions.getUserTagsList('app');
        const {data} = this.props;
        this.setState({
            coverMediaId: data.coverMediaId,
            imgUrl: media.getMediaUrl(data.coverMediaId)
        });
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case TagAction.GET_TAGS_LIST_SUCCESS:
                let tagData = this._renderTag();
                this.setState({
                    data: tagData.data,
                });
                this.props.onLoad();
                break;
            case h5TplAction.ADD_TPL_DATA_SUCCESS:
                this.props.onDone();
                message.success('模板生成成功');
                break;

            case h5TplAction.SAVE_TPL_DATA_SUCCESS:
                this.props.onDone();
                message.success('模板更新成功');
                break;
        }
    }

    //渲染筛选标签
    _renderTag = () => {
        const {tagList} =this.props.tag;
        let tagListData = {
            data: [],
            defaultSelectedKeys: []
        };
        if (!tagList) {
            return;
        }
        _.map(tagList, (tag) => {
            let tagObj = {
                title: tag.name,
                key: tag.id,
                type: 'radioCancel',
                children: []
            };
            _.map(tag.tags, (item, key) => {
                let detailTag = {
                    title: item.name,
                    key: item.name,
                    type: item.type
                };
                if (key == 0) {
                    tagListData.defaultSelectedKeys.push(item.name);
                }
                tagObj.children.push(detailTag);
            });
            tagListData.data.push(tagObj);
        });

        if (!this.defaultSelectedKeys) {
            this.defaultSelectedKeys = tagListData.defaultSelectedKeys;
        }
        this.setState({
            objectCheckedArrays: this.defaultSelectedKeys
        });
        return tagListData;
    }

    onSelect = (objectCheckedArrays) => {
        this.setState({
            objectCheckedArrays: objectCheckedArrays
        });
    }

    // 裁剪完成之后回调
    uploadDone = (data, status) => {
        if (status == 'success') {
            this.setState({
                coverMediaId: data,
                imgUrl: media.getMediaUrl(data)
            });
        }
    }

    handleSubmit = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                if (this.state.imgUrl) {
                    if (this.state.objectCheckedArrays.length == 0) {
                        message.error('请选择分类');
                        return;
                    }
                    if (!this.state.checked) {
                        message.error('您还未同意作品生成整套模板');
                        return;
                    }
                    const {data, isEditTpl}= this.props;

                    let params = {
                        coverMediaId: this.state.coverMediaId,
                        name: values.name,
                        pages: data.pages,
                        tplsId: data.tplsId,
                        shapeData: data.shapeData,
                        shapeImg: data.shapeImg,
                        formData: data.formData,
                        richData: data.richData,
                        fontFiles: data.fontFiles,
                        tags: this.state.objectCheckedArrays,
                        appId: data.appId,
                        id: data.id,
                        mediaIds: data.mediaIds
                    };

                    if (data.id && !isEditTpl) {
                        Modal.confirm({
                            title: '当前操作将覆盖原模板！',
                            content: '该作品已生成过模板，当前操作将覆盖原模板！',
                            onOk: () => {
                                this.addTplChildren(params);
                            },
                        });
                    } else {
                        this.addTplChildren(params);
                    }
                } else {
                    message.error('请上传封面');
                }
            } else {
                if (errors.tags && errors.tags.errors.length > 0 && this.state.objectCheckedArrays.length == 0) {
                    this.setState({
                        tagsStatus: 'error',
                    });
                } else {
                    this.setState({
                        tagsStatus: 'success',
                    });
                }
            }
        });
    };

    //获取标签
    getTagsList = (tagType) => {
        this.props.actions.getUserTagsList(tagType);
    }

    //生成模板
    addTplChildren = (params) => {
        this.props.actions.updateTpl(params);
    }
    //是否同意生成模板
    onChange = (e) => {
        this.setState({
            checked: e.target.checked
        });
    }
    //查看协议内容
    goAgreementPage = () => {
        redirect('marketing.html#/agreement', '_blank', {});
    }

    render() {

        if (this.state.data.length === 0) {
            return null;
        }

        const formItemLayout = {labelCol: {span: 5}, wrapperCol: {span: 16}};
        const {getFieldDecorator} = this.props.form;
        const crooperOptions = {
            aspectRatio: 200 / 280,
            width: 200,
            height: 280
        };
        const tplImgIdProps = {
            fileName: 'headImg',
            options: {
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
                },
            }
        };
        const uploadProps = {
            name: 'media',
            showUploadList: false,
            withCredentials: true,
            action: media.addMedia({owner: OWNER.BIZ, restype: MEDIA_RES_TYPE.RES}),
        };
        return (
            <Modal title="生成整套模板" visible={true}
                   onCancel={this.props.reset}
                   onOk={this.handleSubmit}
                   width={900}
            >
                <div className='FullTplContainer'>
                    <Row type="flex" justify="space-around" align="top">
                        <Col span={4}>
                            <CropperUpload
                                modalDesc={'请上传200px*280px尺寸的图片,上传超过1.5M的图片，会进行压缩处理，图片会失真'}
                                form={this.props.form}
                                uploadDone={this.uploadDone}
                                crooperOptions={crooperOptions}
                                uploadFileProps={tplImgIdProps}
                                uploadProps={uploadProps}>
                                <div className='default-preview-image'>
                                    {
                                        !_.isEmpty(this.state.imgUrl) &&
                                        <div className='preview-image'>
                                            <Img onLoad={this.handleImgLoad} src={this.state.imgUrl}/>
                                            <div className='default-img-hover'>更换封面</div>
                                        </div>
                                    }
                                    {
                                        _.isEmpty(this.state.imgUrl) &&
                                        <div className='preview-image'>
                                            <Img src='./default.png' width='130' height='182'/>
                                            <div className='default-img-hover'>上传封面</div>
                                        </div>
                                    }

                                </div>
                            </CropperUpload>
                        </Col>
                        <Col span={20}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="模板名称：">
                                    {
                                        getFieldDecorator('name', {
                                            rules: [{
                                                required: true,
                                                message: '您最多只能输入12个字符',
                                                max: 12
                                            }]
                                        })(
                                            <Input placeholder='请输入(12字以内)'/>
                                        )
                                    }
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    validateStatus={this.state.tagsStatus}
                                    label="选择分类：">
                                    {
                                        this.state.data.length > 0 &&
                                        getFieldDecorator('tags')(
                                            <div className='tagList'>
                                                <NavTag data={this.state.data} onSelect={this.onSelect}
                                                        defaultSelectedKeys={this.defaultSelectedKeys}/>
                                            </div>
                                        )
                                    }
                                </FormItem>
                                <Row>
                                    <Col span={2}> </Col>
                                    <Col span={20}>
                                        <div>
                                            <Checkbox checked={this.state.checked} onChange={this.onChange}
                                                      className='rule'>同意作品生成整套模板(在“我的/我生成的模板”里查看或者修改)</Checkbox>
                                            <div className='rule'>
                                                <span className='note'>注：</span>关于模板交易的详细规则<a className='see'
                                                                                              onClick={this.goAgreementPage}>点此查看</a>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}

export default Form.create({
    mapPropsToFields: (props) => {
        const {data} = props;
        let headImg = {
            file: {
                response: {
                    data: ''
                }
            }
        };
        return {
            headImg: {
                value: headImg,
            },
            name: {
                value: data.name
            }
        };
    }
})(FullTpl);
