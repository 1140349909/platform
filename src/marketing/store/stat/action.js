import * as apiData from '../../../common/api/data';

/*平台交易数据分析中心：sales*/

// 总计销售统计数据
export const GET_DATA_PRODUCT_TOTAL_SALES = 'GET_DATA_PRODUCT_TOTAL_SALES';
export const GET_DATA_PRODUCT_TOTAL_SALES_PENDING = 'GET_DATA_PRODUCT_TOTAL_SALES_PENDING';
export const GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS = 'GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS';
export const GET_DATA_PRODUCT_TOTAL_SALES_FAILURE = 'GET_DATA_PRODUCT_TOTAL_SALES_FAILURE';
// 获取销售统计数据
export const GET_DATA_PRODUCT_SALES = 'GET_DATA_PRODUCT_SALES';
export const GET_DATA_PRODUCT_SALES_PENDING = 'GET_DATA_PRODUCT_SALES_PENDING';
export const GET_DATA_PRODUCT_SALES_SUCCESS = 'GET_DATA_PRODUCT_SALES_SUCCESS';
export const GET_DATA_PRODUCT_SALES_FAILURE = 'GET_DATA_PRODUCT_SALES_FAILURE';
// 获取商品销售统计数据
export const GET_DATA_PRODUCT_SALES_MALL = 'GET_DATA_PRODUCT_SALES_MALL';
export const GET_DATA_PRODUCT_SALES_MALL_SUCCESS = 'GET_DATA_PRODUCT_SALES_MALL_SUCCESS';
export const GET_DATA_PRODUCT_SALES_MALL_PENDING = 'GET_DATA_PRODUCT_SALES_MALL_PENDING';
export const GET_DATA_PRODUCT_SALES_MALL_FAILURE = 'GET_DATA_PRODUCT_SALES_MALL_FAILURE';
// 获取一元购商品销售统计数据
export const GET_DATA_PRODUCT_SALES_YYG = 'GET_DATA_PRODUCT_SALES_YYG';
export const GET_DATA_PRODUCT_SALES_YYG_SUCCESS = 'GET_DATA_PRODUCT_SALES_YYG_SUCCESS';
export const GET_DATA_PRODUCT_SALES_YYG_PENDING = 'GET_DATA_PRODUCT_SALES_YYG_PENDING';
export const GET_DATA_PRODUCT_SALES_YYG_FAILURE = 'GET_DATA_PRODUCT_SALES_YYG_FAILURE';

// 获取微站交易统计汇总数据
export const GET_DATA_VSITE_BUY_TOTAL = 'GET_DATA_VSITE_BUY_TOTAL';
export const GET_DATA_VSITE_BUY_TOTAL_SUCCESS = 'GET_DATA_VSITE_BUY_TOTAL_SUCCESS';
export const GET_DATA_VSITE_BUY_TOTAL_PENDING = 'GET_DATA_VSITE_BUY_TOTAL_PENDING';
export const GET_DATA_VSITE_BUY_TOTAL_FAILURE = 'GET_DATA_VSITE_BUY_TOTAL_FAILURE';


/*平台交易数据分析中心：完*/

// 统计商城/一元购销售数据
export function getDataProductTotalSales(type) {
    return {
        type: GET_DATA_PRODUCT_TOTAL_SALES,
        payload: apiData.getDataProductTotalSales(type)
    };
}

// 获取商品销售统计数据
export function getDataProductSalesMall(params) {
    return {
        type: GET_DATA_PRODUCT_SALES_MALL,
        payload: apiData.getDataProductTotalSales(params)
    };
}

// 获取一元购商品销售统计数据
export function getDataProductSalesYyg(params) {
    return {
        type: GET_DATA_PRODUCT_SALES_YYG,
        payload: apiData.getDataProductSalesYyg(params)
    };
}

// 获取商品统计
export function getDataProductSales(params) {
    return {
        type: GET_DATA_PRODUCT_SALES,
        payload: Promise.all([apiData.getDataProductSalesMall(params), apiData.getDataProductSalesYyg(params)])
    };
}

// 获取微站交易统计汇总数据
export function getDataVsiteBuyTotal() {
    return {
        type: GET_DATA_VSITE_BUY_TOTAL,
        payload: apiData.getDataVsiteBuyTotal()
    };
}

