import  * as apiMember from '../../../common/api/member';

// 获取会员列表
export const GET_MEMBER_LIST='GET_MEMBER_LIST';
export const GET_MEMBER_LIST_PENDING='GET_MEMBER_LIST_PENDING';
export const GET_MEMBER_LIST_SUCCESS='GET_MEMBER_LIST_SUCCESS';
export const GET_MEMBER_LIST_FAILURE='GET_MEMBER_LIST_FAILURE';

// 获取会员商城订单列表
export const GET_MEMBER_MALL_ORDER_LIST='GET_MEMBER_MALL_ORDER_LIST';
export const GET_MEMBER_MALL_ORDER_LIST_PENDING='GET_MEMBER_MALL_ORDER_LIST_PENDING';
export const GET_MEMBER_MALL_ORDER_LIST_SUCCESS='GET_MEMBER_MALL_ORDER_LIST_SUCCESS';
export const GET_MEMBER_MALL_ORDER_LIST_FAILURE='GET_MEMBER_MALL_ORDER_LIST_FAILURE';

// 获取会员列表
export function getMemberList(params){
    return {
        type:GET_MEMBER_LIST,
        payload:apiMember.getMemberList(params)
    };
}

//获取会员商城订单列表
export function getMemberMallOrdersList(params){
    return {
        type:GET_MEMBER_MALL_ORDER_LIST,
        payload:apiMember.getMemberMallOrdersList(params)
    };
}




