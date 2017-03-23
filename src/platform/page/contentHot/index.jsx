import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Button, message, Modal} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as contentHotAction from '../../store/contentHot/action';
import ContentHotList from './component/ContentHotList';
import ContentHotForm from './component/ContentHotForm';

@connect(
    state => ({
        contentHot: state.contentHot.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentHotAction
        }, dispatch)
    })
)
export default class ContentHotIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case contentHotAction.GET_CONTENT_HOT_SUCCESS:
                this.setState({
                    viewData: nextProps.contentHot.item
                });
                break;
            case contentHotAction.ADD_CONTENT_HOT_SUCCESS:
                message.success('添加成功');
                this.list(0);
                // this.reset();
                break;
            case contentHotAction.UPDATE_CONTENT_HOT_SUCCESS:
                message.success('修改成功');
                this.list(0);
                this.reset();
                break;
            case contentHotAction.DELETE_CONTENT_HOT_SUCCESS:
                message.success('删除成功');
                this.list(0);
                this.reset();
                break;
        }
    }

    // 新建
    add = () => {
        this.showView('form', null, {});
    };

    // 编辑
    edit = (id) => {
        this.showView('form', id);
        this.getContentHot(id);
    };

    getContentHot = (id)=> {
        this.props.actions.getContentHot(id);
    };

    // 删除
    deleteContentHot = (id) => {

        let confirm = this;

        Modal.confirm({
            title: '警告',
            content: '你正要删除热点资讯，确定吗？',
            onOk(){
                confirm.props.actions.deleteContentHot(id);
            },
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });


    };

    // 快捷设置发布或取消发布
    updateContentHot = (record)=> {

        record.contentStatus = record.contentStatus == 'edit' ? 'published' : 'edit';
        record.content = record.content ? record.content : '测试数据';

        this.props.actions.updateContentHot(record);
    };

    list = (page, size)=> {

        this.props.actions.getContentHotPlatformList({
            page,
            size,
        });
    };

    save = (item, type) => {

        switch (type) {
            case 'add':
                this.props.actions.addContentHot(item);
                break;
            case 'update':
                this.props.actions.updateContentHot(item);
                break;
        }
    };

    render() {
        const {operation, contentHot} = this.props;

        const {viewData, viewParam} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == contentHotAction.GET_CONTENT_HOT_PLATFORM_LIST_PENDING;

        // 是否显示form
        const isShowContentHotForm = this.isShowView('form');

        return (
            <div className="app-page">
                <Card title="热门资讯管理列表"
                      extra={<Button type="primary" icon="plus" onClick={this.add}>新增</Button>}>
                    <ContentHotList
                        data={contentHot.list.content}
                        total={contentHot.list.totalElements}
                        loading={isListLoading}
                        updateContentHot={this.updateContentHot}
                        deleteContentHot={this.deleteContentHot}
                        edit={this.edit}
                        list={this.list}/>
                    {isShowContentHotForm &&
                    <ContentHotForm data={viewData}
                                    param={viewParam}
                                    visible={isShowContentHotForm}
                                    save={this.save}
                                    reset={this.reset}/>
                    }
                </Card>
            </div>
        );
    }
}
