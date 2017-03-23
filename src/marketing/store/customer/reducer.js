import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import _ from 'lodash';
import {
    GET_ADMIN_CUSTOMER_SUCCESS,
    GET_ADMIN_CUSTOMER_LIST_SUCCESS,
    GET_CARD_STYLE_SUCCESS,
    GET_INTEGRAL_EXCHANGE_SUCCESS,
    UPDATE_INTEGRAL_EXCHANGE_SUCCESS,
    GET_ADMIN_EMPLOYEE_LIST_SUCCESS,
    GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS,
    GET_CUSTOMER_CONFIG_INFO_SUCCESS,
} from './action';


const initialState = fromJS({

    // 客户信息
    customerInfo: {},

    // 获取激励信息
    excitation: '',

    // 获取客户列表
    customerList: {},

    // 获取客户员工列表
    employeeList: {},
    // 会员卡样式
    cardStyle: {},

    // 获取积分
    integral: 0,

    // 用户配置
    configInfo: {},

    // 进度
    percent: 0

});

export default createReducer(initialState, {

    // 获取客户信息
    [GET_ADMIN_CUSTOMER_SUCCESS]: (state, {payload})=> {

        //修复积分无法提交的bug
        const data = _.assign({
            contact: {}
        }, payload.data);
        return state.merge({
            customerInfo: data,
            id: payload.data.id,
            uin: payload.data.uin
        });
    },

    // 获取客户积分兑换信息
    [GET_INTEGRAL_EXCHANGE_SUCCESS]: (state, {payload}) => {

        const data = _.assign({
            integral: 0
        }, payload.data);
        return state.set('integral', data);
    },

    // 获取客户积分兑换信息
    [UPDATE_INTEGRAL_EXCHANGE_SUCCESS]: (state, {payload}) => state.set('integral', payload.params.value),

    // 获取客户列表
    [GET_ADMIN_CUSTOMER_LIST_SUCCESS]: (state, {payload}) => state.set('customerList', fromJS(payload.data)),

    // 获取会员卡风格
    [GET_CARD_STYLE_SUCCESS]: (state, {payload}) => state.set('cardStyle', fromJS(payload.data)),

    // 获取客户员工列表
    [GET_ADMIN_EMPLOYEE_LIST_SUCCESS]: (state, {payload}) => state.set('employeeList', fromJS(payload.data)),

    // 获取激励
    [GET_ADMIN_EMPLOYEE_EXCITATION_SUCCESS]: (state, {payload}) => state.set('excitation', fromJS(payload.data)),

    // 获取用户配置
    [GET_CUSTOMER_CONFIG_INFO_SUCCESS]: (state, {payload})=> {


        const data = _.merge({
            publish: 'FALSE',
            vsite: 'FALSE',
            trade: 'FALSE',
            manager: 'FALSE',
        }, payload.data);

        let percent = 0;

        for (let item in data) {
            if (data.hasOwnProperty(item) && data[item] == 'TRUE') {
                percent += 1;
            }
        }

        return state.merge({
            'configInfo': data,
            'percent': (percent * 100 / 4)
        });
    }

});
