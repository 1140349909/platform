import React, {Component} from 'react';
import {Modal} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {dateFormat} from 'common/util';
import ListView from 'common/component/ListView';
import _ from 'lodash';
import Dom from 'common/util/dom';
import * as contentHotAction from '../../../../store/contentHot/action';
import Img from 'common/component/Img';
import './index.less';

const confirm = Modal.confirm;

@connect(
    state => ({
        operation: state.operation,
        contentHot: state.contentHot.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentHotAction
        }, dispatch)
    })
)
export default class ToolsPost extends Component {

    state = {
        hotData: [],

        page: 0,

        status: null,
    };

    // 页面加载
    componentDidMount() {
        this.list(0);
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {

        const {operation} = nextProps;

        switch (operation.type) {
            case contentHotAction.CANCEL_FAV_CONTENT_HOT_SUCCESS:
                this.list(0);
                break;
            case contentHotAction.GET_CONTENT_HOT_FAV_LIST_SUCCESS:
                // 下拉加载push新的列表数据
                const hotData = this.state.hotData.concat(this.props.contentHot.list.content);

                this.setState({
                    hotData,
                    status: 'success'
                });
                break;
            case contentHotAction.GET_CONTENT_HOT_FAV_LIST_FAILURE:
                this.setState({
                    status: 'failure'
                });
                break;

        }
    }

    loadMore = () => {
        this.list(this.state.page + 1);
    }

    list = (page)=> {
        this.setState({
            page,
        }, () => {
            this.props.actions.getContentHotFavList({
                page: page
            });
        });
    }

    // 切换收藏和取消收藏, faved指的资讯当前的收藏状态
    toggleFav = (id, faved)=> {
        if (faved) {
            confirm({
                title: '提示',
                content: '确定要取消收藏此资讯吗?',
                onOk: ()=> {
                    this.props.actions.cancelFavContentHot(id);
                }
            });
        } else {
            this.props.actions.favContentHot(id);
        }
    }

    // 数据加载
    handleLoadData = (page) => {
        this.list(page);
    }

    render() {

        const {contentHot, operation} = this.props;

        const empty = _.isEmpty(contentHot.all);
        let listStatus;
        if (operation.origin == contentHotAction.GET_CONTENT_HOT_FAV_LIST) {
            listStatus = operation.status;
        }

        return (
            <div className="editor-sidebar-panel">
                <div className="editor-sidebar-post">
                    <header className="editor-sidebar-panel-header">
                        <h3 className="editor-sidebar-title">已收藏</h3>
                    </header>
                    <ListView
                        className="editor-sidebar-panel-content"
                        page={this.state.page}
                        last={contentHot.list.last}
                        empty={empty}
                        emptyText="您还没有收藏热点资讯哦！"
                        status={listStatus}
                        onLoadData={this.handleLoadData}>
                        <PostList data={contentHot.all}
                                  onExport={this.props.onExport}
                                  onToggleFav={this.toggleFav}/>
                    </ListView>
                </div>
            </div>
        );
    }
}


class PostList extends Component {

    handleMouseEnter(event) {
        Dom(event.currentTarget).addClass('post-item-hover');
    }

    handleMouseLeave(event) {
        Dom(event.currentTarget).removeClass('post-item-hover');
    }

    render() {
        return (
            <ul className="post-list">
                {
                    this.props.data.map((item) => {
                        return (<li key={item.id} className="post-item"
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}>
                            <div className="post-item-i" onClick={()=>this.props.onExport(item.id)}>
                                <figure className="post-item-figure">
                                    <Img src={item.thumbMediaUrl} alt={item.title}/>
                                </figure>
                                <div className="post-item-info">
                                    <h6 className="post-item-title">{item.title}</h6>
                                    <p className="post-item-desc">
                                        {item.desc}
                                    </p>
                                    <p className="post-item-extra">{item.author}
                                        | {dateFormat(item.lastModifiedDate)}</p>
                                </div>
                            </div>
                            <div className="post-item-action">
                                <i className="iconfont icon-yishoucang"
                                   onClick={()=>this.props.onToggleFav(item.id, item.faved)}></i>
                            </div>
                        </li>);
                    })
                }
            </ul>
        );
    }
}
