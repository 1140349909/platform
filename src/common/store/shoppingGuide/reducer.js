//reducer的
import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {GET_SHOPPINGGUIDE_LIST_SUCCESS} from './action';
import {GET_CUSTOMER_UIN_SUCCESS} from './action';


const initialState = fromJS({
    // 一键导购商品列表
    shoppingGuideList: null,
    //用户信息
    customerUinList: {}
});

export default createReducer(initialState, {
    //客户商品所有的列表,数据的处理
    [GET_SHOPPINGGUIDE_LIST_SUCCESS]: (state, {payload}) => state.merge({'shoppingGuideList': payload.data}),
    [GET_CUSTOMER_UIN_SUCCESS]: (state, {payload}) => state.merge({'customerUinList': payload.data}),
});


























