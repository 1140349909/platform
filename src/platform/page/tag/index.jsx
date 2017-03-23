import React from 'react';
import PageBase from 'common/base/PageBase';
import {Card, Button, message, Tabs} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tagAction from '../../store/tag/action';
import TagList from './component/TagList';
import TagForm from './component/TagForm';
import TagShow from './component/TagShow';

const TabPane = Tabs.TabPane;

@connect(
    state => ({
        tag: state.tag.toJS(),
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tagAction
        }, dispatch)
    })
)
export default class TagIndex extends PageBase {

    constructor(props) {
        super(props);
    }

    state = {
        tagType: 'app',

        viewType: 'list',
        viewParam: null,
        viewData: null
    };

    componentDidMount() {
        this.list('app');
    }

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case tagAction.GET_TAGS_LIST_SUCCESS:
                this.setState({
                    tagList: nextProps.tag.tagList
                });
                break;
            case tagAction.GET_TAG_SUCCESS:
                this.setState({
                    viewData: nextProps.tag.tag
                });
                break;
            case tagAction.ADD_TAGS_SUCCESS:
                message.success('添加成功');
                this.list(this.state.tagType);
                this.reset();
                break;
            case tagAction.UPDATE_TAG_NAME_SUCCESS:
                message.success('改名成功');
                this.list(this.state.tagType);
                this.reset();
                break;
            case tagAction.DELETE_TAG_SUCCESS:
                message.success('删除成功');
                this.list(this.state.tagType);
                break;
            case tagAction.UPDATE_TAG_STATUS_SUCCESS:
                message.success('修改状态成功');
                this.list(this.state.tagType);
                break;
            case tagAction.UPDATE_TAG_SEQ_SUCCESS:
                message.success('修改顺序成功');
                this.list(this.state.tagType);
                break;
            case tagAction.UPDATE_TAG_AGG_SUCCESS:
                this.setState({
                    viewData: nextProps.tag.agg
                });
                break;
        }
    }

    // 新建
    add = () => {
        this.showView('form', null, {});
    };

    edit = (id) => {
        this.showView('form', id, null);
        this.getTag(id);
    };

    rename = (record)=> {
        this.showView('form', record.id || record.tagId, {
            oldName: record.name,
            newName: '',
            level: record.children ? 0 : 1
        });
    };

    move = (data, direction)=> {

        let {tagList} = this.state;

        let tag = {};

        tagList.map((item)=> {
            if (item.id == data.id || item.id == data.tagId) {
                tag = item;
            }
        });

        //先处理一级的移动
        if (data.children) {
            switch (direction) {
                case 'up':
                    tag.seq -= 1;
                    break;
                case 'down':
                    tag.seq += 1;
                    break;
            }
        } else {
            let temp1 = tag.tags[data.seq - 1];
            let temp2 = tag.tags[data.seq];
            let temp3 = tag.tags[data.seq + 1];

            switch (direction) {
                case 'up':
                    data.seq -= 1;
                    temp2.seq -= 1;
                    temp1.seq += 1;
                    tag.tags.splice(data.seq, 1, temp2);
                    tag.tags.splice(data.seq + 1, 1, temp1);
                    break;
                case 'down':
                    data.seq += 1;
                    temp2.seq += 1;
                    temp3.seq -= 1;
                    tag.tags.splice(data.seq, 1, temp2);
                    tag.tags.splice(data.seq - 1, 1, temp3);
                    break;
            }
        }

        this.updateTagSeq(tag.id, tag);


    };

    // 删除
    deleteTag = (id) => {
        this.props.actions.deleteTag(id);
    };

    getTag = (id)=> {
        this.props.actions.getTag(id);
    };

    // 上传
    addTags = (params)=> {
        this.props.actions.addTags(params);
    };

    updateTagAgg = (params)=> {
        this.props.actions.updateTagAgg(params);
    };

    show = (id)=> {
        this.showView('show', id, null);
        this.updateTagAgg({
            tagId: id,
            dateRange: 'last30days'
        });
    };

    // 修改
    updateTagName = (id, params)=> {
        this.props.actions.updateTagName(id, params);
    };

    updateTagSeq = (id, params)=> {
        this.props.actions.updateTagSeq(id, params);
    };

    updateTagStatus = (record)=> {

        let formData = {
            disabled: !record.disabled,
        };

        if (!record.children) {
            formData.name = record.name;
        }

        this.props.actions.updateTagStatus(record.id, formData);
    };

    list = (tagType)=> {
        this.props.actions.getTagsList(tagType);
    };

    callback = (key)=> {
        this.setState({
            tagType: key,
        }, ()=> {
            this.list(key);
        });
    };

    render() {
        const {operation} = this.props;

        const {viewData, viewParam, tagType, tagList} = this.state;

        // 是否显示loading
        const isListLoading = operation.type == tagAction.GET_TAGS_LIST_PENDING;

        // 是否显示form
        const isShowTagForm = this.isShowView('form');

        const isShowTagShow = this.isShowView('show');

        let tagNameList = {
            'app': '应用',
            'h5Tpl': 'h5模板',
            'material': '素材',
            'help': '帮助',
            'module': '模块',
            'contentTpl':'资讯模板',
            'hotArticle':'热门文章',
            'depthView':'深度观点'
        };

        let TAG_LIST = [];

        for (let i in tagNameList) {
            if (tagNameList.hasOwnProperty(i)) {
                TAG_LIST.push(
                    <TabPane tab={[tagNameList[i]]} key={i}>
                        {i == tagType && tagList &&
                        <TagList
                            data={tagList}
                            loading={isListLoading}
                            edit={this.edit}
                            rename={this.rename}
                            move={this.move}
                            show={this.show}
                            deleteTag={this.deleteTag}
                            updateTagStatus={this.updateTagStatus}
                            list={this.list}/>
                        }
                    </TabPane>
                );
            }
        }

        return (
            <div className="app-page">
                <Card title="标签管理"
                      extra={<Button type="primary" icon="plus" onClick={this.add}>新增</Button>}>
                    <Tabs onChange={this.callback} type="card" animated={false} defaultActiveKey={tagType}>
                        {TAG_LIST}
                    </Tabs>


                    {isShowTagForm &&
                    <TagForm data={viewData}
                             list={this.list}
                             tagType={tagType}
                             param={viewParam}
                             visible={isShowTagForm}
                             addTags={this.addTags}
                             updateTagName={this.updateTagName}
                             reset={this.reset}/>
                    }
                    {isShowTagShow &&
                    <TagShow data={viewData}
                             param={viewParam}
                             visible={isShowTagShow}
                             updateTagAgg={this.updateTagAgg}
                             reset={this.reset}/>
                    }
                </Card>
            </div>
        );
    }
}
