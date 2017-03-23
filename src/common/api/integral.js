import http from '../http';

/*平台积分管理服务：完*/

//积分列表
export function getIntegralList({
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('manager/integral/list', {
        page,
        size,
        sort,
        order
    });
}

//积分资源绑定列表
export function getIntegralResList({
    id,
    page = 0,
    size = 10,
    sort,
    order
}) {
    return http.get('manager/integral/res/list/{id}', {
        id,
        page,
        size,
        sort,
        order
    });
}

//修改积分
/*var data = {
 id: '',
 para: {
 "perTotal": 0,
 "plusAmount": 0
 }
 };*/

export function updateIntegral(id, data) {
    return http.post('manager/integral/{id}', data, {
        params: {
            id
        }
    });
}

//新增积分
/*var data = {
 para: {
 "integral": 0,
 "perTotal": 0,
 "total": 0
 }
 };*/
export function addIntegral(data) {
    return http.post('manager/integral', data);
}

// 删除积分
export function deleteIntegral(id) {
    return http.delete('manager/integral/{id}', {
        id
    });
}

//获取积分详情
export function getIntegral(id) {
    return http.get('manager/integral/{id}', {
        id
    });
}

