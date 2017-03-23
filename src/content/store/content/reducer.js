import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {getMediaUrl} from 'common/util/media';
import {RES_TYPE} from 'common/config/constants';
import {MEDIA_DEL_ID} from 'common/config/media';
import {RELEASE_LENGTH_CONFIG} from 'common/config/content';
import {getObject} from 'common/util';
import {
    ADD_CONTENT_SUCCESS,
    UPDATE_CONTENT_SUCCESS,
    SYNC_CONTENT,
    RESET_CONTENT,
    GET_CONTENT_SUCCESS,
    GET_CONTENT_MENU_SUCCESS,
    GET_CONTENT_MENU_FAILURE,
    INIT_CONTENT_MENU,
    SELECT_CONTENT_MENU,
    SYNC_MEDIA
} from './action';

// 默认的Item
const DEFAULT_ITEM = {
    resType: RES_TYPE.CONTENT,
    content: '',
    actions: {
        enableOpinion: false,
        enablePraise: false,
        enableTips: false
    },
    couponId: '',
    integralId: '',
    style: {},
    resUnBind: {},
    prodcutIssueIds: [],
    tplId: '',
    vsite: {},
    wb: {},
    wx: {},
    toutiao: {}
};


// 默认发布
const DEFAULT_RELEASE_CACHE = {
    changeKeys: null,
    updateKeys: []
};

const initialState = fromJS({
    item: {},
    menu: [],
    // 初始展开的SubMenu菜单项 key 数组
    defaultOpenKeys: ['post'],
    // 选中的菜单项参数
    selectedMenuParams: {
        // 类型
        type: 'post',
        // 分类
        cate: 'tpl',
        // 范围
        scope: 'all', // all | fav | bought | upload | search
        // 标签
        tag: ''
    },
    // 选中的菜单项数据
    selectedMenuItem: {},
    syncMedia: {},
    releaseCache: _.defaults({}, DEFAULT_RELEASE_CACHE)
});


function getObjectKey(data) {
    let key;

    _.forEach(data, (parentVal, parentkey)=> {
        if ('vsite' == parentkey || 'wb' == parentkey || 'wx' == parentkey || 'toutiao' == parentkey) {
            _.forEach(parentVal, (childVal, childKey)=> {
                key = parentkey + '.' + childKey;
            });
        }
    });
    return key;
}

