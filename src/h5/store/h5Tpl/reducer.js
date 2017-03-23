import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import {
    GET_TPL_DATA_SUCCESS,
    GET_TPL_SINGLE_DATA_SUCCESS,
    GET_TPL_LIST_SUCCESS,
    GET_TPL_VERIFICATION_SUCCESS,
    ADD_TPL_DATA_SUCCESS,
    SAVE_TPL_DATA_SUCCESS,
    CANCEL_FAV_TPL_SUCCESS,
    FAVORITE_TPL_SUCCESS,
    SYNC_TPL_DATA,
    PURCHASE_TPL
} from './action';

const initialState = fromJS({

    // 模板数据
    data: {},

    // 使用单页时，获取单页模板数据
    singleData: {},

    list: [],

    all: [],
});

export default createReducer(initialState, {

    // 模板数据服务
    [GET_TPL_DATA_SUCCESS]: (state, {payload})=> state.set('data', fromJS(payload.data)),

    // 使用单页时，获取单页模板数据
    [GET_TPL_SINGLE_DATA_SUCCESS]: (state, {payload})=> state.set('singleData', fromJS(payload.data)),

    // 模板数据服务
    [ADD_TPL_DATA_SUCCESS]: (state, {payload})=> {
        let data = state.get('data').toJS();
        data.id = payload.data;
        return state.set('data', fromJS(data));
    },

    [FAVORITE_TPL_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', true) : item);
        });
    },

    [CANCEL_FAV_TPL_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', false) : item);
        });
    },

    // 自动同步数据
    [SYNC_TPL_DATA]: (state, {payload}) => {
        return state.mergeDeep({
            data: payload
        });
    },
    
    // 模板列表数据服务
    [GET_TPL_LIST_SUCCESS]: (state, {payload}) => {
        let {data, params} = payload;

        const content = fromJS(data.content);

        return state.merge({
            list: data,
            all: params.page == 0 ? content : state.get('all').concat(content)
        });
    },
    
    // 核实应用是否能生成模板服务
    [GET_TPL_VERIFICATION_SUCCESS]: (state, {payload}) => {
        let data = payload.data || {};
        data.appId = payload.params.id;

        return state.set('data', fromJS(data));
    },

    // 购买成功
    [PURCHASE_TPL]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.id ? item.set('bought', true) : item);
        });
    },
});
