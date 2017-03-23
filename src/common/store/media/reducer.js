import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {GET_COMMON_MEDIA_LIST_SUCCESS, GET_MEDIA_TYPES_SUCCESS} from './action';

const initialState = fromJS({
    // 用户获取媒体资源列表
    mediaList: {},
    mediaItems:{},

    mediaTypes: [],

    items: {}
});

export default createReducer(initialState, {

    // 用户获取媒体资源列表
    [GET_COMMON_MEDIA_LIST_SUCCESS]: (state, {payload})=> {

        let items = {};

        payload.data.content.map((item)=> {
            items[item.id] = item;
        });

        return state.merge({
            'mediaList':payload.data,
            'mediaItems':items
        });

    },

    [GET_MEDIA_TYPES_SUCCESS]: (state, {payload})=> {

        let items = {};

        payload.data.map((item)=> {
            items[item.id] = item;
        });

        return state.merge({
            'mediaTypes': payload.data,
            'items': items
        });
    },
});


