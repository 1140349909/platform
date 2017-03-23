import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageBase from 'common/base/PageBase';
import {Modal, Checkbox, message, Row, Col, Input, Form} from 'antd';
import NavTag from 'common/component/NavTag';
import * as TagAction from '../../../../store/tag/action';
import * as h5TplAction from '../../../../store/h5Tpl/action';
import * as media from 'common/util/media';
import  _ from 'lodash';
import './index.less';
import {redirect} from 'common/util';
const FormItem = Form.Item;

@connect(
    state => ({
        operation: state.operation,
        tag: state.tag.toJS(),
        tpl: state.h5Tpl.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...TagAction,
            ...h5TplAction
        }, dispatch)
    })
)

class SingleTpl extends PageBase {
    constructor(props) {
        super(props);
        this.defaultSelectedKeys = this.props.data.tags;
        this.state = {
            coverMediaId: props.coverMediaId,
            tagsStatus: '',
            objectCheckedArrays: [],
            resType: '',
            data: [],
            checked: true
        };
    }

    componentDidMount() {
        this.props.actions.getUserTagsList('h5Tpl');
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
    //是否同意生成模板
    onChange = (e) => {
        this.setState({
            checked: e.target.checked
        });
    }
    handleSubmit = () => {
        if (this.state.objectCheckedArrays.length > 0) {
            if (!this.state.checked) {
                message.error('您还未同意将作品生成单页模板');
                return;
            }
            const {data, isEditTpl}= this.props;
            let params = {
                pages: data.pages,
                richData: data.richData,
                shapeData: data.shapeData,
                tplsId: data.tplsId,
                shapeImg: data.shapeImg,
                formData: data.formData,
                fontFiles: data.fontFiles,
                tags: this.state.objectCheckedArrays,
                appId: data.appId,
                id: data.id,
                coverMediaId: data.coverMediaId,
                mediaIds: data.mediaIds
            };

            if (data.id && !isEditTpl) {
                Modal.confirm({
                    title: '当前操作将覆盖原模板！',
                    content: '该作品已生成过模板，当前操作将覆盖原模板！',
                    onOk: () => {
                        this.updateTpl(params);
                    },
                });
            } else {
                this.updateTpl(params);
            }
        } else {
            message.error('请选择分类');
        }
    }

    //生成模板
    updateTpl = (params) => {
        this.props.actions.updateTpl(params);
    }

    //查看协议内容
    goAgreementPage = () => {
        redirect('marketing.html#/agreement', '_blank', {});
    }

    render() {
        if (this.state.data.length === 0) {
            return null;
        }
        const {data} = this.props;
        let coverImg = media.getMediaUrl(data.coverMediaId);

        const formItemLayout = {labelCol: {span: 5}, wrapperCol: {span: 16}};
        const {getFieldDecorator} = this.props.form;

        console.log(this.state.checked);
        return (
            <Modal title="生成单页模板" visible={true}
                   onCancel={this.props.reset}
                   onOk={this.handleSubmit}
                   width={900}
            >
                <div className='singleTplCon'>
                    <Row type="flex" justify="space-around" align="top" gutter={8}>
                        <Col span={4}>
                            <div className='preview-image'>
                                <img src={coverImg}/>
                            </div>
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
                                                      className='rule'>同意作品生成单页模板(在“我的/我生成的模板”里查看或者修改)</Checkbox>
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
    mapPropsToFields: ({data}) => {
        return {
            name: {
                value: data.name
            }
        };
    }
})(SingleTpl);
