import React from 'react';
import {Menu} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import IconFont from 'common/component/IconFont';
import AuthComponentBase from 'common/base/AuthComponentBase';
import Arrow from '../../../../component/Arrow';
import ToolsMedia from '../ToolsMedia';
import ToolsTpl from '../ToolsTpl';
import ToolsUsed from '../ToolsUsed';
import * as module from 'common/config/module';
import {RES_TYPE} from 'common/config/constants';
import * as tagsAction from 'common/store/tags/action';
import * as appAction from '../../../../store/app/action';
import classnames from 'classnames';
import './index.less';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

const MENU_MODULE_KEYS = {
    'plugin-packet': module.CONTENT_H5_COUPON,
    'plugin-activity': module.CONTENT_H5_ACTIVITY,
    'plugin-shopping': module.CONTENT_H5_SALE
};

@connect(
    state => ({
        operation: state.operation,
        tplTags: state.app.toJS().tplTags,
        app: state.app.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...appAction,
            ...tagsAction
        }, dispatch)
    })
)
export default class Sidebar extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getContentMenu(this.props.menuType);
    }

    state = {
        load: false,
        arrowState: true,
    }

    // 根据返回的nextProps.product.status处理回调
    componentWillReceiveProps(nextProps) {
        const {operation} = nextProps;
        if (operation.type === appAction.GET_CONTENT_MENU_SUCCESS) {
            this.setState({
                load: true
            });
            this.props.onDone(true);
        }
    }

    // 子菜单点击
    handleMenuClick = ({key}) => {
        const [type, cate] = key.split('-');
        const {selectedMenuParams} = this.props.app;

        // 营销插件处理
        if (type == 'plugin') {
            if (cate == 'packet' || cate == 'activity' || cate == 'shopping') {
                this.anyWhereModule(MENU_MODULE_KEYS[key]).then(()=> {                
                    switch (cate) {
                        case 'packet':
                            // 添加红包
                            if (_.isFunction(this.props.onAddPacket)) {
                                this.props.onAddPacket();
                            }
                            break;
                        case 'activity':
                            // 添加活动
                            if (_.isFunction(this.props.onAddActivity)) {
                                this.props.onAddActivity();
                            }
                            break;
                        case 'shopping':
                            // 添加导购
                            if (_.isFunction(this.props.onAddShopping)) {
                                this.props.onAddShopping();
                            }
                            break;
                    }
                });
                
            }
            return;
        }

        // 转换默认的scope,素材的图片有点特殊,需要处理
        let {scope} = selectedMenuParams;

        switch (key) {
            default:
                if (!scope ||
                    (scope != 'all' && scope != 'fav' && scope != 'bought') ||
                    (type == 'bulk' && scope != 'all' && scope != 'fav')) {
                    scope = 'all';
                }
                break;

            case 'commonly-img':
                // 媒体图片 - 默认为上传
                if (!scope || scope != 'upload' || scope != 'search') {
                    scope = 'upload';
                }
                break;
        }

        let tag = '';
        if (key.indexOf('tpl') !== -1 && key.split('-')[1] !== 'my') {
            _.map(this.props.tplTags, (item) => {
                if (cate === item.key) {
                    tag = item.tags[_.keys(item.tags)[0]].name;
                }
            });
        }

        const params = {
            type,
            cate,
            scope,
            tag
        };

        this.selectContentMenu(params);

        if (_.isFunction(this.props.onContentMenuClick)) {
            this.props.onContentMenuClick(params);
        }
    }

    // 全部 | 收藏
    handleScopeChange = (scope) => {
        const {selectedMenuParams} = this.props.app;
        selectedMenuParams.scope = scope;
        this.selectContentMenu(selectedMenuParams);
    }

    // 标签变化
    handleTagChange = (tag) => {
        const {selectedMenuParams} = this.props.app;
        selectedMenuParams.tag = tag;
        this.selectContentMenu(selectedMenuParams);
    }

    // 选中菜单
    selectContentMenu = (selectedMenuParams) => {
        this.props.actions.selectContentMenu(selectedMenuParams);
    }

    // 折叠单击处理
    handelArrowChange = () => {
        this.props.onArrow();
    }

    getSubMenu() {

        let subMenu = [];
        const {packetStatus, activityStatus, shoppingStatus} = this.props.pluginStatus;

        this.props.app.menu.map(item => {
            let menuItem = [];
            let title = <span><i className={'iconfont ' + item.icon}></i>{item.title}</span>;
            if (item.itemList && item.itemList.length > 0) {
                item.itemList.map(subMenu => {
                    switch (subMenu.key) {
                        case 'plugin-packet':
                            subMenu.status = packetStatus;
                            break;
                        case 'plugin-activity':
                            subMenu.status = activityStatus;
                            break;
                        case 'plugin-shopping':
                            subMenu.status = shoppingStatus;
                            break;
                    }
                    let moduleKey = MENU_MODULE_KEYS[subMenu.key];
                        if (!moduleKey || this.checkModule(moduleKey).visible) {

                        const disabled = subMenu.status === 'disabled' || subMenu.status === 'disabledBind';
                        let iconFontType;
                        if (subMenu.status === 'disabledBind') {
                            iconFontType = 'tianjiachenggong';
                        } else if (subMenu.status === 'enableEdit') {
                            iconFontType = 'bianji-copy';
                        } else {
                            iconFontType = 'tianjia';
                        }
                        menuItem.push(
                            <Item
                                key={subMenu.key}
                                className="h5-sidebar-plus-item"
                                disabled={disabled}>
                                <span className="h5-tools-menu-text">{subMenu.title}</span>
                                {subMenu.type == 'plus' &&
                                <IconFont type={iconFontType}/>}
                            </Item>
                        );
                    }
                });
            }

            subMenu.push(
                <SubMenu
                    key={item.key}
                    title={title}>
                    {menuItem}
                </SubMenu>
            );
        });
        return subMenu;
    }

    render() {

        const {defaultOpenKeys, selectedMenuParams, selectedMenuItem} = this.props.app;

        const visible = this.props.visible;

        const {type, cate, scope, tag} = selectedMenuParams;

        const selectedKeys = [type + '-' + cate];

        const classString = classnames('h5-sidebar', {
            ['h5-sidebar-false']: !visible,
        });

        if (!this.state.load) {
            return null;
        }

        return (
            <div className={classString}>
                <Menu
                    className="h5-sidebar-menu"
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={defaultOpenKeys}
                    selectedKeys={selectedKeys}
                    onClick={this.handleMenuClick}>
                    {this.getSubMenu()}
                </Menu>

                { type == 'tpl' &&
                <ToolsTpl
                    scope={scope}
                    tag={tag}
                    bulkType={cate}
                    resType={RES_TYPE.CONTENT}
                    query={selectedMenuItem.query}
                    onTagChange={this.handleTagChange}
                    onScopeChange={this.handleScopeChange}/>
                }

                { type == 'commonly' &&
                <ToolsUsed
                    scope={scope}
                    tag={tag}
                    bulkType={cate}
                    resType={RES_TYPE.CONTENT}
                    query={selectedMenuItem.query}
                    onTagChange={this.handleTagChange}
                    onScopeChange={this.handleScopeChange}/>
                }
                
                { type == 'media' &&
                <ToolsMedia
                    scope={scope}
                    tag={tag}
                    code={cate}
                    query={selectedMenuItem.query}
                    onScopeChange={this.handleScopeChange}
                    onTagChange={this.handleTagChange}/>
                }
                <Arrow
                    onClick={this.handelArrowChange}
                    direction="right"
                    arrowDirection={visible ? 'right' : 'left'}
                    className="h5-sidebar-arrow"></Arrow>
            </div>
        );
    }
}

