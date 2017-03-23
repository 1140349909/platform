import React, {Component} from 'react';
import {withRouter} from 'react-router';
import IconFont from 'common/component/IconFont';
import './index.less';
import _ from 'lodash';
import Img from 'common/component/Img';
import Dom from 'common/util/dom';
import {redirect} from 'common/util';

@withRouter
export default class Header extends Component {

    constructor(props) {
        super(props);

        if (location.href.indexOf('platform.html') > -1) {
            this.type = 'platform';
        } else if (location.href.indexOf('marketing.html') > -1) {
            this.type = 'marketing';
        } else {
            this.type = 'other';
        }
    }

    state = {
        current: ''
    }

    redirect = (scene, path)=> {
        if (this.type == scene) {
            this.props.router.push(path);
        } else {
            redirect(scene + '.html#' + path);
        }
    }

    // 切换公司
    switchCompany = ()=> {
        redirect('/')
    }

    // 升级账号
    upgrade = () => {
        this.redirect('marketing', '/user/upgrade');
    }

    // 续费
    renewal = (id)=> {
        this.redirect('marketing', '/charge/payment/upgrade?versionId=' + id);
    }

    // 跳转到平台中心
    redirectPlatform = ()=> {
        this.redirect('platform', '/home');
    }

    // 跳转到营销中心
    redirectMarketing = ()=> {
        this.redirect('marketing', '/home');
    }

    // 跳转到用户中心
    redirectUser = ()=> {
        this.redirect('marketing', '/user/info');
    }

    // 退出登录
    logout = ()=> {
        this.props.logout();
    }

    handleMouseEnter(event) {
        Dom(event.currentTarget).addClass('menu-user-item-hover');
    }

    handleMouseLeave(event) {
        Dom(event.currentTarget).removeClass('menu-user-item-hover');
    }

    _renderMarketing() {

        const {info, permissions, version, uins} = this.props;

        if (!info || !permissions) {
            return null;
        }

        let nickname = _.compact([info.uinName, info.uinNickname]).join(' - ');

        // 切换公司: 有公司列表,且公司列表大于一
        const canSwitchCompany = !_.isEmpty(uins) && uins.length > 1;
        return (
            <div className="menu-user">
                <div className="menu-user-item menu-user-item-home">
                    <a href="javascript:void(0);" onClick={this.redirectMarketing} style={{'color':'white'}}>
                        <IconFont type="zhuye"/>
                    </a>
                </div>
                {this.props.children}
                <div className="menu-user-item menu-user-item-info"
                     onMouseEnter={this.handleMouseEnter}
                     onMouseLeave={this.handleMouseLeave}>
                    <div className="menu-user-item-title">

                        <IconFont type="daohangxiala"/>
                        <figure><Img src={info.headImgUrl}/></figure>
                        <span className="menu-user-item-info-name">{nickname}</span>
                    </div>
                    <ul className="menu-user-sub">

                        { permissions.MARKETING &&
                        <li className="menu-user-rank">
                            <div>您当前为 {version.name}</div>

                            <div>
                                { version.price == 0 && <a href="javascript:;" onClick={this.upgrade}>升级账号</a> }
                                { version.price > 0 &&
                                <a href="javascript:;" onClick={()=>this.renewal(version.id)}>续费</a>}
                            </div>
                        </li>
                        }

                        { permissions.MARKETING &&
                        <li className="menu-user-sp"></li>
                        }

                        { canSwitchCompany &&
                        <li onClick={this.switchCompany}>切换公司</li>
                        }

                        { (permissions.PLATFORM) &&
                        <li onClick={this.redirectMarketing}>营销中心</li>
                        }

                        { permissions.PLATFORM &&
                        <li onClick={this.redirectPlatform}>平台中心</li>
                        }

                        <li onClick={this.redirectUser}>个人中心</li>

                        <li onClick={this.logout}>退出登录</li>
                    </ul>
                </div>
            </div>
        );
    }

    _renderOther() {
        const {info, permissions} = this.props;
        return (
            <div className="menu-user">
                <div className="menu-user-item menu-user-item-info"
                     onMouseEnter={this.handleMouseEnter}
                     onMouseLeave={this.handleMouseLeave}>
                    <div className="menu-user-item-title">
                        <IconFont type="daohangxiala"/>
                        <figure><Img src={info.headImgUrl}/></figure>
                        <span className="menu-user-item-info-name">{info.nickName}</span>
                    </div>
                    <ul className="menu-user-sub">
                        { (permissions.PLATFORM || this.type == 'other') &&
                        <li onClick={this.redirectMarketing}>营销中心</li>
                        }

                        { permissions.PLATFORM &&
                        <li onClick={this.redirectPlatform}>平台中心</li>
                        }

                        <li onClick={this.redirectUser}>个人中心</li>

                        <li onClick={this.logout}>退出登录</li>
                    </ul>
                </div>
            </div>
        );
    }

    render() {
        const {info, permissions} = this.props;

        if (!info || !permissions) {
            return null;
        }

        if (permissions.MARKETING && this.type == 'marketing') {
            return this._renderMarketing();
        } else {
            return this._renderOther();
        }
    }
}
