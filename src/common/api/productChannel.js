import http from '../http';
import config from '../config';

// 获取渠道商品列表
//GET manager/product/channel/{buyChannel}/list
export function getProductChannelList(buyChannel, {
    page = 0,
    size = config.SIZE,
    sort,
    order,
    status,
    name
}) {
    return http.get('manager/product/channel/{buyChannel}/list', {
        buyChannel,
        page,
        size,
        sort,
        order,
        status,
        name
    });
}

// 获取已上架的商品列表
export function getProductChannelOpeningList(buyChannel, {
    page = 0,
    size = config.SIZE,
    sort,
    order,
    name,
}) {
    return http.get('manager/product/channel/opening/{buyChannel}/list', {
        buyChannel,
        page,
        size,
        sort,
        order,
        name
    });
}


//DELETE manager/product/channel/{buyChannel}/{id} 商品删除
// 删除渠道商品
export function delChannelProduct(buyChannel, id) {
    return http.delete('manager/product/channel/{buyChannel}/{id}', {
        buyChannel,
        id
    });
}

// 获取渠道商品详情
//GET manager/product/channel/{buyChannel}/{id} 获取商品信息
export function getChannelProduct(buyChannel, id) {
    return http.get('manager/product/channel/{buyChannel}/{id}', {
        buyChannel,
        id
    });
}


//获取商品列表-资讯适配
// POST manager/product/channel/content/list
export function getProductChannelContentList({
    buyChannel,
    name,
    page = 0,
    size = config.SIZE,
    sort,
    order
}) {
    return http.post('manager/product/channel/content/list', {
        buyChannel,
        name
    }, {
        params: {
            page,
            size,
            sort,
            order,
        }
    });
}

// 上架渠道商品
//POST manager/product/channel/{buyChannel}/opening 商品上架
export function updateChannelProductOpening(buyChannel, productIds) {
    if (typeof productIds == 'string') {
        productIds = [productIds];
    }
    return http.post('manager/product/channel/{buyChannel}/opening', {
        productIds
    }, {
        params: {
            buyChannel
        }
    });
}


// 下架渠道商品
//POST manager/product/channel/{buyChannel}/finished/{id} 商品下架
export function updateChannelProductFinished(buyChannel, id) {
    return http.post('manager/product/channel/{buyChannel}/finished/{id}', null, {
        params: {
            buyChannel,
            id
        }
    });
}

// 修改渠道商品图文信息
//POST manager/product/channel/{buyChannel}/info/{id} 修改商品图文信息
export function updateChannelProductInfo(buyChannel, product) {
    return http.post('manager/product/channel/{buyChannel}/info/{id}', product, {
        params: {
            buyChannel,
            id: product.id
        }
    });
}

// 修改渠道商品交易设置
//POST manager/product/channel/{buyChannel}/trade/{id} 修改商品交易属性
export function updateChannelProductTrade(buyChannel, product) {
    return http.post('manager/product/channel/{buyChannel}/trade/{id}', product, {
        params: {
            buyChannel,
            id: product.id
        }
    });
}

// 商品结束交易
// POST manager/product/channel/{buyChannel}/finished/closed/{id}
export function updateChannelProductFinishedClosed(id, buyChannel) {
    return http.post('manager/product/channel/{buyChannel}/finished/closed/{id}', null, {
        params: {
            buyChannel,
            id,
        }
    });
}



