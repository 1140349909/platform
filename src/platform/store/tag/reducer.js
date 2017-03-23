import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_TAGS_LIST_SUCCESS,
    GET_TAG_SUCCESS,
    UPDATE_TAG_AGG_SUCCESS
} from './action';

const initialState = fromJS({
    // 用户获取媒体资源列表
    tagList: [],
    tag:{},
    agg:{},
    setting:{},


    mediaTypes: [],

    items: {}
});

export default createReducer(initialState, {

    // 用户获取媒体资源列表
    [GET_TAGS_LIST_SUCCESS]: (state, {payload})=> state.set('tagList',fromJS(payload.data)),

    [GET_TAG_SUCCESS]: (state, {payload})=> state.set('tag', fromJS(payload.data)),

    [UPDATE_TAG_AGG_SUCCESS]: (state, {payload})=> state.set('agg', fromJS(payload.data)),
});


