import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_APP_DATA_SUCCESS,
    SYNC_APP_DATA,
    UPDATE_APP_DATA_SUCCESS,
    GET_CONTENT_MENU_SUCCESS,
    GET_CONTENT_MENU_FAILURE,
    INIT_CONTENT_MENU,
    SELECT_CONTENT_MENU
} from './action';

const initialState = fromJS({
    //作品详情
    data: {},

    menu: [],

    // 单页标签列表
    tplTags: [],

    // 初始展开的SubMenu菜单项 key 数组
    defaultOpenKeys: ['tpl', 'commonly', 'media', 'plugin'],

    // 选中的菜单项参数
    selectedMenuParams: {
        // 类型
        type: 'tpl',

        // 分类
        cate: 'format',

        // 范围
        scope: 'all', // all | fav | bought | upload | search

        // 标签
        tag: ''
    },

    selectedMenuItem: null
});

export default createReducer(initialState, {
    // 获取App数据
    [GET_APP_DATA_SUCCESS]: (state, {payload}) => {
        return state.set('data', fromJS(payload.data));
    },

    // 作品更新服务
    [UPDATE_APP_DATA_SUCCESS]: (state, {payload}) => {
        let data = state.get('data').toJS();
        if (!data.id) {
            data.id = payload.data.id;
        }
        return state.set('data', fromJS(data));
    },

    // 自动同步数据
    [SYNC_APP_DATA]: (state, {payload}) => {
        return state.mergeDeep({
            data: payload
        });
    },

    // 获取菜单项
    [GET_CONTENT_MENU_SUCCESS]: (state, {payload}) => {
        const menuMediaData = payload.res.menuMediaData.data;
        const menuTplData = payload.res.menuTplData.data;
        const menuList = _resolveMenu({menuMediaData, menuTplData}, payload.type);

        return state.merge({
            'menu': menuList,
            'tplTags': menuTplData,
            ..._setDefaultSelectedMenuParams(menuList, menuTplData)
        });
    },

    [GET_CONTENT_MENU_FAILURE]: (state) => state.merge({
        'menu': _resolveMenu([])
    }),

    [INIT_CONTENT_MENU]: (state, {payload}) => state.mergeDeepIn(['selectedMenuParams'], payload),

    // 选择菜单
    [SELECT_CONTENT_MENU]: (state, {payload}) => {

        const {type, cate} = payload;
        const selectedKey = type + '-' + cate;

        // 寻找当前的菜单项的数据
        let menu = state.get('menu').toJS();
        let selectedMenuItem = null;

        _.each(menu, (item) => {
            if (item.key == type) {
                _.each(item.itemList, (childItem) => {
                    if (childItem.key == selectedKey) {
                        selectedMenuItem = childItem;
                        return false;
                    }
                });
                return false;
            }
        });

        let selectedMenuParams = state.get('selectedMenuParams').merge(payload);

        return state.merge({
            selectedMenuItem,
            selectedMenuParams,
        });
    },
});


// 设置默认选中项
function _setDefaultSelectedMenuParams(menuList, tplTag) {

    let itemList,
        cate,
        type,
        tag = '',
        isReturn = false;

    // 优先选取列表所有第一个项
    _.map(menuList, (item) => {

        if (item.itemList.length > 0 && !isReturn) {
            itemList = item.itemList[0];
            cate = itemList.key.split('-')[1];
            type = itemList.key.split('-')[0];

            _.map(tplTag, (tpl) => {
                if (tpl.key === cate) {
                    tag = tpl.tags[0].name;
                }
            });
            isReturn = true;
        }
    });

    return {

        // 选中项参数
        selectedMenuParams: {
            // 类型
            type,

            // 分类
            cate,

            // 范围
            scope: 'all', // all | fav | bought | upload | search

            // 标签
            tag
        },

        // 选择项列表
        selectedMenuItem: itemList
    };
}

function _resolveMenu({menuMediaData, menuTplData}, {ln, editType}) {
    /*
     itemList.item = {
     key:'菜单项key',
     title:'菜单项标题',
     type:'菜单项操作类型(text|plus|switch)',
     disabled:'启用|禁用',
     checked:'选中',
     query:{查询参数}
     }
     */

    // 判断设计师编辑作品
    const isValuerWords = ln === 'valuer' && editType === 'works';

    // 判断设计师编辑模板
    const isValuerTpl = ln === 'valuer' && editType === 'tpl';

    // 判断用户编辑作品
    const isUserWords = ln !== 'valuer' && editType === 'works';


    // 热门资讯菜单
    let menuTpl = {},

        // 版式菜单列表
        menuCommonly = {},

        // 素材菜单列表
        menuMedia = {},

        // 营销插件菜单列表
        menuPlugin = {},

        // 列表集合
        menuList = [];


    menuTpl = {
        key: 'tpl',
        icon: 'icon-zixun',
        title: '单页',
        itemList: []
    };

    // 获取单页分类配置H5编辑器单页项
    _.each(menuTplData, (item) => {
        menuTpl.itemList.push({
            key: 'tpl-' + item.key,
            title: item.name,
            type: 'text',
            query: {
                name: item.name
            }
        });
    });

    menuCommonly = {
        key: 'commonly',
        icon: 'icon-banshi',
        title: '常用',
        itemList: [
            {
                key: 'commonly-wz',
                title: '文字',
                type: 'text'
            }, {
                key: 'commonly-xz',
                title: '形状',
                type: 'text'
            }, {
                key: 'commonly-bd',
                title: '表单',
                type: 'text'
            }
        ]
    };

    menuMedia = {
        key: 'media',
        icon: 'icon-sucai',
        title: '素材',
        itemList: []
    };

    _.each(menuMediaData, (item) => {
        // 获取媒体分类配置H5编辑器素材项
        if (item.code !== 'emoticon' && item.code !== 'background' && item.code !== 'img') {
            menuMedia.itemList.push({
                key: 'media-' + item.code,
                title: item.name,
                type: 'text',
                query: {
                    categoryId: item.id
                }
            });

            // 获取媒体分类配置H5编辑器常用项
        } else if (item.code === 'background' || item.code === 'img') {
            menuCommonly.itemList.push({
                key: 'commonly-' + item.code,
                title: item.name,
                type: 'text',
                query: {
                    categoryId: item.id
                }
            });
        }
    });

    menuPlugin = {
        key: 'plugin',
        icon: 'icon-yingxiao',
        title: '营销',
        itemList: [
            {
                key: 'plugin-packet',
                title: '优惠券',
                type: 'plus',
                status: 'enable'
            }, {
                key: 'plugin-activity',
                title: '活动',
                type: 'plus',
                status: 'enable'
            }, {
                key: 'plugin-shopping',
                title: '导购',
                type: 'plus',
                status: 'enable'
            }
        ]
    };

    // 用户编辑作品
    if (isUserWords) {
        menuList.push(menuTpl, menuCommonly, menuMedia, menuPlugin);

    // 设计师编辑作品
    } else if (isValuerWords) {
        menuTpl.itemList.push({
            key: 'tpl-my',
            title: '我的',
            type: 'text'
        });
        menuList.push(menuTpl, menuCommonly, menuMedia, menuPlugin);

    // 设计师编辑模板
    } else if (isValuerTpl) {
        menuTpl.itemList = [
            {
                key: 'tpl-my',
                title: '我的',
                type: 'text'
            }
        ];
        menuList.push(menuTpl, menuCommonly, menuMedia);

    } else {
        menuList.push(menuTpl, menuCommonly, menuMedia, menuPlugin);
    }

    return menuList;
}
