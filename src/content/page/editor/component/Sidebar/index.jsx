import React from 'react';
import {Menu, Switch} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import IconFont from 'common/component/IconFont';
import AuthComponentBase from 'common/base/AuthComponentBase';
import * as module from 'common/config/module';
import ToolsPost from '../ToolsPost';
import ToolsMedia from '../ToolsMedia';
import ToolsBulk from '../ToolsBulk';
import ToolsBulkTpl from '../ToolsBulkTpl';
import {RES_TYPE} from 'common/config/constants';
import './index.less';
import * as contentAction from '../../../../store/content/action';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;


const MENU_MODULE_KEYS = {
    'plugin-packet': module.CONTENT_MARKETING_GIFT,
    'plugin-activity': module.CONTENT_MARKETING_ACTIVITY,
    'plugin-shopping': module.CONTENT_MARKETING_SALE,
    'plugin-praise': module.CONTENT_MARKETING_PRAISE,
    'plugin-tips': module.CONTENT_MARKETING_AWARD,
    'plugin-opinion': module.CONTENT_MARKETING_MESSAGE
};

@connect(
    state => ({
        operation: state.operation,
        content: state.content.toJS()
    }),
    dispatch => ({
        actions: bindActionCreators({
            ...contentAction
        }, dispatch)
    })
)
export default class Sidebar extends AuthComponentBase {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getContentMenu();
    }

    // 子菜单点击
    handleMenuClick = ({key}) => {
        const [type, cate] = key.split('-');
        const {selectedMenuParams} = this.props.content;
        // 营销插件处理
        if (type == 'plugin') {
            if (cate == 'packet' || cate == 'activity' || cate == 'shopping') {
                this.anyWhereModule(MENU_MODULE_KEYS[key]).then(()=> {
                    switch (cate) {
                        case 'packet':
                            // 添加红包
                            if (_.isFunction(this.props.onPacketAdd)) {
                                this.props.onPacketAdd();
                            }
                            break;
                        case 'activity':
                            // 添加活动
                            if (_.isFunction(this.props.onActivityAdd)) {
                                this.props.onActivityAdd();
                            }
                            break;
                        case 'shopping':
                            // 添加导购
                            if (_.isFunction(this.props.onShoppingAdd)) {
                                this.props.onShoppingAdd();
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
            case 'media-img':
                // 媒体图片 - 默认为上传
                if (!scope || scope != 'upload' || scope != 'search') {
                    scope = 'upload';
                }
                break;
            case 'media-emoticon':
                // 表情
                scope = 'all';
                break;
        }

        const params = {
            type,
            cate,
            scope,
            tag: ''
        };

        this.selectContentMenu(params);

        if (_.isFunction(this.props.onContentMenuClick)) {
            this.props.onContentMenuClick(params);
        }
    }

    // 全部 | 收藏
    handleScopeChange = (scope)=> {
        const {selectedMenuParams} = this.props.content;
        selectedMenuParams.scope = scope;
        this.selectContentMenu(selectedMenuParams);
    }

    // 标签变化
    handleTagChange = (tag)=> {
        const {selectedMenuParams} = this.props.content;
        selectedMenuParams.tag = tag;
        this.selectContentMenu(selectedMenuParams);
    }

    // 选中菜单
    selectContentMenu = (selectedMenuParams)=> {
        this.props.actions.selectContentMenu(selectedMenuParams);
    }

        // 点赞 | 打赏 | 留言
    handleSwitchChange = ({key}, checked)=> {
        const [type, cate] = key.split('-');
        if (_.isFunction(this.props.onSwitchChange)) {
            this.anyWhereModule(MENU_MODULE_KEYS[key]).then(()=> {
                this.props.onSwitchChange({
                    type,
                    cate,
                    checked
                });
            });
        }
    }

    getSubMenu() {

        let subMenu = [];

        const {hasPacket, enablePraise, enableTips, enableOpinion} = this.props.data;

        this.props.content.menu.map(item => {
            let menuItem = [];
            let title = <span><i className={'iconfont ' + item.icon}></i>{item.title}</span>;
            if (item.itemList && item.itemList.length > 0) {
                item.itemList.map(subMenu => {
                    switch (subMenu.key) {
                        case 'plugin-packet':
                            subMenu.disabled = hasPacket;
                            break;
                        case 'plugin-praise':
                            subMenu.checked = enablePraise;
                            break;

                        case 'plugin-tips':
                            subMenu.checked = enableTips;
                            break;
                        case 'plugin-opinion':
                            subMenu.checked = enableOpinion;
                            break;
                    }
                    let moduleKey = MENU_MODULE_KEYS[subMenu.key];
                    if (!moduleKey || this.checkModule(moduleKey).visible) {
                        menuItem.push(
                            <Item
                                key={subMenu.key}
                                disabled={subMenu.disabled}>
                                <span className="editor-sidebar-menu-text">{subMenu.title}</span>
                                {subMenu.type == 'switch' &&
                                <Switch size="small"
                                        checked={subMenu.checked}
                                        onChange={(checked)=>this.handleSwitchChange(subMenu, checked)}/>}
                                {subMenu.type == 'plus' &&
                                <IconFont type={ subMenu.disabled ? 'tianjiachenggong' : 'tianjia'}/>}
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
        const {menu, defaultOpenKeys, selectedMenuParams, selectedMenuItem} = this.props.content;

        const {type, cate, scope, tag} = selectedMenuParams;

        const selectedKeys = [type + '-' + cate];

        if (_.isEmpty(menu)) {
            return null;
        }

        return (
            <div className="editor-sidebar">
                <Menu
                    className="editor-sidebar-menu"
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={defaultOpenKeys}
                    selectedKeys={selectedKeys}
                    onClick={this.handleMenuClick}>
                    {this.getSubMenu()}
                </Menu>

                { type == 'post' &&
                <ToolsPost
                    scope={scope}
                    onExport={this.props.onExportPost}/>
                }

                { selectedKeys == 'post-tpl' &&
                <ToolsBulkTpl
                    scope={scope}
                    bulkType={cate}
                    resType={RES_TYPE.CONTENT}
                    query={selectedMenuItem.query}
                    onScopeChange={this.handleScopeChange}
                    onExport={this.props.onExportBulk}/>
                }

                { type == 'bulk' &&
                <ToolsBulk
                    scope={scope}
                    bulkType={cate}
                    resType={RES_TYPE.CONTENT}
                    query={selectedMenuItem.query}
                    onScopeChange={this.handleScopeChange}
                    onExport={this.props.onExportBulk}/>
                }

                { type == 'media' &&
                <ToolsMedia
                    scope={scope}
                    tag={tag}
                    code={cate}
                    query={selectedMenuItem.query}
                    syncMedia={this.props.syncMedia}
                    onScopeChange={this.handleScopeChange}
                    onTagChange={this.handleTagChange}
                    onExport={this.props.onExportMedia}/>
                }
            </div>
        );
    }
}

