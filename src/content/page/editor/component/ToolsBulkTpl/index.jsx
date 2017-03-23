import React, {Component} from 'react';
import {Radio} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import _ from 'lodash';
import Dom from 'common/util/dom';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import * as contentBulkAction from '../../../../store/contentBulk/action';
import ListView from 'common/component/ListView';
import IconFont from 'common/component/IconFont';
import Img from 'common/component/Img';
import 'rc-color-picker/assets/index.css';
import './index.less';
import * as media from 'common/util/media';

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
export default class ToolsBulkTpl extends AuthComponentBase {

    state = {
        page: 0,
        themeColor: '',
        listStatus: '',
        opacity: '',
        isShowDetail: false,
        detailData: ''
    };

    // 页面加载
    componentDidMount() {
        this.list(0);
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;

        if (operation.origin == contentBulkAction.GET_CONTENT_BULK_LIST ||
            operation.origin == contentBulkAction.GET_CONTENT_BULK_FAV_LIST ||
            operation.origin == contentBulkAction.GET_CONTENT_BULK_BOUGHT_LIST) {
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

            if (scope == 'bought') {
                this.props.actions.getContentBulkBoughtList(params);
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
    showDetail = (html)=> {
        this.setState({
            isShowDetail: true,
            detailData: html
        });
    }
    goBackList = ()=> {
        this.setState({
            isShowDetail: false,
        });
        this.list(this.state.page);
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
                {!this.state.isShowDetail &&
                <div className="editor-sidebar-bulk">
                    <header className="editor-sidebar-panel-header">
                        <div className="editor-sidebar-panel-header-action"></div>
                        <div className="editor-sidebar-tabs ant-radio-group-dark">
                            <RadioGroup value={scope}
                                        onChange={(event)=>this.handleRadioGroupChange(event)}>
                                <RadioButton value="all">全部</RadioButton>
                                <RadioButton value="fav">收藏</RadioButton>
                                <RadioButton value="bought">已购</RadioButton>
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
                        <BulkTplList scope={scope}
                                     className={'bulk-tpl-list-' + scope}
                                     data={contentBulk.all}
                                     showDetail={this.showDetail}
                                     themeColor={themeColor}
                                     onExport={onExport}
                                     onToggleFav={this.toggleFav}/>
                    </ListView>
                </div>
                }
                {this.state.isShowDetail &&
                <div className="editor-sidebar-bulk editor-sidebar-bulk-detail">
                    <header className="editor-sidebar-panel-header">
                        <div className="editor-sidebar-panel-header-title">
                            <p>
                                分版块使用
                            </p>
                            <p onClick={this.goBackList}>
                                <IconFont type="fanhui1"/>
                            </p>
                        </div>
                    </header>
                    <div
                        className="editor-sidebar-panel-content" style={{backgroundColor: '#E5E9F2'}}>
                        <BulkTplDetail detailData={this.state.detailData} onExport={onExport}/>
                    </div>
                </div>
                }
            </div>
        );
    }
}


class BulkTplList extends Component {

    showDetail = (html)=> {
        this.props.showDetail(html);
    }

    handleClick = (html, item) => {
        this.props.onExport(html, item);
    }

    handleMouseEnter(event) {
        Dom(event.currentTarget).addClass('bulk-tpl-item-hover');
    }

    handleMouseLeave(event) {
        Dom(event.currentTarget).removeClass('bulk-tpl-item-hover');
    }

    render() {
        const {className, scope,data} = this.props;

        const classString = classNames({
            [className]: true,
            'bulk-tpl-list': true
        });

        return (
            <ul className={classString}>
                {
                    data.map((item, index)=> {
                        return (<li key={index}
                                    className="bulk-tpl-item"
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseLeave={this.handleMouseLeave}>
                            <Img src={item.coverMediaId} alt="图片"/>
                            <div className="bulk-tpl-item-masking">
                                <div className="bulk-tpl-item-masking-top">

                                </div>
                                <div className="bulk-tpl-item-masking-action">
                                    <div className="bulk-tpl-item-masking-action-do bulk-tpl-item-masking-action-part">
                                        <div onClick={()=>this.showDetail(item.content)}></div>
                                        <span>分板块使用</span>
                                    </div>
                                    <div className="bulk-tpl-item-masking-action-do bulk-tpl-item-masking-action-full">
                                        <div onClick={()=>this.handleClick(item.content, item)}></div>
                                        <span>整套使用</span>
                                    </div>
                                </div>
                            </div>
                            {scope != 'bought' &&
                            <div className="bulk-tpl-item-action">
                                <AuthModule type={module.CONTENT_RICHTEXT_FAV}>
                                    <i className={item.faved ? 'iconfont icon-yishoucang' : 'iconfont icon-shoucang'}
                                       onClick={()=>this.props.onToggleFav(item.id, item.faved)}></i>
                                </AuthModule>
                            </div>
                            }
                        </li>);
                    })
                }
            </ul>
        );
    }
}

class BulkTplDetail extends Component {

    handleClick = (html) => {
        this.props.onExport(html);
    }

    render() {
        const {detailData} = this.props;
        let oDiv = document.createElement('div');
        oDiv.innerHTML = detailData;
        let arr = oDiv.querySelectorAll('.ILokaEditor');
        let htmlArr = [];
        for (let i = 0; i < arr.length; i++) {
            htmlArr.push({
                content: arr[i],
                key: i,
            });
        }
        return (
            <div className="bulk-tpl-list ">
                {
                    htmlArr.map((item)=> {
                        return (
                            <div className="bulk-item bulk-detail-item" key={item.key}>
                                <div className="bulk-detail-item-content"
                                     dangerouslySetInnerHTML={{__html: item.content.outerHTML}}
                                     onClick={()=>this.handleClick(item.content.outerHTML)}>
                                </div>
                            </div>);
                    })
                }
            </div>
        );
    }
}
