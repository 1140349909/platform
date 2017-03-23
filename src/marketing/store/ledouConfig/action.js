import * as apiLedou from '../../../common/api/ledou';

//获取结算账户设置 getConfigAccountWithdraw
export const GET_CONFIG_ACCOUNT_WITHDRAW = 'GET_CONFIG_ACCOUNT_WITHDRAW';
export const GET_CONFIG_ACCOUNT_WITHDRAW_PENDING = 'GET_CONFIG_ACCOUNT_WITHDRAW_PENDING';
export const GET_CONFIG_ACCOUNT_WITHDRAW_SUCCESS = 'GET_CONFIG_ACCOUNT_WITHDRAW_SUCCESS';
export const GET_CONFIG_ACCOUNT_WITHDRAW_FAILURE = 'GET_CONFIG_ACCOUNT_WITHDRAW_FAILURE';

//结算账户设置 updateConfigAccountWithdraw
export const UPDATE_CONFIG_ACCOUNT_WITHDRAW = 'UPDATE_CONFIG_ACCOUNT_WITHDRAW';
export const UPDATE_CONFIG_ACCOUNT_WITHDRAW_PENDING = 'UPDATE_CONFIG_ACCOUNT_WITHDRAW_PENDING';
export const UPDATE_CONFIG_ACCOUNT_WITHDRAW_SUCCESS = 'UPDATE_CONFIG_ACCOUNT_WITHDRAW_SUCCESS';
export const UPDATE_CONFIG_ACCOUNT_WITHDRAW_FAILURE = 'UPDATE_CONFIG_ACCOUNT_WITHDRAW_FAILURE';

//获取结算账户设置
export function getConfigAccountWithdraw() {
    return {
        type: GET_CONFIG_ACCOUNT_WITHDRAW,
        payload: apiLedou.getConfigAccountWithdraw()
    };
}

//获取结算账户设置
export function updateConfigAccountWithdraw(params) {
    return {
        type: UPDATE_CONFIG_ACCOUNT_WITHDRAW,
        payload: apiLedou.updateConfigAccountWithdraw(params)
    };
}
