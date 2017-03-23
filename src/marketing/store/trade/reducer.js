import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_TRADE_LIST_SUCCESS,
    GET_TRADE_SHOW_LIST_SUCCESS
} from './action';

const initialState = fromJS({
    list: null,
    showData: {},
    total: '',
    items: {}
});

export default createReducer(initialState, {

    // 获取交易列表成功
    [GET_TRADE_LIST_SUCCESS]: (state, {payload}) => {

        let items = {};
        payload.data.content.forEach((item) => {
            items[item.id] = item;
        });

        return state.merge({
            list: payload.data,
            items:items
        });
    },

    // 获取交易晒单列表成功
    [GET_TRADE_SHOW_LIST_SUCCESS]: (state, {payload}) => {

        let items = {};

        payload.data.content.forEach((item) => {
            items[item.id] = item;
        });

        return state.merge({
            showData: payload.data.content,
            total: payload.data.totalElements,
            items: items
        });

    },

});
