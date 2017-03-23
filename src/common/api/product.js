import http from '../http';
import config from '../config';

// 添加商品
export function addProduct(product) {
    return http.post('manager/product', product);
}


// 删除商品
export function delProduct(id) {
    return http.delete('manager/product/{id}', {
        id
    });
}

// 修改商品
export function updateProduct(product) {
    return http.post('manager/product/{id}', product, {
        params: {
            id: product.id
        }
    });
}

// 获取商品详情
export function getProduct(id) {
    return http.get('manager/product/{id}', {
        id
    });
}

// 获取商品库列表
export function getProducts({
    page = 0,
    size = config.SIZE,
    sort,
    order,
    status,
    name
}) {
    return http.get('manager/product/list', {
        page,
        size,
        sort,
        order,
        status,
        name
    });
}


// 获取商城上架商品列表
export function getOpeningProducts({
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.get('manager/product/opening/list', {
        page,
        size,
        sort,
        order
    });
}


// 上架商城商品
export function updateProductOpening(productIds) {
    if (typeof productIds == 'string') {
        productIds = [productIds];
    }
    return http.post('manager/product/opening', {
        productIds
    });
}


// 下架商城商品
export function updateProductFinished(id) {
    return http.post('manager/product/finished/{id}', null, {
        params: {
            id
        }
    });
}

// 修改商品图文信息
export function updateProductInfo(product) {
    return http.post('manager/product/info/{id}', product, {
        params: {
            id: product.id
        }
    });
}

// 修改商品交易设置
export function updateProductTrade(product) {
    return http.post('manager/product/trade/{id}', product, {
        params: {
            id: product.id
        }
    });
}


// POST /api/v1/{client}/{channel}/manager/product/{buyChannel}
// 添加商品到购买渠道
export function addBuyChannelProduct(buyChannel, productIds) {
    return http.post('manager/product/buychannel/{buyChannel}', {
        productIds
    }, {
        params: {
            buyChannel
        }
    });
}

// 获取当前账户下的客户所有可添加到指定交易渠道的商品
export function getBuyChannelList(buyChannel, {
    page = 0,
    size = config.SIZE,
    sort,
    order,
    name
}) {
    return http.get('manager/product/{buyChannel}/list', {
        buyChannel,
        page,
        size,
        sort,
        order,
        name
    });
}

// 添加商品到推客代言平台
export function addManagerProductTker(productIds) {
    return http.post('manager/product/tker', {
        productIds,
    });
}

// 修改商品推客代言配置
export function updateManagerProductTker(para) {
    return http.post('manager/product/tker/{id}', para, {
        params: {
            id: para.id
        }
    });
}

// 已开通推客代言的商品列表
export function getManagerProductTkerList({
    page = 0,
    size = config.SIZE,
    name,
    sort,
    order,
}) {
    return http.get('manager/product/tker/list', {
        page,
        size,
        sort,
        name,
        order,
    });
}


// 商品可开通推客代言渠道列表
export function getManagerProductTkerEnableList({
    page = 0,
    size = config.SIZE,
    sort,
    order,
    name = '',
}) {
    return http.get('manager/product/tker/enable/list', {
        page,
        size,
        sort,
        order,
        name,
    });
}

// 获取商品推客代言数据
export function getManagerProductDataTker(id) {
    return http.get('manager/product/data/tker/{id}', {
        id,
    });
}




