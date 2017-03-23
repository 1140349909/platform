import React from 'react';
import {Breadcrumb} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import SearchInput from 'common/component/SearchInput';
import SearchProblemList from './component/SearchProblemList';
import * as tagAction from '../../store/tag/action';
import * as helpAction from '../../store/help/action';
import './index.less';
import config from 'common/config';

@connect(
    state => ({
        operation: state.operation,
        tag: state.tag.toJS(),
        help: state.help.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...tagAction,
            ...helpAction
        }, dispatch)
    })
)
export default class Problems extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        isShowSearchList: false,
        isSeeMoreInfo: false,
        tagName: '',
        problemTagData: '',
        searchData: '',
        size: config.SIZE,
    };

    componentDidMount() {
        this.getHelpList({
            tags: this.props.router.params.id,
            status: 'published',
            size: config.SIZE
        });
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case helpAction.GET_HELP_LIST_SUCCESS:
                this.setState({searchData: nextProps.help.problemList.response.content});
                break;
        }
    }

    handleSearch = (keyword, size = config.SIZE) => {
        this.getHelpList({
            page: 0,
            size: size,
            keyword: keyword,
            tags: this.props.router.params.id,
            status: 'published'
        });
    }
    getHelpList = ({
        page,
        size = this.state.size,
        keyword,
        status = 'published',
        tags = this.props.router.params.id
    }) => {
        this.props.actions.getHelpList({
            page,
            size,
            keyword,
            status,
            tags,
        });
    }

    render() {
        return (
            <div className="app-page  app-page-problems">
                <div className="problems-container">
                    <div className="title">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="marketing.html#/help/problems/iloka">常见问题</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a>{this.props.router.params.id}</a></Breadcrumb.Item>
                        </Breadcrumb>
                        <SearchInput
                            placeholder="搜索你想知道的问题或关键词"
                            onSearch={this.handleSearch}
                            style={{width: 378, height: 36}}/>
                    </div>
                    <div className="problems-list-container">
                        <SearchProblemList getHelpList={this.getHelpList}
                                           response={this.props.help.problemList.response}
                                           data={this.state.searchData}/>
                    </div>
                </div>
            </div>
        );
    }
}


