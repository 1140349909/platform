import * as apiJuhe from '../../../common/api/juhe';

// 聚合数据
export const GET_JUHE_LIST = 'GET_JUHE_LIST';
export const GET_JUHE_LIST_PENDING = 'GET_JUHE_LIST_PENDING';
export const GET_JUHE_LIST_SUCCESS = 'GET_JUHE_LIST_SUCCESS';
export const GET_JUHE_LIST_FAILURE = 'GET_JUHE_LIST_FAILURE';

// 聚合数据
export const GET_JUHE_HISTORY_TODAY_LIST = 'GET_JUHE_HISTORY_TODAY_LIST';
export const GET_JUHE_HISTORY_TODAY_LIST_PENDING = 'GET_JUHE_HISTORY_TODAY_LIST_PENDING';
export const GET_JUHE_HISTORY_TODAY_LIST_SUCCESS = 'GET_JUHE_HISTORY_TODAY_LIST_SUCCESS';
export const GET_JUHE_HISTORY_TODAY_LIST_FAILURE = 'GET_JUHE_HISTORY_TODAY_LIST_FAILURE';

// 聚合数据
export const GET_JUHE_HISTORY_TODAY = 'GET_JUHE_HISTORY_TODAY';
export const GET_JUHE_HISTORY_TODAY_PENDING = 'GET_JUHE_HISTORY_TODAY_PENDING';
export const GET_JUHE_HISTORY_TODAY_SUCCESS = 'GET_JUHE_HISTORY_TODAY_SUCCESS';
export const GET_JUHE_HISTORY_TODAY_FAILURE = 'GET_JUHE_HISTORY_TODAY_FAILURE';

//获取聚合数据
export function getJuheList(params) {
    return {
        type: GET_JUHE_LIST,
        payload: apiJuhe.getJuheList(params)
    };
}

//获取聚合数据
export function getJuheHistoryTodayList(params) {
    return {
        type: GET_JUHE_HISTORY_TODAY_LIST,
        payload: apiJuhe.getJuheHistoryTodayList(params)
    };
}

//获取聚合数据
export function getJuheHistoryToday(params) {
    return {
        type: GET_JUHE_HISTORY_TODAY,
        payload: apiJuhe.getJuheHistoryToday(params)
    };
}
