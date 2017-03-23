import React from 'react';
import {Radio, Button, message, Modal} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import AuthComponentBase from 'common/base/AuthComponentBase';
import AuthModule from 'common/component/AuthModule';
import AuthUpload from 'common/component/AuthUpload';
import * as right from 'common/config/right';
import * as module from 'common/config/module';
import * as mediaAction from '../../../../store/h5media/action';
import ListView from 'common/component/ListView';
import TagList from 'common/component/TagList';
import {MEDIA_RES_TYPE, MEDIA_MIME_TYPE, OWNER, TAG_TYPE} from 'common/config/constants';
import H5Item from '../../../../component/H5Item';
import * as media from 'common/util/media';
import './index.less';

const confirm = Modal.confirm;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(
    state => ({
        operation: state.operation,
        widget: state.widget.toJS(),
        h5Media: state.h5media.toJS(),
        rights: state.auth.toJS().rights,
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...mediaAction
        }, dispatch)
    })
)


export default class ToolsUsed extends AuthComponentBase {

    state = {

        page: 0,

        // 上传状态
        uploadStatus: ''
    };

    // 页面加载
    componentDidMount() {
        this.list({page: 0});
    }

    static contextTypes = {
        addText: React.PropTypes.func,
        addImage: React.PropTypes.func,
        delImage: React.PropTypes.func,
        addShape: React.PropTypes.func,
        addForm: React.PropTypes.func,
        setBackgroundImage: React.PropTypes.func
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
                this.list({page: 0});
                this.context.delImage(nextProps.h5Media.mediaDelIds)
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
            tag: prevProps.tag
        };

