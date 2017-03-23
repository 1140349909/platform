import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Button, message, Tabs, Modal} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as contentBulkAction from '../../store/contentBulk/action';
import * as tagAction from '../../store/tag/action';
import ContentBulkList from './component/ContentBulkList';
import ContentBulkForm from './component/ContentBulkForm';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

@connect(
    state => ({
        contentBulk: state.contentBulk.toJS(),
        tag:state.tag.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tagAction,
            ...contentBulkAction
        }, dispatch)
    })
)
export default class ContentBulkIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        bulkType: 'bt',
        viewType: 'list',
        viewParam: null,
        viewData: null,
    };

    componentDidMount() {
        this.getTagsList('contentTpl');
        this.list(0);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        // console.log(operation)
        switch (operation.type) {
            case contentBulkAction.GET_CONTENT_BULK_SUCCESS:
                this.setState({
                    viewData: nextProps.contentBulk.item
                });
                break;
            case contentBulkAction.UPDATE_CONTENT_BULK_SUCCESS:
                message.success('修改成功');
                this.list(this.state.page);
                this.reset();
                break;
            case contentBulkAction.ADD_CONTENT_BULK_SUCCESS:
                message.success('添加成功');
                this.list(this.state.page);
                // this.reset();
                break;
            case contentBulkAction.DELETE_CONTENT_BULK_SUCCESS:
                message.success('删除成功');
                this.list(this.state.page);
                break;
            case tagAction.GET_TAGS_LIST_SUCCESS:
                this.setState({
                    tagList: nextProps.tag.tagList
                });
                break;
        }
    }

    add = () => {
        this.showView('form', null, {});
    };

    edit = (id, bulkType) => {
        this.showView('form', id);
        this.props.actions.getContentBulk(id, bulkType);
    };

    save = (item, bulkType, type) => {

        confirm({
            title: '提示',
            content: '确定已经仔细检查版式是否正常了吗?',
            onOk: ()=> {
                // 上传内容后请坚持版式各个宽度上都自适应
                switch (type) {
                    case 'add':
                        this.props.actions.addContentBulk(item, bulkType);
                        break;
                    case 'update':
                        this.props.actions.updateContentBulk(item, bulkType);
                        break;
                }

            }
        });
    };

    list = (page, size)=> {
        this.setState({
            page
        }, ()=> {
            this.props.actions.getContentBulkList({
                bulkType: this.state.bulkType,
                page: this.state.page,
                size
            });
        });
    };

    getTagsList = (tagType)=> {
        this.props.actions.getTagsList(tagType);
    };

    deleteContentBulk = (id, bulkType)=> {

        let confirm = this;

        Modal.confirm({
            title: '警告',
            content: '你正要删除资讯块，确定吗？',
            onOk(){
                confirm.props.actions.deleteContentBulk(id, bulkType);
            },
            onCancel(){

            },
            okText: '确定',
            cancelText: '取消'
        });
    };

    onChange = (key)=> {
        this.setState({
            bulkType: key,
            page:0
        }, ()=> {
            this.list(0);
        });
    };

    render() {

        const {operation, contentBulk} = this.props;

        const {viewData, viewParam, bulkType,page,tagList} = this.state;

        let radioOptions = [
            {label: '标题', value: 'bt'},
            {label: '图文', value: 'tw'},
            {label: '关注', value: 'gz'},
            {label: '二维码', value: 'qr'},
            {label: '分隔符', value: 'fgf'},
            {label: '模板', value: 'tpl'},
        ];

        let radioList = [];

        // 是否显示loading
        const isListLoading = operation.type == contentBulkAction.GET_CONTENT_BULK_LIST_PENDING;

        radioOptions.map((item)=> {
            radioList.push(
                <TabPane key={item.value} tab={item.label}>
                    {item.value == bulkType &&
                    <ContentBulkList
                        page={page}
                        data={contentBulk.list.content}
                        total={contentBulk.list.totalElements}
                        loading={isListLoading}
                        deleteContentBulk={this.deleteContentBulk}
                        edit={this.edit}
                        list={this.list}/>
                    }
                </TabPane>
            );
        });



        // 是否显示form
        const isShowContentBulkForm = this.isShowView('form');

        return (
            <div className="app-page">
                <Card title="资讯块管理列表"
                      extra={<Button type="primary" icon="plus" onClick={this.add}>新增</Button>}>

                    <Tabs onChange={this.onChange} type="card" defaultActiveKey={bulkType} animated={false}>
                        {radioList}
                    </Tabs>
                    {isShowContentBulkForm &&
                    <ContentBulkForm
                        tagList={tagList}
                        data={viewData}
                        param={viewParam}
                        visible={isShowContentBulkForm}
                        save={this.save}
                        reset={this.reset}/>
                    }
                </Card>
            </div>
        );
    }
}
