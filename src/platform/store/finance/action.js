import * as apiMerchant from '../../../common/api/merchant';
import * as apiLedou from '../../../common/api/ledou';

/*发票审核*/

//发票索取获取列表 getInvoiceList
export const GET_INVOICE_AUDITING_LIST = 'GET_INVOICE_AUDITING_LIST';
export const GET_INVOICE_AUDITING_LIST_PENDING = 'GET_INVOICE_AUDITING_LIST_PENDING';
export const GET_INVOICE_AUDITING_LIST_SUCCESS = 'GET_INVOICE_AUDITING_LIST_SUCCESS';
export const GET_INVOICE_AUDITING_LIST_FAILURE = 'GET_INVOICE_AUDITING_LIST_FAILURE';

//发票审核通过
export const  CONFIRM_MANAGER_LEDOU_SENT_INVOICE = 'CONFIRM_MANAGER_LEDOU_SENT_INVOICE';
export const  CONFIRM_MANAGER_LEDOU_SENT_INVOICE_PENDING = 'CONFIRM_MANAGER_LEDOU_SENT_INVOICE_PENDING';
export const  CONFIRM_MANAGER_LEDOU_SENT_INVOICE_SUCCESS = 'CONFIRM_MANAGER_LEDOU_SENT_INVOICE_SUCCESS';
export const  CONFIRM_MANAGER_LEDOU_SENT_INVOICE_FAILURE = 'CONFIRM_MANAGER_LEDOU_SENT_INVOICE_FAILURE';


//索取发票状态列表
export function getInvoiceList(params) {
    return {
        type: GET_INVOICE_AUDITING_LIST,
        payload: apiLedou.getInvoiceList(params)
    };
}

//添加邮寄地址
export function confirmManagerLedouSentInvoice(id,data) {
    return {
        type: CONFIRM_MANAGER_LEDOU_SENT_INVOICE,
        payload: apiLedou.confirmManagerLedouSentInvoice(id,data)
    };
}

/*提现审核*/

export const GET_MERCHANT_ACCOUNT = 'GET_MERCHANT_ACCOUNT';
export const GET_MERCHANT_ACCOUNT_PENDING = 'GET_MERCHANT_ACCOUNT_PENDING';
export const GET_MERCHANT_ACCOUNT_SUCCESS = 'GET_MERCHANT_ACCOUNT_SUCCESS';
export const GET_MERCHANT_ACCOUNT_FAILURE = 'GET_MERCHANT_ACCOUNT_FAILURE';

export const GET_MERCHANT_INFO = 'GET_MERCHANT_INFO';
export const GET_MERCHANT_INFO_PENDING = 'GET_MERCHANT_INFO_PENDING';
export const GET_MERCHANT_INFO_SUCCESS = 'GET_MERCHANT_INFO_SUCCESS';
export const GET_MERCHANT_INFO_FAILURE = 'GET_MERCHANT_INFO_FAILURE';

export const GET_MERCHANT_WITHDRAW_LIST = 'GET_MERCHANT_WITHDRAW_LIST';
export const GET_MERCHANT_WITHDRAW_LIST_PENDING = 'GET_MERCHANT_WITHDRAW_LIST_PENDING';
export const GET_MERCHANT_WITHDRAW_LIST_SUCCESS = 'GET_MERCHANT_WITHDRAW_LIST_SUCCESS';
export const GET_MERCHANT_WITHDRAW_LIST_FAILURE = 'GET_MERCHANT_WITHDRAW_LIST_FAILURE';

export const GET_MERCHANT_TIPS_HISTORY = 'GET_MERCHANT_TIPS_HISTORY';
export const GET_MERCHANT_TIPS_HISTORY_PENDING = 'GET_MERCHANT_TIPS_HISTORY_PENDING';
export const GET_MERCHANT_TIPS_HISTORY_SUCCESS = 'GET_MERCHANT_TIPS_HISTORY_SUCCESS';
export const GET_MERCHANT_TIPS_HISTORY_FAILURE = 'GET_MERCHANT_TIPS_HISTORY_FAILURE';

