//action的构建

//api的引入，获取当前客户所有的商品
import  * as  apiProductChannel from '../../api/productChannel';
import  * as  apiCustomer from '../../api/customer';
//action状态处理
export const GET_SHOPPINGGUIDE_LIST = 'GET_SHOPPINGGUIDE_LIST';
export const GET_SHOPPINGGUIDE_LIST_PENDING = 'GET_SHOPPINGGUIDE_LIST_PENDING';
export const GET_SHOPPINGGUIDE_LIST_SUCCESS = 'GET_SHOPPINGGUIDE_LIST_SUCCESS';
export const GET_SHOPPINGGUIDE_LIST_FAILURE = 'GET_SHOPPINGGUIDE_LIST_FAILURE';
//action状态处理
export const GET_CUSTOMER_UIN = 'GET_CUSTOMER_UIN';
export const GET_CUSTOMER_UIN_PENDING = 'GET_CUSTOMER_UIN_PENDING';
export const GET_CUSTOMER_UIN_SUCCESS = 'GET_CUSTOMER_UIN_SUCCESS';
export const GET_CUSTOMER_UIN_FAILURE = 'GET_CUSTOMER_UIN_FAILURE';


//暴露出获取客户所有商品的列表
export function getShoppingGuideList(params) {
    return {
        type:GET_SHOPPINGGUIDE_LIST,
        payload: apiProductChannel.getProductChannelContentList(params)

    };
}
export function getCustomerUinInf() {
    return {
        type:GET_CUSTOMER_UIN,
        payload: apiCustomer.getAdminCustomer()
    };
}






