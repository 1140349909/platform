import * as apiLedou from '../../../common/api/ledou';
import {RES_TYPE} from 'common/config/constants';

// 获取乐豆数量
export const GET_LEDOU_AMOUNT = 'GET_LEDOU_AMOUNT';
export const GET_LEDOU_AMOUNT_SUCCESS = 'GET_LEDOU_AMOUNT_SUCCESS';
export const GET_LEDOU_AMOUNT_PENDING = 'GET_LEDOU_AMOUNT_PENDING';
export const GET_LEDOU_AMOUNT_FAILURE = 'GET_LEDOU_AMOUNT_FAILURE';

// 乐豆交易列表服务
export const GET_LEDOU_TRADE_LIST = 'GET_LEDOU_TRADE_LIST';
export const GET_LEDOU_TRADE_LIST_SUCCESS = 'GET_LEDOU_TRADE_LIST_SUCCESS';
export const GET_LEDOU_TRADE_LIST_PENDING = 'GET_LEDOU_TRADE_LIST_PENDING';
export const GET_LEDOU_TRADE_LIST_FAILURE = 'GET_LEDOU_TRADE_LIST_FAILURE';

// 购买平台乐豆
export const BUY_LEDOU = 'BUY_LEDOU';
export const BUY_LEDOU_SUCCESS = 'BUY_LEDOU_SUCCESS';
export const BUY_LEDOU_PENDING = 'BUY_LEDOU_PENDING';
export const BUY_LEDOU_FAILURE = 'BUY_LEDOU_FAILURE';

// 乐豆交易服务
export const TRADE_LEDOU = 'TRADE_LEDOU';
export const TRADE_LEDOU_SUCCESS = 'TRADE_LEDOU_SUCCESS';
export const TRADE_LEDOU_PENDING = 'TRADE_LEDOU_PENDING';
export const TRADE_LEDOU_FAILURE = 'TRADE_LEDOU_FAILURE';

// 检测乐豆是否购买成功
export const GET_LEDOU_BUY_RESULT = 'GET_LEDOU_BUY_RESULT';
export const GET_LEDOU_BUY_RESULT_SUCCESS = 'GET_LEDOU_BUY_RESULT_SUCCESS';
export const GET_LEDOU_BUY_RESULT_PENDING = 'GET_LEDOU_BUY_RESULT_PENDING';
export const GET_LEDOU_BUY_RESULT_FAILURE = 'GET_LEDOU_BUY_RESULT_FAILURE';

// 检测扫码乐豆是否购买成功
export const GET_LEDOU_BUY_QRCODE_RESULT = 'GET_LEDOU_BUY_QRCODE_RESULT';
export const GET_LEDOU_BUY_QRCODE_RESULT_SUCCESS = 'GET_LEDOU_BUY_QRCODE_RESULT_SUCCESS';
export const GET_LEDOU_BUY_QRCODE_RESULT_PENDING = 'GET_LEDOU_BUY_QRCODE_RESULT_PENDING';
export const GET_LEDOU_BUY_QRCODE_RESULT_FAILURE = 'GET_LEDOU_BUY_QRCODE_RESULT_FAILURE';

//乐豆购买交易增值服务
export const TRADE_LEDOU_SERVICES = 'TRADE_LEDOU_SERVICES';
export const TRADE_LEDOU_SERVICES_SUCCESS = 'TRADE_LEDOU_SERVICES_SUCCESS';
export const TRADE_LEDOU_SERVICES_PENDING = 'TRADE_LEDOU_SERVICES_PENDING';
export const TRADE_LEDOU_SERVICES_FAILURE = 'TRADE_LEDOU_SERVICES_FAILURE';

//获取乐豆数量
export function getLedouAmount() {
    return {
        type: GET_LEDOU_AMOUNT,
        payload: apiLedou.getLedouAmount()
    };
}

// 乐豆交易列表服务
export function getTransTradeList(params) {
    return {
        type: GET_LEDOU_TRADE_LIST,
        payload: apiLedou.getTransTradeList(params),
    };
}

// 购买平台乐豆
export function buyLedou(params) {
    return {
        type: BUY_LEDOU,
        payload: apiLedou.buyLedou(params)
    };
}

// 购买平台乐豆
export function tradeLedou(resType, params) {
    return {
        type: TRADE_LEDOU,
        payload: apiLedou.tradeLedou(resType, params)
    };
}

// 检测乐豆是否购买成功
export function getLedouBuyResult(businessId) {
    return {
        meta: {
            silent: true
        },
        type: GET_LEDOU_BUY_RESULT,
        payload: apiLedou.getLedouBuyResult(businessId),
    };
}

export function tradeLeDouServices(params) {
    return {
        meta: {
            silent: true
        },
        type: TRADE_LEDOU_SERVICES,
        payload: apiLedou.tradeLedou(RES_TYPE.SERVICES, params)
    };
}
