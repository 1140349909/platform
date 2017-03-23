/**
 * Created by Asoiso on 16/8/20.
 */
import * as apiAccount from '../../../common/api/account';
import * as apiModule from '../../../common/api/module';

// apiAccount
export const GET_ACCOUNT_TYPE_LIST = 'GET_ACCOUNT_TYPE_LIST';
export const GET_ACCOUNT_TYPE_LIST_PENDING = 'GET_ACCOUNT_TYPE_LIST_PENDING';
export const GET_ACCOUNT_TYPE_LIST_SUCCESS = 'GET_ACCOUNT_TYPE_LIST_SUCCESS';
export const GET_ACCOUNT_TYPE_LIST_FAILURE = 'GET_ACCOUNT_TYPE_LIST_FAILURE';

export const GET_ACCOUNT_TYPE = 'GET_ACCOUNT_TYPE';
export const GET_ACCOUNT_TYPE_PENDING = 'GET_ACCOUNT_TYPE_PENDING';
export const GET_ACCOUNT_TYPE_SUCCESS = 'GET_ACCOUNT_TYPE_SUCCESS';
export const GET_ACCOUNT_TYPE_FAILURE = 'GET_ACCOUNT_TYPE_FAILURE';

export const ADD_ACCOUNT_TYPE = 'ADD_ACCOUNT_TYPE';
export const ADD_ACCOUNT_TYPE_PENDING = 'ADD_ACCOUNT_TYPE_PENDING';
export const ADD_ACCOUNT_TYPE_SUCCESS = 'ADD_ACCOUNT_TYPE_SUCCESS';
export const ADD_ACCOUNT_TYPE_FAILURE = 'ADD_ACCOUNT_TYPE_FAILURE';

export const UPDATE_ACCOUNT_TYPE = 'UPDATE_ACCOUNT_TYPE';
export const UPDATE_ACCOUNT_TYPE_PENDING = 'UPDATE_ACCOUNT_TYPE_PENDING';
export const UPDATE_ACCOUNT_TYPE_SUCCESS = 'UPDATE_ACCOUNT_TYPE_SUCCESS';
export const UPDATE_ACCOUNT_TYPE_FAILURE = 'UPDATE_ACCOUNT_TYPE_FAILURE';

export const SWITCH_ACCOUNT_TYPE_STATUS = 'SWITCH_ACCOUNT_TYPE_STATUS';
export const SWITCH_ACCOUNT_TYPE_STATUS_PENDING = 'SWITCH_ACCOUNT_TYPE_STATUS_PENDING';
export const SWITCH_ACCOUNT_TYPE_STATUS_SUCCESS = 'SWITCH_ACCOUNT_TYPE_STATUS_SUCCESS';
export const SWITCH_ACCOUNT_TYPE_STATUS_FAILURE = 'SWITCH_ACCOUNT_TYPE_STATUS_FAILURE';

//
export const COPY_ACCOUNT_TYPE = 'COPY_ACCOUNT_TYPE';
export const COPY_ACCOUNT_TYPE_PENDING = 'COPY_ACCOUNT_TYPE_PENDING';
export const COPY_ACCOUNT_TYPE_SUCCESS = 'COPY_ACCOUNT_TYPE_SUCCESS';
export const COPY_ACCOUNT_TYPE_FAILURE = 'COPY_ACCOUNT_TYPE_FAILURE';

// apiModule
export const GET_MODULE_INFO = 'GET_MODULE_INFO';
export const GET_MODULE_INFO_PENDING = 'GET_MODULE_INFO_PENDING';
export const GET_MODULE_INFO_SUCCESS = 'GET_MODULE_INFO_SUCCESS';
export const GET_MODULE_INFO_FAILURE = 'GET_MODULE_INFO_FAILURE';

//
export function getAccountTypeList(params) {
    return {
        type: GET_ACCOUNT_TYPE_LIST,
        payload: apiAccount.getAccountTypeList(params)
    };
}

//
export function getAccountType(id) {
    return {
        type: GET_ACCOUNT_TYPE,
        payload: apiAccount.getAccountType(id)
    };
}

//
export function addAccountType(data) {
    return {
        type: ADD_ACCOUNT_TYPE,
        payload: apiAccount.addAccountType(data)
    };
}

export function updateAccountType(params) {
    return {
        type: UPDATE_ACCOUNT_TYPE,
        payload: apiAccount.updateAccountType(params)
    };
}

export function switchAccountTypeStatus(params) {
    return {
        type: SWITCH_ACCOUNT_TYPE_STATUS,
        payload: apiAccount.switchAccountTypeStatus(params)
    };
}

export function copyAccountType(id) {
    return {
        type: COPY_ACCOUNT_TYPE,
        payload: apiAccount.copyAccountType(id)
    };
}

export function getModuleInfo(params) {
    return {
        type: GET_MODULE_INFO,
        payload: apiModule.getPlatformModuleInfo(params)
    };
}
