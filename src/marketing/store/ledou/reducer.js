import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    BUY_LEDOU_SUCCESS,
    GET_LEDOU_AMOUNT_SUCCESS,
    GET_LEDOU_TRADE_LIST_SUCCESS,
    GET_LEDOU_AMOUNT_FAILURE,
    GET_LEDOU_BUY_RESULT_SUCCESS
} from './action';

const initialState = fromJS({

    // 支付回调信息
    payInfo: null,

    // 乐豆总量
    ledouAmount: 0,

    // 充值记录
    depositList: [],

    // 消费明细
    withdraw: [],

    list: [],

    items:{}
});

export default createReducer(initialState, {

    [BUY_LEDOU_SUCCESS]: (state, {payload}) => state.set('payInfo', fromJS(payload.data)),

    // 获取乐豆数量
    [GET_LEDOU_AMOUNT_SUCCESS]: (state, {payload}) => state.set('ledouAmount', fromJS(payload.data)),

    [GET_LEDOU_AMOUNT_FAILURE]: (state) => state.set('ledouAmount', '获取失败'),

    [GET_LEDOU_BUY_RESULT_SUCCESS]: (state) => state.set('ledouAmount', '获取失败'),


    // 乐豆交易列表服务
    [GET_LEDOU_TRADE_LIST_SUCCESS]: (state, {payload}) => {
        const list = payload.data;

        let items = state.get('items').toJS();
        list.content.map((item)=>{
            items[item.id] = item;
        });

        return state.merge({
            items,
            list,
        });
    }

});
