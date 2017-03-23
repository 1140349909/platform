import React from 'react';
import {Breadcrumb} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageBase from 'common/base/PageBase';
import SearchInput from 'common/component/SearchInput';
import './index.less';
import  * as helpAction from '../../store/help/action';
@connect(
    state => ({
        operation: state.operation,
        help: state.help.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...helpAction
        }, dispatch)
    })
)
export default class Problems extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        searchData: {}
    };

    componentDidMount() {
        this.getDetailInfo(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case helpAction.GET_HELP_LIST_SUCCESS:
                this.setState({searchData: nextProps.help.problemList.response.content});
                break;
        }
    }

    //获取常见问题详情
    getDetailInfo = (id) => {
        this.props.actions.getHelpDetail(id);
    }
    //查询分类下的标签的触发事件
    getMarkTypeProblems = (tag) => {
        this.props.router.push('help/plist/' + encodeURIComponent(tag));
    }
    handleSearch = (val) => {
        if (val) {
            this.props.router.push('help/problems/' + encodeURIComponent(val));
        }
    }

    render() {
        const {problemDetail} = this.props.help;
        const tag = problemDetail && problemDetail.tags ? problemDetail.tags[0] : '';
        return (
            <div className="app-page app-page-problems app-page-problems-detail">
                <div className="problems-container">
                    {
                        problemDetail &&
                        <div>
                            <div className="title">
                                <Breadcrumb>
                                    <Breadcrumb.Item><a
                                        href="marketing.html#/help/problems/iloka">常见问题</a></Breadcrumb.Item>
                                    <Breadcrumb.Item><a
                                        onClick={() => this.getMarkTypeProblems(tag)}>{tag}</a></Breadcrumb.Item>
                                    <Breadcrumb.Item><a
                                        href="javascript:void(0);">{problemDetail.title}</a></Breadcrumb.Item>
                                </Breadcrumb>
                                <SearchInput
                                    placeholder="搜索你想知道的问题或关键词"
                                    onSearch={this.handleSearch}
                                    style={{width: 378, height: 36}}/>
                            </div>
                            <div className="problems-list-container">
                                <p className="detail-title">{problemDetail.title}</p>
                                <div className="detail-content lk-content"
                                     dangerouslySetInnerHTML={{__html: problemDetail.content}}></div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        );
    }
}


