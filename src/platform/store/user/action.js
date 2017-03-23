import * as apiUser from '../../../common/api/user';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

//禁/启用运营人员
export const SWITCH_USER_LEVEL = 'SWITCH_USER_LEVEL';
export const SWITCH_USER_LEVEL_PENDING = 'SWITCH_USER_LEVEL_PENDING';
export const SWITCH_USER_LEVEL_SUCCESS = 'SWITCH_USER_LEVEL_SUCCESS';
export const SWITCH_USER_LEVEL_FAILURE = 'SWITCH_USER_LEVEL_FAILURE';

export function getUsers(params) {
    return {
        type: GET_USERS,
        payload: apiUser.getUsers(params)
    };
}

//禁/启用用户
export function switchUserLevel(params) {
    return {
        type: SWITCH_USER_LEVEL,
        payload: apiUser.switchUserLevel(params)
    };
}
