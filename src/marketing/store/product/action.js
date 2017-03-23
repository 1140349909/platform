import * as apiProduct from '../../../common/api/product';

/*商品后台管理*/

// 新增商品
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_PENDING = 'ADD_PRODUCT_PENDING';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';
// 商品删除
export const DEL_PRODUCT = 'DEL_PRODUCT';
export const DEL_PRODUCT_PENDING = 'DEL_PRODUCT_PENDING';
export const DEL_PRODUCT_SUCCESS = 'DEL_PRODUCT_SUCCESS';
export const DEL_PRODUCT_FAILURE = 'DEL_PRODUCT_FAILURE';
// 修改商品信息
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_PENDING = 'UPDATE_PRODUCT_PENDING';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';
// 商品下架
export const UPDATE_PRODUCT_FINISHED = 'UPDATE_PRODUCT_FINISHED';
export const UPDATE_PRODUCT_FINISHED_PENDING = 'UPDATE_PRODUCT_FINISHED_PENDING';
export const UPDATE_PRODUCT_FINISHED_SUCCESS = 'UPDATE_PRODUCT_FINISHED_SUCCESS';
export const UPDATE_PRODUCT_FINISHED_FAILURE = 'UPDATE_PRODUCT_FINISHED_FAILURE';
// 修改商品图文信息
export const UPDATE_PRODUCT_INFO = 'UPDATE_PRODUCT_INFO';
export const UPDATE_PRODUCT_INFO_SUCCESS = 'UPDATE_PRODUCT_INFO_SUCCESS';
export const UPDATE_PRODUCT_INFO_PENDING = 'UPDATE_PRODUCT_INFO_PENDING';
export const UPDATE_PRODUCT_INFO_FAILURE = 'UPDATE_PRODUCT_INFO_FAILURE';
// 修改商品交易属性
export const UPDATE_PRODUCT_TRADE = 'UPDATE_PRODUCT_TRADE';
export const UPDATE_PRODUCT_TRADE_SUCCESS = 'UPDATE_PRODUCT_TRADE_SUCCESS';
export const UPDATE_PRODUCT_TRADE_PENDING = 'UPDATE_PRODUCT_TRADE_PENDING';
export const UPDATE_PRODUCT_TRADE_FAILURE = 'UPDATE_PRODUCT_TRADE_FAILURE';
// 商品上架
export const UPDATE_PRODUCT_OPENING = 'UPDATE_PRODUCT_OPENING';
export const UPDATE_PRODUCT_OPENING_PENDING = 'UPDATE_PRODUCT_OPENING_PENDING';
export const UPDATE_PRODUCT_OPENING_SUCCESS = 'UPDATE_PRODUCT_OPENING_SUCCESS';
export const UPDATE_PRODUCT_OPENING_FAILURE = 'UPDATE_PRODUCT_OPENING_FAILURE';

// 获取商品信息
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCT_PENDING = 'GET_PRODUCT_PENDING';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';
// 商品列表
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
// 已上架的商品列表
export const GET_OPENING_PRODUCTS = 'GET_OPENING_PRODUCTS';
export const GET_OPENING_PRODUCTS_PENDING = 'GET_OPENING_PRODUCTS_PENDING';
export const GET_OPENING_PRODUCTS_SUCCESS = 'GET_OPENING_PRODUCTS_SUCCESS';
export const GET_OPENING_PRODUCTS_FAILURE = 'GET_OPENING_PRODUCTS_FAILURE';
// 添加商品到购买渠道
export const ADD_BUY_CHANNEL_PRODUCT = 'ADD_BUY_CHANNEL_PRODUCT';
export const ADD_BUY_CHANNEL_PRODUCT_PENDING = 'ADD_BUY_CHANNEL_PRODUCT_PENDING';
export const ADD_BUY_CHANNEL_PRODUCT_SUCCESS = 'ADD_BUY_CHANNEL_PRODUCT_SUCCESS';
export const ADD_BUY_CHANNEL_PRODUCT_FAILURE = 'ADD_BUY_CHANNEL_PRODUCT_FAILURE';
// 商品可交易渠道列表
export const GET_BUY_CHANNEL_LIST = 'GET_BUY_CHANNEL_LIST';
export const GET_BUY_CHANNEL_LIST_PENDING = 'GET_BUY_CHANNEL_LIST_PENDING';
export const GET_BUY_CHANNEL_LIST_SUCCESS = 'GET_BUY_CHANNEL_LIST_SUCCESS';
export const GET_BUY_CHANNEL_LIST_FAILURE = 'GET_BUY_CHANNEL_LIST_FAILURE';

/*商品后台管理：完*/

