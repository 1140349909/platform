import * as apiTrade from '../../../common/api/trade';

// 商品交易记录列表
export const GET_TRADE_LIST = 'GET_TRADE_LIST';
export const GET_TRADE_LIST_PENDING = 'GET_TRADE_LIST_PENDING';
export const GET_TRADE_LIST_SUCCESS = 'GET_TRADE_LIST_SUCCESS';
export const GET_TRADE_LIST_FAILURE = 'GET_TRADE_LIST_FAILURE';

// 商品交易记录物流信息
export const UPDATE_TRADE_LOGISTIC = 'UPDATE_TRADE_LOGISTIC';
export const UPDATE_TRADE_LOGISTIC_PENDING = 'UPDATE_TRADE_LOGISTIC_PENDING';
export const UPDATE_TRADE_LOGISTIC_SUCCESS = 'UPDATE_TRADE_LOGISTIC_SUCCESS';
export const UPDATE_TRADE_LOGISTIC_FAILURE = 'UPDATE_TRADE_LOGISTIC_FAILURE';

// 商品交易物流状态
export const UPDATE_TRADE_LOGISTIC_STATUS = 'UPDATE_TRADE_LOGISTIC_STATUS';
export const UPDATE_TRADE_LOGISTIC_STATUS_PENDING = 'UPDATE_TRADE_LOGISTIC_STATUS_PENDING';
export const UPDATE_TRADE_LOGISTIC_STATUS_SUCCESS = 'UPDATE_TRADE_LOGISTIC_STATUS_SUCCESS';
export const UPDATE_TRADE_LOGISTIC_STATUS_FAILURE = 'UPDATE_TRADE_LOGISTIC_STATUS_FAILURE';

// 交易晒单列表
export const GET_TRADE_SHOW_LIST = 'GET_TRADE_SHOW_LIST';
export const GET_TRADE_SHOW_LIST_PENDING = 'GET_TRADE_SHOW_LIST_PENDING';
export const GET_TRADE_SHOW_LIST_SUCCESS = 'GET_TRADE_SHOW_LIST_SUCCESS';
export const GET_TRADE_SHOW_LIST_FAILURE = 'GET_TRADE_SHOW_LIST_FAILURE';

// 交易晒单删除
export const DELETE_TRADE_SHOW = 'DELETE_TRADE_SHOW';
export const DELETE_TRADE_SHOW_PENDING = 'DELETE_TRADE_SHOW_PENDING';
export const DELETE_TRADE_SHOW_SUCCESS = 'DELETE_TRADE_SHOW_SUCCESS';
export const DELETE_TRADE_SHOW_FAILURE = 'DELETE_TRADE_SHOW_FAILURE';


// 修改商城商品物流信息
export function updateTradeLogistics(data, buyType, id) {
    return {
        type: UPDATE_TRADE_LOGISTIC,
        payload: apiTrade.updateTradeLogistics(data, buyType, id)
    };
}

// 修改商城商品交易记录物流状态为己收货
export function updateTradeLogisticsStatus(buyType, id) {
    return {
        type: UPDATE_TRADE_LOGISTIC_STATUS,
        payload: apiTrade.updateTradeLogisticsStatus(buyType, id)
    };
}

// 获取商城商品交易记录列表
// 假借商城商品列表数据已调通，从商城商品列表换为商城商品交易记录列表
// 当然，现在没有交易记录，所以数据为空
export function getTradeList(params) {
    return {
        type: GET_TRADE_LIST,
        payload: apiTrade.getTradeList(params)

    };
}


// 返回当前账户下所有交易晒单
export function getTradeShowList(params) {
    return {
        type: GET_TRADE_SHOW_LIST,
        payload: apiTrade.getTradeShowList(params)
    };
}

// 删除商品晒单记录
export function deleteTradeShow(data) {
    return {
        type: DELETE_TRADE_SHOW,
        payload: apiTrade.deleteTradeShow(data)
    };
}
