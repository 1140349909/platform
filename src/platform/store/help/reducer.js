import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_HELP_COMMUNITY_LIST_SUCCESS,
    GET_HELP_LIST_SUCCESS,
    GET_HELP_PROTYPE_LIST_SUCCESS,
    GET_HELP_DETAIL_SUCCESS,
    GET_HELP_COMMUNITY_DETAIL_SUCCESS
} from './action';

const initialState = fromJS({
    communityList: {},
    problemList: {},
    protypeList: {},
    problemDetail: {},
    communityDetail: {}
});
export default createReducer(initialState, {
    [GET_HELP_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('problemList', fromJS(payload.data));
    },
    [GET_HELP_COMMUNITY_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('communityList', fromJS(payload.data));
    },
    [GET_HELP_PROTYPE_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('protypeList', fromJS(payload.data));
    },
    [GET_HELP_DETAIL_SUCCESS]: (state, {payload}) => {
        return state.set('problemDetail', fromJS(payload.data));
    },
    [GET_HELP_COMMUNITY_DETAIL_SUCCESS]: (state, {payload}) => {
        return state.set('communityDetail', fromJS(payload.data));
    },
});

/*function _resolveItem(item) {
 // 缩略图片
 item.lastDate = dateFormat(item.createdDate);
 return item;
 }*/
