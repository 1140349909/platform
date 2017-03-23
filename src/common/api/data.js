import http from '../http';

// 统计商城/一元购销售数据
export function getDataProductTotalSales(type) {
    return http.get('manager/data/{buyType}/total', {
        buyType: type
    });
}

// 获取商品销售统计数据
export function getDataProductSalesMall({
    id,
    dateRange,
    startDate,
    enDate,
}) {
    return http.get('manager/data/product/sales/mall/{id}', {
        id,
        dateRange,
        startDate,
        enDate,
    });
}

// 获取一元购商品销售统计数据
export function getDataProductSalesYyg({
    id,
    dateRange,
    startDate,
    enDate,
}) {
    return http.get('manager/data/product/sales/yyg/{id}', {
        id,
        dateRange,
        startDate,
        enDate,
    });
}

// GET /api/v1/{client}/{channel}/manager/data/vsite/buy/total 获取微站交易统计汇总数据
export function getDataVsiteBuyTotal() {
    return http.get('manager/data/vsite/buy/total');
}
