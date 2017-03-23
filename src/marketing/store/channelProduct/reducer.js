import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {getSafeValue} from 'common/util';
import _ from 'lodash';
import {
    GET_CHANNEL_PRODUCT_SUCCESS,
    GET_CHANNEL_PRODUCT_LIST_SUCCESS,
    GET_CHANNEL_OPENING_LIST_SUCCESS
} from './action';
import {getMediaUrl} from 'common/util/media';

const initialState = fromJS({
    // 当前item
    item: null,
    // 列表map
    items: {},
    // 列表数据
    list: {}
});

export default createReducer(initialState, {

    // 获取交易渠道商品
    [GET_CHANNEL_PRODUCT_SUCCESS]: (state, {payload})=> state.set('item', _resolveItem(payload.data)),

    // 获取指定渠道商品列表
    [GET_CHANNEL_PRODUCT_LIST_SUCCESS]: (state, {payload})=> {
        let items = {};
        payload.data.content.forEach(item => {
            items[item.id] = _resolveItem(item);
        });
        return state.merge({
            'items': items,
            'list': payload.data
        });
    },

    // 获取已上架商品
    [GET_CHANNEL_OPENING_LIST_SUCCESS]: (state, {payload})=> {
        let items = {};
        payload.data.content.forEach(item => {
            items[item.channelId] = _resolveItem(item);
            items[item.channelId].id = item.channelId;
        });

        return state.merge({
            'items': items,
            'list': payload.data
        });
    }

});

// 通用Item数据处理
function _resolveItem(item) {
    item.mediaRes = item.mediaRes || {};

    // 商品图片
    if (item.mediaRes && item.mediaRes.productImgId) {
        item.mediaRes.productImgUrl = getMediaUrl(item.mediaRes.productImgId);
    }

    // 封面
    if (item.mediaRes && item.mediaRes.coverImgId) {
        item.mediaRes.coverImgUrl = getMediaUrl(item.mediaRes.coverImgId);
    }

    // 详情图片
    if (item.mediaRes && item.mediaRes.bannerImgs) {
        let bannerImgsUrl = [];
        item.mediaRes.bannerImgs.forEach(img => {
            bannerImgsUrl.push(getMediaUrl(img));
        });
        item.mediaRes.bannerImgsUrl = bannerImgsUrl;
    }

    // 统计数据
    item.opdata = item.opdata || {};

    // 交易数据
    item.opdata.tradeData = item.opdata.tradeData || {};

    item.yygCfg = item.yygCfg || {};


    item.yygCfg.stock = getSafeValue(item.yygCfg.stock, 0);

    // 库存余量
    let intensity = getSafeValue(item.yygCfg.stock, 0) - (_.has(item, 'opdata.tradeData.amount') ? item.opdata.tradeData.amount : 0);
    item.intensity = intensity;

    // 商品上架状态
    let status;

    if (item.yygCfg.enable) {
        if (item.bizStatus == 'soldout') {
            // 已售罄
            status = 'soldout';
        } else if (item.bizStatus == 'suspend') {
            // 已上架
            status = 'suspend';
        } else {
            if (item.bizStatus == 'finished') {
                // 已下架
                status = 'finished';
            } else {
                // 活动中
                status = 'opening';
            }
        }
    } else {
        if (item.yygCfg.issueNo == 0) {
            // 未上架
            status = 'news';
        } else {
            // 预下架
            status = 'closed';
        }
    }

    item.status = status;

    // 参与进度
    item.percent = status == 'news' ? 0 : item.creditRecieved / item.yygCfg.credit * 100;

    // 是否能删除
    item.canDel = status == 'news';

    // 是否能上架(未上架的商品|已下架的商品) -> 上架
    item.canOpening = item.status == 'news' || item.status == 'finished' || item.status == 'suspend';

    // 是否能续上架(预下架的商品|已售罄的商品) -> 续上架
    item.canReOpening = item.status == 'closed' || item.status == 'soldout';

    // 是否能预下架(活动中的商品)           -> 预下架
    item.canPreFinished = item.status == 'opening';

    // 资料是否完善完整
    item.isImprove = item.yygCfg.bidStep > 0 && item.yygCfg.credit > 0 && item.yygCfg.numOfOwners > 0;

    return item;
}
