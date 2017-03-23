import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {dateFormat} from 'common/util';
import {
    ACTIVATE_ACCOUNT_SUCCESS,
    GET_MANAGER_USER_LIST_SUCCESS,
    GET_USER_LIST_SUCCESS,
    ADD_ADMIN_USER_INFO_SUCCESS,
    UPDATE_ACCOUNT_PASSWORD_SUCCESS,
    SEND_ACCOUNT_MAIL_FAILURE,
    ADD_ADMIN_USER_INFO_FAILURE,
    ADD_ADMIN_USER_INFO_PENDING,
    GET_ADMIN_USERINFO_SUCCESS,
    GET_ADMIN_USERINFO_PENDING,
    AVAILABLE_USER_MOBILE_SUCCESS,
    UPDATE_ADMIN_USERINFO_PENDING,
    BIND_USER_EMAIL_PENDING,
    UPDATE_USER_INFO_PENDING,
    UPDATE_USER_OPEN_SUCCESS,
    ALTER_CODE_TO_USER_EMAIL_FAILURE,
    ALTER_SURE_USER_EMAIL_FAILURE,
    ALTER_SURE_USER_EMAIL_SUCCESS,
    ALTER_USER_EMAIL_FAILURE

} from './action';

const initialState = fromJS({
    list: {},
    userList: {},
    itemStatus: {
        sendNotice: '',
        userName: '',
        status: '',
        nickName: ''
    },
    unbindInfo: {},
    userInfo: {
        //运营人员详情
    },
    availabelMobile: {
        //验证手机是否可用
    },
    activateAccount: {
        //激活账号信息
    },
    emailParams: {
        //操作邮箱的参数
    }
});
export default createReducer(initialState, {
    //运营人员激活服务
    [ACTIVATE_ACCOUNT_SUCCESS]: (state, {payload}) => state.set('activateAccount', payload.data),
    //获取操作人员列表
    [GET_USER_LIST_SUCCESS]: (state, {payload}) => {
        payload.data.content.map((item) => {
            item.createdDate = dateFormat(item.createdDate, 'yyyy-MM-dd hh:mm');
        });
        return state.set('userList', fromJS(payload.data));
    },
    //获取运营人员列表
    [GET_MANAGER_USER_LIST_SUCCESS]: (state, {payload}) => {

        let list = [{
            text: '全部',
            channel: '',
            param: ''
        }];

        payload.data.map((item) => {

            list.push({
                text: item.name ? item.name : (item.nickName ? item.nickName : '管理员'),
                channel: item.id,
                param: item.id
            });
        });
        return state.set('list', fromJS(list));
    },
    //分配运营人员
    [ADD_ADMIN_USER_INFO_SUCCESS]: (state, {payload}) => {
        const params = payload.params;
        if (params) {
            return state.set('itemStatus', fromJS({
                sendNotice: params.sendNotice,
                userName: params.userName,
                nickName: params.nickName,
                status: 'success'
            }));
        }
    },
    //分配运营人员失败
    [ADD_ADMIN_USER_INFO_PENDING]: (state, {payload}) => {
        payload.email = payload.userName;
        return state.mergeDeepIn(['userInfo'], payload);
    },
    //分配运营人员失败
    [ADD_ADMIN_USER_INFO_FAILURE]: (state, {payload}) => {
        payload.params.email = payload.params.userName;
        return state.mergeDeepIn(['userInfo'], payload.params);
    },
    //运营人员设置密码
    [UPDATE_ACCOUNT_PASSWORD_SUCCESS]: (state, {payload}) => {
        return state.set('itemStatus', fromJS(payload.data));
    },
    [SEND_ACCOUNT_MAIL_FAILURE]: (state, {payload}) => {
        return state.set('itemStatus', fromJS(payload));
    },

    //获取运营人员详情
    [GET_ADMIN_USERINFO_SUCCESS]: (state, {payload}) => {
        return state.set('userInfo', fromJS(payload.data));
    },
    [GET_ADMIN_USERINFO_PENDING]: (state, {payload}) => {
        return state.set('userInfo', payload);
    },
    [AVAILABLE_USER_MOBILE_SUCCESS]: (state, {payload}) => {
        return state.set('availabelMobile', fromJS(payload.data));
    },
    [UPDATE_ADMIN_USERINFO_PENDING]: (state, {payload}) => {
        return state.mergeDeepIn(['userInfo'], payload);
    },
    [BIND_USER_EMAIL_PENDING]: (state, {payload}) => {
        return state.mergeDeepIn(['userInfo'], payload);
    },
    [UPDATE_USER_INFO_PENDING]: (state, {payload}) => {
        return state.mergeDeepIn(['userInfo'], payload);
    },
    [UPDATE_USER_OPEN_SUCCESS]: (state, {payload}) => {
        return state.set('unbindInfo', payload);
    },
    [ALTER_CODE_TO_USER_EMAIL_FAILURE ]: (state, {payload}) => {
        //console.log(payload, 'ALTER_CODE_TO_USER_EMAIL_FAILURE');
        return state.set('emailParams', payload);
    },
    [ALTER_CODE_TO_USER_EMAIL_FAILURE ]: (state, {payload}) => {
        //console.log(payload, 'ALTER_CODE_TO_USER_EMAIL_FAILURE');
        return state.set('emailParams', payload);
    },
    [ALTER_SURE_USER_EMAIL_FAILURE]: (state, {payload}) => {
        //console.log(payload, 'ALTER_SURE_USER_EMAIL_FAILURE');
        return state.set('emailParams', payload);
    },
    [ALTER_SURE_USER_EMAIL_SUCCESS]: (state, {payload}) => {
        //console.log(payload, 'ALTER_SURE_USER_EMAIL_SUCCESS');
        return state.set('emailParams', payload);
    },
    [ALTER_USER_EMAIL_FAILURE]: (state, {payload}) => {
        //console.log(payload, 'ALTER_USER_EMAIL_FAILURE');
        return state.set('emailParams', payload);
    },
});


