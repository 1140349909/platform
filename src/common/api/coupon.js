import http from '../http';
//优惠券面值列表
export function getCouponFaceValueList() {
    return http.get('manager/coupon/facevalue/list');
}

//优惠券列表
export function getCouponList({
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('manager/coupon/list', {
        page,
        size,
        sort,
        order
    });
}

//优惠券资源绑定列表
export function getCouponResList({
    id,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('manager/coupon/res/list/{id}', {
        id,
        page,
        size,
        sort,
        order
    });
}

//修改优惠券
/*var data = {
 id: '',
 para: {
 "perTotal": 0,
 "plusAmount": 0
 }
 };*/

export function updateCoupon(id, data) {
    return http.post('manager/coupon/{id}', data, {
        params: {
            id
        }
    });
}


export function addCoupon(data) {
    return http.post('manager/coupon',
        data
    );
}

// 删除优惠券
export function deleteCoupon(id) {
    return http.delete('manager/coupon/{id}', {
        id
    });
}

//获取优惠券详情
export function getCoupon(id) {
    return http.get('manager/coupon/{id}', {
        id
    });
}
