/**
 * Created by Asoiso on 16/8/20.
 */
import * as apiRule from '../../../common/api/rule';

//
export const DELETE_INVOICE_RULE = 'DELETE_INVOICE_RULE';
export const DELETE_INVOICE_RULE_PENDING = 'DELETE_INVOICE_RULE_PENDING';
export const DELETE_INVOICE_RULE_SUCCESS = 'DELETE_INVOICE_RULE_SUCCESS';
export const DELETE_INVOICE_RULE_FAILURE = 'DELETE_INVOICE_RULE_FAILURE';

export const GET_INVOICE_RULE_LIST = 'GET_INVOICE_RULE_LIST';
export const GET_INVOICE_RULE_LIST_PENDING = 'GET_INVOICE_RULE_LIST_PENDING';
export const GET_INVOICE_RULE_LIST_SUCCESS = 'GET_INVOICE_RULE_LIST_SUCCESS';
export const GET_INVOICE_RULE_LIST_FAILURE = 'GET_INVOICE_RULE_LIST_FAILURE';

export const GET_INVOICE_RULE = 'GET_INVOICE_RULE';
export const GET_INVOICE_RULE_PENDING = 'GET_INVOICE_RULE_PENDING';
export const GET_INVOICE_RULE_SUCCESS = 'GET_INVOICE_RULE_SUCCESS';
export const GET_INVOICE_RULE_FAILURE = 'GET_INVOICE_RULE_FAILURE';

export const ADD_INVOICE_RULE = 'ADD_INVOICE_RULE';
export const ADD_INVOICE_RULE_PENDING = 'ADD_INVOICE_RULE_PENDING';
export const ADD_INVOICE_RULE_SUCCESS = 'ADD_INVOICE_RULE_SUCCESS';
export const ADD_INVOICE_RULE_FAILURE = 'ADD_INVOICE_RULE_FAILURE';

export const UPDATE_INVOICE_RULE = 'UPDATE_INVOICE_RULE';
export const UPDATE_INVOICE_RULE_PENDING = 'UPDATE_INVOICE_RULE_PENDING';
export const UPDATE_INVOICE_RULE_SUCCESS = 'UPDATE_INVOICE_RULE_SUCCESS';
export const UPDATE_INVOICE_RULE_FAILURE = 'UPDATE_INVOICE_RULE_FAILURE';

export const SWITCH_INVOICE_RULE_STATUS = 'SWITCH_INVOICE_RULE_STATUS';
export const SWITCH_INVOICE_RULE_STATUS_PENDING = 'SWITCH_INVOICE_RULE_STATUS_PENDING';
export const SWITCH_INVOICE_RULE_STATUS_SUCCESS = 'SWITCH_INVOICE_RULE_STATUS_SUCCESS';
export const SWITCH_INVOICE_RULE_STATUS_FAILURE = 'SWITCH_INVOICE_RULE_STATUS_FAILURE';

//
export const DELETE_WITHDRAW_RULE = 'DELETE_WITHDRAW_RULE';
export const DELETE_WITHDRAW_RULE_PENDING = 'DELETE_WITHDRAW_RULE_PENDING';
export const DELETE_WITHDRAW_RULE_SUCCESS = 'DELETE_WITHDRAW_RULE_SUCCESS';
export const DELETE_WITHDRAW_RULE_FAILURE = 'DELETE_WITHDRAW_RULE_FAILURE';

export const GET_WITHDRAW_RULE_LIST = 'GET_WITHDRAW_RULE_LIST';
export const GET_WITHDRAW_RULE_LIST_PENDING = 'GET_WITHDRAW_RULE_LIST_PENDING';
export const GET_WITHDRAW_RULE_LIST_SUCCESS = 'GET_WITHDRAW_RULE_LIST_SUCCESS';
export const GET_WITHDRAW_RULE_LIST_FAILURE = 'GET_WITHDRAW_RULE_LIST_FAILURE';

