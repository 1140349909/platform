import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {GET_INTEGRAL_LIST_SUCCESS, GET_INTEGRAL_SUCCESS, GET_INTEGRAL_RES_LIST_SUCCESS} from './action';

const initialState = fromJS({

    list: {},

    resList: {},

    resContent: []
});


export default createReducer(initialState, {

    // 获取积分列表成功返回
    [GET_INTEGRAL_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    // 获取积分成功返回
    [GET_INTEGRAL_SUCCESS]: (state, {payload}) => state.set('item', fromJS(payload.data)),

    // 获取积分资源绑定列表成功返回
    [GET_INTEGRAL_RES_LIST_SUCCESS]: (state, {payload})=> {

        let resContent = [];

        payload.data.content.forEach((item) => {
            resContent.push(item.resId);
        });

        return state.merge({
            'resContent': resContent,
            'resList': payload.data
        });
    },

});
