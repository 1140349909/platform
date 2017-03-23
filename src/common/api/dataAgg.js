import http from '../http';
import config from '../config';


//get /api/v1/{client}/{channel}/manager/data/agg/content/effect/total 获取资讯图文效率聚合统计汇总数据
export function getDataAggContentEffectTotal({
    resType,
    dateRange = 'last7days',
    startDate,
    endDate
}) {
    return http.get(config.API_ILOKA_URL + '/manager/data/agg/content/effect/total', null, {
        params: resolveParams({
            resType,
            dateRange,
            startDate,
            endDate
        })
    });
}
// get /api/v1/{client}/{channel}/manager/data/agg/shopping/effect/coupon/total 获取优惠券导购效率效率聚合统计汇总数据
export function getDataAggShoppingEffectCouponTotal({
    resType,
    dateRange = 'last7days',
    startDate,
    endDate
}) {
    return http.get(config.API_ILOKA_URL + '/manager/data/agg/shopping/effect/coupon/total', null, {
        params: resolveParams({
            resType,
            dateRange,
            startDate,
            endDate
        })
    });
}
//get /api/v1/{client}/{channel}/manager/data/agg/shopping/effect/integral/total获取积分导购效率效率聚合统计汇总数据
export function getDataAggShoppingEffectIntegralTotal({
    resType,
    dateRange = 'last7days',
    startDate,
    endDate
}) {
    return http.get(config.API_ILOKA_URL + '/manager/data/agg/shopping/effect/integral/total', null, {
        params: resolveParams({
            resType,
            dateRange,
            startDate,
            endDate
        })
    });
}

//GET /api/v1/{client}/{channel}/manager/data/agg/shopping/effect/buy/total 获取一键导购效率效率聚合统计汇总数据
export function getDataAggShoppingEffectBuyTotal({
    resType,
    dateRange = 'last7days',
    startDate,
    endDate
}) {
    return http.get(config.API_ILOKA_URL + '/manager/data/agg/shopping/effect/buy/total', null, {
        params: resolveParams({
            resType,
            dateRange,
            startDate,
            endDate
        })
    });
}

//GET /api/v1/{client}/{channel}/manager/data/agg/site/effect/total 获取站点效率聚合统计汇总数据
export function getDataAggSiteEffectTotal({
    resType,
    dateRange = 'last7days',
    startDate = '',
    endDate
}) {
    return http.get(config.API_ILOKA_URL + '/manager/data/agg/site/effect/total', null, {
        params: resolveParams({
            resType,
            dateRange,
            startDate,
            endDate
        })
    });
}

// GET /api/v1/{client}/{channel}/manager/data/agg/fans/day 获取粉丝净关注数据
export function getDataAggFansDay() {
    return http.get(config.API_ILOKA_URL + '/manager/data/agg/fans/day');
}

// GET /api/v1/{client}/{channel}/manager/data/agg/vsite/vistor/total 获取微站访问汇总统计数据
export function getDataAggVistorTotal() {
    return http.get(config.API_ILOKA_URL + '/manager/data/agg/vsite/vistor/total');
}

function resolveParams(params) {
    if (!params.startDate) {
        params.startDate = undefined;
    }
    if (!params.endDate) {
        params.endDate = undefined;
    }
    if (!params.dateRange) {
        params.dateRange = undefined;
    }
    return params;
}
