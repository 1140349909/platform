import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_INVOICE_RULE_LIST_SUCCESS,
    GET_WITHDRAW_RULE_LIST_SUCCESS,
    GET_INVOICE_RULE_SUCCESS,
    GET_WITHDRAW_RULE_SUCCESS
} from './action';

const initialState = fromJS({

    invoice:{
        item:{},
        list:{}
    },

    withdraw:{
        item:{},
        list:{}
    }
});

export default createReducer(initialState, {

    //
    [GET_INVOICE_RULE_SUCCESS]: (state, {payload}) => state.setIn(['invoice','item'],fromJS(payload.data)),

    //
    [GET_INVOICE_RULE_LIST_SUCCESS]: (state, {payload}) => state.setIn(['invoice','list'], fromJS(payload.data)),

    //
    [GET_WITHDRAW_RULE_SUCCESS]: (state, {payload}) => state.setIn(['withdraw','item'],fromJS(payload.data)),

    //
    [GET_WITHDRAW_RULE_LIST_SUCCESS]: (state, {payload}) => state.setIn(['withdraw','list'], fromJS(payload.data)),

});
