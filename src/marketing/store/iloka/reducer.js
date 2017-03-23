import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {
    UPDATE_CONTENT_STATUS_SUCCESS,
    GET_CONTENT_SUCCESS,
    GET_APP_DATA_SUCCESS,
    GET_CONTENT_LIST_SUCCESS
} from './action';
import {getContentShowUrl, getIlokaContentUrl} from 'common/util/url';

const initialState = fromJS({
    contentList: {},
    item: null,
    distributeData: null
});

export default createReducer(initialState, {

    // 更新资讯
    [UPDATE_CONTENT_STATUS_SUCCESS]: (state, {payload}) => state.set('contentList', fromJS(payload.data)),

    // 获取资讯
    [GET_CONTENT_SUCCESS]: (state, {payload}) => {

        let url = getContentShowUrl(payload.data.uin, payload.data.id);

        return state.merge({
            item: payload.data,
            distributeData: {
                item: [
                    {
                        'description': payload.data.digest,
                        'more': '',
                        'picUrl': '',
                        'resId': payload.data.id,
                        'resType': payload.data.resType,
                        'title': payload.data.title,
                        'url': url
                    }
                ],
                'resStatus': 'edit',
            }
        });
    },

    // 获取用户数据
    [GET_APP_DATA_SUCCESS]: (state, {payload}) => {

        let url = getIlokaContentUrl(payload.data.id);

        return state.merge({
            item: payload.data,
            distributeData: {
                item: [
                    {
                        'description': payload.data.description,
                        'more': '',
                        'picUrl': '',
                        'resId': payload.data.id,
                        //不能用自带的h5，这属于资讯上的H5
                        'resType': 'h5',
                        'title': payload.data.name,
                        'url': url
                    }
                ],
                'resStatus': 'edit',
            }
        });
    },

    // 获取资讯列表
    [GET_CONTENT_LIST_SUCCESS]: (state, {payload})=>state.set('contentList', fromJS(payload.data)),

});
