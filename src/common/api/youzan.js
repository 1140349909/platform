import http from '../http';
import config from '../config';

//get /api/v1/{client}/{channel}/manager/youzan/counpon/list 获取有赞所有优惠券
//get /api/v1/{client}/{channel}/manager/youzan/product/list 获取有赞商品列表
//get /api/v1/{client}/{channel}/manager/youzan/salesman/share 获取有赞商品推广链接

// GET /api/v1/{client}/{channel}/app/preview/{id} 作品预览
export function getYouZanCounponList(fields = 'group_id,at_least,title,value,quota,total,stock,start_at,end_at,fetch_url,' +
'stat_fetch_user_num,stat_use_num,created,coupon_type') {
    return http.get(config.API_ILOKA_URL + '/manager/youzan/counpon/list', {
        fields
    });
}

//作品数据服务（保存）
export function getYouZanProductList({
    fields = 'cid,kdt_id,pic_thumb_url,price,title,alias,created,sold_num,num,detail_url',
    tag_id,
    q,
    page,
    size,
    sort,
    order
}) {
    return http.get(config.API_ILOKA_URL + '/manager/youzan/product/list', {
        fields,
        tag_id,
        q,
        page,
        size,
        sort,
        order
    });
}
