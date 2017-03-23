import React from 'react';
import {Radio, Button, Modal, message} from 'antd';
import TagList from 'common/component/TagList';
const confirm = Modal.confirm;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import classNames from 'classnames';
import './index.less';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import * as right from 'common/config/right';
import Dom from 'common/util/dom';
import ListView from 'common/component/ListView';
import SearchInput from 'common/component/SearchInput';
import {autoSizePic} from 'common/util';
import * as contentMediaAction from '../../../../store/contentMedia/action';
import * as authAction from 'common/store/auth/action';
import AuthUpload from 'common/component/AuthUpload';
import {MEDIA_RES_TYPE, MEDIA_MIME_TYPE, OWNER} from 'common/config/constants';
import * as media from 'common/util/media';
import {TAG_TYPE} from 'common/config/constants';
import Img from 'common/component/Img';
@connect(
    state => ({
        operation: state.operation,
        rights: state.auth.toJS().rights,
        contentMedia: state.contentMedia.toJS(),
    }),
    dispatch => ({
        actions: bindActionCreators({
            getUinVersionInfo: authAction.getUinVersionInfo,
            ...contentMediaAction,
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

        // 上传状态
        uploadStatus: ''
    };

    // 页面加载
    componentDidMount() {
        this.list({page: 0});
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        switch (operation.type) {
            case contentMediaAction.CANCEL_FAV_MEDIA_SUCCESS:
            case contentMediaAction.FAV_MEDIA_SUCCESS:
                if (this.props.scope == 'fav') {
                    this.list({page: 0});
                }
                break;

            case contentMediaAction.DELETE_MEDIA_SUCCESS:
            case contentMediaAction.DELETE_MEDIA_ALL_SUCCESS:
                this.props.syncMedia(nextProps.contentMedia.mediaDelIds);
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

    // 切换收藏和取消收藏, faved指的资讯当前的收藏状态
    toggleFav = (id, faved) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_FAV).then(() => {
            if (faved) {
                this.props.actions.cancelFavMedia(id);
            } else {
                this.props.actions.favMedia(id);
            }
        });
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

    // 删除图片
    deleteMedia = (id) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_DEL).then(() => {
            confirm({
                title: '删除后',
                content: '在使用该素材的地方将无法显示该素材。删除后无法恢复。确定删除？',
                onOk: () => {
                    this.props.actions.deleteMedia(id, MEDIA_RES_TYPE.MATERIAL);
                }
            });
        });
    }

    deleteMediaAll = () => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_DEL).then(() => {
            confirm({
                title: '删除后',
                content: '在使用该素材的地方将无法显示该素材。删除后无法恢复。确定删除？',
                onOk: () => {
                    this.props.actions.deleteMediaAll(MEDIA_RES_TYPE.MATERIAL);
                }
            });
        });
    }


    list = (params) => {
        const {scope, code, query, tag} = this.props;

        this.setState(params, () => {

            const {page, keyword} = this.state;

            // 表情搜索
            if (code == 'emoticon') {
                return this.props.actions.getSearchStickers({
                    page: page,
                    q: keyword
                });
            }

            // 图片搜索
            if (code == 'img' && scope == 'search') {
                return;
            }

            let mediaParams = {
                page: page,
                size: 20,
                code: code,
                mimeType: MEDIA_MIME_TYPE.IMAGE,
                resType: MEDIA_RES_TYPE.RES
            };

            switch (scope) {
                case 'all':
                    // 合并查询参数
                    _.merge(mediaParams, query);
                    // 平台素材
                    mediaParams.owner = OWNER.PLATFORM;
                    mediaParams.tags = tag;
                    break;
                case 'fav':
                    // 合并查询参数
                    _.merge(mediaParams, query);
                    // 商户收藏的平台素材
                    mediaParams.owner = OWNER.PLATFORM;
                    mediaParams.faved = true;
                    break;
                case 'bought':
                    // 合并查询参数
                    _.merge(mediaParams, query);
                    // 已购素材
                    mediaParams.owner = OWNER.PLATFORM;
                    mediaParams.bought = true;
                    break;
                case 'upload':
                    // 商户上传的平台素材
                    mediaParams.owner = OWNER.BIZ;
                    mediaParams.resType = MEDIA_RES_TYPE.MATERIAL;
                    break;
            }

            this.props.actions.getMediaList(mediaParams);
        });
    }


    handleRadioGroupChange = ({target}) => {
        this.props.onScopeChange(target.value);
    }

    handleImgRadioGroupChange = ({target}) => {
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

    // 处理购买素材后的状态
    handlePurchaseMaterial = (id) => {
        this.props.actions.purchaseMaterial(id);
    }

    // 获取图片列表样式
    getStyleType(code) {
        // 图片 插画 full
        if (code == 'ikon') {
            return 'full';
        }
        // 其他mini
        return 'mini';
    }

    // 获取操作按钮类型
    getButtonType(code, scope) {
        // 其他=> 收藏 | 取消收藏
        // 本地上传 => 删除
        // 网络搜索 => 空

        if ((code == 'img' && scope == 'search') || code == 'emoticon') {
            return '';
        }

        switch (scope) {
            case 'all':
            case 'fav':
            case 'bought':
                return 'fav';
            case 'upload':
                return 'delete';
        }
        return '';
    }

    // 获取上传的配置
    getUploadProps() {
        return {
            action: media.addMedia({owner: OWNER.BIZ, restype: MEDIA_RES_TYPE.MATERIAL}),
            name: 'media',
            showUploadList: false,
            withCredentials: true,

            beforeUpload: () => {
                // 上传权益
                this.anyWhereRight(right.PIC_AMOUNT, this.props.contentMedia.uploadPicCount)
                    .then(({purchase}) => {
                        if (purchase) {
                            this.props.actions.getUinVersionInfo();
                        }
                    });
            },
            onChange: (info) => {

                this.setState({
                    uploadStatus: info.file.status
                });

                if (info.file.status === 'done') {
                    if (info.file.response.errCode == 0) {
                        message.success('图片上传成功!');
                        this.list({page: 0});
                    } else {
                        message.error(info.file.response.errMsg);
                    }
                } else if (info.file.status === 'error') {
                    message.error('图片上传失败!');
                }
            },
        };
    }

    render() {
        const {scope, code, tag, contentMedia, operation, onExport, rights} = this.props;

        const {uploadStatus} = this.state; //  uploading | done | error

        const empty = _.isEmpty(contentMedia.all);
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
        if (operation.origin == contentMediaAction.GET_MEDIA_LIST || operation.origin == contentMediaAction.GET_SEARCH_STICKERS) {
            listStatus = operation.status;
        }

        const styleType = this.getStyleType(code, scope);

        const buttonType = this.getButtonType(code, scope);

        const uploadProps = this.getUploadProps();


        let uploadPicCount = contentMedia.uploadPicCount;
        let maxPicAmount = Math.max(uploadPicCount, rights[right.PIC_AMOUNT].value);


        return (
            <div className="editor-sidebar-panel">
                <div className={'editor-sidebar-media editor-sidebar-' + code + ' editor-sidebar-media-' + scope}>
                    <header className="editor-sidebar-panel-header">
                        { (code != 'img' && code != 'emoticon' ) &&
                        <div className="editor-sidebar-tabs ant-radio-group-dark">
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

                        { code == 'img' &&
                        <div className="editor-sidebar-tabs ant-radio-group-dark">
                            <RadioGroup value={scope}
                                        onChange={(event) => this.handleImgRadioGroupChange(event)}>
                                <RadioButton value="upload">本地上传</RadioButton>
                                <RadioButton value="search">网络搜索</RadioButton>
                            </RadioGroup>
                        </div>
                        }

                        {(code == 'img' && scope == 'upload') &&
                        <div className="editor-sidebar-img-menu">
                            <AuthUpload {...uploadProps}
                                        type={module.CONTENT_RICHTEXT_UPLOAD}
                                        disabled={uploadStatus == 'uploading'}>
                                <Button type="info"
                                        loading={uploadStatus == 'uploading'}>
                                    {uploadStatus == 'uploading' ? '正在上传中...' : `上传图片(${uploadPicCount}/${maxPicAmount})`}
                                </Button>
                            </AuthUpload>
                            <AuthModule type={module.CONTENT_RICHTEXT_DEL}>
                                <Button type="plain" onClick={this.deleteMediaAll}>清空图库</Button>
                            </AuthModule>
                        </div>
                        }
                        {(code == 'img' && scope == 'search') &&
                        <div className="editor-sidebar-search">
                            <SearchInput
                                placeholder="请输入图片关键字"
                                style={{width: 260}}
                                onChange={this.search}
                                onSearch={this.search}/>
                        </div>
                        }

                        {(code == 'emoticon' && scope == 'all') &&
                        <div className="editor-sidebar-search">
                            <SearchInput
                                placeholder="请输入表情名称"
                                style={{width: 260}}
                                onChange={this.searchKeyChange}
                                onSearch={this.search}/>
                        </div>
                        }
                    </header>
                    <ListView
                        className="editor-sidebar-panel-content"
                        page={this.state.page}
                        last={contentMedia.list.last}
                        empty={empty}
                        emptyText={emptyText}
                        status={listStatus}
                        onLoadData={this.handleLoadData}>
                        <MediaList
                            styleType={styleType}
                            buttonType={buttonType}
                            data={contentMedia.all}
                            onExport={onExport}
                            onPurchaseMaterial={this.handlePurchaseMaterial}
                            onDelete={this.deleteMedia}
                            onToggleFav={this.toggleFav}/>
                    </ListView>
                </div>
            </div>
        );
    }
}


class MediaList extends AuthComponentBase {

    handleClick(item) {
        if (!item.bought && item.ledou > 0) {
            this.purchaseMaterial({
                id: item.id,
                name: item.name || '素材',
                ledou: item.ledou
            }).then(() => {
                if (_.isFunction(this.props.onPurchaseMaterial)) {
                    this.props.onPurchaseMaterial(item.id);
                }
                // 购买成功
                this.props.onExport(item.mediaUrl, item.resType);
            });
        } else {
            this.props.onExport(item.mediaUrl, item.resType);
        }
    }

    handleMouseEnter(event) {
        Dom(event.currentTarget).addClass('media-item-hover');
    }

    handleMouseLeave(event) {
        Dom(event.currentTarget).removeClass('media-item-hover');
    }

    handleImgLoad = (event) => {
        autoSizePic(event.currentTarget, 148, 100);
    };

    render() {

        const {styleType = 'full', buttonType, data} = this.props;
        const classString = classNames({
            'media-list': true,
            ['media-list-' + styleType]: true
        });

        // 样式类型 styleType = 通栏(full) || 两栏(mini)
        // 操作类型 buttonType = 删除(delete) || 收藏(fav)

        let imgProps = {};

        if (styleType !== 'full') {
            imgProps = {
                width: 148,
                height: 100, 
                enableAutoSize: true
            }
        }
        
        return (
            <ul className={classString}>
                {data.map((item, index) => {
                    return (<li key={index}
                                className={'media-item' + (!item.bought && item.ledou > 0 ? ' media-item-bought' : '')}
                                onMouseEnter={this.handleMouseEnter}
                                onMouseLeave={this.handleMouseLeave}>
                        <div
                            className="media-item-content"
                            onClick={() => this.handleClick(item)}>
                            <Img 
                                {...imgProps}
                                src={item.mediaUrl} alt={item.fileName}/>
                        </div>
                        <div className="media-item-mask" onClick={() => this.handleClick(item)}></div>
                        {(!item.bought && item.ledou > 0) &&
                        <div onClick={() => this.handleClick(item)} className="media-item-ledou">{item.ledou}乐豆</div>}
                        <div className="media-item-action">
                            {buttonType == 'fav' &&
                            <AuthModule type={module.CONTENT_RICHTEXT_FAV}>
                                <i title={ item.faved ? '取消收藏' : '收藏'}
                                   className={item.faved ? 'iconfont icon-yishoucang' : 'iconfont icon-shoucang'}
                                   onClick={() => this.props.onToggleFav(item.id, item.faved)}></i>
                            </AuthModule>
                            }
                            {buttonType == 'delete' &&
                            <AuthModule type={module.CONTENT_RICHTEXT_DEL}>
                                <i title="删除"
                                   className="iconfont icon-shanchu"
                                   onClick={() => this.props.onDelete(item.id)}></i>
                            </AuthModule>
                            }
                        </div>
                    </li>);
                })}
            </ul>
        );
    }
}
