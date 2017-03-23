import * as apiProductChannel from '../../../common/api/productChannel';

// 商品交易渠道后台管理 : 提供商品交易渠道管理服务
// 商品列表
export const GET_CHANNEL_PRODUCT_LIST = 'GET_CHANNEL_PRODUCT_LIST';
export const GET_CHANNEL_PRODUCT_LIST_PENDING = 'GET_CHANNEL_PRODUCT_LIST_PENDING';
export const GET_CHANNEL_PRODUCT_LIST_SUCCESS = 'GET_CHANNEL_PRODUCT_LIST_SUCCESS';
export const GET_CHANNEL_PRODUCT_LIST_FAILURE = 'GET_CHANNEL_PRODUCT_LIST_FAILURE';

// 已上架的商品列表
export const GET_CHANNEL_OPENING_LIST = 'GET_CHANNEL_OPENING_LIST';
export const GET_CHANNEL_OPENING_LIST_SUCCESS = 'GET_CHANNEL_OPENING_LIST_SUCCESS';
export const GET_CHANNEL_OPENING_LIST_PENDING = 'GET_CHANNEL_OPENING_LIST_PENDING';
export const GET_CHANNEL_OPENING_LIST_FAILURE = 'GET_CHANNEL_OPENING_LIST_FAILURE';

// 商品删除
export const DEL_CHANNEL_PRODUCT = 'DEL_CHANNEL_PRODUCT';
export const DEL_CHANNEL_PRODUCT_PENDING = 'DEL_CHANNEL_PRODUCT_PENDING';
export const DEL_CHANNEL_PRODUCT_SUCCESS = 'DEL_CHANNEL_PRODUCT_SUCCESS';
export const DEL_CHANNEL_PRODUCT_FAILURE = 'DEL_CHANNEL_PRODUCT_FAILURE';

// 获取商品信息
export const GET_CHANNEL_PRODUCT = 'GET_CHANNEL_PRODUCT';
export const GET_CHANNEL_PRODUCT_PENDING = 'GET_CHANNEL_PRODUCT_PENDING';
export const GET_CHANNEL_PRODUCT_SUCCESS = 'GET_CHANNEL_PRODUCT_SUCCESS';
export const GET_CHANNEL_PRODUCT_FAILURE = 'GET_CHANNEL_PRODUCT_FAILURE';

// 商品上架
export const UPDATE_CHANNEL_PRODUCT_OPENING = 'UPDATE_CHANNEL_PRODUCT_OPENING';
export const UPDATE_CHANNEL_PRODUCT_OPENING_PENDING = 'UPDATE_CHANNEL_PRODUCT_OPENING_PENDING';
export const UPDATE_CHANNEL_PRODUCT_OPENING_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_OPENING_SUCCESS';
export const UPDATE_CHANNEL_PRODUCT_OPENING_FAILURE = 'UPDATE_CHANNEL_PRODUCT_OPENING_FAILURE';

// 商品下架
export const UPDATE_CHANNEL_PRODUCT_FINISHED = 'UPDATE_CHANNEL_PRODUCT_FINISHED';
export const UPDATE_CHANNEL_PRODUCT_FINISHED_PENDING = 'UPDATE_CHANNEL_PRODUCT_FINISHED_PENDING';
export const UPDATE_CHANNEL_PRODUCT_FINISHED_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_FINISHED_SUCCESS';
export const UPDATE_CHANNEL_PRODUCT_FINISHED_FAILURE = 'UPDATE_CHANNEL_PRODUCT_FINISHED_FAILURE';

// 修改商品图文信息
export const UPDATE_CHANNEL_PRODUCT_INFO = 'UPDATE_CHANNEL_PRODUCT_INFO';
export const UPDATE_CHANNEL_PRODUCT_INFO_PENDING = 'UPDATE_CHANNEL_PRODUCT_INFO_PENDING';
export const UPDATE_CHANNEL_PRODUCT_INFO_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_INFO_SUCCESS';
export const UPDATE_CHANNEL_PRODUCT_INFO_FAILURE = 'UPDATE_CHANNEL_PRODUCT_INFO_FAILURE';

