import http from '../http';
import config from '../config';

//get /api/v1/{client}/{channel}/manager/youzan/product/list 获取微盟商品列表
export function getWeimobProductList({
                                         spuCode,
                                         page,
                                         size,
                                         sort,
                                         order
                                     }) {
    return http.get(config.API_ILOKA_URL + '/manager/weimob/product/list', {
        spuCode,
        page,
        size,
        sort,
        order
    });
}
