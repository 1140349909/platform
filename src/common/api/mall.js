import http from '../http';
import config from '../config';

// 获取商城信息
export function getMallBasic() {
    return http.get('manager/mall');
}

// 修改商城基本信息
export function updateMallBasic(data) {
    return http.post('manager/mall/basic', data);
}

// 修改商城权限配置
export function updateMallAuth(data) {
    return http.post('manager/mall/config/auth', data);
}

// 修改商城客服人员
export function updateMallCustomer(data) {
    return http.post('manager/mall/cus', data);
}

export function addMall(mall) {
    return http.post('platadmin/mall', mall);
}

export function updateMall(mall) {
    return http.post('platadmin/mall/{id}', mall, {
        params: {
            id: mall.id
        }
    });
}

export function saveMall(mall) {
    return mall.id ? updateMall(mall) : addMall(mall);
}

export function getMall(id) {
    return http.get('platadmin/mall/{id}', {
        id
    });
}

export function getMalls({
    page = 0,
    size = 10,
    sort = 'name',
    order = config.ORDER
}) {
    return http.get('platadmin/mall', {
        page,
        size,
        sort,
        order
    });
}
