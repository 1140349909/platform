import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Button, message, Tabs,Modal,Radio} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mediaAction from 'common/store/media/action';
import * as tagAction from '../../store/tag/action';
import MediaList from './component/MediaList';
import MediaForm from './component/MediaForm';
import {MEDIA_RES_TYPE} from 'common/config/constants';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

@connect(
    state => ({
        media: state.media.toJS(),
        tag:state.tag.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...mediaAction,
            ...tagAction
        }, dispatch)
    })
)
export default class MediaIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        owner: 'platform',
        resType: 'res',
        mimeType: 'image',
        sort: 'createdDate',
        order:'desc',

        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(0);
        this.getMediaTypes('iloka');
        this.getTagsList('material');
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case mediaAction.GET_COMMON_MEDIA_LIST_SUCCESS:
                this.setState({
                    mediaItems:nextProps.media.mediaItems
                });
                break;
            case mediaAction.DELETE_ADMIN_MEDIA_SUCCESS:
                message.success('删除成功');
                // this.list(0);
                break;
            case mediaAction.UPDATE_MEDIA_SUCCESS:
                message.success('修改成功');
                // this.list(0);
                this.reset();
                break;
        }
    }

    // 新建
    add = () => {
        this.showView('form', null, {});
    };

    //
    edit = (id)=>{
        this.showView('form', id, this.state.mediaItems[id]);
    };

    updateMedia = (id, data)=> {
        this.props.actions.updateMedia(id, data);
    };

    // 删除
    deleteAdminMedia = (ids) => {

        let confirm = this;

        Modal.confirm({
            title:'警告',
            content:'你正要删除素材，确定吗？',
            onOk(){
                confirm.props.actions.deleteAdminMedia(ids);
            },
            onCancel(){

            },
            okText:'确定',
            cancelText:'取消'
        });
    };

    // 上传
    addMedia = (media, params)=> {
        this.props.actions.addMedia(media, params);
    };

    // 获取媒体分类
    getMediaTypes = (platform)=> {
        this.props.actions.getMediaTypes(platform);
    };

    // 获取标签列表
    getTagsList = (tagType)=>{
        this.props.actions.getTagsList(tagType);
    };

    list = (page, size)=> {

        this.props.actions.getMediaList({
            owner: this.state.owner,
            resType: this.state.resType,
            mimeType: this.state.mimeType,
            categoryId: this.state.categoryId,
            faved: this.state.faved,
            page,
            size,
            sort: this.state.sort,
            order: this.state.order
        });
    };

    onChange = (pagination, filters) => {

        this.setState({
            owner: filters.owner ? filters.owner.toString() : this.state.owner,
            resType: filters.resType ? filters.resType.toString() : this.state.resType,
            mimeType: filters.mimeType ? filters.mimeType.toString() : this.state.mimeType,
        }, ()=> {
            this.list(pagination.current - 1, pagination.pageSize);
        });

    };

    callback = (key)=> {
        this.setState({
            resType: key,
        }, ()=> {
            this.list(0);
        });
    };

    selectCategory = (e)=>{
        this.setState({
            categoryId: e.target.value,
        }, ()=> {
            this.list(0);
        });
    };

    render() {
        const {operation, media,tag} = this.props;

        const {viewData, viewParam,platform, resType, sort} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == mediaAction.GET_MEDIA_LIST_PENDING;

        // 是否显示form
        const isShowMediaForm = this.isShowView('form');

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
            'resume': '简历',
            'material':'素材'
        };

        let MEDIA_RES_TYPE_LIST = [];

        let MEDIA_TYPE_LIST = [];

        media.mediaTypes.map((item)=>{
            MEDIA_TYPE_LIST.push(
                <RadioButton key={item.id} value={item.id}>{item.name}</RadioButton>
            );
        });

        for (let i in MEDIA_RES_TYPE) {
            if (MEDIA_RES_TYPE.hasOwnProperty(i)) {

                MEDIA_RES_TYPE_LIST.push(
                    <TabPane tab={resTypeList[MEDIA_RES_TYPE[i]]} key={MEDIA_RES_TYPE[i]}>
                        {MEDIA_RES_TYPE[i] == resType &&
                            <div>
                                <RadioGroup onChange={this.selectCategory} style={{'marginBottom':'16px'}}>
                                    {MEDIA_TYPE_LIST}
                                </RadioGroup>
                                <MediaList
                                    edit={this.edit}
                                    tagList={tag.tagList}
                                    data={media.mediaList.content}
                                    total={media.mediaList.totalElements}
                                    loading={isListLoading}
                                    onChange={this.onChange}
                                    deleteAdminMedia={this.deleteAdminMedia}
                                    list={this.list}/>
                            </div>
                        }
                    </TabPane>
                );
            }
        }

        return (
            <div className="app-page">
                <Card title="素材管理"
                      extra={<Button type="primary" icon="plus" onClick={this.add}>新增</Button>}>

                    <Tabs onChange={this.callback} type="card" animated={false} defaultActiveKey={resType}>
                        {MEDIA_RES_TYPE_LIST}
                    </Tabs>
                    {isShowMediaForm &&
                    <MediaForm
                        data={viewData}
                        param={viewParam}
                        list={this.list}
                        platform={platform}
                        resType={resType}
                        sort={sort}
                        mediaTypes={media.mediaTypes}
                        tagList={tag.tagList}
                        visible={isShowMediaForm}
                        addMedia={this.addMedia}
                        updateMedia={this.updateMedia}
                        getMediaTypes={this.getMediaTypes}
                        getTagsList={this.getTagsList}
                        reset={this.reset}/>
                    }
                </Card>
            </div>
        );
    }
}
