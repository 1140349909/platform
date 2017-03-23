import * as apiLedou from '../../../common/api/ledou';
import * as apiCustomer from '../../../common/api/customer';
import * as apiRule from '../../../common/api/rule';

//获取发票设置 getConfigInvoice GET_CONFIG_INVOICE
export const GET_CONFIG_INVOICE = 'GET_CONFIG_INVOICE';
export const GET_CONFIG_INVOICE_PENDING = 'GET_CONFIG_INVOICE_PENDING';
export const GET_CONFIG_INVOICE_SUCCESS = 'GET_CONFIG_INVOICE_SUCCESS';
export const GET_CONFIG_INVOICE_FAILURE = 'GET_CONFIG_INVOICE_FAILURE';

//获取发票设置 getConfigInvoice GET_CONFIG_INVOICE
export const GET_ISCONFIG_INVOICE = 'GET_ISCONFIG_INVOICE';
export const GET_ISCONFIG_INVOICE_PENDING = 'GET_ISCONFIG_INVOICE_PENDING';
export const GET_ISCONFIG_INVOICE_SUCCESS = 'GET_ISCONFIG_INVOICE_SUCCESS';
export const GET_ISCONFIG_INVOICE_FAILURE = 'GET_ISCONFIG_INVOICE_FAILURE';

//发票索取获取列表 getInvoiceList
export const GET_INVOICE_LIST = 'GET_INVOICE_LIST';
export const GET_INVOICE_LIST_PENDING = 'GET_INVOICE_LIST_PENDING';
export const GET_INVOICE_LIST_SUCCESS = 'GET_INVOICE_LIST_SUCCESS';
export const GET_INVOICE_LIST_FAILURE = 'GET_INVOICE_LIST_FAILURE';

//发票索取获取列表 getTransInvoiceList GET_TRANS_INVOICE_LIST
export const GET_TRANS_INVOICE_LIST = 'GET_TRANS_INVOICE_LIST';
export const GET_TRANS_INVOICE_LIST_PENDING = 'GET_TRANS_INVOICE_LIST_PENDING';
export const GET_TRANS_INVOICE_LIST_SUCCESS = 'GET_TRANS_INVOICE_LIST_SUCCESS';
export const GET_TRANS_INVOICE_LIST_FAILURE = 'GET_TRANS_INVOICE_LIST_FAILURE';

//发票设置 updateConfigInvoice
export const UPDATE_CONFIG_INVOICE = 'UPDATE_CONFIG_INVOICE';
export const UPDATE_CONFIG_INVOICE_PENDING = 'UPDATE_CONFIG_INVOICE_PENDING';
export const UPDATE_CONFIG_INVOICE_SUCCESS = 'UPDATE_CONFIG_INVOICE_SUCCESS';
export const UPDATE_CONFIG_INVOICE_FAILURE = 'UPDATE_CONFIG_INVOICE_FAILURE';

//索取发票 demandInvoice
export const DEMAND_INVOICE = 'DEMAND_INVOICE';
export const DEMAND_INVOICE_PENDING = 'DEMAND_INVOICE_PENDING';
export const DEMAND_INVOICE_SUCCESS = 'DEMAND_INVOICE_SUCCESS';
export const DEMAND_INVOICE_FAILURE = 'DEMAND_INVOICE_FAILURE';


// 乐豆交易列表服务
export const GET_LEDOU_TRADE_LIST = 'GET_LEDOU_TRADE_LIST';
export const GET_LEDOU_TRADE_LIST_SUCCESS = 'GET_LEDOU_TRADE_LIST_SUCCESS';
export const GET_LEDOU_TRADE_LIST_PENDING = 'GET_LEDOU_TRADE_LIST_PENDING';
export const GET_LEDOU_TRADE_LIST_FAILURE = 'GET_LEDOU_TRADE_LIST_FAILURE';


//新增地址  addCustomerAddress
export const ADD_CUSTOMER_ADDRESS = 'ADD_CUSTOMER_ADDRESS';
export const ADD_CUSTOMER_ADDRESS_SUCCESS = 'ADD_CUSTOMER_ADDRESS_SUCCESS';
export const ADD_CUSTOMER_ADDRESS_PENDING = 'ADD_CUSTOMER_ADDRESS_PENDING';
export const ADD_CUSTOMER_ADDRESS_FAILURE = 'ADD_CUSTOMER_ADDRESS_FAILURE';

