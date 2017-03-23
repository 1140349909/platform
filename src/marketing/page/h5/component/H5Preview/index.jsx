import React from 'react';
import {Button} from 'antd';
import {withRouter} from 'react-router';
import './index.less';
import Dom from 'common/util/dom';
import {autoSizePic, redirect} from 'common/util';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import Img from 'common/component/Img';
import _ from 'lodash';
@withRouter
export default class H5Preview extends AuthComponentBase {
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
    useH5Template = (item) => {
        this.anyWhereModule(module.CONTENT_H5_CREATE).then(() => {
            const id = item ? '/' + item.id : '';
            redirect('h5.html#/add' + id + '?type=' + this.props.h5Type, '_blank');
        });
    };

    //购买模板
    buyH5Template = (id, ledou) => {
        this.anyWhereModule(module.CONTENT_H5_BUY).then(() => {
            this.props.buyH5Template(id, ledou);
        });
    }

    _renderIsFavord = (isFavord, id) => {
        if (this.props.type != 'my' && this.props.type != 'bought') {
            if (isFavord) {
                return (<Button className='fav-btn' onClick={() => this.props.cancelFavTpl(id)}> <i
                    className='iconfont icon-yishoucang'></i>取消收藏</Button>);
            } else {
                return (<Button className='fav-btn' onClick={() => this.props.favTpl(id)}> <i
                    className='iconfont icon-shoucang'></i>收藏</Button>);
            }
        }
    }

    _renderPriceTag = (price, bought) => {
        const {type} = this.props;
        return (<div className='preview-footer'>
            {
                price == 0 &&
                <span className='free'>免费</span>
            }
            {
                (price != 0 && type == 'bought' && bought) &&
                <span className='price'>价格：<a>{price}</a> 乐豆</span>
            }
            {
                (price != 0 && (type == 'favord' || type == 'hot')) &&
                <span className='price'>
                    {
                        bought &&
                        <a>已购买</a>
                    }
                    {
                        !bought &&
                        <span> 价格：<a>{price}</a> 乐豆</span>
                    }
                </span>
            }
        </div>);
    }

    handleImgLoad = (event) => {
        autoSizePic(event.currentTarget, 200, 280);
    };

    _renderBuildH5Preview = () => {
        if (this.props.type == 'hot') {
            return (<div className='h5-preview' onClick={() => this.useH5Template()}>
                <i className='iconfont icon-jia'></i>
                <a className='h5-preview-add' href='javascript:;'>新建活动H5</a>
            </div>);
        }
    }

    _renderH5Preview = (item, i) => {
        const {content} = this.props.list;
        return (<div onClick={this.showTemplate} onMouseOver={this.showHover} onMouseOut={this.hideHover}>
            <div className='h5-preview-img'>
                <Img src={item.imgUrl} alt={item.name}/>
            </div>
            <p className='h5-preview-title'>{item.name} </p>
            <div className='h5-preview-settings'>
                {this._renderPriceTag(item.ledou, item.bought)}
                <div className='settingIcon'>
                    <i className='iconfont icon-remen'></i>
                    {item.opdata && item.opdata.pv ? item.opdata.pv : 0}
                </div>
            </div>
            <div className='h5-hover'>
                <div className='h5-hover-operation'>
                    <p className='on-click-view' onClick={() => this.onPreview(content, i)}>
                        点击预览大图</p>
                    {
                        (item.bought || item.ledou == 0) &&
                        <Button type='primary' className='use-btn'
                                onClick={() => this.useH5Template(item)}>
                            使用
                        </Button>
                    }
                    {
                        !item.bought && item.ledou > 0 &&
                        <Button type='primary' className='use-btn'
                                onClick={() => this.props.buyH5Template(item.id, item.ledou, item.name)}>
                            立即购买
                        </Button>
                    }
                    {
                        this._renderIsFavord(item.faved, item.id)
                    }
                </div>
            </div>
        </div>);
    }

    render() {
        const {content} = this.props.list;
        return (
            <div className='h5-preview-list'>
                {
                    this._renderBuildH5Preview()
                }
                {
                    content && content.map((item, i) => (
                        <div className='h5-preview' key={i}>
                            {
                                this._renderH5Preview(item, i)
                            }
                        </div>
                    ))}
                {
                    _.isEmpty(content) && this.props.type != 'hot' &&
                    <div className='desc' style={{'textAlign': 'center', 'marginTop': '150px'}}>
                        <Img src='./img/cry.png' style={{'dispaly': 'block'}}/>
                        <p style={{'marginTop': '20px', 'fontSize': '14px'}}>暂无数据</p>
                    </div>
                }
            </div>

        );
    }
}