export default createReducer(initialState, {
    [GET_CONTENT_SUCCESS]: (state, {payload}) => {
        return state.merge({
            'item': _resolveItem(payload.data)
        });
    },

    // 自动保存数据
    [SYNC_CONTENT]: (state, {payload}) => {

        let item = _.merge({}, state.get('item').toJS(), payload),
            releaseCache = _.defaults({}, DEFAULT_RELEASE_CACHE),
            keyString = getObjectKey(payload),
            isInit = _.keys(payload).length > 2;

        if (keyString && keyString.indexOf('imgId') == -1 && keyString.indexOf('imgUrl') == -1 && !isInit) {
            releaseCache = _handelRelease(item, state, payload).releaseCache;
            item = _handelRelease(item, state, payload).item;
        }

        return state.merge({
            'item': _resolveItem(item),
            'releaseCache': releaseCache
        });
    },

    [SYNC_MEDIA]: (state, {payload}) => {
        let item = state.get('item').toJS();
        let mediaDelIds = [];

        if (payload) {
            mediaDelIds = payload;
        }

        _.forEach(mediaDelIds, (value) => {
            let content = item.content.replace(new RegExp(value, 'g'), MEDIA_DEL_ID);
            item.content = content;
        });

        return state.merge({
            'item': item
        });
    },

    // 重置内容
    [RESET_CONTENT]: (state) => state.merge({
        'item': DEFAULT_ITEM
    }),

    // 添加
    [ADD_CONTENT_SUCCESS]: (state, {payload}) => {
        let {params} = payload;
        params.id = payload.data;
        _resolveReleaseLength(params);
        _resolveItem(params);
        return state.merge({
            'item': params
        });
    },

    [UPDATE_CONTENT_SUCCESS]: (state, {payload}) => {
        const params = payload.params;

        _resolveReleaseLength(params);
        _resolveItem(params);
        return state.merge({
            'item': _resolveItem(params)
        });
    },

    [GET_CONTENT_MENU_SUCCESS]: (state, {payload}) => state.merge({
        'menu': _resolveMenu(payload.data)
    }),
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
        _.each(menu, (item)=> {
            if (item.key == type) {
                _.each(item.itemList, (childItem)=> {
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


// 裁剪过多字符
function _resolveReleaseLength(item) {
    _.forEach(['vsite', 'wx', 'wb', 'toutiao'], (key) => {
        _.map(item[key], (_item, keyChild) => {
            if (keyChild === 'title' || keyChild === 'author' || keyChild === 'desc') {
                item[key][keyChild] = _item.substring(0, RELEASE_LENGTH_CONFIG[`${key.toUpperCase()}_${keyChild.toUpperCase()}`]);
            }
        });
    });

}


// 处理发布渠道自动同步问题
function _handelRelease(item, state, payload) {
    const keyString = getObjectKey(payload);
    const keyChildren = keyString.split('.')[1];
    let keyupValue = getObject(state.get('item').toJS(), keyString);
    let payloadKeyupValue = getObject(payload, keyString);
    let releaseCache = state.get('releaseCache').toJS();

    // 当前输入的input为空时，启用自动同步
    if (!keyupValue) {
        releaseCache.changeKeys = keyString;

        // 查找相同类型字段记录
        _.forEach(['vsite', 'wb', 'wx', 'toutiao'], (key) => {
            if (!item[key][keyChildren]) {
                releaseCache.updateKeys.push(key);
            }
        });
    }

    // 处理自动同步
    if (releaseCache.changeKeys) {
        if (releaseCache.changeKeys === keyString) {
            _.forEach(releaseCache.updateKeys, (key) => {
                item[key][keyChildren] = payloadKeyupValue;
            });
        } else {
            releaseCache.changeKeys = null;
            releaseCache.updateKeys = [];
        }
    }

    return {
        item,
        releaseCache
    };
}

function _resolveItem(_item) {

    let item = _.assign({}, _item);

    _.forEach(item.mediaDelIds, (value) => {
        let content = item.content.replace(new RegExp(value, 'g'), MEDIA_DEL_ID);
        item.content = content;
    });

    item.mediaIds = _.xor(_pushMediaIds(item));

    return _.defaults(item, DEFAULT_ITEM);
}

function _pushMediaIds(item) {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /alt=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let imgs = item.content.match(imgReg);
    let mediaIds = [];

    if (!_.has(item, 'mediaIds')) {
        item.mediaIds = [];
    }

    _.forEach(imgs, (data) => {
        if (data.indexOf('material') !== -1) {
            const id = data.match(srcReg)[1].split('_')[1];
            mediaIds.push(id);
        }
    });

    return mediaIds;
}

function _resolveMenu(menuMediaData) {

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

    // 热门资讯菜单
    const menuPost = {
        key: 'post',
        icon: 'icon-zixun',
        title: '资讯',
        itemList: [
            {
                key: 'post-fav',
                title: '已收藏',
                type: 'text'
            },
            {
                key: 'post-tpl',
                title: '模板',
                type: 'text'
            }
        ]
    };

    // 版式菜单列表
    const menuBulk = {
        key: 'bulk',
        icon: 'icon-banshi',
        title: '版式',
        itemList: [
            {
                key: 'bulk-bt',
                title: '标题',
                type: 'text'
            }, {
                key: 'bulk-tw',
                title: '图文',
                type: 'text'
            }, {
                key: 'bulk-gz',
                title: '关注',
                type: 'text'
            }, {
                key: 'bulk-qr',
                title: '二维码',
                type: 'text'
            }, {
                key: 'bulk-fgf',
                title: '分隔符',
                type: 'text'
            }
        ]
    };

    // 素材菜单列表
    let menuMedia = {
        key: 'media',
        icon: 'icon-sucai',
        title: '素材',
        itemList: []
    };

    _.each(menuMediaData, (item)=> {
        if (item.code !== 'background') {
            menuMedia.itemList.push({
                key: 'media-' + item.code,
                title: item.name,
                type: 'text',
                query: {
                    categoryId: item.id
                }
            });
        }
    });

    // 营销插件菜单列表
    const menuPlugin = {
        key: 'plugin',
        icon: 'icon-yingxiao',
        title: '营销',
        itemList: [
            {
                key: 'plugin-packet',
                title: '优惠券',
                type: 'plus',
                disabled: true
            }, {
                key: 'plugin-activity',
                title: '活动',
                type: 'plus',
                disabled: false
            }, {
                key: 'plugin-shopping',
                title: '导购',
                type: 'plus'
            }, {
                key: 'plugin-praise',
                title: '点赞',
                type: 'switch',
                checked: false
            }, {
                key: 'plugin-tips',
                title: '打赏',
                type: 'switch',
                checked: false
            }, {
                key: 'plugin-opinion',
                title: '留言',
                type: 'switch',
                checked: false
            }
        ]
    };

    return [menuPost, menuBulk, menuMedia, menuPlugin];
}
