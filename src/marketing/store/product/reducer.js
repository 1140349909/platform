import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getSafeValue} from 'common/util';
import {getMediaUrl} from 'common/util/media';
import _ from 'lodash';
import {
    ADD_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCTS_SUCCESS,
    GET_OPENING_PRODUCTS_SUCCESS,
    GET_BUY_CHANNEL_LIST_SUCCESS,
    UPDATE_MANAGER_PRODUCT_TKER_SUCCESS,
    GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS,
    ADD_MANAGER_PRODUCT_TKER_SUCCESS,
    GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS,
    GET_MANAGER_DATA_TKER_SUCCESS,
} from './action';

const initialState = fromJS({
    current: '',

    // 当前item
    item: null,

    // 列表map
    items: {},

    // 列表数据
    list: {},

    // 上架商品列表
    openingList: {},

    // 获取当前账户下的客户所有可添加到指定交易渠道的商品
    buyChannelList: {},

    // 获取已开通推客列表
    tkerProductList: {},

    // 获取可开通推客列表成功
    tkerEnableList: [],

    // 获取商品推客代言数据
    tkerItem: null,
});

export default createReducer(initialState, {

    // 新增商品成功返回
    [ADD_PRODUCT_SUCCESS]: (state, {payload}) => {
        return state.set('item', fromJS({id: payload.data}));
    },

    // 更新商品成功返回
    [UPDATE_PRODUCT_SUCCESS]: (state, {payload})=> state.set('item', fromJS(payload.params)),

    // 获取商品成功返回
    [GET_PRODUCT_SUCCESS]: (state, {payload})=> state.set('item', fromJS(_resolveItem(payload.data))),

    // 获取商品列表成功返回
    [GET_PRODUCTS_SUCCESS]: (state, {payload})=> {
        let items = {};

        payload.data.content.map(item => {
            items[item.id] = _resolveItem(item);
            items[item.id] = _resolveMediaRes(item);
        });

        return state.merge({
            list: payload.data,
            items
        });
    },

    [GET_OPENING_PRODUCTS_SUCCESS]: (state, {payload})=> {
        payload.data.content.forEach(item => {
            _resolveItem(item);
        });
        return state.set('openingList', fromJS(payload.data));
    },

    [GET_BUY_CHANNEL_LIST_SUCCESS]: (state, {payload})=> {

        payload.data.content.forEach(item => {
            _resolveMediaRes(item);
        });

        return state.set('buyChannelList', fromJS(payload.data));
    },

    // 添加商品到推客代言平台
    [ADD_MANAGER_PRODUCT_TKER_SUCCESS]: (state, {payload}) => {
        payload.params.id = payload.data;
        return state.set('item', fromJS(payload.params));
    },

    // 获取已开通推客列表成功返回
    [GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS]: (state, {payload})=> {
        let items = {};

        payload.data.content.forEach(item => {
            items[item.id] = _resolveItem(item);
            items[item.id] = _resolveMediaRes(item);
        });

        return state.merge({
            list: payload.data,
            items: items
        });
    },

    // 获取可开通推客列表成功返回
    [GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS]: (state, {payload})=> {
        let tkerEnableList = payload.data;

        tkerEnableList.content.forEach(item => {
            _resolveItem(item);
        });

        return state.set('tkerEnableList', fromJS(tkerEnableList));
    },

    // 修改商品推客代言配置
    [UPDATE_MANAGER_PRODUCT_TKER_SUCCESS]: (state, {payload})=> state.set('item', fromJS(payload.params)),

    // 获取商品推客代言数据
    [GET_MANAGER_DATA_TKER_SUCCESS]: (state, {payload})=> state.set('tkerItem', fromJS(payload.data))
});


function _resolveMediaRes(item) {
    item.mediaRes = item.mediaRes || {};

    // 商品图片
    if (item.mediaRes && item.mediaRes.productImgId) {
        item.mediaRes.productImgUrl = getMediaUrl(item.mediaRes.productImgId);
    }

    // 封面
    if (item.mediaRes && item.mediaRes.coverImgId) {
        item.mediaRes.coverImgUrl = getMediaUrl(item.mediaRes.coverImgId);
    }

    // 详情图片
    if (item.mediaRes && item.mediaRes.bannerImgs) {
        let bannerImgsUrl = [];
        item.mediaRes.bannerImgs.forEach(img => {
            bannerImgsUrl.push(getMediaUrl(img));
        });
        item.mediaRes.bannerImgsUrl = bannerImgsUrl;
    }
    return item;
}


// 通用Item数据处理
function _resolveItem(item) {

    // 统计数据
    item.opdata = item.opdata || {};

    // 交易数据
    item.opdata.tradeData = item.opdata.tradeData || {};

    // 利润
    item.profits = item.mallCfg.price - item.cost;

    item.mallCfg = item.mallCfg || {};

    // 商品上架状态
    let statusText;
    if (item.mallCfg.enable) {
        statusText = '已上架';
    } else {

        if (item.mallCfg.issueNo == 0) {
            statusText = '未上架';
        } else {
            statusText = '已下架';
        }
    }

    item.statusText = statusText;

    // 是否能删除
    item.canDel = !item.mallCfg.enable && item.mallCfg.issueNo == 0 && (!item.buyChannels || item.buyChannels.length == 0);


        // 库存余量
    let intensity = getSafeValue(item.mallCfg.stock, 0) - (_.has(item, 'opdata.tradeData.amount')? item.opdata.tradeData.amount : 0);
    item.intensity = intensity;
    return item;
}
