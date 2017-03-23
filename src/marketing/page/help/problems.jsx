import React from 'react';
import {Breadcrumb} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import ProblemsList from './component/ProblemsList';
import SearchProblemList from './component/SearchProblemList';
import * as tagAction from '../../store/tag/action';
import * as helpAction from '../../store/help/action';
import {Input} from 'antd';
const Search = Input.Search;
import './index.less';
import config from 'common/config';
let helpProblemsList = [];
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
        this.tagList = [];
    }

    state = {
        isShowSearchList: false,
        isSeeMoreInfo: false,
        searchData: '',
        defaultSearchValue: '',
        size: config.SIZE,
    };

    componentDidMount() {
        const searchName = this.props.params.name;
        if (searchName != 'iloka') {
            this.setState({defaultSearchValue: searchName});
            this.handleSearch(searchName, 6);
        } else {
            this.getTags();
        }
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case tagAction.GET_USER_TAG_LIST_SUCCESS:

                this.getAllTypeProblems(6);
                break;
            case helpAction.GET_HELP_LIST_SUCCESS:
                const keyword = nextProps.help.problemList.keyword;
                if (keyword) {
                    this.setState({searchData: nextProps.help.problemList.response.content});
                } else {
                    const tagName = operation.result.params.tags;
                    const problemList = this.props.help.problemList.response;
                    this.tagList && this.tagList.map((tag) => {
                        if (tag.name == tagName) {
                            tag.list = {
                                title: tagName,
                                response: problemList,
                                id: tag.id
                            }
                        }
                    });
                }
                break;
        }
    }

    handleSearch = (val, size = config.SIZE) => {
        if (val) {
            this.setState({
                isShowSearchList: true,
            });
            this.getHelpList({
                page: 0,
                size: size,
                keyword: val,
                status: 'published'
            });
        } else {
            this.setState({
                isShowSearchList: false
            });
            this.getTags(0);
        }
    }

    seeMoreInfo = () => {
        this.setState({
            isSeeMoreInfo: true,
            isShowSearchList: true
        });
    }
    hideMoreInfo = () => {
        this.setState({
            isSeeMoreInfo: false,
            isShowSearchList: false
        });
    }
    getTags = () => {
        this.props.actions.getUserTagsList('help');
    }
    getAllTypeProblems = (size = 50) => {
        helpProblemsList = [];
        const {userTagList} = this.props.tag;
        this.tagList = userTagList;
        userTagList && userTagList.map((item) => {
            this.getHelpList({
                tags: item.name,
                page: 0,
                size: size,
                status: 'published'
            });
        });
    }

    getHelpList = ({page, size = this.state.size, keyword, status = 'published', tags}) => {
        this.props.actions.getHelpList({
            page, size, keyword, status, tags
        });
    }

    render() {
        return (
            <div className='app-page  app-page-problems'>
                <div className='problems-container'>
                    <div className='title'>
                        {this.state.isSeeMoreInfo &&
                        <Breadcrumb>
                            <Breadcrumb.Item><a onClick={this.hideMoreInfo}>常见问题</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a href='marketing.html#/help/problems/iloka'>创建图文/H5</a></Breadcrumb.Item>
                        </Breadcrumb>
                        }
                        {
                            !this.state.isSeeMoreInfo &&
                            <span className='problem-common-title' style={{'lineHeight': '2', 'position': 'absolute'}}>常见问题</span>
                        }
                        <Search defaultValue={this.props.params.name != 'iloka' ? this.props.params.name : ''}
                                placeholder="搜索你想知道的问题或关键词"
                                onSearch={this.handleSearch}
                                className="pro-search-input"/>
                    </div>
                    <div className='problems-list-container'>
                        {
                            !this.state.isShowSearchList &&
                            <ProblemsList problemTagData={this.tagList}
                                          seeMoreInfo={this.seeMoreInfo}/>
                        }
                        {
                            this.state.isShowSearchList &&
                            <SearchProblemList getHelpList={this.getHelpList}
                                               data={this.state.searchData}
                                               response={this.props.help.problemList.response}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


