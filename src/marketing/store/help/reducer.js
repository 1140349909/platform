import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    GET_HELP_COMMUNITY_LIST_SUCCESS,
    GET_HELP_LIST_SUCCESS,
    GET_HELP_PROBLEM_MARKTYPE_SUCCESS,
    GET_HELP_COMMUNITY_TYPE_SUCCESS,
    GET_HELP_PROBLEM_ALLMARKTYPE_SUCCESS,
    GET_HELP_DETAIL_SUCCESS
} from './action';

const initialState = fromJS({
    communityList: {},
    problemList: {},
    problemTagList: {},
    communityQcodeList: {},
    allTypeProblemList: {},
    problemDetail: {}
});
export default createReducer(initialState, {
    [GET_HELP_LIST_SUCCESS]: (state, {payload}) => {
        const data = {
            response: payload.data,
            keyword: ''
        };
        if (payload.params.keyword) {
            data.keyword = payload.params.keyword;
        }
        payload.data.content.map((item) => {
            item.desc = delHtmlTag(item.content);
        });
        data.response = payload.data;
        return state.merge({'problemList': fromJS(data)});
    },
    [GET_HELP_COMMUNITY_LIST_SUCCESS]: (state, {payload}) => {
        return state.set('communityList', fromJS(payload.data));
    },
    [GET_HELP_PROBLEM_MARKTYPE_SUCCESS]: (state, {payload}) => {
        return state.set('problemTagList', fromJS(payload.data));
    },
    [GET_HELP_COMMUNITY_TYPE_SUCCESS]: (state, {payload}) => {
        const data = payload.data;
        data.params = payload.params.qrcodeType;
        return state.set('communityQcodeList', fromJS(data));
    },
    [GET_HELP_PROBLEM_ALLMARKTYPE_SUCCESS]: (state, {payload}) => {
        return state.set('allTypeProblemList', fromJS(payload.data));
    },
    [GET_HELP_DETAIL_SUCCESS]: (state, {payload}) => {
        return state.set('problemDetail', fromJS(payload.data));
    },
});
//去除html标签
function delHtmlTag(content) {
    return content.replace(/<\/?.+?>/g, '');//去掉所有的html标记
}
