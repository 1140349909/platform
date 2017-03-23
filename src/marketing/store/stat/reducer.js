import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS,
    GET_DATA_PRODUCT_SALES_MALL_SUCCESS,
    GET_DATA_PRODUCT_SALES_YYG_SUCCESS,
    GET_DATA_PRODUCT_SALES_SUCCESS,
    GET_DATA_VSITE_BUY_TOTAL_SUCCESS
} from './action';

const initialState = fromJS({

    // 一元购商城列表
    productSales: null,

    // 总销售额
    total: null,

    saleTotal: null,

    totalSales: null,

    vsiteTotal:null,
});


export default createReducer(initialState, {

    // 总计销售统计数据
    [GET_DATA_PRODUCT_TOTAL_SALES_SUCCESS]: (state, {payload}) => state.set('totalSales', fromJS(payload.data)),

    // 获取商品销售统计数据
    [GET_DATA_PRODUCT_SALES_SUCCESS]: (state, {payload}) => {

        let data = {
            total: {
                amount: 0,
                salesAmount: 0,
                profitAmount: 0,
            }
        };

        let mall = payload[0].data;
        let yyg = payload[1].data;

        if (_.isEmpty(mall) || mall.details.length == 0) {
            mall = null;
        } else {
            data.mall = mall;
        }

        if (_.isEmpty(yyg) || yyg.details.length == 0) {
            yyg = null;
        } else {
            data.yyg = yyg;
        }

        if (yyg !== null) {
            data.total.amount = data.total.amount + yyg.total.amount;
            data.total.salesAmount = data.total.salesAmount + yyg.total.salesAmount;
            data.total.profitAmount = data.total.profitAmount + yyg.total.profitAmount;
        }

        if (mall !== null) {
            data.total.amount = data.total.amount + mall.total.amount;
            data.total.salesAmount = data.total.salesAmount + mall.total.salesAmount;
            data.total.profitAmount = data.total.profitAmount + mall.total.profitAmount;
        }

        data.total.salesAmount = data.total.salesAmount / 100;
        data.total.profitAmount = data.total.profitAmount / 100;

        return state.set('productSales', fromJS(data));
    },

    // 获取商品销售统计数据
    [GET_DATA_PRODUCT_SALES_MALL_SUCCESS]: (state, {payload}) => state.set('mallDataList', fromJS(payload.data)),

    // 获取一元购商品销售统计数据
    [GET_DATA_PRODUCT_SALES_YYG_SUCCESS]: (state, {payload}) => state.set('yygDataList', fromJS(payload.data)),

    // 获取微站交易统计汇总数据
    [GET_DATA_VSITE_BUY_TOTAL_SUCCESS]: (state, {payload}) => {

        const data = _.merge({
            opdata:{
                preTradeData:{
                    peoples:0,
                    orders:0,
                    amount:0,
                    salesAmount:0
                },
                tradeData:{
                    peoples:0,
                    orders:0,
                    amount:0,
                    salesAmount:0
                }
            }
        }, payload.data);

        return state.set('vsiteTotal', fromJS(data));
    },

});
