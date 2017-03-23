import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_MERCHANT_TIPS_HISTORY_SUCCESS,
    GET_MANAGER_MERCHANT_WITHDRAW_LIST_SUCCESS,
    ADD_MERCHANT_WITHDRAW_FAILURE,
    GET_WITHDRAW_RULE_LIST_SUCCESS,
    GET_MERCHANT_ACCOUNT_SUCCESS
} from './action';

const initialState = fromJS({
    tipHistoryList: {},
    withdrawHistoryList: {},
    errMessage: {},
    ruleList: {},
    money: {}
});

export default createReducer(initialState, {
    [GET_MERCHANT_TIPS_HISTORY_SUCCESS]: (state, {payload}) => {
        return state.set('tipHistoryList', fromJS(payload.data));
    },
    [GET_MANAGER_MERCHANT_WITHDRAW_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('withdrawHistoryList', fromJS(payload.data));
    },
    [ADD_MERCHANT_WITHDRAW_FAILURE]: (state, {payload}) => {
        return state.set('errMessage', fromJS(payload.data));
    },
    [GET_WITHDRAW_RULE_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('ruleList', fromJS(payload.data));
    },
    [GET_MERCHANT_ACCOUNT_SUCCESS]: (state, {payload}) => {

        const data = _.merge({
            opdata: {
                uinAccountData: {
                    totalMoney: 0,
                    platformMoney: 0,
                    pending: 0,
                    cleared: 0,
                    withdrawalsTotal: 0,
                    total: 0
                }
            }
        }, payload.data);

        return state.set('money', fromJS(data));
    },
});
