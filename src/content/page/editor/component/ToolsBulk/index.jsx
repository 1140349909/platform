import React, {Component} from 'react';
import {Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Dom from 'common/util/dom';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import * as contentBulkAction from '../../../../store/contentBulk/action';
import ListView from 'common/component/ListView';
import IconFont from 'common/component/IconFont';
import BulkItem from 'common/component/BulkItem';
import 'rc-color-picker/assets/index.css';
import Tooltip from 'common/component/Tooltip';
import ColorPicker from 'rc-color-picker';
import './index.less';

@connect(
    state => ({
        operation: state.operation,
        contentBulk: state.contentBulk.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentBulkAction
        }, dispatch)
    })
)
export default class ToolsBulk extends AuthComponentBase {

    state = {
        page: 0,
        themeColor: '',
        listStatus: '',
        opacity: ''
    };

    // 页面加载
    componentDidMount() {
        this.list(0);
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;

        if (operation.origin == contentBulkAction.GET_CONTENT_BULK_LIST || operation.origin == contentBulkAction.GET_CONTENT_BULK_FAV_LIST) {
            this.setState({
                listStatus: operation.status
            });
            return;
        }

        switch (operation.type) {
            case contentBulkAction.CANCEL_FAV_CONTENT_BULK_SUCCESS:
            case contentBulkAction.FAV_CONTENT_BULK_SUCCESS:
                if (this.props.scope == 'fav') {
                    this.list(0);
                }
                break;
        }
    }

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
            tag: this.props.tag
        };

        if (!_.isEqual(newParams, preParams)) {
            this.list(0);
        }
    }

    // 切换收藏和取消收藏, faved指的资讯当前的收藏状态
    toggleFav = (id, faved)=> {
        this.anyWhereModule(module.CONTENT_RICHTEXT_FAV).then(()=> {
            const {bulkType} = this.props;
            if (faved) {
                this.props.actions.cancelFavContentBulk(id, bulkType);
            } else {
                this.props.actions.favContentBulk(id, bulkType);
            }
        });
    }

    list = (page)=> {

        const {scope, bulkType, resType, query} = this.props;

        const params = {
            page: page,
            size: 20,
            bulkType: bulkType,
            resType: resType,
            ...query
        };

        this.setState({
            page
        }, ()=> {
            if (scope == 'all') {
                this.props.actions.getContentBulkList(params);
            }

            if (scope == 'fav') {
                this.props.actions.getContentBulkFavList(params);
            }
        });

    }

    handleRadioGroupChange = ({target})=> {
        this.props.onScopeChange(target.value);
    }

    // 数据加载
    handleLoadData = (page) => {
        this.list(page);
    }

    handleChangeTheme = (colors)=> {
        this.setState({
            themeColor: colors.color
        });
    }

    reductionTheme = ()=> {
        this.setState({
            themeColor: ''
        }, ()=> {
            this.list(0);
        });
    }

    render() {

        const {scope, onExport, contentBulk} = this.props;

        const empty = _.isEmpty(contentBulk.all);
        let emptyText;
        if (empty) {
            if (scope == 'bought') {
                emptyText = '您还没有购买版式哦！';
            } else if (scope == 'fav') {
                emptyText = '您还没有收藏版式哦！';
            } else {
                emptyText = '此分类暂无版式哦！';
            }
        }

        const {themeColor} = this.state;

        // 分页
        return (
            <div className="editor-sidebar-panel">
                <div className="editor-sidebar-bulk">
                    <header className="editor-sidebar-panel-header">
                        <div className="editor-sidebar-panel-header-action">
                            <Tooltip type="content-recolor">
                                <IconFont type="undoIcon" onClick={this.reductionTheme}/>
                            </Tooltip>
                            <Tooltip type="content-color">
                                <ColorPicker
                                    animation="slide-up"
                                    placement="bottomLeft"
                                    color={themeColor}
                                    onChange={this.handleChangeTheme}>
                                    <IconFont type="zhutise" color={themeColor}/>
                                </ColorPicker>
                            </Tooltip>
                        </div>
                        <div className="editor-sidebar-tabs ant-radio-group-dark">
                            <RadioGroup value={scope}
                                        onChange={(event)=>this.handleRadioGroupChange(event)}>
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="fav">收藏</RadioButton>
                            </RadioGroup>
                        </div>
                    </header>
                    <ListView
                        className="editor-sidebar-panel-content"
                        page={this.state.page}
                        last={contentBulk.list.last}
                        empty={empty}
                        emptyText={emptyText}
                        status={this.state.listStatus}
                        onLoadData={this.handleLoadData}>
                        <BulkList data={contentBulk.all}
                                  themeColor={themeColor}
                                  onExport={onExport}
                                  onToggleFav={this.toggleFav}/>
                    </ListView>
                </div>
            </div>
        );
    }
}


class BulkList extends Component {

    handleClick = (html, item) => {
        this.props.onExport(html, item);
    }

    handleMouseEnter(event) {
        Dom(event.currentTarget).addClass('bulk-item-hover');
    }

    handleMouseLeave(event) {
        Dom(event.currentTarget).removeClass('bulk-item-hover');
    }

    render() {
        const {themeColor} = this.props;
        return (
            <ul className="bulk-list">
                {
                    this.props.data.map((item, index)=> {
                        return (<li key={index}
                                    className="bulk-item"
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}>
                            <BulkItem className="bulk-item-content"
                                      onClick={this.handleClick}
                                      color={themeColor}
                                      html={item.content}
                                      data={item}/>
                            <div className="bulk-item-action">
                                <AuthModule type={module.CONTENT_RICHTEXT_FAV}>
                                    <i className={item.faved ? 'iconfont icon-yishoucang' : 'iconfont icon-shoucang'}
                                       onClick={()=>this.props.onToggleFav(item.id, item.faved)}></i>
                                </AuthModule>
                            </div>
                        </li>);
                    })
                }
            </ul>
        );
    }
}
