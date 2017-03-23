import  * as apiJuHe from  '../../../common/api/juhe';
//获取聚合数据列表
export const GET_JUHE_TOUTIAO_LIST = 'GET_JUHE_TOUTIAO_LIST';
export const GET_JUHE_TOUTIAO_LIST_PENDING = 'GET_JUHE_TOUTIAO_LIST_PENDING';
export const GET_JUHE_TOUTIAO_LIST_SUCCESS = 'GET_JUHE_TOUTIAO_LIST_SUCCESS';
export const GET_JUHE_TOUTIAO_LIST_FAILURE = 'GET_JUHE_TOUTIAO_LIST_FAILURE';


export function getJuHeTouTiaoList(params) {
    return {
        meta: {
            silent: true
        },
        type: GET_JUHE_TOUTIAO_LIST,
        payload: apiJuHe.getJuheList(params)
    };
}

export const GET_JUHE_HISTORY_TODAY_LIST = 'GET_JUHE_HISTORY_TODAY_LIST';
export const GET_JUHE_HISTORY_TODAY_LIST_PENDING = 'GET_JUHE_HISTORY_TODAY_LIST_PENDING';
export const GET_JUHE_HISTORY_TODAY_LIST_SUCCESS = 'GET_JUHE_HISTORY_TODAY_LIST_SUCCESS';
export const GET_JUHE_HISTORY_TODAY_LIST_FAILURE = 'GET_JUHE_HISTORY_TODAY_LIST_FAILURE';
export function getJuheHistoryTodayList(params) {
    return {
        meta: {
            silent: true
        },
        type: GET_JUHE_HISTORY_TODAY_LIST,
        payload: apiJuHe.getJuheHistoryTodayList(params)
    };
}


export const GET_JUHE_HISTORY_DETAIL = 'GET_JUHE_HISTORY_DETAIL';
export const GET_JUHE_HISTORY_DETAIL_PENDING = 'GET_JUHE_HISTORY_DETAIL_PENDING';
export const GET_JUHE_HISTORY_DETAIL_SUCCESS = 'GET_JUHE_HISTORY_DETAIL_SUCCESS';
export const GET_JUHE_HISTORY_DETAIL_FAILURE = 'GET_JUHE_HISTORY_DETAIL_FAILURE';
export function getJuheHistoryDetail(id, v) {
    return {
        meta: {
            silent: true
        },
        type: GET_JUHE_HISTORY_DETAIL,
        payload: apiJuHe.getJuheHistoryDetail(id, v)
    };
}
