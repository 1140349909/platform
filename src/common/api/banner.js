import http from '../http';

//获取商城广告条
export function getManagerBanner(buyType) {
    return http.get('manager/banner/buy/{buyType}', {
        buyType
    });
}

//修改商城广告条
export function updateManagerBanner(buyType, data) {
    return http.post('manager/banner/buy/{buyType}', data, {
        params: {
            buyType
        }
    });
}
