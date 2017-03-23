import  * as apiDataAgg from  '../../../common/api/dataAgg';

export const GET_DATA_AGG = 'GET_DATA_AGG';
export const GET_DATA_AGG_PENDING = 'GET_DATA_AGG_PENDING';
export const GET_DATA_AGG_SUCCESS = 'GET_DATA_AGG_SUCCESS';
export const GET_DATA_AGG_FAILURE = 'GET_DATA_AGG_FAILURE';

export function getDataAgg(params) {
    return {
        type: GET_DATA_AGG,
        payload: Promise.all([
            apiDataAgg.getDataAggContentEffectTotal(params),
            apiDataAgg.getDataAggShoppingEffectCouponTotal(params),
            apiDataAgg.getDataAggShoppingEffectIntegralTotal(params),
            apiDataAgg.getDataAggShoppingEffectBuyTotal(params),
            apiDataAgg.getDataAggSiteEffectTotal(params)
        ])
    };
}

//获取资讯图文效率聚合统计汇总数据
export const GET_TOTAL_CONTENT_EFFECT = 'GET_TOTAL_CONTENT_EFFECT';
export const GET_TOTAL_CONTENT_EFFECT_PENDING = 'GET_TOTAL_CONTENT_EFFECT_PENDING';
export const GET_TOTAL_CONTENT_EFFECT_SUCCESS = 'GET_TOTAL_CONTENT_EFFECT_SUCCESS';
export const GET_TOTAL_CONTENT_EFFECT_FAILURE = 'GET_TOTAL_CONTENT_EFFECT_FAILURE';
//获取优惠券导购效率效率聚合统计汇总数据
export const GET_TOTAL_SHOPPING_COUPON = 'GET_TOTAL_SHOPPING_COUPON';
export const GET_TOTAL_SHOPPING_COUPON_PENDING = 'GET_TOTAL_SHOPPING_COUPON_PENDING';
export const GET_TOTAL_SHOPPING_COUPON_SUCCESS = 'GET_TOTAL_SHOPPING_COUPON_SUCCESS';
export const GET_TOTAL_SHOPPING_COUPON_FAILURE = 'GET_TOTAL_SHOPPING_COUPON_FAILURE';
//获取积分导购效率效率聚合统计汇总数据
export const GET_TOTAL_SHOPPING_INTEGRAL = 'GET_TOTAL_SHOPPING_INTEGRAL';
export const GET_TOTAL_SHOPPING_INTEGRAL_PENDING = 'GET_TOTAL_SHOPPING_INTEGRAL_PENDING';
export const GET_TOTAL_SHOPPING_INTEGRAL_SUCCESS = 'GET_TOTAL_SHOPPING_INTEGRAL_SUCCESS';
export const GET_TOTAL_SHOPPING_INTEGRAL_FAILURE = 'GET_TOTAL_SHOPPING_INTEGRAL_FAILURE';

//获取一键导购
export const GET_TOTAL_SHOOPING_EFFECT_INTEGRAL = 'GET_TOTAL_SHOOPING_EFFECT_INTEGRAL';
export const GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_PENDING = 'GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_PENDING';
export const GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_SUCCESS = 'GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_SUCCESS';
export const GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_FAILURE = 'GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_FAILURE';

//站点效率
export const GET_TOTAL_SITE_EFFECT = 'GET_TOTAL_SITE_EFFECT';
export const GET_TOTAL_SITE_EFFECT_PENDING = 'GET_TOTAL_SITE_EFFECT_PENDING';
export const GET_TOTAL_SITE_EFFECT_SUCCESS = 'GET_TOTAL_SITE_EFFECT_SUCCESS';
export const GET_TOTAL_SITE_EFFECT_FAILURE = 'GET_TOTAL_SITE_EFFECT_FAILURE';

export const GET_DATA_AGG_FANS_DAY = 'GET_DATA_AGG_FANS_DAY';
export const GET_DATA_AGG_FANS_DAY_PENDING = 'GET_DATA_AGG_FANS_DAY_PENDING';
export const GET_DATA_AGG_FANS_DAY_SUCCESS = 'GET_DATA_AGG_FANS_DAY_SUCCESS';
export const GET_DATA_AGG_FANS_DAY_FAILURE = 'GET_DATA_AGG_FANS_DAY_FAILURE';

//
export const GET_DATA_AGG_VISITOR_TOTAL = 'GET_DATA_AGG_VISITOR_TOTAL';
export const GET_DATA_AGG_VISITOR_TOTAL_PENDING = 'GET_DATA_AGG_VISITOR_TOTAL_PENDING';
export const GET_DATA_AGG_VISITOR_TOTAL_SUCCESS = 'GET_DATA_AGG_VISITOR_TOTAL_SUCCESS';
export const GET_DATA_AGG_VISITOR_TOTAL_FAILURE = 'GET_DATA_AGG_VISITOR_TOTAL_FAILURE';

export function getTotalContentEffect(params) {
    return {
        type: GET_TOTAL_CONTENT_EFFECT,
        payload: apiDataAgg.getDataAggContentEffectTotal(params)
    };
}
export function getTotalShoppingCoupon(params) {
    return {
        type: GET_TOTAL_SHOPPING_COUPON,
        payload: apiDataAgg.getDataAggShoppingEffectCouponTotal(params)
    };
}
export function getTotalShoppingIntegral(params) {
    return {
        type: GET_TOTAL_SHOPPING_INTEGRAL,
        payload: apiDataAgg.getDataAggShoppingEffectIntegralTotal(params)
    };
}

export function getTotalBuyEffect(params) {
    return {
        type: GET_TOTAL_SHOOPING_EFFECT_INTEGRAL,
        payload: apiDataAgg.getDataAggShoppingEffectBuyTotal(params)
    };
}

export function getTotalSiteEffect(params) {
    return {
        type: GET_TOTAL_SITE_EFFECT,
        payload: apiDataAgg.getDataAggSiteEffectTotal(params)
    };
}

export function getDataAggFansDay() {
    return {
        type: GET_DATA_AGG_FANS_DAY,
        payload: apiDataAgg.getDataAggFansDay()
    };
}

export function getDataAggVistorTotal() {
    return {
        type: GET_DATA_AGG_VISITOR_TOTAL,
        payload: apiDataAgg.getDataAggVistorTotal()
    };
}

