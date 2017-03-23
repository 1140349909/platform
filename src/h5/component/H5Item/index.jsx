import React from 'react';
import AuthComponentBase from 'common/base/AuthComponentBase';
import IconFont from 'common/component/IconFont';
import classnames from 'classnames';
import Img from 'common/component/Img';
import './index.less';
 
class TplItem extends AuthComponentBase {

    state = {};

    // item单击事件
    handelClick = (e) => {
        e.stopPropagation(e);
        this.props.onClick(this.props.data);
    }

    // 收藏单击事件
    handelFavClick = (e) => {
        e.stopPropagation(e);
        this.props.onFavClick(this.props.data);
    }

    // 删除单击事件
    handelDelClick = (e) => {
        e.stopPropagation(e);
        this.props.onDelClick(this.props.data);
    }

    // 渲染浮层
    renderMask = () => {
        const actions = this.props.actions;
        const iconfontFavType = this.props.isFav ? 'yishoucang' : 'shoucang';
        const favClassString = classnames('h5item-mask-fav-zhe', {
            ['h5item-mask-fav-amplification']: this.props.isFav,
        });
        return (
            <div className="h5item-mask">
                <div className="h5item-mask-icons">
                    {actions.indexOf('del') !== -1 &&
                    <IconFont className="h5item-mask-del" onClick={this.handelDelClick} type="shanchu"/>}
                    {actions.indexOf('fav') !== -1 &&
                    <div className="h5item-mask-fav">
                        <IconFont className="h5item-mask-fav-icon" key="fav1" onClick={this.handelFavClick}
                                  type={iconfontFavType}/>
                        {this.props.isFav && <IconFont className={favClassString} key="fav2" type="yishoucang"/>}
                    </div>
                    }
                </div>
            </div>
        );
    }

    renderTip = () => {
        const {ledou} = this.props;
        return (
            <div className="h5item-maskbought">
                {ledou > 0 && <span>{this.props.ledou}乐豆</span>}
                {!ledou && '免费'}
            </div>
        );
    }

    render() {

        const {checked, listCol, style, ledou, src, actions, isFreeTip} = this.props;

        const isOpenMast = actions.length > 0 && !ledou;

        const isTip = ledou || isFreeTip;

        const classString = classnames('h5item', {
            ['h5item-checked']: checked,
            [`h5item-col${listCol}`]: true,
        });

        return (
            <div className={classString} style={style} onClick={this.handelClick}>
                <div className="h5item-box">
                    <Img className="h5item-img" src={src} enableAutoSize/>
                    {isOpenMast && this.renderMask()}
                    {isTip && this.renderTip()}
                </div>
            </div>
        );
    }
}

TplItem.defaultProps = {

    className: '',

    style: {},

    listCol: 1,

    data: {},

    src: '',

    // 是否使用模板
    checked: false,

    // 浮层操作的列表
    actions: [],

    // 是否收藏
    isFav: false,

    // 乐豆
    ledou: null,

    // 免费版式则提示免费
    isFreeTip: false,

    onClick: (e) => {
        e.stopPropagation(e);
    },

    onFavClick: (e) => {
        e.stopPropagation(e);
    },

    onDelClick: (e) => {
        e.stopPropagation(e);
    }
};


export default TplItem;
