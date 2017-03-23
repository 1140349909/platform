import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {dateFormat} from 'common/util/index';
import {
    GET_VERSION_INFO_SUCCESS,
    GET_VERSION_PRICE_SUCCESS,
    GET_USER_VERSION_LIST_SUCCESS
} from './action';

const initialState = fromJS({
    //版本列表
    list: {},
    //当前客户
    versionInfo: {},

    versionPrice: {},

});

export default createReducer(initialState, {
    //获取当前用户营销版本信息
    [GET_USER_VERSION_LIST_SUCCESS]: (state, {payload}) => state.set('list', fromJS(payload.data)),

    [GET_VERSION_INFO_SUCCESS]: (state, {payload}) => {
        let moduleIds = [];
        let data = payload.data;
        data.modules && data.modules.map((item) => {
            if (item.status == 'visible_enable') {
                moduleIds.push(item.moduleId);
            }
        });
        data.moduleIds = moduleIds;
        if (data.validDate) {
            data.validDate.startDate = dateFormat(data.validDate.startDate, 'yyyy-MM-dd hh:mm');
            data.validDate.endDate = dateFormat(data.validDate.endDate, 'yyyy-MM-dd hh:mm');
        }
        return state.set('versionInfo', fromJS(data));
    },

    [GET_VERSION_PRICE_SUCCESS]: (state, {payload}) => state.set('versionPrice', payload)

});
