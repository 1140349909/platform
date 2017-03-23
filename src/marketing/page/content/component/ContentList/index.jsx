import React from 'react';
import {withRouter} from 'react-router';
import {Button, Icon, Modal, Pagination} from 'antd';
import  classnames from 'classnames';
import './index.less';
import AuthModule from 'common/component/AuthModule';
import * as module from 'common/config/module';
import AuthComponentBase from 'common/base/AuthComponentBase';
import {redirect} from 'common/util';
import Img from 'common/component/Img';
const confirm = Modal.confirm;
@withRouter
export default class ContentList extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    state = {
        favorNoText: '收藏',
        favorText: '已收藏',
    };
    getFavorHandler = (isfavor, id) => {
        const favorStyles = isfavor ? classnames('heartBtn', 'favIcon') : classnames('heartBtn');
        return (<AuthModule type={module.CONTENT_RICHTEXT_FAV}>
            <Button type='primary' size='small' onClick={() => this.props.collectionHot(id, isfavor)}
                    className={favorStyles}>
                <Icon type='heart-o' className={isfavor ? 'favIcon' : ''}/>
                {isfavor ? this.state.favorText : this.state.favorNoText}
            </Button></AuthModule>);
    };

    doGuideContent = (id) => {
        this.anyWhereModule(module.CONTENT_RICHTEXT_IMPORT).then(() => {
            confirm({
                title: '温馨提示',
                content: '您即将同步内容到编辑器，如需获得正式使用权，请自行联系版权所有方',
                onOk() {
                    redirect('content.html#/add/' + id, '_blank');
                }
            });
        });

    };

    getContentDetail = (url) => {
        redirect(url, '_blank');
        return false;
    };

    //显示资讯的标签
    renderTagsOfContent = (tags) => {
        var tagArrays = tags && tags.split(',');
        return (<div className='tagRender'>{
            tagArrays && tagArrays.map((item, index) => (
                (
                    index <= 1 &&
                    <span key={index}>
                        <i className='tag'> {item}</i>
                        <i className='line'>|</i>
                    </span>

                )
            ))
        }</div>);
    }

    _renderPagination = () => {
        const {size, totalElements, content} =  this.props.data;
        if (content && content.length == 0) {
            return (
                <div className="content-release-default" style={{'color': '#999', 'top': '0', 'lineHeight': 'inherit'}}>
                    <i className="iconfont icon-ku" style={{'fontSize': '200px'}}></i>
                    <p style={{'textAlign': 'center', 'position': 'absolute', 'bottom': '0', 'width': '100%'}}>暂无数据</p>
                </div>);
        }

        const pagination = {
            current: (this.props.page + 1),
            pageSize: size,
            total: totalElements > 400 ? 400 : totalElements,
            onShowSizeChange: (page, size) => {
                this.props.onList({
                    page: page - 1,
                    size
                });
            },
            onChange: (page) => {
                this.props.onList({
                    page: page - 1
                });
            }
        };

        return (
            <table style={{margin: 'auto'}}>
                <tbody>
                <tr>
                    <td><Pagination {...pagination} /></td>
                </tr>
                </tbody>
            </table>
        );
    }

    render() {
        const {content} = this.props.data;

        return (<div>
            {content && content.map((item, i) =>
                (<div className='tpl-content' key={i}>
                    <div className='tpl-listImg' onClick={() => this.getContentDetail(item.contentUrl)}><Img
                        src={item.articleThumUrl}/></div>
                    <div className='content-detail' onClick={() => this.getContentDetail(item.contentUrl)}>
                        <p className='content-title'>{item.title}</p>
                        <p className='content-desc'> {item.desc}</p>
                        <div className='content-footer'>
                            <div className='footer-bread'>
                                <i className='author'>{item.gzhName ? item.gzhName : '佚名'}</i>
                                <i className='line'>|</i>
                                <i className='timer'> {item.createdDate}</i>
                                {
                                    this.renderTagsOfContent(item.dgTags)
                                }
                                {
                                    item.isOriginal == 1 &&
                                    <i className='tag'> 原创</i>
                                }
                                <i className='readNum'>阅读：{item.opdata && item.opdata.pv > 100000 ? '10万+' : item.opdata && item.opdata.pv}</i>
                                <i className='line'>|</i>
                                <i className='praiseNum'>赞：{item.opdata && item.opdata.praise}</i>
                            </div>
                        </div>
                    </div>
                    <div className='footer-handle'>
                        {this.getFavorHandler(item.faved, item.id)}
                        <AuthModule type={module.CONTENT_RICHTEXT_IMPORT}>
                            <Button type='primary' size='small' onClick={this.onCreateContent}
                                    className='exportBtn'>
                                <a href='javascript:void(0);'
                                   onClick={() => this.doGuideContent(item.id)}><Icon type='export'/>导入文本</a>
                            </Button>
                        </AuthModule>
                    </div>
                </div>)
            )}
            {this._renderPagination()}
        </div>);
    }
}





