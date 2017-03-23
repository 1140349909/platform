import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_MANAGER_WITHDRAW_LIST_SUCCESS,
    UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS,
    UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS
} from './action';

const initialState = fromJS({
    list: {},

    withdrawResult: null,

    alipayUrl: null,
});

export default createReducer(initialState, {

    // 获取提现列表
    [GET_MANAGER_WITHDRAW_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    [UPDATE_MANAGER_WITHDRAW_CONFIRM_SUCCESS]: (state, {payload}) => {

        if (payload.data) {
            return state.set('alipayUrl', fromJS(payload.data));
        } else {
            return state.set('alipayUrl', null);
        }

    },

    [UPDATE_MANAGER_WITHDRAW_STATUS_SUCCESS]: (state, {payload}) => {
        return state.set('withdrawResult', fromJS(payload.data));
    }

});
