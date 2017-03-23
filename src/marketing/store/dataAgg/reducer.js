import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_DATA_AGG_SUCCESS,
    GET_TOTAL_CONTENT_EFFECT_SUCCESS,
    GET_TOTAL_SHOPPING_COUPON_SUCCESS,
    GET_TOTAL_SHOPPING_INTEGRAL_SUCCESS,
    GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_SUCCESS,
    GET_TOTAL_SITE_EFFECT_SUCCESS,
    GET_DATA_AGG_FANS_DAY_SUCCESS,
    GET_DATA_AGG_VISITOR_TOTAL_SUCCESS
} from './action';

const initialState = fromJS({
    content: {},
    coupon: {},
    integral: {},
    buy: {},
    sites: {},
    fans: [],
    visitors: {}
});
// let mineList={};
export default createReducer(initialState, {
    [GET_DATA_AGG_SUCCESS]: (state, {payload})=> {
        const [content,coupon,integral,buy,sites] = payload;
        return state.merge({
            content: content.data,
            coupon: coupon.data,
            integral: integral.data,
            buy: buy.data,
            sites: sites.data
        });
    },
    [GET_TOTAL_CONTENT_EFFECT_SUCCESS]: (state, {payload})=> state.merge({'content': payload.data}),
    [GET_TOTAL_SHOPPING_COUPON_SUCCESS]: (state, {payload})=> state.merge({'coupon': payload.data}),
    [GET_TOTAL_SHOPPING_INTEGRAL_SUCCESS]: (state, {payload})=> state.merge({'integral': payload.data}),
    [GET_TOTAL_SHOOPING_EFFECT_INTEGRAL_SUCCESS]: (state, {payload})=> state.merge({'buy': payload.data}),
    [GET_TOTAL_SITE_EFFECT_SUCCESS]: (state, {payload})=> state.merge({'sites': payload.data}),
    [GET_DATA_AGG_FANS_DAY_SUCCESS]: (state, {payload})=> state.merge({'fans': payload.data}),
    [GET_DATA_AGG_VISITOR_TOTAL_SUCCESS]: (state, {payload})=> {

        const data = _.merge({
            bpv: 0,
            buv: 0,
            pv: 0,
            uv: 0
        }, payload.data);

        return state.merge({'visitors': data});
    }
});
