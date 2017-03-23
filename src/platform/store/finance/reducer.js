import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_MERCHANT_WITHDRAW_LIST_SUCCESS,
    GET_INVOICE_AUDITING_LIST_SUCCESS,
    UPDATE_MERCHANT_WITHDRAW_SUCCESS,
    GET_WITHDRAW_RULE_ACCOUNT_SUCCESS,
} from './action';

const initialState = fromJS({
    list: {},

    account:null,

    /*withdrawResult: null,

    alipayUrl: null,*/

    invoiceAuditingList:{},
});

export default createReducer(initialState, {

    [GET_WITHDRAW_RULE_ACCOUNT_SUCCESS]:(state, {payload}) => state.set('account', fromJS(payload.data)),

    [UPDATE_MERCHANT_WITHDRAW_SUCCESS]: (state, {payload}) => {

        if (payload.data) {
            return state.set('alipayUrl', fromJS(payload.data));
        } else {
            return state.set('alipayUrl', null);
        }

    },

    // 获取提现列表
    [GET_MERCHANT_WITHDRAW_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    /*[GET_MANAGER_WITHDRAW_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    [UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS]: (state, {payload}) => {

        if (payload.data) {
            return state.set('alipayUrl', fromJS(payload.data));
        } else {
            return state.set('alipayUrl', null);
        }

    },

    [UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS]: (state, {payload}) => {
        return state.set('withdrawResult', fromJS(payload.data));
    },*/

    [GET_INVOICE_AUDITING_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('invoiceAuditingList', fromJS(payload.data));
    },


});
