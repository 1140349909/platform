import  * as apiHelp from  '../../../common/api/help';
//常见问题删除
export const DELETE_HELP = 'DELETE_HELP';
export const DELETE_HELP_PENDING = 'DELETE_HELP_PENDING';
export const DELETE_HELP_SUCCESS = 'DELETE_HELP_SUCCESS';
export const DELETE_HELP_FAILURE = 'DELETE_HELP_FAILURE';
//常见问题列表显示和搜索
export const GET_HELP_LIST = 'GET_HELP_LIST';
export const GET_HELP_LIST_PENDING = 'GET_HELP_LIST_PENDING';
export const GET_HELP_LIST_SUCCESS = 'GET_HELP_LIST_SUCCESS';
export const GET_HELP_LIST_FAILURE = 'GET_HELP_LIST_FAILURE';
//常见问题添加
export const ADD_HELP_PROBLEM = 'ADD_HELP_PROBLEM';
export const ADD_HELP_PROBLEM_PENDING = 'ADD_HELP_PROBLEM_PENDING';
export const ADD_HELP_PROBLEM_SUCCESS = 'ADD_HELP_PROBLEM_SUCCESS';
export const ADD_HELP_PROBLEM_FAILURE = 'ADD_HELP_PROBLEM_FAILURE';
//常见问题修改
export const UPDATE_HELP_PROBLEM = 'UPDATE_HELP_PROBLEM';
export const UPDATE_HELP_PROBLEM_PENDING = 'UPDATE_HELP_PROBLEM_PENDING';
export const UPDATE_HELP_PROBLEM_SUCCESS = 'UPDATE_HELP_PROBLEM_SUCCESS';
export const UPDATE_HELP_PROBLEM_FAILURE = 'UPDATE_HELP_PROBLEM_FAILURE';
//常见问题禁用
export const ENABLE_HELP_PROBLEM = 'ENABLE_HELP_PROBLEM';
export const ENABLE_HELP_PROBLEM_PENDING = 'ENABLE_HELP_PROBLEM_PENDING';
export const ENABLE_HELP_PROBLEM_SUCCESS = 'ENABLE_HELP_PROBLEM_SUCCESS';
export const ENABLE_HELP_PROBLEM_FAILURE = 'ENABLE_HELP_PROBLEM_FAILURE';

//用户社区删除
export const DELETE_HELP_COMMUNITY = 'DELETE_HELP_COMMUNITY';
export const DELETE_HELP_COMMUNITY_PENDING = 'DELETE_HELP_COMMUNITY_PENDING';
export const DELETE_HELP_COMMUNITY_SUCCESS = 'DELETE_HELP_COMMUNITY_SUCCESS';
export const DELETE_HELP_COMMUNITY_FAILURE = 'DELETE_HELP_COMMUNITY_FAILURE';

//社区帮助显示
export const GET_HELP_COMMUNITY_LIST = 'GET_HELP_COMMUNITY_LIST';
export const GET_HELP_COMMUNITY_LIST_PENDING = 'GET_HELP_COMMUNITY_LIST_PENDING';
export const GET_HELP_COMMUNITY_LIST_SUCCESS = 'GET_HELP_COMMUNITY_LIST_SUCCESS';
export const GET_HELP_COMMUNITY_LIST_FAILURE = 'GET_HELP_COMMUNITY_LIST_FAILURE';

//社区帮助添加
export const ADD_HELP_COMMUNITY = 'ADD_HELP_COMMUNITY';
export const ADD_HELP_COMMUNITY_PENDING = 'ADD_HELP_COMMUNITY_PENDING';
export const ADD_HELP_COMMUNITY_SUCCESS = 'ADD_HELP_COMMUNITY_SUCCESS';
export const ADD_HELP_COMMUNITY_FAILURE = 'ADD_HELP_COMMUNITY_FAILURE';

//社区帮助修改
export const UPDATE_HELP_COMMUNITY = 'UPDATE_HELP_COMMUNITY';
export const UPDATE_HELP_COMMUNITY_PENDING = 'UPDATE_HELP_COMMUNITY_PENDING';
export const UPDATE_HELP_COMMUNITY_SUCCESS = 'UPDATE_HELP_COMMUNITY_SUCCESS';
export const UPDATE_HELP_COMMUNITY_FAILURE = 'UPDATE_HELP_COMMUNITY_FAILURE';

//社区帮助启用/禁用
export const ABLE_HELP_COMMUNITY = 'ABLE_HELP_COMMUNITY';
export const ABLE_HELP_COMMUNITY_PENDING = 'ABLE_HELP_COMMUNITY_PENDING';
export const ABLE_HELP_COMMUNITY_SUCCESS = 'ABLE_HELP_COMMUNITY_SUCCESS';
export const ABLE_HELP_COMMUNITY_FAILURE = 'ABLE_HELP_COMMUNITY_FAILURE';

//根据类型查询微信二维码
export const GET_HELP_COMMUNITY_TYPE = 'GET_HELP_COMMUNITY_TYPE';
export const GET_HELP_COMMUNITY_TYPE_PENDING = 'GET_HELP_COMMUNITY_TYPE_PENDING';
export const GET_HELP_COMMUNITY_TYPE_SUCCESS = 'GET_HELP_COMMUNITY_TYPE_SUCCESS';
export const GET_HELP_COMMUNITY_TYPE_FAILURE = 'GET_HELP_COMMUNITY_TYPE_FAILURE';

//常见问题详情
export const GET_HELP_DETAIL = 'GET_HELP_DETAIL';
export const GET_HELP_DETAIL_PENDING = 'GET_HELP_DETAIL_PENDING';
export const GET_HELP_DETAIL_SUCCESS = 'GET_HELP_DETAIL_SUCCESS';
export const GET_HELP_DETAIL_FAILURE = 'GET_HELP_DETAIL_FAILURE';

export function deleteHelp(id) {
    return {
        type: DELETE_HELP,
        payload: apiHelp.deleteHelp(id)
    };
}
export function getHelpList(params) {
    return {
        type: GET_HELP_LIST,
        payload: apiHelp.getHelpList(params)
    };
}
export function addHelpProblem(params) {
    return {
        type: ADD_HELP_PROBLEM,
        payload: apiHelp.addHelpProblem(params)
    };
}
export function updateHelpProblem(id, status) {
    return {
        type: UPDATE_HELP_PROBLEM,
        payload: apiHelp.updateHelpProblem(id, status)
    };
}

export function deleteHelpCommunity(id) {
    return {
        type: DELETE_HELP_COMMUNITY,
        payload: apiHelp.deleteHelpCommunity(id)
    };
}
export function getHelpCommunityList(params) {
    return {
        type: GET_HELP_COMMUNITY_LIST,
        payload: apiHelp.getHelpCommunityList(params)
    };
}

export function addHelpCommunity(params) {
    return {
        type: ADD_HELP_COMMUNITY,
        payload: apiHelp.addHelpCommunity(params)
    };
}

export function updateHelpCommunity(id, params) {
    return {
        type: UPDATE_HELP_COMMUNITY,
        payload: apiHelp.updateHelpCommunity(id, params)
    };
}

export function ableHelpCommunity(id, status) {
    return {
        type: ABLE_HELP_COMMUNITY,
        payload: apiHelp.ableHelpCommunity(id, status)
    };
}

export function getHelpCommunityType(params) {
    return {
        type: GET_HELP_COMMUNITY_TYPE,
        payload: apiHelp.getHelpCommunityType(params)
    };
}


export function getHelpDetail(id) {
    return {
        type: GET_HELP_DETAIL,
        payload: apiHelp.getHelpDetail(id)
    };
}
