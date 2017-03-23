import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_CONTENT_OPINION_LIST_SUCCESS,
} from './action';

const initialState = fromJS({

    // 资讯评论列表
    opinionList: null,

    // 当前项
    item: null,

});

export default createReducer(initialState, {

    // 资讯评论列表
    [GET_CONTENT_OPINION_LIST_SUCCESS]: (state, {payload}) => state.set('opinionList', fromJS(payload.data))

});
