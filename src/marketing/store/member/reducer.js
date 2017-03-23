import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {GET_MEMBER_LIST_SUCCESS, GET_MEMBER_MALL_ORDER_LIST_SUCCESS} from './action';

const initialState = fromJS({

    // 会员列表
    list: {},

    items:[],

    // 会员商城订单列表
    mallOrderList: {}
});

export default createReducer(initialState, {

    // 获取会员列表
    [GET_MEMBER_LIST_SUCCESS]: (state, {payload}) => {

        let items = [];

        payload.data.content.map((item)=>{
            items[item.id] = item;
        });

        return state.merge({
            'list':payload.data,
            'items':items
        });
    },




    // 获取会员商城订单列表
    [GET_MEMBER_MALL_ORDER_LIST_SUCCESS]: (state, {payload}) => state.set('mallOrderList', fromJS(payload.data)),
});
