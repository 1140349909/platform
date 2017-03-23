import React from 'react';
import PageBase from 'common/base/PageBase';
import {Button, Modal, Menu, Dropdown, message} from 'antd';
import {withRouter} from 'react-router';
import ContentPreviewShow from 'common/component/ContentPreviewShow';
import {PublishSelectShow} from 'common/component/PublishSelectShow';
import Dom from 'common/util/dom';
import classnames from 'classnames';
import AuthModule from 'common/component/AuthModule';
import Img from 'common/component/Img';
import * as module from 'common/config/module';
import {redirect} from 'common/util';
import './index.less';
@withRouter
export default class ContentPreview extends PageBase {
    constructor(props) {
        super(props);
    }

    state = {
        viewType: '',
        viewParam: null,
        viewData: null,
        isShowTags: false,
        vsiteId: '',
    };

    onUpDownContent = (visite) => {
        if (visite) {
            Modal.confirm({
                title: '温馨提示',
                content: '确定下架吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.props.cancelContentVSite(this.state.vsiteId);
                }
            });
        } else {
            return null;
        }
    };
    deleteAppData = (id) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_DEL).then(() => {
            Modal.confirm({
                title: '温馨提示',
                content: '确定删除吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.props.deleteContent(id);
                }
            });
        });
    }
    showHover = (event) => {
        Dom(event.currentTarget).addClass('content-preview-hover');
    };
    hideHover = (event) => {
        Dom(event.currentTarget).removeClass('content-preview-hover');
    };

    // 预览回调
    onPreview = (res) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_SAVE).then(() => {
            this.showPreviewModal(res);
        });
    };

    // 推广回调
    onRelease = (res, currentStatus) => {
        if (currentStatus != 'published') {
            message.info('未发布的作品不能推广哦');
            return null;
        }
        this.showView('publishSelectShow', {}, res);
    };

    showPreviewModal = (res) => {
        this.showView('contentPreviewShow', {
            channel: 'vsite',
            display: 'list'
        }, res);
    };
    getDistributeChannels = (channels) => {
        const classWsite = classnames({
            'weitie': true,
            'weitieActive': channels.vsite,
        });
        const classWechat = classnames({
            'wechat': true,
            'wechatActive': channels.wx,
        });
        const classWeibo = classnames({
            'weibo': true,
            'weiboActive': channels.wb,
        });
        return (
            <table>
                <tbody>
                <tr>
                    <td className={classWsite}>微站</td>
                    <td className={classWechat}></td>
                    <td className={classWeibo}></td>
                    <td>
                        {
                            channels.toutiao &&
                            <i className='iconfont icon-jinritoutiao1' style={{'fontSize': '16px', 'color': 'red'}}></i>
                        }
                        {
                            !channels.toutiao &&
                            <i className='iconfont icon-jinritoutiao1'
                               style={{'fontSize': '16px', 'color': '#ccc'}}></i>
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        );
    };
    getContentImg = (url) => {
        if (url) {
            return (
                <Img src={url} className="previewImg"/>
            );
        } else {
            return (
                <Img src='./img/default.png' className="previewImg"/>
            );
        }
    };

    handleVisibleChange(id) {
        this.anyWhereModule(module.CONTENT_RICHTEXT_DEL).then(() => {
            this.setState({
                vsiteId: id
            });
        });
    }

    showToolTips = (channels, id) => {
        let menuStyles = classnames({
            menuOnVsiteUl: !channels.vsite,
            menuDownVsiteUl: channels.vsite
        });
        const menus = (
            <Menu className={menuStyles} onClick={() => this.onUpDownContent(channels.vsite)}>
                <Menu.Item>
                    <a href="javascript:void(0);" className="menuDownVsite"><i>从微站下架</i></a>
                </Menu.Item>
            </Menu>
        );
        return (
            <AuthModule type={module.CONTENT_RICHTEXT_DEL}>
                <Dropdown overlay={menus} onVisibleChange={() => this.handleVisibleChange(id)}>
                    <i className="iconfont icon-pingtaishezhi settingIcon ant-dropdown-link"/>
                </Dropdown>
            </AuthModule>
        );
    };
    showSetting = (res) => {
        if (this.props.currentStatus == 'published') {
            return (
                <div className="settings">
                    <i>总浏览量：{res.opdata && res.opdata.pv ? res.opdata.pv : 0}</i>
                    {
                        res.channels &&
                        this.showToolTips(res.channels, res.id)
                    }
                </div>
            );
        }
    };
    showDelete = (id, currentStatus) => {
        if (currentStatus == 'edit') {
            return (
                <AuthModule type={module.CONTENT_RICHTEXT_DEL}>
                    <i className="iconfont icon-shanchu" onClick={() => this.deleteAppData(id)}></i>
                </AuthModule>
            );
        }
    };

    edit = (id) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_CREATE).then(() => {
            var url;
            if (this.props.type == 'h5') {
                url = 'h5.html#/edit/' + id;
            } else {
                url = 'content.html#/edit/' + id;
            }
            redirect(url, '_blank', {});
        });
    };
    getContentsInfo = (item) => {
        const {currentStatus} = this.props;
        let showTag = '';
        if (currentStatus == 'edit') {
            showTag = classnames({
                'tags': true,
                'hideTags': true,
            });
        } else {
            showTag = classnames({
                'tags': true,
                'hideTags': false,
            });
        }
        if (item && item.response) {
            return ( <div>{
                item.response && item.response.map && item.response.map((res, i) => (
                    <div className="content-preview" key={i} onMouseOver={this.showHover}
                         onMouseOut={this.hideHover}>
                        {
                            res &&
                            this.getContentImg(res.imgUrl)
                        }
                        <p className="title">{res.vsite && res.vsite.title ? res.vsite.title : '标题未编辑'}</p>
                        <p className="time">创建于<i>{res.dateArray.createdDate}</i>
                            {
                                this.showDelete(res.id, res.contentStatus)
                            }</p>
                        <div className={showTag}>
                            {
                                res.channels &&
                                this.getDistributeChannels(res.channels)
                            }
                        </div>
                        {
                            res &&
                            this.showSetting(res)
                        }
                        <div className="hot-hover">
                            <AuthModule type={module.CONTENT_RICHTEXT_CREATE}>
                                <Button type="primary" className="content-use-btn" onClick={() => this.edit(res.id)}>
                                    <i className="iconfont icon-bianji"></i>编辑</Button>
                            </AuthModule>
                            <AuthModule type={module.CONTENT_RICHTEXT_SAVE}>
                                <Button type="primary" onClick={() => this.onPreview(res)}>
                                    <i className="iconfont icon-yulan" style={{'fontSize': '14px'}}></i>预览</Button>
                            </AuthModule>
                            {/*插入推广*/}
                            <div>
                                <br/>
                                <Button type="primary"
                                        onClick={() => this.onRelease(res, currentStatus)}>
                                    <i className="iconfont icon-wodetuodaotuiguang" style={{'fontSize': '20px'}}></i>推广
                                </Button>
                            </div>
                        </div>
                    </div>

                ))
            }
            </div>);
        }
    };

    render() {
        const isShowContentPreviewShow = this.isShowView('contentPreviewShow');
        const isShowPublishSelectShow = this.isShowView('publishSelectShow');
        const content = this.props.bulkData;
        
        return (
            <div className="mine-content-preview">
                {
                    content && content.map && content.length > 0 && content.map((item, i) =>
                        (
                            <div className="send-list" key={i}>
                                <div className="timeline"><i className="tagLine"></i> <i
                                    className="tagTime">{item.time}</i></div>
                                <div className="day-list">
                                    {this.getContentsInfo(item)}
                                </div>
                            </div>
                        )
                    )
                }
                {
                    isShowContentPreviewShow &&
                    <ContentPreviewShow
                        resType={this.props.type}
                        channel={this.state.viewParam.channel}
                        display={this.state.viewParam.display}
                        data={this.state.viewData}
                        visible={isShowContentPreviewShow}
                        reset={this.reset}/>
                }
                {
                    isShowPublishSelectShow &&
                    <PublishSelectShow
                        resType={this.props.type}
                        data={this.state.viewData}
                        visible={isShowPublishSelectShow}
                        reset={this.reset}/>
                }
                {
                    content && content.length == 0 &&
                    <div style={{'marginTop': '150px', 'textAlign': 'center', 'color': '#999999', 'fontSize': '18px'}}>
                        暂无数据
                    </div>
                }
                {
                    (!content) &&
                    <div style={{'marginTop': '150px', 'textAlign': 'center', 'color': '#999999', 'fontSize': '18px'}}>
                        暂无数据
                    </div>
                }
            </div>

        );
    }
}

