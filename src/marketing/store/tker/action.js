import * as apiTker from '../../../common/api/tker';
/*平台推客代言接口服务：tker*/

// 获取代言分润设置
export const GET_MANAGER_TKER_CONFIG = 'GET_MANAGER_TKER_CONFIG';
export const GET_MANAGER_TKER_CONFIG_PENDING = 'GET_MANAGER_TKER_CONFIG_PENDING';
export const GET_MANAGER_TKER_CONFIG_SUCCESS = 'GET_MANAGER_TKER_CONFIG_SUCCESS';
export const GET_MANAGER_TKER_CONFIG_FAILURE = 'GET_MANAGER_TKER_CONFIG_FAILURE';
// 获取代言会员
export const GET_MANAGER_TKER_LIST = 'GET_MANAGER_TKER_LIST';
export const GET_MANAGER_TKER_LIST_PENDING = 'GET_MANAGER_TKER_LIST_PENDING';
export const GET_MANAGER_TKER_LIST_SUCCESS = 'GET_MANAGER_TKER_LIST_SUCCESS';
export const GET_MANAGER_TKER_LIST_FAILURE = 'GET_MANAGER_TKER_LIST_FAILURE';
// 获取代言会员收益提成
export const GET_MANAGER_TKER_PROFIT = 'GET_MANAGER_TKER_PROFIT';
export const GET_MANAGER_TKER_PROFIT_PENDING = 'GET_MANAGER_TKER_PROFIT_PENDING';
export const GET_MANAGER_TKER_PROFIT_SUCCESS = 'GET_MANAGER_TKER_PROFIT_SUCCESS';
export const GET_MANAGER_TKER_PROFIT_FAILURE = 'GET_MANAGER_TKER_PROFIT_FAILURE';

// 获取代言会员集客
export const GET_MANAGER_TKER_SUB_MEMBER = 'GET_MANAGER_TKER_SUB_MEMBER';
export const GET_MANAGER_TKER_SUB_MEMBER_PENDING = 'GET_MANAGER_TKER_SUB_MEMBER_PENDING';
export const GET_MANAGER_TKER_SUB_MEMBER_SUCCESS = 'GET_MANAGER_TKER_SUB_MEMBER_SUCCESS';
export const GET_MANAGER_TKER_SUB_MEMBER_FAILURE = 'GET_MANAGER_TKER_SUB_MEMBER_FAILURE';

// 配置代言分润设置服务
export const UPDATE_MANAGER_TKER_CONFIG = 'UPDATE_MANAGER_TKER_CONFIG';
export const UPDATE_MANAGER_TKER_CONFIG_PENDING = 'UPDATE_MANAGER_TKER_CONFIG_PENDING';
export const UPDATE_MANAGER_TKER_CONFIG_SUCCESS = 'UPDATE_MANAGER_TKER_CONFIG_SUCCESS';
export const UPDATE_MANAGER_TKER_CONFIG_FAILURE = 'UPDATE_MANAGER_TKER_CONFIG_FAILURE';

/*平台推客代言接口服务：完*/

// 获取客户代言平台商品TOP榜
export const GET_MANAGER_TKER_PRODUCT_TOP = 'GET_MANAGER_TKER_PRODUCT_TOP';
export const GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS = 'GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS';
export const GET_MANAGER_TKER_PRODUCT_TOP_PENDING = 'GET_MANAGER_TKER_PRODUCT_TOP_PENDING';
export const GET_MANAGER_TKER_PRODUCT_TOP_FAILURE = 'GET_MANAGER_TKER_PRODUCT_TOP_FAILURE';

// 获取客户代言平台会员TOP榜
export const GET_MANAGER_TKER_MEMBER_TOP = 'GET_MANAGER_TKER_MEMBER_TOP';
export const GET_MANAGER_TKER_MEMBER_TOP_SUCCESS = 'GET_MANAGER_TKER_MEMBER_TOP_SUCCESS';
export const GET_MANAGER_TKER_MEMBER_TOP_PENDING = 'GET_MANAGER_TKER_MEMBER_TOP_PENDING';
export const GET_MANAGER_TKER_MEMBER_TOP_FAILURE = 'GET_MANAGER_TKER_MEMBER_TOP_FAILURE';

// 获取客户代言平台汇总数据
export const GET_MANAGER_TKER_DATA_TOTAL = 'GET_MANAGER_TKER_DATA_TOTAL';
export const GET_MANAGER_TKER_DATA_TOTAL_SUCCESS = 'GET_MANAGER_TKER_DATA_TOTAL_SUCCESS';
export const GET_MANAGER_TKER_DATA_TOTAL_PENDING = 'GET_MANAGER_TKER_DATA_TOTAL_PENDING';
export const GET_MANAGER_TKER_DATA_TOTAL_FAILURE = 'GET_MANAGER_TKER_DATA_TOTAL_FAILURE';


//获取所有已经开通代言功能的会员
export function getManagerTkerList(params) {
    return {
        type: GET_MANAGER_TKER_LIST,
        payload: apiTker.getManagerTkerList(params)
    };
}

//获取代言会员红利提成
export function getManagerTkerProfit(params) {
    return {
        type: GET_MANAGER_TKER_PROFIT,
        payload: apiTker.getManagerTkerProfit(params)
    };
}

//获取代言会员集客
export function getManagerTkerSubMember(params) {
    return {
        type: GET_MANAGER_TKER_SUB_MEMBER,
        payload: apiTker.getManagerTkerSubMember(params)
    };
}

//获取当前客户的代言分润设置
export function getManagerTkerConfig() {
    return {
        type: GET_MANAGER_TKER_CONFIG,
        payload: apiTker.getManagerTkerConfig()
    };
}

//配置当前客户的代言分润设置
export function updateManagerTkerConfig(data) {
    return {
        type: UPDATE_MANAGER_TKER_CONFIG,
        payload: apiTker.updateManagerTkerConfig(data)
    };
}

// 获取客户代言平台商品TOP榜
export function getManagerTkerProductTop(top = 10) {
    return {
        type: GET_MANAGER_TKER_PRODUCT_TOP,
        payload: apiTker.getManagerTkerProductTop(top, 'product')
    };
}

// 获取客户代言平台会员TOP榜
export function getManagerTkerMemberTop(top = 10) {
    return {
        type: GET_MANAGER_TKER_MEMBER_TOP,
        payload: apiTker.getManagerTkerMemberTop(top, 'member')
    };
}

// 获取客户代言平台汇总数据
export function getManagerTkerDataTotal() {
    return {
        type: GET_MANAGER_TKER_DATA_TOTAL,
        payload: apiTker.getManagerTkerDataTotal()
    };
}

