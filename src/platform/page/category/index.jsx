import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Button, message, Tabs, Modal} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as mediaAction from 'common/store/media/action';
import CategoryList from './component/CategoryList';
import CategoryForm from './component/CategoryForm';
const TabPane = Tabs.TabPane;
@connect(
    state => ({
        media: state.media.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...mediaAction
        }, dispatch)
    })
)
export default class CategoryIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        platform: 'iloka',

        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(this.state.platform);
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case mediaAction.GET_MEDIA_TYPES_SUCCESS:
                this.setState({
                    items: nextProps.media.items
                });
                break;
            case mediaAction.ADD_MEDIA_TYPE_SUCCESS:
                message.success('添加成功');
                this.list();
                this.reset();
                break;
            case mediaAction.UPDATE_MEDIA_TYPE_SUCCESS:
                message.success('修改成功');
                this.list();
                this.reset();
                break;
            case mediaAction.DELETE_MEDIA_TYPE_SUCCESS:
                message.success('删除成功');
                this.list();
                break;
        }
    }

    // 新建
    add = () => {
        this.showView('form', null, {});
    };

    edit = (id) => {
        this.showView('form', id, this.state.items[id]);
    };

    // 删除
    deleteMediaType = (id) => {

        let confirm = this;

        Modal.confirm({
            title: '警告',
            content: '你正要删除素材分类，确定吗？',
            onOk(){
                confirm.props.actions.deleteMediaType(id);
            },
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });

    };

    // 上传
    addMediaType = (params) => {
        this.props.actions.addMediaType(params);
    };

    // 修改
    updateMediaType = (id, params) => {
        this.props.actions.updateMediaType(id, params);
    };

    list = () => {
        this.props.actions.getMediaTypes(this.state.platform);
    };

    callback = (key) => {
        this.setState({
            platform: key,
        }, () => {
            this.list();
        });
    };

    render() {
        const {operation, media} = this.props;

        const {viewData, viewParam, platform} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == mediaAction.GET_MEDIA_TYPES_PENDING;

        // 是否显示form
        const isShowCategoryForm = this.isShowView('form');

        let platformList = {
            'iloka': '艾乐卡',
            'cms': '内容直通车',
            'vveshow': '移动微秀场',
            'projects': '项目',
            'interact': '互动平台',
            'buy': '交易平台',
            'platform': '平台管理系统'
        };

        let PLATFORM_TYPE_LIST = [];

        for (let i in platformList) {
            if (platformList.hasOwnProperty(i)) {
                PLATFORM_TYPE_LIST.push(
                    <TabPane tab={[platformList[i]]} key={i}>
                        {i == platform &&
                        <CategoryList
                            data={media.mediaTypes}
                            loading={isListLoading}
                            edit={this.edit}
                            deleteMediaType={this.deleteMediaType}
                            list={this.list}/>
                        }
                    </TabPane>
                );
            }
        }

        return (
            <div className="app-page">
                <Card title="素材分类管理"
                      extra={<Button type="primary" icon="plus" onClick={this.add}>新增</Button>}>

                    <Tabs onChange={this.callback} type="card" animated={false} defaultActiveKey={platform}>
                        {PLATFORM_TYPE_LIST}
                    </Tabs>


                    {isShowCategoryForm &&
                    <CategoryForm data={viewData}
                                  list={this.list}
                                  param={viewParam}
                                  visible={isShowCategoryForm}
                                  addMediaType={this.addMediaType}
                                  updateMediaType={this.updateMediaType}
                                  reset={this.reset}/>
                    }
                </Card>
            </div>
        );
    }
}