export const GET_WITHDRAW_RULE = 'GET_WITHDRAW_RULE';
export const GET_WITHDRAW_RULE_PENDING = 'GET_WITHDRAW_RULE_PENDING';
export const GET_WITHDRAW_RULE_SUCCESS = 'GET_WITHDRAW_RULE_SUCCESS';
export const GET_WITHDRAW_RULE_FAILURE = 'GET_WITHDRAW_RULE_FAILURE';

export const ADD_WITHDRAW_RULE = 'ADD_WITHDRAW_RULE';
export const ADD_WITHDRAW_RULE_PENDING = 'ADD_WITHDRAW_RULE_PENDING';
export const ADD_WITHDRAW_RULE_SUCCESS = 'ADD_WITHDRAW_RULE_SUCCESS';
export const ADD_WITHDRAW_RULE_FAILURE = 'ADD_WITHDRAW_RULE_FAILURE';

export const UPDATE_WITHDRAW_RULE = 'UPDATE_WITHDRAW_RULE';
export const UPDATE_WITHDRAW_RULE_PENDING = 'UPDATE_WITHDRAW_RULE_PENDING';
export const UPDATE_WITHDRAW_RULE_SUCCESS = 'UPDATE_WITHDRAW_RULE_SUCCESS';
export const UPDATE_WITHDRAW_RULE_FAILURE = 'UPDATE_WITHDRAW_RULE_FAILURE';

export const SWITCH_WITHDRAW_RULE_STATUS = 'SWITCH_WITHDRAW_RULE_STATUS';
export const SWITCH_WITHDRAW_RULE_STATUS_PENDING = 'SWITCH_WITHDRAW_RULE_STATUS_PENDING';
export const SWITCH_WITHDRAW_RULE_STATUS_SUCCESS = 'SWITCH_WITHDRAW_RULE_STATUS_SUCCESS';
export const SWITCH_WITHDRAW_RULE_STATUS_FAILURE = 'SWITCH_WITHDRAW_RULE_STATUS_FAILURE';

//
export function deleteInvoiceRule(id) {
    return {
        type: DELETE_INVOICE_RULE,
        payload: apiRule.deleteInvoiceRule(id)
    };
}

//
export function getInvoiceRuleList(params) {
    return {
        type: GET_INVOICE_RULE_LIST,
        payload: apiRule.getInvoiceRuleList(params)
    };
}

//
export function getInvoiceRule(id) {
    return {
        type: GET_INVOICE_RULE,
        payload: apiRule.getInvoiceRule(id)
    };
}

//
export function addInvoiceRule(data) {
    return {
        type: ADD_INVOICE_RULE,
        payload: apiRule.addInvoiceRule(data)
    };
}

export function updateInvoiceRule(params) {
    return {
        type: UPDATE_INVOICE_RULE,
        payload: apiRule.updateInvoiceRule(params)
    };
}

export function switchInvoiceRuleStatus(params) {
    return {
        type: SWITCH_INVOICE_RULE_STATUS,
        payload: apiRule.switchInvoiceRuleStatus(params)
    };
}

/*提现*/
//
export function deleteWithdrawRule(id) {
    return {
        type: DELETE_WITHDRAW_RULE,
        payload: apiRule.deleteWithdrawRule(id)
    };
}

//
export function getWithdrawRuleList(params) {
    return {
        type: GET_WITHDRAW_RULE_LIST,
        payload: apiRule.getWithdrawRuleList(params)
    };
}

//
export function getWithdrawRule(id) {
    return {
        type: GET_WITHDRAW_RULE,
        payload: apiRule.getWithdrawRule(id)
    };
}

//
export function addWithdrawRule(data) {
    return {
        type: ADD_WITHDRAW_RULE,
        payload: apiRule.addWithdrawRule(data)
    };
}

export function updateWithdrawRule(params) {
    return {
        type: UPDATE_WITHDRAW_RULE,
        payload: apiRule.updateWithdrawRule(params)
    };
}

export function switchWithdrawRuleStatus(params) {
    return {
        type: SWITCH_WITHDRAW_RULE_STATUS,
        payload: apiRule.switchWithdrawRuleStatus(params)
    };
}


