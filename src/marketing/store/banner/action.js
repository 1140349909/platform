import  * as apiBanner from  '../../../common/api/banner';

// 获取商城首页的广告条
export const GET_MANAGER_BANNER = 'GET_MANAGER_BANNER';
export const GET_MANAGER_BANNER_PENDING = 'GET_MANAGER_BANNER_PENDING';
export const GET_MANAGER_BANNER_SUCCESS = 'GET_MANAGER_BANNER_SUCCESS';
export const GET_MANAGER_BANNER_FAILURE = 'GET_MANAGER_BANNER_FAILURE';

// 商城首页广告条服务
export const UPDATE_MANAGER_BANNER = 'UPDATE_MANAGER_BANNER';
export const UPDATE_MANAGER_BANNER_PENDING = 'UPDATE_MANAGER_BANNER_PENDING';
export const UPDATE_MANAGER_BANNER_SUCCESS = 'UPDATE_MANAGER_BANNER_SUCCESS';
export const UPDATE_MANAGER_BANNER_FAILURE = 'UPDATE_MANAGER_BANNER_FAILURE';

//获取商城广告条
export function getManagerBanner(buyType) {
    return {
        type: GET_MANAGER_BANNER,
        payload: apiBanner.getManagerBanner(buyType)
    };
}

//修改商城广告条
export function updateManagerBanner(buyType, data) {
    return {
        type: UPDATE_MANAGER_BANNER,
        payload: apiBanner.updateManagerBanner(buyType, data)
    };
}