export const ADD_MANAGER_PRODUCT_TKER = 'ADD_MANAGER_PRODUCT_TKER';
export const ADD_MANAGER_PRODUCT_TKER_PENDING = 'ADD_MANAGER_PRODUCT_TKER_PENDING';
export const ADD_MANAGER_PRODUCT_TKER_SUCCESS = 'ADD_MANAGER_PRODUCT_TKER_SUCCESS';
export const ADD_MANAGER_PRODUCT_TKER_FAILURE = 'ADD_MANAGER_PRODUCT_TKER_FAILURE';
// 修改商品推客代言配置
export const UPDATE_MANAGER_PRODUCT_TKER = 'UPDATE_MANAGER_PRODUCT_TKER';
export const UPDATE_MANAGER_PRODUCT_TKER_PENDING = 'UPDATE_MANAGER_PRODUCT_TKER_PENDING';
export const UPDATE_MANAGER_PRODUCT_TKER_SUCCESS = 'UPDATE_MANAGER_PRODUCT_TKER_SUCCESS';
export const UPDATE_MANAGER_PRODUCT_TKER_FAILURE = 'UPDATE_MANAGER_PRODUCT_TKER_FAILURE';
// 已开通推客代言的商品列表
export const GET_MANAGER_PRODUCT_TKER_LIST = 'GET_MANAGER_PRODUCT_TKER_LIST';
export const GET_MANAGER_PRODUCT_TKER_LIST_PENDING = 'GET_MANAGER_PRODUCT_TKER_LIST_PENDING';
export const GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS = 'GET_MANAGER_PRODUCT_TKER_LIST_SUCCESS';
export const GET_MANAGER_PRODUCT_TKER_LIST_FAILURE = 'GET_MANAGER_PRODUCT_TKER_LIST_FAILURE';
// 商品可开通推客代言渠道列表
export const GET_MANAGER_PRODUCT_TKER_ENABLE_LIST = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST';
export const GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_SUCCESS';
export const GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_PENDING = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_PENDING';
export const GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_FAILURE = 'GET_MANAGER_PRODUCT_TKER_ENABLE_LIST_FAILURE';

// 获取商品推客代言数据
export const GET_MANAGER_DATA_TKER = 'GET_MANAGER_DATA_TKER';
export const GET_MANAGER_DATA_TKER_SUCCESS = 'GET_MANAGER_DATA_TKER_SUCCESS';
export const GET_MANAGER_DATA_TKER_PENDING = 'GET_MANAGER_DATA_TKER_PENDING';
export const GET_MANAGER_DATA_TKER_FAILURE = 'GET_MANAGER_DATA_TKER_FAILURE';

// 添加商品
export function addProduct(params) {
    return {
        type: ADD_PRODUCT,
        payload: apiProduct.addProduct(params)
    };
}


// 删除商品
export function delProduct(id) {
    return {
        type: DEL_PRODUCT,
        payload: apiProduct.delProduct(id)
    };
}

// 修改商品
export function updateProduct(params) {
    return {
        type: UPDATE_PRODUCT,
        payload: apiProduct.updateProduct(params)
    };
}

// 保存商品信息
export function saveProduct(product) {
    return product.id ? updateProduct(product) : addProduct(product);
}

// 获取商品详情
export function getProduct(id) {
    return {
        type: GET_PRODUCT,
        payload: apiProduct.getProduct(id)
    };
}

// 获取商品库列表
export function getProducts(params) {
    return {
        type: GET_PRODUCTS,
        payload: apiProduct.getProducts(params)
    };
}


// 获取商城上架商品列表
export function getOpeningProducts(params) {
    return {
        type: GET_OPENING_PRODUCTS,
        payload: apiProduct.getOpeningProducts(params)
    };
}


// 上架商城商品
export function updateProductOpening(productIds) {
    return {
        type: UPDATE_PRODUCT_OPENING,
        payload: apiProduct.updateProductOpening(productIds)
    };
}


// 下架商城商品
export function updateProductFinished(id, callback) {
    return {
        type: UPDATE_PRODUCT_FINISHED,
        payload: {
            promise: apiProduct.updateProductFinished(id),
            callback
        }
    };
}

// 修改商品图文信息
export function updateProductInfo(product) {
    return {
        type: UPDATE_PRODUCT_INFO,
        payload: apiProduct.updateProductInfo(product)
    };
}

// 修改商品交易设置
export function updateProductTrade(product) {
    return {
        type: UPDATE_PRODUCT_TRADE,
        payload: apiProduct.updateProductTrade(product)
    };
}


// POST /api/v1/{client}/{channel}/manager/product/{buyChannel}
// 添加商品到购买渠道
export function addBuyChannelProduct(buyChannel, productIds) {
    return {
        type: ADD_BUY_CHANNEL_PRODUCT,
        payload: apiProduct.addBuyChannelProduct(buyChannel, productIds)
    };
}

// 获取当前账户下的客户所有可添加到指定交易渠道的商品
export function getBuyChannelList(buyChannel, params) {
    return {
        type: GET_BUY_CHANNEL_LIST,
        payload: apiProduct.getBuyChannelList(buyChannel, params)
    };
}

// 添加商品到推客代言平台
export function addManagerProductTker(productIds) {
    return {
        type: ADD_MANAGER_PRODUCT_TKER,
        payload: apiProduct.addManagerProductTker(productIds)
    };
}

// 修改商品推客代言配置
export function updateManagerProductTker(params) {
    return {
        type: UPDATE_MANAGER_PRODUCT_TKER,
        payload: apiProduct.updateManagerProductTker(params)
    };
}

// 已开通推客代言的商品列表
export function getManagerProductTkerList(params) {
    return {
        type: GET_MANAGER_PRODUCT_TKER_LIST,
        payload: apiProduct.getManagerProductTkerList(params)
    };
}


// 商品可开通推客代言渠道列表
export function getManagerProductTkerEnableList(params) {
    return {
        type: GET_MANAGER_PRODUCT_TKER_ENABLE_LIST,
        payload: apiProduct.getManagerProductTkerEnableList(params)
    };
}

// 获取商品推客代言数据
export function getManagerProductDataTker(id) {
    return {
        type: GET_MANAGER_DATA_TKER,
        payload: apiProduct.getManagerProductDataTker(id)
    };
}





