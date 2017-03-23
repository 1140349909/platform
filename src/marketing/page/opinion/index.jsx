import React from 'react';
import PageBase from 'common/base/PageBase';
import {Modal, message, Select} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as opinionAction from '../../store/opinion/action';
import SearchInput from 'common/component/SearchInput';
import OpinionList from './component/OpinionList';
import TabHeader from '../../component/TabHeader';
import _ from 'lodash';
import './index.less';

const confirm = Modal.confirm;
const Option = Select.Option;

@connect(
    state => ({
        opinionList: state.opinion.toJS().opinionList,
        operation: state.operation
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...opinionAction,
        }, dispatch)
    })
)
export default class Opinion extends PageBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.list(0);
    }

    state = {
        size: 10,
        page: 0,
        keyword: '',
        resType: 'content',
        status: '',
    };

    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;
        switch (operation.type) {
            // 获取商品成功
            case opinionAction.DEL_CONTENT_OPINION_SUCCESS:
                message.success('删除留言成功！');
                this.list(NaN, NaN, {}, true);
                break;

            // 获取商品成功
            case opinionAction.PUT_CONTENT_OPINION_PUBLISH_SUCCESS:
                message.success('留言通过成功!');
                this.list();
                break;
        }
    }

    // 表格数据获取
    list = (page, size, params, state = false) => {
        if (!isNaN(size)) {
            this.setState({
                size
            });
        } else {
            size = this.state.size;
        }

        if (!isNaN(page)) {
            this.setState({
                page
            });
        } else {
            page = this.state.page;
        }

        if (state && this.props.opinionList.content.length == 1) {
            this.setState({
                page: this.state.page - 1,
            });
            page = page - 1;
        }

        this.props.actions.getContentOpinionList({
            resType: this.state.resType,
            status: this.state.status,
            keyword: this.state.keyword,
            page: page,
            size,
            ...params,
        });
    };

    // 删除资讯评论
    delOperation = (id) => {
        confirm({
            title: '该信息将被删除',
            onOk: () => {
                this.props.actions.delContentOpinion(id);
            },
            onCancel() {
            },
        });
    }

    // 发布资讯评论
    updatePublish = (id) => {
        this.props.actions.updateContentOpinionPublish(id);
    }

    // 搜索商品
    handleSearch = (keyword) => {
        this.setState({
            keyword,
        }, () => {
            this.list(0);
        });
    };

    // selectChange
    selectChange = (val) => {
        this.setState({
            status: val,
        }, () => {
            this.list(0);
        });
    }

    render() {
        const operation = this.props.operation;
        const data = _.has(this.props.opinionList, 'content') ? this.props.opinionList.content : [];
        const total = _.has(this.props.opinionList, 'totalElements') ? this.props.opinionList.totalElements : 0;
        const isListLoading = operation.type == opinionAction.GET_CONTENT_OPINION_LIST_PENDING;

        return (
            <div className="app-page app-opinion-page contentPage">
                <TabHeader activeKey="/opinion" tabKey="content" contentTplCheckKeys='hotArticle'/>
                <div className="opinion-fn">
                    <Select onSelect={this.selectChange} defaultValue='' className="opinion-select">
                        <Option value="">所有</Option>
                        <Option value="edit">未通过</Option>
                        <Option value="published">已通过</Option>
                    </Select>
                    <span className="opinion-searchinput">
                        <SearchInput
                            placeholder="请输入留言内容"
                            onSearch={this.handleSearch}
                            style={{width: 200}}/>
                    </span>
                </div>
                <OpinionList
                    delOperation={this.delOperation}
                    updatePublish={this.updatePublish}
                    loading={isListLoading}
                    data={data}
                    total={total}
                    size={this.state.size}
                    list={this.list}/>
            </div>
        );
    }
}