// 修改商品交易属性
export const UPDATE_CHANNEL_PRODUCT_TRADE = 'UPDATE_CHANNEL_PRODUCT_TRADE';
export const UPDATE_CHANNEL_PRODUCT_TRADE_PENDING = 'UPDATE_CHANNEL_PRODUCT_TRADE_PENDING';
export const UPDATE_CHANNEL_PRODUCT_TRADE_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_TRADE_SUCCESS';
export const UPDATE_CHANNEL_PRODUCT_TRADE_FAILURE = 'UPDATE_CHANNEL_PRODUCT_TRADE_FAILURE';

export const UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED = 'UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED';
export const UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED_PENDING = 'UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED_PENDING';
export const UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED_SUCCESS = 'UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED_SUCCESS';
export const UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED_FAILURE = 'UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED_FAILURE';


// 获取渠道商品列表
//GET manager/product/channel/{buyChannel}/list
export function getProductChannelList(buyChannel, params) {
    return {
        type: GET_CHANNEL_PRODUCT_LIST,
        payload: apiProductChannel.getProductChannelList(buyChannel,params)
    };
}

// 获取已上架的商品列表
export function getProductChannelOpeningList(buyChannel, params) {
    return {
        type: GET_CHANNEL_OPENING_LIST,
        payload: apiProductChannel.getProductChannelOpeningList(buyChannel,params)
    };
}


//DELETE manager/product/channel/{buyChannel}/{id} 商品删除
// 删除渠道商品
export function delChannelProduct(buyChannel, id) {
    return {
        type: DEL_CHANNEL_PRODUCT,
        payload: apiProductChannel.delChannelProduct(buyChannel,id)
    };
}

// 获取渠道商品详情
//GET manager/product/channel/{buyChannel}/{id} 获取商品信息
export function getChannelProduct(buyChannel, id) {
    return {
        type: GET_CHANNEL_PRODUCT,
        payload: apiProductChannel.getChannelProduct(buyChannel,id)
    };
}

// 上架渠道商品
//POST manager/product/channel/{buyChannel}/opening 商品上架
export function updateChannelProductOpening(buyChannel, productIds) {
    if (typeof productIds == 'string') {
        productIds = [productIds];
    }
    return {
        type: UPDATE_CHANNEL_PRODUCT_OPENING,
        payload: apiProductChannel.updateChannelProductOpening(buyChannel, productIds)
    };
}


// 下架渠道商品
//POST manager/product/channel/{buyChannel}/finished/{id} 商品下架
export function updateChannelProductFinished(buyChannel, id) {
    return {
        type: UPDATE_CHANNEL_PRODUCT_FINISHED,
        payload: apiProductChannel.updateChannelProductFinished(buyChannel,id)
    };
}

// 修改渠道商品图文信息
//POST manager/product/channel/{buyChannel}/info/{id} 修改商品图文信息
export function updateChannelProductInfo(buyChannel, product) {
    return {
        type: UPDATE_CHANNEL_PRODUCT_INFO,
        payload: apiProductChannel.updateChannelProductInfo(buyChannel, product)
    };
}

// 修改渠道商品交易设置
//POST manager/product/channel/{buyChannel}/trade/{id} 修改商品交易属性
export function updateChannelProductTrade(buyChannel, product) {
    return {
        type: UPDATE_CHANNEL_PRODUCT_TRADE,
        payload: apiProductChannel.updateChannelProductTrade(buyChannel,product)
    };
}

// 商品结束交易
// POST manager/product/channel/{buyChannel}/finished/closed/{id}
export function updateChannelProductFinishedClosed(id, buyChannel) {
    return {
        type: UPDATE_CHANNEL_PRODUCT_FINISHED_CLOSED,
        payload: apiProductChannel.updateChannelProductFinishedClosed(id,buyChannel)
    };
}