//修改地址 updateCustomerAddress
export const UPDATE_CUSTOMER_ADDRESS = 'UPDATE_CUSTOMER_ADDRESS';
export const UPDATE_CUSTOMER_ADDRESS_SUCCESS = 'UPDATE_CUSTOMER_ADDRESS_SUCCESS';
export const UPDATE_CUSTOMER_ADDRESS_PENDING = 'UPDATE_CUSTOMER_ADDRESS_PENDING';
export const UPDATE_CUSTOMER_ADDRESS_FAILURE = 'UPDATE_CUSTOMER_ADDRESS_FAILURE';


//地址列表 getCustomerAddress
export const GET_CUSTOMER_ADDRESS = 'GET_CUSTOMER_ADDRESS';
export const GET_CUSTOMER_ADDRESS_SUCCESS = 'GET_CUSTOMER_ADDRESS_SUCCESS';
export const GET_CUSTOMER_ADDRESS_PENDING = 'GET_CUSTOMER_ADDRESS_PENDING';
export const GET_CUSTOMER_ADDRESS_FAILURE = 'GET_CUSTOMER_ADDRESS_FAILURE';

//删除地址 deleteCustomerAddress

export const DELETE_CUSTOMER_ADDRESS = 'DELETE_CUSTOMER_ADDRESS';
export const DELETE_CUSTOMER_ADDRESS_SUCCESS = 'DELETE_CUSTOMER_ADDRESS_SUCCESS';
export const DELETE_CUSTOMER_ADDRESS_PENDING = 'DELETE_CUSTOMER_ADDRESS_PENDING';
export const DELETE_CUSTOMER_ADDRESS_FAILURE = 'DELETE_CUSTOMER_ADDRESS_FAILURE';

//获取发票规则 getInvoiceRuleType GET_RULE_TYPE

export const GET_RULE_TYPE = 'GET_RULE_TYPE';
export const GET_RULE_TYPE_SUCCESS = 'GET_RULE_TYPE_SUCCESS';
export const GET_RULE_TYPE_PENDING = 'GET_RULE_TYPE_PENDING';
export const GET_RULE_TYPE_FAILURE = 'GET_RULE_TYPE_FAILURE';


// 检查发票设置
export function getIsConfigInvoice(check) {
    return {
        meta:{
            silent:true
        },
        type: GET_ISCONFIG_INVOICE,
        payload: apiLedou.getConfigInvoice(check)
    };
}


// 获取发票
export function getConfigInvoice(check) {
    return {

        type: GET_CONFIG_INVOICE,
        payload: apiLedou.getConfigInvoice(check)
    };
}


//发票设置

export function updateConfigInvoice(data) {
    return {
        type: UPDATE_CONFIG_INVOICE,
        payload: apiLedou.updateConfigInvoice(data)
    };
}

//索取平台发票状态列表

export function getInvoiceList(params) {
    return {
        type: GET_INVOICE_LIST,
        payload: apiLedou.getInvoiceList(params)
    };
}

//索取商户发票状态列表

export function getTransInvoiceList(params) {
    return {
        type: GET_TRANS_INVOICE_LIST,
        payload: apiLedou.getTransInvoiceList(params)
    };
}

//索取发票

export function demandInvoice(data) {
    return {
        meta:{
            silent:true
        },
        type: DEMAND_INVOICE,
        payload: apiLedou.demandInvoice(data)
    };
}


// 乐豆交易列表服务
export function getTransTradeList(params) {
    return {
        type: GET_LEDOU_TRADE_LIST,
        payload: apiLedou.getTransTradeList(params),
    };
}

// 新增地址
export function addCustomerAddress(data) {
    return {
        type: ADD_CUSTOMER_ADDRESS,
        payload: apiCustomer.addCustomerAddress(data),
    };
}
// 修改地址
export function updateCustomerAddress(id,data) {
    return {
        type: UPDATE_CUSTOMER_ADDRESS,
        payload: apiCustomer.updateCustomerAddress(id,data),
    };
}

// 地址列表 getCustomerAddress
export function getCustomerAddressList(params) {
    return {
        type: GET_CUSTOMER_ADDRESS,
        payload: apiCustomer.getCustomerAddress(params),
    };
}
// 删除地址 deleteCustomerAddress
export function deleteCustomerAddress(id) {
    return {
        type: DELETE_CUSTOMER_ADDRESS,
        payload: apiCustomer.deleteCustomerAddress(id),
    };
}

// 获取发票设置 getInvoiceRuleType
export function getInvoiceRuleType(ruleId) {
    return {
        type: GET_RULE_TYPE,
        payload: apiRule.getInvoiceRuleType(ruleId),
    };
}
