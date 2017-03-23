import React, {Component}from 'react';
import {Button, Modal} from 'antd';
import {withRouter} from 'react-router';
import './index.less';
import Dom from 'common/util/dom';
import {autoSizePic, redirect} from 'common/util';
import {AUDIT_TEXT} from 'common/config/constants';
import Img from 'common/component/Img';
import  _ from 'lodash';
import classnames from 'classnames';
/**
 * 参数解析：
 * list ：数据Data
 * favoriteTpl : 收藏模板操作事件
 * deleteFavoriteTpl ： 取消收藏操作时间
 * useH5Template : 使用模板事件
 * editH5Template : 编辑模板事件
 * deleteH5Template : 删除模板操作事件
 * buyH5Template : 购买模板
 * type : 1. 我生成的模板： my ; 2.热门模板：hot ; 3.已收藏： favord；4.已购买：bought
 */
@withRouter
export default class VH5Preview extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        showH5Preview: 'none'
    };

    showHover(event) {
        Dom(event.currentTarget).addClass('h5-preview-hover');
    }

    hideHover(event) {
        Dom(event.currentTarget).removeClass('h5-preview-hover');
    }

    // 预览回调
    onPreview = (content, i) => {
        this.props.onPreview(content, i);
    };
    //使用模板
    useH5Template = (id) => {
        redirect('h5.html#/add/' + id + '?type=' + this.props.h5Type, '_blank', {});
    };
    // 编辑模板事件
    editH5Template = (id) => {
        Modal.confirm({
            title: '确定要修改该模板吗？',
            content: '您可以修改模板的内容，也可以重新设置封面、标题与分类',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                redirect('h5.html#/edit/tpl/' + id + '?type=' + this.props.h5Type, '_blank', {});
            }
        });
    }
    //删除模板操作事件
    deleteH5Template = (id) => {
        Modal.confirm({
            title: '确定要删除该模板吗？',
            content: '该模板删除后无法恢复。',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                this.props.deleteH5Template(id);
            }
        });
    }
    //购买模板
    buyH5Template = (id, ledou) => {
        this.props.buyH5Template(id, ledou);
    }

    _renderTmpStatus = (resAudit) => {
        let status = resAudit && resAudit.auditStatus ? AUDIT_TEXT[resAudit.auditStatus] : '待提交';
        return (<div className='preview-footer'>
            <span className='status'>状态：<a>{status}</a></span>
        </div>);
    }

    _renderTags = (tags) => {
        let tagName = '';
        _.map(tags, (tag) => {
            tagName += tag + ' ';
        });
        return tagName;
    }

    handleImgLoad = (event) => {
        //autoSizePic(event.currentTarget, 200, 280);
    };

    //操作按钮： 提交审核、使用、修改、删除模板
    _renderSubmitCheckBtn = (id) => {
        return (
            < Button type="primary" className="use-btn"
                     onClick={() => this.props.submitCheck(id)}>
                提交审核
            </Button>
        );
    }
    _renderUseBtn = (id) => {
        return (
            <Button type="primary" className="use-btn"
                    onClick={() => this.useH5Template(id)}>
                使用
            </Button>
        );
    }
    _renderUpdateBtn = (id) => {
        return (
            <Button type="primary" className="use-btn"
                    onClick={() => this.editH5Template(id)}>
                <i className="iconfont icon-bianji"></i>修改模板
            </Button>
        );
    }
    _renderDeleteBtn = (id) => {
        let vh5PreviewStyles = classnames({
            'use-btn': true,
            'delete-btn': true
        });
        return (
            <Button type="primary" className={vh5PreviewStyles}
                    onClick={() => this.deleteH5Template(id)}>
                删除模板
            </Button>
        );
    }

    render() {
        const {content} = this.props.list;
        return (
            <div className="h5-preview-list">
                {
                    content && content.map((item, i) => (
                        <div className="vh5-preview" key={i}>
                            <div onClick={this.showTemplate} onMouseOver={this.showHover} onMouseOut={this.hideHover}>
                                <div className="previewImg">
                                    <Img src={item.imgUrl} alt={item.name}/>
                                </div>
                                <p className="title">{item.name ? item.name : this._renderTags(item.tags)} </p>
                                <div className="settings">
                                    {this._renderTmpStatus(item.resAudit)}
                                    <div className="settingIcon">
                                        <i className="iconfont icon-remen"></i>
                                        {item.opdata && item.opdata.pv ? item.opdata.pv : 0}
                                    </div>
                                </div>
                                <div className="h5-hover">
                                    <div className='h5-hover-operation'>
                                        <p className="on-click-view" onClick={() => this.onPreview(content, i)}>
                                            点击预览大图</p>

                                        {
                                            (_.isEmpty(item.resAudit) || item.resAudit.auditStatus == 's29' ) &&
                                            this._renderSubmitCheckBtn(item.id)
                                        }
                                        {
                                            this._renderUseBtn(item.id)
                                        }
                                        {
                                            (_.isEmpty(item.resAudit) || item.resAudit.auditStatus == 's29' ) &&
                                            this._renderUpdateBtn(item.id)
                                        }
                                        {
                                            ( _.isEmpty(item.resAudit) || item.resAudit.auditStatus == 's29') &&
                                            this._renderDeleteBtn(item.id)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        );
    }
}

