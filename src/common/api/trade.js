import http from '../http';

// 修改商城商品物流信息
export function updateTradeLogistics(data, buyType, id) {
    return http.post('manager/product/trade/{buyType}/logistic/{id}', data, {
        params: {
            buyType,
            id
        }
    });
}

// 修改商城商品交易记录物流状态为己收货
export function updateTradeLogisticsStatus(buyType,
                                           id) {
    return http.put('manager/product/trade/{buyType}/logistic/status/received/{id}', null, {
        params: {
            buyType,
            id
        }
    });
}

// 获取商城商品交易记录列表
// 假借商城商品列表数据已调通，从商城商品列表换为商城商品交易记录列表
// 当然，现在没有交易记录，所以数据为空
export function getTradeList({
    buyType,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('manager/product/trade/{buyType}/list', {
        buyType,
        page,
        size,
        sort,
        order
    });
}


// 返回当前账户下所有交易晒单
export function getTradeShowList({
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('manager/trade/show/list', {
        page,
        size,
        sort,
        order
    });
}

// 删除商品晒单记录
export function deleteTradeShow(data) {
    return http.delete('manager/trade/show/{id}', {
        id: data.id
    }, {
        params: {
            pageIndex: data.pageIndex
        }
    });
}
