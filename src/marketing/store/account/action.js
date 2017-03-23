/**
 * Created by Asoiso on 16/8/20.
 */
import * as apiAccount from '../../../common/api/account';
// apiAccount
export const GET_ACCOUNT_TYPE_LIST = 'GET_ACCOUNT_TYPE_LIST';
export const GET_ACCOUNT_TYPE_LIST_PENDING = 'GET_ACCOUNT_TYPE_LIST_PENDING';
export const GET_ACCOUNT_TYPE_LIST_SUCCESS = 'GET_ACCOUNT_TYPE_LIST_SUCCESS';
export const GET_ACCOUNT_TYPE_LIST_FAILURE = 'GET_ACCOUNT_TYPE_LIST_FAILURE';

export function getAccountTypeList(params) {
    return {
        type: GET_ACCOUNT_TYPE_LIST,
        payload: apiAccount.getAccountTypeList(params)
    };
}

