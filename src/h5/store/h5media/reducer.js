import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {getMediaUrl} from 'common/util/media';
import {
    GET_MEDIA_TYPES_SUCCESS,
    GET_MEDIA_LIST_SUCCESS,
    CANCEL_FAV_MEDIA_SUCCESS,
    FAV_MEDIA_SUCCESS,
    GET_SEARCH_STICKERS_SUCCESS,
    PURCHASE_MATERIAL,
    DELETE_MEDIA_SUCCESS,
    DELETE_MEDIA_ALL_SUCCESS
} from './action';
import {DEFAULT_LIST} from 'common/config/model';
import {MEDIA_RES_TYPE, OWNER} from 'common/config/constants';

const initialState = fromJS({
    types: null,
    list: DEFAULT_LIST,
    uploadPicCount: 0,
    // 滚动列表
    all: [],
    stickers: [],
    mediaDelIds: []
});

export default createReducer(initialState, {

    [GET_MEDIA_TYPES_SUCCESS]: (state, {payload}) => state.merge({
        types: fromJS(payload.data)
    }),

    [GET_MEDIA_LIST_SUCCESS]: (state, {payload}) => {
        let {data, params} = payload;

        _.each(data.content, (item) => {
            _resolveItem(item, params.faved, params.bought);
        });

        const content = fromJS(data.content);

        let temp = {
            list: data,
            all: params.page == 0 ? content : state.get('all').concat(content)
        };

        if (params.owner == OWNER.BIZ && params.resType == MEDIA_RES_TYPE.MATERIAL) {
            temp.uploadPicCount = data.totalElements;
        }

        return state.merge(temp);
    },

    [CANCEL_FAV_MEDIA_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', false) : item);
        });
    },

    [FAV_MEDIA_SUCCESS]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.params.id ? item.set('faved', true) : item);
        });
    },

    // 购买素材
    [PURCHASE_MATERIAL]: (state, {payload}) => {
        return state.update('all', content => {
            return content.map(item => item.get('id') == payload.id ? item.set('bought', true) : item);
        });
    },


    [GET_SEARCH_STICKERS_SUCCESS]: (state, {payload}) => {

        let {params} = payload;

        let data = _getResolveStickers(payload.data);

        const content = fromJS(data.content);

        return state.merge({
            all: params.p == 1 || params.page == 0 ? content : state.get('all').concat(content),
            list: data
        });
    },

    [DELETE_MEDIA_SUCCESS]: (state, {payload}) => {
        let list = state.get('list').toJS();
        let ids = [];

        _.map(list.content, (item) => {
            if (payload.params.ids === item.id) {
                ids = item.mediaId;
            }
        });

        return state.set('mediaDelIds', [ids]);
    },

    [DELETE_MEDIA_ALL_SUCCESS]: (state) => {
        let list = state.get('list').toJS();
        let ids = [];

        _.map(list.content, (item) => {
            ids.push(item.mediaId);
        });

        return state.set('mediaDelIds', ids);
    }

});

function _getResolveStickers(list) {

    if (_.has(list, 'content')) {
        _.each(list.content, (item) => {
            _resolveItem(item, false, false);
        });
        return list;
    }

    let contentList = [];

    _.map(list.emojis, item => {
        contentList.push({
            name: item.text,
            mediaUrl: item.main,
            createdDate: new Date().getTime(),
            fileExt: 'png',
            fileName: `${item.text}.png`
        });
    });

    const data = {
        content: contentList,
        last: _.isEmpty(list.emojis),
        totalElements: list.count,
    };

    return data;
}

function _resolveItem(item, faved, bought) {
    item.mediaUrl = getMediaUrl(item.mediaId);
    if (!_.has(item, 'faved')) {
        item.faved = !!faved;
    }
    item.ledou = isNaN(item.ledou) ? 0 : item.ledou;

    if (!_.has(item, 'bought')) {
        item.bought = !!bought;
    }
    return item;
}