export const ADD_MERCHANT_WITHDRAW = 'ADD_MERCHANT_WITHDRAW';
export const ADD_MERCHANT_WITHDRAW_PENDING = 'ADD_MERCHANT_WITHDRAW_PENDING';
export const ADD_MERCHANT_WITHDRAW_SUCCESS = 'ADD_MERCHANT_WITHDRAW_SUCCESS';
export const ADD_MERCHANT_WITHDRAW_FAILURE = 'ADD_MERCHANT_WITHDRAW_FAILURE';

export const UPDATE_MERCHANT_WITHDRAW = 'UPDATE_MERCHANT_WITHDRAW';
export const UPDATE_MERCHANT_WITHDRAW_PENDING = 'UPDATE_MERCHANT_WITHDRAW_PENDING';
export const UPDATE_MERCHANT_WITHDRAW_SUCCESS = 'UPDATE_MERCHANT_WITHDRAW_SUCCESS';
export const UPDATE_MERCHANT_WITHDRAW_FAILURE = 'UPDATE_MERCHANT_WITHDRAW_FAILURE';

export const GET_WITHDRAW_RULE_ACCOUNT = 'GET_WITHDRAW_RULE_ACCOUNT';
export const GET_WITHDRAW_RULE_ACCOUNT_PENDING = 'GET_WITHDRAW_RULE_ACCOUNT_PENDING';
export const GET_WITHDRAW_RULE_ACCOUNT_SUCCESS = 'GET_WITHDRAW_RULE_ACCOUNT_SUCCESS';
export const GET_WITHDRAW_RULE_ACCOUNT_FAILURE = 'GET_WITHDRAW_RULE_ACCOUNT_FAILURE';

// GET /api/v1/{client}/{channel}/merchant/account/{id} 商户总收益查询
export function getMerchantAccount(id) {
    return {
        type: GET_MERCHANT_ACCOUNT,
        payload: apiMerchant.getMerchantAccount(id)
    };
}

// GET /api/v1/{client}/{channel}/merchant/info/{id} 商户可提现金额查询
export function getMerchantInfo(id) {
    return {
        type: GET_MERCHANT_INFO,
        payload: apiMerchant.getMerchantInfo(id)
    };
}

// GET /api/v1/{client}/{channel}/merchant/withdraw/list 商户提现列表
export function getMerchantWithdrawList(params) {
    return {
        type: GET_MERCHANT_WITHDRAW_LIST,
        payload: apiMerchant.getMerchantWithdrawList(params)
    };
}

// GET /api/v1/{client}/{channel}/tips/history/list 商户打赏流水列表
export function getMerchantTipsHistory(params) {
    return {
        type: GET_MERCHANT_TIPS_HISTORY,
        payload: apiMerchant.getMerchantTipsHistory(params)
    };
}

// POST /api/v1/{client}/{channel}/merchant/customer/withdraw 商户提现申请
export function addMerchantWithdraw(data) {
    return {
        type: ADD_MERCHANT_WITHDRAW,
        payload: apiMerchant.addMerchantWithdraw(data)
    };
}

// POST /api/v1/{client}/{channel}/merchant/customer/withdraw/{id} 商户提现审核
export function updateMerchantWithdraw(params) {
    return {
        type: UPDATE_MERCHANT_WITHDRAW,
        payload: apiMerchant.updateMerchantWithdraw(params)
    };
}

//
// /api/v1/{client}/{channel}/manager/withdraw/plat/rule/{accountType} 查询平台提现审核剩余
export function getWithdrawRuleAccount(params) {
    return {
        type: GET_WITHDRAW_RULE_ACCOUNT,
        payload: apiMerchant.getWithdrawRuleAccount(params)
    };
}









