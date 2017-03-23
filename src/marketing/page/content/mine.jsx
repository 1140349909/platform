import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {message} from 'antd';
import PageBase from 'common/base/PageBase';
import TabHeader from '../../component/TabHeader';
import ContentDataFilter from '../../component/ContentDataFilter';
import {transformArray} from 'common/util';
import * as contentAction from '../../store/content/action';
import * as tagAction from '../../store/tag/action';
@connect(
    state => ({
        operation: state.operation,
        content: state.content.toJS(),
        tag: state.tag.toJS(),
        activeKey: '/content/mine/'
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentAction,
            ...tagAction,
        }, dispatch)
    })
)
export default class MineIndex extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        page: 0,
        size: 8,
        status: 'published',
        resType: 'content',
        dateRange: '',
        channels: '',
        chooseDateRange: '',
        chooseChannels: '',
        sort: 'publishedDate,desc'
    };

    componentDidMount() {
        this.list({
            page: 0,
            status: this.state.status,
            sort: this.state.sort
        });
    }

    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case contentAction.CANCEL_CONTENT_VSITE_SUCCESS :
                message.success('下架成功');
                this.list({
                    page: 0,
                    status: 'published',
                    sort: this.state.sort
                });
                break;
            case contentAction.DELETE_CONTENT_SUCCESS :
                message.success('删除成功');
                this.list({
                    page: 0,
                    status: this.state.status,
                    sort: this.state.sort
                });
                break;
            case contentAction.GET_CONTENT_LIST_SUCCESS :
                const params = nextProps.content.params;
                params.dateRange == undefined ? params.dateRange = '' : false;
                params.channels == undefined ? params.channels = '' : false;
                this.setState({
                    'chooseDateRange': params.dateRange,
                    'chooseChannels': params.channels
                });
                break;
        }
    }

    list = (params) => {
        this.setState(params, () => {
            this.props.actions.getContentList({
                page: this.state.page,
                resType: this.state.resType,
                size: this.state.size,
                status: this.state.status,
                dateRange: this.state.dateRange,
                channels: this.state.channels,
                sort: this.state.sort
            });
        });
    };

    //从V站下架
    cancelContentVSite = (id) => {
        this.props.actions.cancelContentVSite(id);
    };
    //删除资讯
    deleteContent = (id) => {
        this.props.actions.deleteContent(id);
    };

    loadMore = () => {
        this.list({
            page: ++this.state.page
        });
    };

    render() {
        const {mineList, list} = this.props.content;
        const contents = transformArray(mineList);
        return (
            <div className="app-page contentPage" id="mineTpl">
                <TabHeader activeKey={this.props.activeKey + this.props.params.status} tabKey="content"
                           contentMineStatus={this.props.params.status}
                           contentTplCheckKeys='hotArticle'/>
                <ContentDataFilter list={contents}
                                   listMethod={this.list}
                                   cancelContentVSite={this.cancelContentVSite}
                                   deleteContent={this.deleteContent}
                                   chooseDateRange={this.state.chooseDateRange}
                                   chooseChannels={this.state.chooseChannels}
                                   type={'content'}
                                   clearSelectedTags={this.clearSelectedTags}
                />
                {
                    !list.last &&
                    <div className="seeMoreBtn" onClick={this.loadMore}>查看更多</div>
                }
            </div>
        );
    }
}