        if (!_.isEqual(newParams, preParams)) {
            this.list({page: 0});
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

    list = (params) => {

        const {scope, code, query, tag, bulkType} = this.props;

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

            if (bulkType === 'background') {
                mediaParams.size = 30;
            }

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

    handleRadioGroupChange = ({target})=> {
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

    // 获取图片列表样式
    getStyleType(code) {

        // 图片 插画 full
        if (code == 'ikon') {
            return 'full';
        }

        // 其他mini
        return 'mini';
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
                this.anyWhereRight(right.PIC_AMOUNT, this.props.h5Media.uploadPicCount)
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

    // 处理购买素材后的状态
    handlePurchaseMaterial = (id) => {
        this.props.actions.purchaseMaterial(id);
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

    // 删除图片
    handleDelClick = (data) => {
        confirm({
            title: '删除后',
            content: '在使用该素材的地方将无法显示该素材。删除后无法恢复。确定删除？',
            onOk: () => {
                this.props.actions.deleteMedia(data.id, MEDIA_RES_TYPE.MATERIAL);
            }
        });
    }

    // 删除所有图片
    deleteMediaAll = () => {
        confirm({
            title: '删除后',
            content: '在使用该素材的地方将无法显示该素材。删除后无法恢复。确定删除？',
            onOk: () => {
                this.props.actions.deleteMediaAll(MEDIA_RES_TYPE.MATERIAL);
            }
        });
    }

    handelMediaClick = (item) => {
        if (!item.bought && item.ledou > 0) {
            this.purchaseMaterial({
                id: item.id,
                name: item.name || '素材',
                ledou: item.ledou
            }).then(() => {
                // 购买项未购买，刷新已购买
                this.props.actions.purchaseMaterial(item.id);

                this.context.setBackgroundImage(item.mediaId);
            });
        } else {
            this.context.setBackgroundImage(item.mediaId);
        }
    }


    // 渲染文字列表
    renderTextList = () => {
        let list = [];
        _.map(this.props.widget.textList, (item, index) => {
            list.push(<H5Item
                key={index}
                data={item}
                src={item.src}
                openFav={false}
                onClick={(data) => this.context.addText(data.config)}
            />);
        });

        return list;
    }

    // 渲染图形列表
    renderShapeList = () => {
        let list = [];
        _.map(this.props.widget.shapeList, (item, index) => {
            list.push(<H5Item
                key={index}
                data={item}
                listCol={2}
                src={item.src}
                openFav={false}
                onClick={(data) => this.context.addShape(data.type)}
            />);
        });
        return list;
    }

    // 渲染表单列表
    renderFormList = () => {
        let list = [];
        _.map(this.props.widget.formList, (item, index) => {
            list.push(<H5Item
                key={index}
                data={item}
                src={item.src}
                openFav={false}
                onClick={(data) => this.context.addForm(data.config)}
            />);
        });
        return list;
    }

    // 渲染图片列表
    renderImgList = () => {
        let list = [];
        _.map(this.props.h5Media.all, (item, index) => {
            list.push(<H5Item
                key={index}
                data={item}
                onDelClick={this.handleDelClick}
                listCol={2}
                actions={['del']}
                src={item.mediaUrl}
                onClick={(data) => this.context.addImage(data.mediaId)}
            />);
        });
        return list;
    }

    // 渲染了图片|| 背景列表
    renderMediaList = () => {
        let list = [];
        _.map(this.props.h5Media.all, (item, index) => {
            let props = {
                ledou: item.ledou,
                listCol: 2
            };

            if (this.props.scope === 'bought' || item.bought) {
                props.ledou = 0;
            }

            if (this.props.bulkType === 'background') {
                props.listCol = 3;
            }

            list.push(<H5Item
                {...props}
                key={index}
                data={item}
                isFav={item.faved}
                actions={['fav']}
                src={item.mediaUrl}
                onFavClick={this.handleFavClick}
                onClick={(data) => this.handelMediaClick(data)}
            />);
        });
        return list;
    }

    render() {

        const {scope, tag, h5Media, bulkType, rights, operation} = this.props;

        const {page, uploadStatus} = this.state;

        const empty = _.isEmpty(h5Media.all);

        const uploadProps = this.getUploadProps();

        const uploadPicCount = h5Media.uploadPicCount;

        let listStatus;
        if (operation.origin == mediaAction.GET_MEDIA_LIST) {
            listStatus = operation.status;
        }

        let maxPicAmount = Math.max(uploadPicCount, rights[right.PIC_AMOUNT].value);

        let emptyText;

        if (empty) {
            if (scope == 'bought') {
                emptyText = '您还没有购买素材哦！';
            } else if (scope == 'fav') {
                emptyText = '您还没有收藏素材哦！';
            } else {
                emptyText = '此分类暂无数据哦！';
            }
        }

        return (
            <div className="h5-sidebar-panel">
                <div className='h5-sidebar-panel-box'>
                    <header className="h5-sidebar-panel-header">
                        { bulkType === 'background' &&
                            <div className="h5-sidebar-tabs ant-radio-group-dark">
                                <RadioGroup value={scope} onChange={(event) => this.handleRadioGroupChange(event)}>
                                    <RadioButton value="all">全部</RadioButton>
                                    <RadioButton value="fav">收藏</RadioButton>
                                    <RadioButton value="bought">已购</RadioButton>
                                </RadioGroup>
                            </div>
                        }

                        {bulkType == 'img' &&
                        <div className="h5-sidebar-img-menu">
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

                        { (bulkType === 'background' && scope == 'all') &&
                            <TagList tagType={TAG_TYPE.MATERIAL} selected={tag} onTagChange={this.handleTagChange}/>
                        }

                        {bulkType === 'wz' &&
                            <h3 className="h5-sidebar-title">常用文字</h3>
                        }

                        {bulkType === 'xz' &&
                            <h3 className="h5-sidebar-title">常用形状</h3>
                        }

                        {bulkType === 'bd' &&
                            <h3 className="h5-sidebar-title">常用表单</h3>
                        }
                    </header>

                    {(bulkType === 'wz' || bulkType === 'xz' || bulkType === 'bd') &&
                        <div className="h5-sidebar-panel-content">
                            {bulkType === 'wz' &&
                                <div className="h5-sidebar-panel-list toolsused-wzlist">{this.renderTextList()}</div>
                            }

                            {bulkType === 'xz' &&
                                <div className="h5-sidebar-panel-list toolsused-xzlist">{this.renderShapeList()}</div>
                            }

                            {bulkType === 'bd' &&
                                <div className="h5-sidebar-panel-list toolsused-bdlist">{this.renderFormList()}</div>
                            }
                        </div>
                    }

                    {(bulkType === 'background' || bulkType === 'img') &&
                        <ListView
                            className="h5-sidebar-panel-content"
                            page={page}
                            last={h5Media.list.last}
                            empty={empty}
                            emptyText={emptyText}
                            status={listStatus}
                            onLoadData={this.handleLoadData}>
                            {bulkType === 'img' && <div className="h5-sidebar-panel-list toolsused-imglist">{this.renderImgList()}</div>}
                            {bulkType === 'background' && <div className="h5-sidebar-panel-list toolsused-medialist">{this.renderMediaList()}</div>}
                        </ListView>
                    }
                </div>
            </div>
        );
    }
}
