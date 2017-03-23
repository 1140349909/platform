import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_MANAGER_TKER_LIST_SUCCESS,
    GET_MANAGER_TKER_PROFIT_SUCCESS,
    GET_MANAGER_TKER_SUB_MEMBER_SUCCESS,
    GET_MANAGER_TKER_CONFIG_SUCCESS,
    GET_MANAGER_TKER_MEMBER_TOP_SUCCESS,
    GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS,
    GET_MANAGER_TKER_DATA_TOTAL_SUCCESS
} from './action';

const initialState = fromJS({

    list: null,

    items: null,

    modalData: null,

    // 商品代言设置数据
    settingData: null,

    // 获取客户代言平台汇总数据
    tkerData: null,

    // TOP商品列表
    productTopList: [],

    // TOP会员列表
    memberTopList: [],
});

export default createReducer(initialState, {

    [GET_MANAGER_TKER_LIST_SUCCESS]: (state, {payload}) => {

        let items = {};

        payload.data.content.map((item) => {
            items[item.createdBy] = item;
        });

        return state.merge({
            list: payload.data,
            items: items
        });

    },

    [GET_MANAGER_TKER_PROFIT_SUCCESS]: (state, {payload}) => {
        return state.set('modalData', fromJS(payload.data));
    },

    [GET_MANAGER_TKER_SUB_MEMBER_SUCCESS]: (state, {payload}) => {
        return state.set('modalData', fromJS(payload.data));
    },

    // 获取商品代言设置数据
    [GET_MANAGER_TKER_CONFIG_SUCCESS]: (state, {payload}) => {
        let settingData = null;
        if (payload.data) {
            settingData = payload.data;
        }
        return state.set('settingData', fromJS(settingData));
    },

    // 获取客户代言商品TOP榜
    [GET_MANAGER_TKER_PRODUCT_TOP_SUCCESS]: (state, {payload}) => state.set('productTopList', fromJS(payload.data)),

    // 获取客户代言会员TOP榜
    [GET_MANAGER_TKER_MEMBER_TOP_SUCCESS]: (state, {payload}) => state.set('memberTopList', fromJS(payload.data)),

    // 获取客户代言平台汇总数据
    [GET_MANAGER_TKER_DATA_TOTAL_SUCCESS]: (state, {payload}) => state.set('tkerData', fromJS(payload.data.tkerData)),

});


