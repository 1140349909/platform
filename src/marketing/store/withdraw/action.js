import * as apiWithDraw from '../../../common/api/withdraw';

/*平台现金管理服务：withdraw*/

// 客户会员提现列表
export const GET_MANAGER_WITHDRAW_LIST = 'GET_MANAGER_WITHDRAW_LIST';
export const GET_MANAGER_WITHDRAW_LIST_PENDING = 'GET_MANAGER_WITHDRAW_LIST_PENDING';
export const GET_MANAGER_WITHDRAW_LIST_SUCCESS = 'GET_MANAGER_WITHDRAW_LIST_SUCCESS';
export const GET_MANAGER_WITHDRAW_LIST_FAILURE = 'GET_MANAGER_WITHDRAW_LIST_FAILURE';

// 获取会员现金提现处理状态
export const UPDATE_MANAGER_WITHDRAW_STATUS = 'UPDATE_MANAGER_WITHDRAW_STATUS';
export const UPDATE_MANAGER_WITHDRAW_STATUS_PENDING = 'UPDATE_MANAGER_WITHDRAW_STATUS_PENDING';
export const UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS = 'UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS';
export const UPDATE_MANAGER_WITHDRAW_STATUS_FAILURE = 'UPDATE_MANAGER_WITHDRAW_STATUS_FAILURE';

// 确认会员现金提现
export const UPDATE_MANAGER_WITHDRAW_CONFIRM = 'UPDATE_MANAGER_WITHDRAW_CONFIRM';
export const UPDATE_MANAGER_WITHDRAW_CONFIRM_PENDING = 'UPDATE_MANAGER_WITHDRAW_CONFIRM_PENDING';
export const UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS = 'UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS';
export const UPDATE_MANAGER_WITHDRAW_CONFIRM_FAILURE = 'UPDATE_MANAGER_WITHDRAW_CONFIRM_FAILURE';

/*平台现金管理服务：完*/

// 返回当前客户的所有会员提现列表
export function getManagerWithdrawList(params) {
    return {
        type: GET_MANAGER_WITHDRAW_LIST,
        payload: apiWithDraw.getManagerWithdrawList(params)
    };
}

// 提供获取会员现金提现处理状态服务
export function updateManagerWithdrawStatus(data) {
    return {
        type: UPDATE_MANAGER_WITHDRAW_STATUS,
        payload: apiWithDraw.updateManagerWithdrawStatus(data)
    };
}

// 提供确认对会员提现自己的现金服务
export function updateManagerWithdrawConfirm(data) {
    return {
        type: UPDATE_MANAGER_WITHDRAW_CONFIRM,
        payload: apiWithDraw.updateManagerWithdrawConfirm(data)
    };
}
