import React from 'react';
import {Radio} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import * as h5TplAction from '../../../../store/h5Tpl/action';
import ListView from 'common/component/ListView';
import TagList from 'common/component/TagList';
import {TAG_TYPE} from 'common/config/constants';
import H5Item from '../../../../component/H5Item';
import {getMediaUrl} from 'common/util/media';
import classnames from 'classnames';
import './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    state => ({
        operation: state.operation,
        tplTags: state.app.toJS().tplTags,
        h5Tpl: state.h5Tpl.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...h5TplAction,
        }, dispatch)
    })
)

export default class ToolsTpl extends AuthComponentBase {

    state = {
        page: 0,
        selectKey: null
    };

    // 页面加载
    componentDidMount() {
        this.list(0);
    }

    // 根据返回的nextProps.product.status处理回调
    /*componentWillReceiveProps(nextProps) {
     // const {operation} = nextProps;
     }*/

    componentDidUpdate(prevProps) {
        var newParams = {
            scope: this.props.scope,
            bulkType: this.props.bulkType,
            resType: this.props.resType,
            tag: this.props.tag
        };

        var preParams = {
            scope: prevProps.scope,
            bulkType: prevProps.bulkType,
            resType: prevProps.resType,
            tag: prevProps.tag
        };

        if (!_.isEqual(newParams, preParams)) {
            this.list(0);
        }
    }

    static contextTypes = {
        updatePage: React.PropTypes.func
    }

    // 选中标签
    handleTagChange = (tagName) => {
        this.props.onTagChange(tagName);
    }

    list = (page) => {
        const {scope, appType = 'S', tag, query, bulkType} = this.props;
        
        let params = {
            page: page,
            size: 30,
            appType,
            tags: tag,
            ...query
        };

        if (bulkType === 'my') {
            params.categorytype = 'my';

        } else if (scope === 'all') {
            params.categorytype = 'platform';

        } else if (scope === 'fav') {
            params.categorytype = 'favorite';

        } else if (scope === 'bought') {
            params.categorytype = 'bought';
        }

        this.setState({
            page
        }, () => {
            this.props.actions.getTplList(params);
        });

    }

    handleRadioGroupChange = ({target}) => {
        this.props.onScopeChange(target.value);
    }

    // 数据加载
    handleLoadData = (page) => {
        this.list(page);
    }

    // 单页列表单击事件
    handleTplClick = (item) => {

        const updatePage = () => {
            this.context.updatePage(item.id, item);
            this.setState({
                selectKey: item.id
            });
        };

        if (!item.bought && item.ledou > 0 && !item.mySelf) {
            this.purchaseH5Tpl({
                id: item.id,
                appId: item.appId,
                name: item.name || 'H5购买模板',
                ledou: item.ledou,
                coverMediaId: item.coverMediaId
            }, true).then(() => {
                // 购买项未购买，刷新已购买
                this.props.actions.purchaseTpl(item.id);
                
                updatePage();
            });
        } else {
            updatePage();
        }
    }

    // 切换收藏和取消收藏, faved指的资讯当前的收藏状态
    handleFavClick = ({id, faved}) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_FAV).then(() => {
            if (faved) {
                this.props.actions.cancelFavTpl(id);
            } else {
                this.props.actions.favTpl(id);
            }
        });
    }

    // 渲染列表
    renderTplList = () => {
        const {bulkType} = this.props;
        let list = [];

        _.map(this.props.h5Tpl.all, (item, index) => {
            let props = {};

            if (bulkType === 'my') {
                props.ledou = item.ledou;
                props.isFreeTip = true;

            } else {
                props.actions = ['fav'];
                props.ledou = item.ledou;
                props.isFav = item.faved;
                props.onFavClick = this.handleFavClick;
            }

            if (this.props.scope === 'bought' || item.bought) {
                props.ledou = 0;
            }

            list.push(<H5Item
                {...props}
                key={index}
                checked={this.state.selectKey === item.id}
                data={item}
                src={getMediaUrl(item.coverMediaId)}
                listCol={3}
                onClick={(data) => this.handleTplClick(data)}
            />);
        });
        return list;

    }

    render() {

        const {scope, h5Tpl, tag, query, bulkType, operation} = this.props;

        const empty = _.isEmpty(h5Tpl.all);

        let emptyText;

        let listStatus;
        if (operation.origin == h5TplAction.GET_TPL_LIST) {
            listStatus = operation.status;
        }

        if (empty) {
            if (scope == 'bought') {
                emptyText = '您还没有购买版式哦！';
            } else if (scope == 'fav') {
                emptyText = '您还没有收藏版式哦！';
            } else {
                emptyText = '此分类暂无版式哦！';
            }
        }

        const listClassnamesString = classnames('h5-sidebar-panel-list', {
            ['tooltpl-listformat']: bulkType == 'format',
            ['tooltpl-liststyle']: bulkType == 'style'
        });

        return (
            <div className="h5-sidebar-panel">
                <div className='h5-sidebar-panel-box'>
                    <header className="h5-sidebar-panel-header">
                        {(bulkType === 'style' || bulkType === 'format') &&
                        <div className="h5-sidebar-tabs ant-radio-group-dark">
                            <RadioGroup value={scope}
                                        onChange={(event) => this.handleRadioGroupChange(event)}>
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="fav">收藏</RadioButton>
                                <RadioButton value="bought">已购</RadioButton>
                            </RadioGroup>
                        </div>
                        }

                        {bulkType === 'my' &&
                        <h3 className="h5-sidebar-title">我生成的单页模板</h3>
                        }

                        {((bulkType === 'style' || bulkType === 'format') && scope === 'all') &&
                        <TagList tagType={TAG_TYPE.TPL} tagChildrenType={query.name} selected={tag}
                                 onTagChange={this.handleTagChange}/>
                        }
                    </header>
                    <ListView
                        className="h5-sidebar-panel-content"
                        page={this.state.page}
                        last={h5Tpl.list.last}
                        empty={empty}
                        emptyText={emptyText}
                        status={listStatus}
                        onLoadData={this.handleLoadData}>

                        <div className={listClassnamesString}>
                            {this.renderTplList()}
                        </div>

                    </ListView>
                </div>
            </div>
        );
    }
}
