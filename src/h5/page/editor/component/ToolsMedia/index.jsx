import React from 'react';
import {Radio} from 'antd';
import TagList from 'common/component/TagList';
// const confirm = Modal.confirm;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
// import classNames from 'classnames';
import './index.less';
import AuthComponentBase from 'common/base/AuthComponentBase';
// import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
// import Dom from 'common/util/dom';
import H5Item from '../../../../component/H5Item';
import ListView from 'common/component/ListView';
import SearchInput from 'common/component/SearchInput';
// import {autoSizePic} from 'common/util';
import * as mediaAction from '../../../../store/h5media/action';
import * as authAction from 'common/store/auth/action';
import {MEDIA_RES_TYPE, MEDIA_MIME_TYPE, OWNER} from 'common/config/constants';
import {TAG_TYPE} from 'common/config/constants';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    state => ({
        operation: state.operation,
        h5Media: state.h5media.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            getUinVersionInfo: authAction.getUinVersionInfo,
            ...mediaAction,
        }, dispatch)
    })
)
export default class ToolsMedia extends AuthComponentBase {

    constructor(props) {
        super(props);
        this.timer = null;
    }

    state = {

        page: 0,

        keyword: '',

    };

    static contextTypes = {
        addImage: React.PropTypes.func,
    }

    // 页面加载
    componentDidMount() {
        this.list({page: 0});
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case mediaAction.CANCEL_FAV_MEDIA_SUCCESS:
            case mediaAction.FAV_MEDIA_SUCCESS:
                if (this.props.scope == 'fav') {
                    this.list({page: 0});
                }
                break;

            case mediaAction.DELETE_MEDIA_SUCCESS:
            case mediaAction.DELETE_MEDIA_ALL_SUCCESS:
                this.props.syncMedia(nextProps.h5Media.mediaDelIds);
                this.list({page: 0});
                break;
        }
    }

    componentDidUpdate(prevProps) {
        var newParams = {
            scope: this.props.scope,
            code: this.props.code,
            query: this.props.query,
            tag: this.props.tag,
        };

        var preParams = {
            scope: prevProps.scope,
            code: prevProps.code,
            query: prevProps.query,
            tag: prevProps.tag,
        };

        if (!_.isEqual(newParams, preParams)) {
            this.list({page: 0});
        }
    }

    // 搜索
    search = (keyword) => {
        this.list({page: 0, keyword});
    }

    // 即时搜索
    searchKeyChange = (keyword) => {
        if (keyword == this.state.keyword) {
            return;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.list({page: 0, keyword});
        }, 500);
    }

    list = (params) => {
        const {scope, code, query, tag} = this.props;

        this.setState(params, () => {

            const {page} = this.state;
            // 图片搜索
            if (code == 'img' && scope == 'search') {
                return;
            }

            let mediaParams = {
                page: page,
                size: 28,
                code: code,
                mimeType: MEDIA_MIME_TYPE.IMAGE,
                resType: MEDIA_RES_TYPE.RES
            };

            switch (scope) {
                case 'all':
                    _.merge(mediaParams, query);
                    
                    // 平台素材
                    mediaParams.owner = OWNER.PLATFORM;
                    mediaParams.tags = tag;
                    break;

                case 'fav':
                    _.merge(mediaParams, query);

                    // 商户收藏的平台素材
                    mediaParams.owner = OWNER.PLATFORM;
                    mediaParams.faved = true;
                    break;

                case 'bought':
                    _.merge(mediaParams, query);

                    // 已购素材
                    mediaParams.owner = OWNER.PLATFORM;
                    mediaParams.bought = true;
                    break;
            }

            this.props.actions.getMediaList(mediaParams);
        });
    }


    handleRadioGroupChange = ({target}) => {
        this.props.onScopeChange(target.value);
    }

    // 选中标签
    handleTagChange = (tagName) => {
        this.props.onTagChange(tagName);
    }

    // 数据加载
    handleLoadData = (page) => {
        this.list({page});
    }

    // 切换收藏和取消收藏, faved指的资讯当前的收藏状态
    handleFavClick = ({id, faved}) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_FAV).then(() => {
            if (faved) {
                this.props.actions.cancelFavMedia(id);
            } else {
                this.props.actions.favMedia(id);
            }
        });
    }

    handleMediaClick = (item) => {
        if (!item.bought && item.ledou > 0) {
            this.purchaseMaterial({
                id: item.id,
                name: item.name || '素材',
                ledou: item.ledou
            }).then(() => {

                // 购买项未购买，刷新已购买
                this.props.actions.purchaseMaterial(item.id);

                // 购买成功
                this.context.addImage(item.mediaId);
            });
        } else {
            this.context.addImage(item.mediaId);
        }
    }

    // 渲染了图片|| 背景列表
    renderMediaList = () => {
        let list = [];

        _.map(this.props.h5Media.all, (item, index) => {

            let props = {
                ledou: item.ledou
            };
            if (this.props.scope === 'bought' || item.bought) {
                props.ledou = 0;
            }

            list.push(<H5Item
                {...props}
                key={index}
                data={item}
                listCol={2}
                isFav={item.faved}
                actions={['fav']}
                src={item.mediaUrl}
                onFavClick={this.handleFavClick}
                onClick={(data) => this.handleMediaClick(data)}
            />);
        });
        return list;
    }


    render() {
        const {scope, code, tag, h5Media, operation} = this.props;
        const empty = _.isEmpty(h5Media.all);
        let emptyText;
        if (empty) {
            if (scope == 'bought') {
                emptyText = '您还没有购买素材哦！';
            } else if (scope == 'fav') {
                emptyText = '您还没有收藏素材哦！';
            } else {
                emptyText = '此分类暂无素材哦！';
            }
        }
        let listStatus;
        if (operation.origin == mediaAction.GET_MEDIA_LIST || operation.origin == mediaAction.GET_SEARCH_STICKERS) {
            listStatus = operation.status;
        }

        return (
            <div className="h5-sidebar-panel">
                <div className='h5-sidebar-panel-box'>
                    <header className="h5-sidebar-panel-header">
                        { (code != 'img' && code != 'emoticon' ) &&
                        <div className="h5-sidebar-tabs ant-radio-group-dark">
                            <RadioGroup value={scope} onChange={(event) => this.handleRadioGroupChange(event)}>
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="fav">收藏</RadioButton>
                                <RadioButton value="bought">已购</RadioButton>
                            </RadioGroup>
                        </div>
                        }

                        { (scope == 'all' && code != 'img' && code != 'emoticon' ) &&
                        <TagList tagType={TAG_TYPE.MATERIAL} selected={tag} onTagChange={this.handleTagChange}/>
                        }

                        {(code == 'img' && scope == 'search') &&
                        <div className="h5-sidebar-search">
                            <SearchInput
                                placeholder="请输入图片关键字"
                                style={{width: 260}}
                                onChange={this.search}
                                onSearch={this.search}/>
                        </div>
                        }

                    </header>
                    <ListView
                        className="h5-sidebar-panel-content"
                        page={this.state.page}
                        last={h5Media.list.last}
                        empty={empty}
                        emptyText={emptyText}
                        status={listStatus}
                        onLoadData={this.handleLoadData}>
                        <div className="h5-sidebar-panel-list">{this.renderMediaList()}</div>
                    </ListView>
                </div>
            </div>
        );
    }
}
