import * as apiMerchant from '../../../common/api/merchant';
import * as apiRule from '../../../common/api/rule';


/*获取打赏列表*/
// 打赏明细 GET_MERCHANT_TIPS_HISTORY
export const GET_MERCHANT_TIPS_HISTORY = '_GET__GET_MERCHANT_TIPS_HISTORY';
export const GET_MERCHANT_TIPS_HISTORY_SUCCESS = '_GET__GET_MERCHANT_TIPS_HISTORY_SUCCESS';
export const GET_MERCHANT_TIPS_HISTORY_PENDING = '_GET__GET_MERCHANT_TIPS_HISTORY_PENDING';
export const GET_MERCHANT_TIPS_HISTORY_FAILURE = '_GET__GET_MERCHANT_TIPS_HISTORY_FAILURE';


// 打赏明细 getMerchantTipsHistory
export function getMerchantTipsHistory(params) {
    return {
        type: GET_MERCHANT_TIPS_HISTORY,
        payload: apiMerchant.getMerchantTipsHistory(params)
    };
}

/*提现流程*/

//提现列表 GET_MANAGER_MERCHANT_WITHDRAW_LIST

export const GET_MANAGER_MERCHANT_WITHDRAW_LIST = 'GET_MANAGER_MERCHANT_WITHDRAW_LIST';
export const GET_MANAGER_MERCHANT_WITHDRAW_LIST_PENDING = 'GET_MANAGER_MERCHANT_WITHDRAW_LIST_PENDING';
export const GET_MANAGER_MERCHANT_WITHDRAW_LIST_SUCCESS = 'GET_MANAGER_MERCHANT_WITHDRAW_LIST_SUCCESS';
export const GET_MANAGER_MERCHANT_WITHDRAW_LIST_FAILURE = 'GET_MANAGER_MERCHANT_WITHDRAW_LIST_FAILURE';

//提现申请 addMerchantWithdraw
export const ADD_MERCHANT_WITHDRAW = 'ADD_MERCHANT_WITHDRAW';
export const ADD_MERCHANT_WITHDRAW_PENDING = 'ADD_MERCHANT_WITHDRAW_PENDING';
export const ADD_MERCHANT_WITHDRAW_SUCCESS = 'ADD_MERCHANT_WITHDRAW_SUCCESS';
export const ADD_MERCHANT_WITHDRAW_FAILURE = 'ADD_MERCHANT_WITHDRAW_FAILURE';

//获取发票规则 GET_WITHDRAW_RULE_LIST
export const GET_WITHDRAW_RULE_LIST = 'GET_WITHDRAW_RULE_LIST';
export const GET_WITHDRAW_RULE_LIST_PENDING = 'GET_WITHDRAW_RULE_LIST_PENDING';
export const GET_WITHDRAW_RULE_LIST_SUCCESS = 'GET_WITHDRAW_RULE_LIST_SUCCESS';
export const GET_WITHDRAW_RULE_LIST_FAILURE = 'GET_WITHDRAW_RULE_LIST_FAILURE';


//商户总收益，可提现金额查询 GET_MERCHANT_ACCOUNT
export const GET_MERCHANT_ACCOUNT = 'GET_MERCHANT_ACCOUNT';
export const GET_MERCHANT_ACCOUNT_PENDING = 'GET_MERCHANT_ACCOUNT_PENDING';
export const GET_MERCHANT_ACCOUNT_SUCCESS = 'GET_MERCHANT_ACCOUNT_SUCCESS';
export const GET_MERCHANT_ACCOUNT_FAILURE = 'GET_MERCHANT_ACCOUNT_FAILURE';




//提现列表 getManagerMerchantWithdrawList
export function getManagerMerchantWithdrawList(data) {
    return {
        type: GET_MANAGER_MERCHANT_WITHDRAW_LIST,
        payload: apiMerchant.getManagerMerchantWithdrawList(data)
    };
}



//提现申请 addMerchantWithdraw
export function addMerchantWithdraw(params) {
    return {
        type: ADD_MERCHANT_WITHDRAW,
        payload: apiMerchant.addMerchantWithdraw(params)
    };
}


//获取发票规则  getWithdrawRuleList
export function getWithdrawRuleList(params) {
    return {
        type: GET_WITHDRAW_RULE_LIST,
        payload: apiRule.getWithdrawRuleList(params)
    };
}

// getMerchantAccount
export function getMerchantAccount(params) {
    return {
        type: GET_MERCHANT_ACCOUNT,
        payload: apiMerchant.getMerchantAccount(params)
    };
}






