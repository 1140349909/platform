import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_CONFIG_INVOICE_SUCCESS,
    GET_ISCONFIG_INVOICE_SUCCESS,
    GET_ISCONFIG_INVOICE_FAILURE,
    GET_LEDOU_TRADE_LIST_SUCCESS,
    GET_TRANS_INVOICE_LIST_SUCCESS,
    GET_CUSTOMER_ADDRESS_SUCCESS,
    GET_RULE_TYPE_SUCCESS,
    DEMAND_INVOICE_FAILURE,
} from './action';
const initialState = fromJS({
    invoiceSettingInf: null,
    invoiceIsSetting: {},
    orderList: [],
    invoiceList: [],
    addressList: [],
    invoiceRule: {},
    errMessage: {}
});


export default createReducer(initialState, {
    //检查发票设置
    [GET_ISCONFIG_INVOICE_SUCCESS]: (state) => {
        return state.set('invoiceIsSetting', fromJS({
            settting: true
        }));
    },
    [GET_ISCONFIG_INVOICE_FAILURE]: (state, {payload}) => {
        if (payload.errCode == 40004) {
            return state.set('invoiceIsSetting', fromJS({
                settting: false
            }));
        } else {
            return state;
        }
    },
    //获取发票设置
    [GET_CONFIG_INVOICE_SUCCESS]: (state, {payload}) => state.set('invoiceSettingInf', fromJS(payload.data)),

    // 乐豆交易列表服务
    [GET_LEDOU_TRADE_LIST_SUCCESS]: (state, {payload}) => state.set('orderList', fromJS(payload.data)),

    //发票列表
    [GET_TRANS_INVOICE_LIST_SUCCESS]: (state, {payload})=>state.set('invoiceList', fromJS(payload.data)),

    //地址列表
    [GET_CUSTOMER_ADDRESS_SUCCESS]: (state, {payload})=>state.set('addressList', fromJS(payload.data)),

    //地址列表
    [GET_RULE_TYPE_SUCCESS]: (state, {payload})=>state.set('invoiceRule', fromJS(payload.data)),

    //错误码处理
    [DEMAND_INVOICE_FAILURE]: (state, {payload})=>state.set('errMessage', fromJS(payload)),

});
























