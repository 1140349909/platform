import http from '../http';

// 获取会员列表
export function getMemberList({
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('admin/member/list', {
        page,
        size,
        sort,
        order
    });
}

//获取会员商城订单列表
export function getMemberMallOrdersList({
    id,
    payType,
    tradeStatus,
    page = 0,
    size = 10,
    buyType = '',
    sort,
    order
}) {
    return http.get('admin/member/mall/orders/{memberId}', {

        memberId: id,
        payType,
        tradeStatus,
        buyType,
        page,
        size,
        sort,
        order
    });
}
